import test from 'node:test';
import assert from 'node:assert/strict';
import {createTransport,isPublicAddress} from '../transport.mjs';
const account={id:'personal_account_x',username:'me@example.com',imap_host:'imap.example.com',imap_port:993,imap_tls:'ssl',smtp_host:'smtp.example.com',smtp_port:465,smtp_tls:'ssl',allow_private:false};
const lookup=async()=>[{address:'93.184.216.34',family:4}];
function mockImap({uids=[1,2],sizes={1:50,2:50},validity=11n}={}){const calls=[];class ImapFlow{constructor(options){calls.push(['config',options]);this.mailbox={uidValidity:validity};}async connect(){calls.push(['connect']);}async getMailboxLock(name,options){calls.push(['lock',name,options]);return {release(){calls.push(['release']);}};}async search(q,o){calls.push(['search',q,o]);return uids;}async fetchOne(uid,q,o){calls.push(['fetch',uid,q,o]);return q.source?{source:Buffer.from('source'),uid}:{size:sizes[uid],uid};}close(){calls.push(['close']);}}
return {ImapFlow,calls};}
const simpleParser=async()=>({subject:'Test',from:{text:'from@example.com'},to:{text:'to@example.com'},date:new Date('2026-01-01'),messageId:'<test>',text:'body'});
test('public address checker blocks private, special and mapped addresses',()=>{for(const ip of ['127.0.0.1','10.1.1.1','169.254.1.1','172.16.0.1','192.168.1.1','100.64.0.1','0.0.0.0','224.0.0.1','::1','::ffff:127.0.0.1','fc00::1','fe80::1','2001:db8::1','2002:7f00:1::'])assert.equal(isPublicAddress(ip),false,ip);assert.equal(isPublicAddress('8.8.8.8'),true);assert.equal(isPublicAddress('2606:4700:4700::1111'),true);});
test('IMAP pins resolved IP and TLS identity, opens readonly and peeks sources',async()=>{const m=mockImap();const t=createTransport({...m,lookup,simpleParser});const r=await t.sync(account,'SECRET',{},{});assert.equal(r.messages.length,2);const config=m.calls[0][1];assert.equal(config.host,'93.184.216.34');assert.equal(config.tls.servername,'imap.example.com');assert.equal(config.tls.rejectUnauthorized,true);assert.deepEqual(m.calls.find(x=>x[0]==='lock').slice(1),['INBOX',{readOnly:true}]);const source=m.calls.find(x=>x[0]==='fetch'&&x[2].source);assert.equal(source[3].markSeen,false);assert.equal(source[3].uid,true);assert.equal(r.last_uid,2);});
test('UIDVALIDITY reset, incrementals and oversized message skip',async()=>{const m=mockImap({uids:[4,5,6],sizes:{4:3000,5:700,6:700},validity:12n});const t=createTransport({...m,lookup,simpleParser});const r=await t.sync(account,'SECRET',{uidvalidity:'11',last_uid:999},{maxBytes:1024,maxMessages:3});assert.ok(m.calls.find(x=>x[0]==='search')[1].since instanceof Date);assert.equal(r.skipped[0].uid,4);assert.equal(r.messages.length,2);const n=mockImap({uids:[5,6],sizes:{5:50,6:50},validity:12n});await createTransport({...n,lookup,simpleParser}).sync(account,'SECRET',{uidvalidity:'12',last_uid:5},{});assert.deepEqual(n.calls.find(x=>x[0]==='search')[1],{uid:'6:*'});});
test('private or mixed DNS denied before connection, explicit allow permits',async()=>{const m=mockImap();const t=createTransport({...m,lookup:async()=>[{address:'127.0.0.1',family:4}],simpleParser});await assert.rejects(t.sync(account,'SECRET',{},{}),e=>e.code==='PRIVATE_ADDRESS');assert.equal(m.calls.length,0);await t.sync({...account,allow_private:true},'SECRET',{},{});assert.equal(m.calls[0][1].host,'127.0.0.1');const mixed=createTransport({...m,lookup:async()=>[{address:'8.8.8.8',family:4},{address:'10.0.0.1',family:4}],simpleParser});await assert.rejects(mixed.sync(account,'SECRET',{},{}),e=>e.code==='PRIVATE_ADDRESS');});
test('STARTTLS required and transport failures redact credentials',async()=>{const m=mockImap();await createTransport({...m,lookup,simpleParser}).sync({...account,imap_tls:'starttls'},'SECRET',{},{});assert.equal(m.calls[0][1].secure,false);assert.equal(m.calls[0][1].doSTARTTLS,true);class Bad{async connect(){throw Error('SECRET');}close(){}}await assert.rejects(createTransport({ImapFlow:Bad,lookup,simpleParser}).sync(account,'SECRET',{},{}),e=>!e.message.includes('SECRET'));});
test('SMTP verifies connection, enforces TLS, and distinguishes ambiguous submission',async()=>{let config,mail;const t=createTransport({lookup,createSmtpTransport:c=>{config=c;return {verify:async()=>{},sendMail:async m=>{mail=m;return {accepted:['you@example.com'],rejected:[]}},close(){}}}});const d={id:'personal_draft_x',to:['you@example.com'],subject:'Hi',body:'Body'};assert.equal((await t.send({...account,smtp_tls:'starttls'},'SECRET',d,{message_id:'<original>'})).status,'accepted');assert.equal(config.host,'93.184.216.34');assert.equal(config.requireTLS,true);assert.equal(config.tls.rejectUnauthorized,true);assert.equal(mail.inReplyTo,'<original>');for(const [where,expected] of [['verify','failed'],['sendMail','unknown']]){const broken=createTransport({lookup,createSmtpTransport:()=>({verify:async()=>{if(where==='verify')throw Error('SECRET')},sendMail:async()=>{throw Error('SECRET')},close(){}})});const r=await broken.send(account,'SECRET',d);assert.equal(r.status,expected);assert.ok(!JSON.stringify(r).includes('SECRET'));}});
test('cancellation and timeouts close connection',async()=>{let closed=false;class Hanging{async connect(){return new Promise(()=>{});}close(){closed=true;}}const t=createTransport({lookup,ImapFlow:Hanging,simpleParser,timeoutMs:10});const keeper=setTimeout(()=>{},100);await assert.rejects(t.sync(account,'SECRET',{},{}),e=>e.code==='TIMEOUT');clearTimeout(keeper);assert.equal(closed,true);const abort=new AbortController();abort.abort();await assert.rejects(t.sync(account,'SECRET',{},{},abort.signal),e=>e.code==='ABORTED');});

