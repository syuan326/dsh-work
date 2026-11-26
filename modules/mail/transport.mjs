import { lookup as dnsLookup } from 'node:dns/promises';
import { BlockList, isIP } from 'node:net';

const denied4=new BlockList();
for(const [ip,bits] of [['0.0.0.0',8],['10.0.0.0',8],['100.64.0.0',10],['127.0.0.0',8],['169.254.0.0',16],['172.16.0.0',12],['192.0.0.0',24],['192.0.2.0',24],['192.168.0.0',16],['198.18.0.0',15],['198.51.100.0',24],['203.0.113.0',24],['224.0.0.0',4],['240.0.0.0',4]]) denied4.addSubnet(ip,bits,'ipv4');
const global6=new BlockList();global6.addSubnet('2000::',3,'ipv6');
const denied6=new BlockList();denied6.addSubnet('2001:db8::',32,'ipv6');denied6.addSubnet('2002::',16,'ipv6');denied6.addSubnet('2001::',32,'ipv6');
export function isPublicAddress(address) {
  const family=isIP(address); if(family===4)return !denied4.check(address,'ipv4');
  if(family===6)return global6.check(address,'ipv6')&&!denied6.check(address,'ipv6');
  return false;
}
const error=(code,message)=>Object.assign(new Error(message),{code});
const limit=(v,f,min,max)=>{const n=v===undefined?f:Number(v);if(!Number.isInteger(n)||n<min||n>max)throw error('INVALID_OPTIONS','邮件资源限制无效');return n;};
async function resolveHost(host,allowPrivate,lookup) {
  if(typeof host!=='string'||!host||host.length>253||/[\s/?#@\\]/.test(host))throw error('INVALID_HOST','邮箱服务器主机无效');
  const literal=isIP(host);const rows=literal?[{address:host,family:literal}]:await lookup(host,{all:true,verbatim:true});
  if(!Array.isArray(rows)||!rows.length||rows.some(r=>!isIP(r.address)))throw error('DNS_FAILED','无法解析邮箱服务器');
  if(allowPrivate!==true&&rows.some(r=>!isPublicAddress(r.address)))throw error('PRIVATE_ADDRESS','邮箱服务器指向受限制地址，请由用户明确配置内网授权');
  return rows[0].address;
}
function checkAccount(account,kind){
  if(!['ssl','starttls'].includes(account[`${kind}_tls`]))throw error('TLS_REQUIRED','仅支持SSL或STARTTLS');
  if(!Number.isInteger(account[`${kind}_port`])||account[`${kind}_port`]<1||account[`${kind}_port`]>65535)throw error('INVALID_PORT','端口无效');
  if(typeof account.username!=='string'||/[\r\n\0]/.test(account.username))throw error('INVALID_ACCOUNT','邮箱地址无效');
}
const PROXY_RE = /^(?:socks5h|socks5|socks4a|socks4|http):\/\/[^\s/?#@]+(?::\d{1,5})?$/;
function proxyOf(account) {
  const value = account.proxy;
  if (value === undefined || value === null || value === '') return '';
  if (typeof value !== 'string' || value.length > 300 || !PROXY_RE.test(value)) throw error('INVALID_PROXY', '代理地址无效（支持 socks5h://、socks5://、http://）');
  return value;
}
function parseSocks5(proxy) {
  if (!/^socks5h?:\/\//.test(proxy)) return undefined;
  const url = new URL(proxy);
  if (!url.hostname) throw error('INVALID_PROXY', '代理地址无效');
  return { host: url.hostname, port: Number(url.port) || 1080 };
}

/**
 * One-shot loopback bridge that forwards a fixed TCP target through a SOCKS5
 * proxy. SMTP clients without SOCKS support (nodemailer) connect to it, while
 * TLS stays end-to-end because the client still verifies the real hostname.
 */
async function socksBridge(proxy, targetHost, targetPort, signal) {
  const endpoint = parseSocks5(proxy);
  if (!endpoint) throw error('INVALID_PROXY', '此连接仅支持 SOCKS5 代理');
  const { createServer, connect } = await import('node:net');
  const server = createServer(socket => {
    const upstream = connect({ host: endpoint.host, port: endpoint.port });
    let state = 0, pending = Buffer.alloc(0);
    upstream.on('error', () => socket.destroy());
    socket.on('error', () => upstream.destroy());
    upstream.on('connect', () => upstream.write(Buffer.from([5, 1, 0])));
    upstream.on('data', chunk => {
      pending = Buffer.concat([pending, chunk]);
      if (state === 0) {
        if (pending.length < 2) return;
        if (pending[1] !== 0) { socket.destroy(); upstream.destroy(); return; }
        pending = pending.subarray(2);
        const host = Buffer.from(targetHost);
        const request = Buffer.alloc(7 + host.length);
        request[0] = 5; request[1] = 1; request[2] = 0; request[3] = 3; request[4] = host.length;
        host.copy(request, 5); request.writeUInt16BE(targetPort, 5 + host.length);
        upstream.write(request); state = 1;
      }
      if (state === 1) {
        if (pending.length < 4) return;
        const length = pending[3] === 1 ? 10 : pending[3] === 3 ? 7 + pending[4] : 22;
        if (pending.length < length) return;
        if (pending[1] !== 0) { socket.destroy(); upstream.destroy(); return; }
        socket.write(pending.subarray(length)); pending = Buffer.alloc(0); state = 2;
        upstream.removeAllListeners('data');
        upstream.on('data', data => socket.write(data));
        socket.on('data', data => upstream.write(data));
      }
    });
    socket.on('close', () => upstream.destroy());
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const onAbort = () => { try { server.close(); } catch {} };
  signal?.addEventListener('abort', onAbort, { once: true });
  return {
    port: server.address().port,
    close() { signal?.removeEventListener('abort', onAbort); try { server.close(); } catch {} },
  };
}

function safeFailure(code='TRANSPORT_FAILED'){return error(code,'邮件连接或传输失败，请检查网络、认证和TLS配置');}
async function boundedRun(fn,{signal,timeoutMs,close}) {
  let timer,onAbort,cancelled=false;
  const active=()=>{if(cancelled||signal?.aborted)throw error('ABORTED','邮件操作已取消');};
  const cancellation=new Promise((_,reject)=>{
    onAbort=()=>{cancelled=true;try{close();}catch{}reject(error('ABORTED','邮件操作已取消'));};
    if(signal?.aborted){onAbort();return;}
    signal?.addEventListener('abort',onAbort,{once:true});
    timer=setTimeout(()=>{cancelled=true;try{close();}catch{}reject(error('TIMEOUT','邮件操作超时'));},timeoutMs);timer.unref?.();
  });
  try{return await Promise.race([cancellation,Promise.resolve().then(()=>{active();return fn(active);})]);}
  finally{clearTimeout(timer);signal?.removeEventListener('abort',onAbort);}
}

/** Dependencies are optional injection points for offline transport tests. */
export function createTransport(deps={}) {
  const lookup=deps.lookup||dnsLookup,timeoutMs=limit(deps.timeoutMs,60000,10,300000),debug=deps.debug===true;
  return {
    async sync(account,secret,state={},options={},signal) {
      let client,lock;
      try {
        return await boundedRun(async active=>{
          checkAccount(account,'imap');
          const maxMessages=limit(options.maxMessages,50,1,200),maxBytes=limit(options.maxBytes,5242880,1024,26214400),initialDays=limit(options.initialDays,30,1,3650);
          const proxy=proxyOf(account);
          const ip=proxy?account.imap_host:await resolveHost(account.imap_host,account.allow_private,lookup);
          const ImapFlow=deps.ImapFlow||(await import('imapflow')).ImapFlow;
          const simpleParser=deps.simpleParser||(await import('mailparser')).simpleParser;
          active();
          client=new ImapFlow({host:ip,port:account.imap_port,secure:account.imap_tls==='ssl',doSTARTTLS:account.imap_tls==='starttls',...(proxy?{proxy:proxy.replace(/^socks5h:/,'socks5:')}:{}),auth:{user:account.username,pass:secret},tls:{servername:account.imap_host,rejectUnauthorized:true,minVersion:'TLSv1.2'},logger:false,connectionTimeout:Math.min(timeoutMs,30000),greetingTimeout:Math.min(timeoutMs,15000),socketTimeout:Math.min(timeoutMs,30000),disableAutoIdle:true,maxLiteralSize:maxBytes});
          await client.connect(); active();
          lock=await client.getMailboxLock('INBOX',{readOnly:true}); active();
          if(!client.mailbox?.uidValidity)throw safeFailure('UIDVALIDITY_MISSING');
          const uidvalidity=String(client.mailbox.uidValidity),same=String(state.uidvalidity)===uidvalidity;
          const previous=same?Math.max(0,Number(state.last_uid)||0):0;
          const since=new Date(Date.now()-initialDays*86400000);
          const uids=await client.search(previous?{uid:`${previous+1}:*`}:{since},{uid:true});
          if(!Array.isArray(uids))throw safeFailure('SEARCH_FAILED');
          const fresh=[...new Set(uids.map(Number).filter(u=>Number.isSafeInteger(u)&&u>previous))].sort((a,b)=>a-b);
          // Messages skipped for size are retried on later runs, so raising the limit recovers them.
          const retry=Array.isArray(options.retryUids)?options.retryUids.map(Number).filter(u=>Number.isSafeInteger(u)&&u>0):[];
          const selected=[...new Set([...retry,...fresh])].slice(0,maxMessages);
          const messages=[],skipped=[];let last_uid=previous,totalBytes=0;
          for(const uid of selected){
            if(signal?.aborted)throw error('ABORTED','邮件操作已取消');
            const meta=await client.fetchOne(uid,{uid:true,size:true},{uid:true});
            if(!meta||!Number.isSafeInteger(meta.size)||meta.size<0)throw safeFailure('FETCH_FAILED');
            if(meta.size>maxBytes){skipped.push({uid,reason:'too_large',bytes:meta.size});last_uid=Math.max(last_uid,uid);continue;}
            // Bound the whole batch as well as each message; leave remaining UIDs for the next run.
            if(totalBytes+meta.size>maxBytes)break;
            const full=await client.fetchOne(uid,{uid:true,source:true},{uid:true,markSeen:false});
            if(!full?.source)throw safeFailure('FETCH_FAILED');
            const source=Buffer.from(full.source);if(source.length>maxBytes) {skipped.push({uid,reason:'too_large',bytes:source.length});last_uid=Math.max(last_uid,uid);continue;}
            totalBytes+=source.length;if(totalBytes>maxBytes)break;
            const parsed=await simpleParser(source,{skipHtmlToText:false,skipTextToHtml:true,skipImageLinks:true,maxHtmlLengthToParse:maxBytes});
            const date=parsed.date instanceof Date&&!Number.isNaN(parsed.date.getTime())?parsed.date.toISOString():'';
            messages.push({uid,subject:String(parsed.subject||'(无主题)').slice(0,2000),sender:String(parsed.from?.text||'').slice(0,2000),to:String(parsed.to?.text||'').slice(0,4000),date,message_id:String(parsed.messageId||'').slice(0,2000),body:String(parsed.text||'').slice(0,200000)});last_uid=Math.max(last_uid,uid);
          }
          return {messages,uidvalidity,last_uid,skipped};
        },{signal,timeoutMs,close:()=>client?.close()});
      }catch(e){if(debug)throw error(e?.code||'TRANSPORT_FAILED',[String(e?.message||'transport failed'),e?.responseText?`text=${String(e.responseText).slice(0,160)}`:'',e?.serverResponseCode?`code=${e.serverResponseCode}`:'',e?.authenticationFailed?'auth=failed':''].filter(Boolean).join(' | '));if(['PRIVATE_ADDRESS','ABORTED','TIMEOUT','INVALID_OPTIONS','TLS_REQUIRED','INVALID_HOST','INVALID_PORT','INVALID_PROXY','INVALID_DRAFT','INVALID_ACCOUNT'].includes(e?.code))throw error(e.code,e.message);throw safeFailure();}
      finally{try{lock?.release();}catch{}try{client?.close();}catch{}}
    },
    async send(account,secret,draft,original,signal){
      let smtp,submitting=false,bridge;
      try{
        return await boundedRun(async active=>{
          checkAccount(account,'smtp');
          if(!Array.isArray(draft.to)||!draft.to.length||draft.to.length>100||draft.to.some(t=>typeof t!=='string'||/[\r\n\0]/.test(t))||/[\r\n\0]/.test(String(draft.subject||'')))throw error('INVALID_DRAFT','邮件头无效');
          if(Buffer.byteLength(String(draft.body||''))>1048576)throw error('INVALID_DRAFT','草稿过大');
          const proxy=proxyOf(account);
          if(proxy) bridge=await socksBridge(proxy,account.smtp_host,account.smtp_port,signal);
          const ip=proxy?'127.0.0.1':await resolveHost(account.smtp_host,account.allow_private,lookup);
          const smtpPort=proxy?bridge.port:account.smtp_port;
          const createSmtpTransport=deps.createSmtpTransport||(await import('nodemailer')).default.createTransport;
          active();
          smtp=createSmtpTransport({host:ip,port:smtpPort,secure:account.smtp_tls==='ssl',requireTLS:account.smtp_tls==='starttls',ignoreTLS:false,auth:{user:account.username,pass:secret},tls:{servername:account.smtp_host,rejectUnauthorized:true,minVersion:'TLSv1.2'},connectionTimeout:Math.min(timeoutMs,30000),greetingTimeout:Math.min(timeoutMs,15000),socketTimeout:Math.min(timeoutMs,30000),logger:false,debug:false,disableFileAccess:true,disableUrlAccess:true});
          await smtp.verify();if(signal?.aborted)throw error('ABORTED','邮件操作已取消');
          submitting=true;
          const info=await smtp.sendMail({from:account.username,to:draft.to,subject:draft.subject,text:draft.body,messageId:`<${draft.id}@dsh-split-mail.local>`,...(original?.message_id?{inReplyTo:original.message_id,references:[original.message_id]}:{}),disableFileAccess:true,disableUrlAccess:true});
          return {status:'accepted',accepted_count:info.accepted?.length||0,rejected_count:info.rejected?.length||0};
        },{signal,timeoutMs,close:()=>{smtp?.close();}});
      }catch(e){
        // An explicit SMTP response rejects submission. A disconnect after DATA may have delivered it.
        const explicit=Number(e?.responseCode)>=400&&Number(e?.responseCode)<600;
        return {status:submitting&&!explicit?'unknown':'failed',code:e?.code==='ABORTED'?'ABORTED':e?.code==='TIMEOUT'?'TIMEOUT':'SMTP_FAILED'};
      }finally{try{smtp?.close();}catch{}try{bridge?.close();}catch{}}
    }
  };
}