test('size-skipped UIDs are retried and recover when the limit allows',async()=>{const m=mockImap({uids:[7],sizes:{4:50,7:50},validity:12n});const t=createTransport({...m,lookup,simpleParser});const r=await t.sync(account,'SECRET',{uidvalidity:'12',last_uid:5},{maxBytes:1024,retryUids:[4]});assert.deepEqual(r.messages.map(x=>x.uid).sort((a,b)=>a-b),[4,7]);assert.equal(r.last_uid,7);assert.deepEqual(r.skipped,[]);});

test('IMAP proxy keeps the real hostname and skips local DNS pinning', async () => {
  const m = mockImap();
  let looked = 0;
  const t = createTransport({ ...m, lookup: async () => { looked++; return [{ address: '10.0.0.1', family: 4 }] }, simpleParser });
  await t.sync({ ...account, proxy: 'socks5h://192.0.2.1:7890' }, 'SECRET', {}, {});
  const config = m.calls[0][1];
  assert.equal(config.host, 'imap.example.com');
  assert.equal(config.proxy, 'socks5://192.0.2.1:7890');
  assert.equal(config.tls.servername, 'imap.example.com');
  assert.equal(looked, 0);
});

test('invalid proxy schemes are rejected before any connection', async () => {
  const m = mockImap();
  const t = createTransport({ ...m, lookup, simpleParser });
  await assert.rejects(t.sync({ ...account, proxy: 'file:///etc/passwd' }, 'SECRET', {}, {}), error => error.code === 'INVALID_PROXY');
  assert.equal(m.calls.length, 0);
});

test('SMTP proxy uses a loopback bridge while verifying the real server name', async () => {
  let config;
  let closed = 0;
  const t = createTransport({
    lookup,
    createSmtpTransport: value => {
      config = value;
      return { verify: async () => {}, sendMail: async () => ({ accepted: ['you@example.com'], rejected: [] }), close: () => { closed++; } };
    },
  });
  const result = await t.send({ ...account, proxy: 'socks5h://192.0.2.1:7890' }, 'SECRET', { id: 'personal_draft_y', to: ['you@example.com'], subject: 'Hi', body: 'Body' });
  assert.equal(result.status, 'accepted');
  assert.equal(config.host, '127.0.0.1');
  assert.ok(config.port > 0);
  assert.equal(config.tls.servername, 'smtp.example.com');
  assert.equal(closed, 1);
});
