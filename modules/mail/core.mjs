import { randomUUID } from 'node:crypto';

export const DEFAULT_OPTIONS = Object.freeze({ categories: ['收件箱','重要','通知','其他'], tags: [], default_category: '收件箱', auto_sync: false, sync_interval_minutes: 5, initial_days: 30, max_messages: 50, max_bytes: 5242880, auto_analyze: false, analysis_consent: false, analysis_provider: '', analysis_model: '' });
const SCOPES = ['personal','work'];
const fail = (code,message) => { throw Object.assign(new Error(message), { code, safe:true }); };
const bounded = (value, fallback, min, max) => { const n = value === undefined ? fallback : Number(value); if (!Number.isInteger(n) || n < min || n > max) fail('INVALID_ARGUMENT','数值参数超出允许范围'); return n; };
const clean = (v,max=200000) => String(v ?? '').slice(0,max);
const values = table => [...table.entries()].map(([,v])=>v);
const clone = v => structuredClone(v);
const noHeaders = v => !/[\r\n\0]/.test(v);
function stringList(v,max=100) { if (!Array.isArray(v) || v.length>max || v.some(x=>typeof x!=='string'||!x.trim()||x.length>100)) fail('INVALID_ARGUMENT','列表格式无效'); return [...new Set(v.map(x=>x.trim()))]; }
function optionsOf(raw={}) { const o={...clone(DEFAULT_OPTIONS),...raw}; for(const k of ['analysis_provider','analysis_model']) if(typeof o[k]!=='string'||o[k].length>200||/[\r\n\0]/.test(o[k])) fail('INVALID_OPTIONS','分析模型配置无效');
  if(o.analysis_model && !o.analysis_provider) fail('INVALID_OPTIONS','选择分析模型前请先选择供应商');
  o.categories=stringList(o.categories,100); o.tags=stringList(o.tags,200); if (!o.categories.length || !o.categories.includes(o.default_category)) fail('INVALID_OPTIONS','默认分类必须位于分类选项中'); for(const k of ['auto_sync','auto_analyze','analysis_consent']) if(typeof o[k]!=='boolean') fail('INVALID_OPTIONS','开关必须为布尔值'); o.sync_interval_minutes=bounded(o.sync_interval_minutes,5,1,1440); o.initial_days=bounded(o.initial_days,30,1,3650); o.max_messages=bounded(o.max_messages,50,1,200); o.max_bytes=bounded(o.max_bytes,5242880,1024,26214400); return Object.fromEntries(Object.keys(DEFAULT_OPTIONS).map(k=>[k,o[k]])); }
function identity(a) { return JSON.stringify([a.username,a.imap_host,a.imap_port,a.imap_tls,a.smtp_host,a.smtp_port,a.smtp_tls,a.allow_private]); }
function validateAccount(a) { for(const k of ['username','imap_host','smtp_host']) { if(typeof a[k]!=='string'||!a[k].trim()||a[k].length>320||!noHeaders(a[k])) fail('INVALID_ACCOUNT','邮箱地址和服务器主机无效'); a[k]=a[k].trim(); } for(const k of ['imap_host','smtp_host']) if(/[\s/:?#@\\]/.test(a[k]) && !/^[a-f\d:]+$/i.test(a[k])) fail('INVALID_ACCOUNT','请填写主机名而非URL'); if(!/^[^\s@]+@[^\s@]+$/.test(a.username)) fail('INVALID_ACCOUNT','邮箱地址无效'); a.name=clean(a.name||a.username,100);
  if(a.proxy===undefined)a.proxy='';
  if(typeof a.proxy!=='string'||a.proxy.length>300||(a.proxy&&! /^(?:socks5h|socks5|socks4a|socks4|http):\/\/[^\s/?#@]+(?::\d{1,5})?$/.test(a.proxy)))fail('INVALID_ACCOUNT','代理地址无效'); a.imap_port=bounded(a.imap_port,993,1,65535); a.smtp_port=bounded(a.smtp_port,465,1,65535); for(const k of ['imap_tls','smtp_tls']) if(!['ssl','starttls'].includes(a[k])) fail('INVALID_ACCOUNT','只允许SSL或STARTTLS'); for(const k of ['enabled','allow_private']) if(typeof a[k]!=='boolean') fail('INVALID_ACCOUNT','开关必须为布尔值'); return a; }

export async function createMailCore({ stores, credentials, transport, analyze, now=()=>new Date() }) {
  const locks=new Set();
  const stamp=()=>new Date(now()).toISOString();
  const key=(scope,kind)=>`${scope}_${kind}_${randomUUID()}`;
  const scoped=(scope,id)=>{ if(typeof id!=='string'||!id.startsWith(`${scope}_`)) fail('SCOPE_MISMATCH','对象不属于当前邮件分区'); };
  const get=(store,scope,id,kind)=>{ scoped(scope,id); const row=store[kind].get(id); if(!row||row.scope!==scope) fail('NOT_FOUND','对象不存在或不属于当前分区'); return clone(row); };
  const user=context=>{ if(context.source!=='ui') fail('USER_ONLY','此操作只能由用户在配置页面执行'); };
  const publicAccount=async a=>({...a,has_secret:Boolean(await credentials.get(a.scope,a.id))});
  const ensureSignal=signal=>{ if(signal?.aborted) fail('ABORTED','操作已取消'); };
  const withLock=async(k,fn)=>{ if(locks.has(k)) fail('BUSY','此对象正在处理，请稍后重试'); locks.add(k); try{return await fn();}finally{locks.delete(k);} };
  const revision=(row,v)=>{ if(row && v!==row.version) fail('VERSION_CONFLICT','内容已变化，请重新读取后操作'); };
  const pagination=(rows,args,name)=>{ const offset=bounded(args.offset,0,0,10000000),limit=bounded(args.limit,25,1,100); return {[name]:rows.slice(offset,offset+limit),total:rows.length,next_offset:offset+limit<rows.length?offset+limit:null}; };
  async function callInternal(scope,action,args,context) {
    if(!SCOPES.includes(scope)) fail('INVALID_SCOPE','邮件分区无效');
    const s=stores[scope]; if(!s) fail('UNAVAILABLE','邮件存储不可用');
    const o=optionsOf(s.options.get()||{}), signal=context.signal;
    ensureSignal(signal);
    if(action==='accounts') return {accounts:await Promise.all(values(s.accounts).filter(a=>a.scope===scope).map(async a=>{
      const state=s.state.get(a.id)||{};
      return {...await publicAccount(a),sync:{status:clean(state.status,40)||'idle',last_sync:clean(state.last_sync,40),error:state.error?'同步失败，请检查认证、TLS和网络':'',skipped:(state.skipped||[]).length,retry:(state.retry_uids||[]).length}};
    }))};
    if(action==='options') return {options:o};
    if(action==='settings_save') { user(context); const next=optionsOf({...o,...(args.options||args)}); await s.options.set(next); return {options:next}; }
    if(action==='account_save') {
      user(context); const input=args.account||args; const id=input.id||key(scope,'account');
      return withLock(`${scope}:account:${id}`,async()=>{
        const old=input.id?get(s,scope,id,'accounts'):null;
        const a=validateAccount({name:'',username:'',imap_host:'',imap_port:993,imap_tls:'ssl',smtp_host:'',smtp_port:465,smtp_tls:'ssl',enabled:false,allow_private:false,...old,...Object.fromEntries(['name','username','imap_host','imap_port','imap_tls','smtp_host','smtp_port','smtp_tls','enabled','allow_private','proxy'].filter(k=>input[k]!==undefined).map(k=>[k,input[k]])),id,scope,version:(old?.version||0)+1,updated_at:stamp()});
        if(old) revision(old,input.version);
        const secret=args.secret ?? input.secret;
        if(secret!==undefined && (typeof secret!=='string'||!secret.trim()||secret.length>8192)) fail('INVALID_SECRET','授权码无效');
        if(old&&identity(old)!==identity(a)&&!secret) fail('REAUTHORIZE_REQUIRED','连接身份发生变化，请重新输入授权码');
        if(a.enabled&&!secret&&!await credentials.get(scope,id)) fail('SECRET_REQUIRED','启用邮箱前请提供授权码');
        if(secret) await credentials.set(scope,id,secret);
        await s.accounts.put(id,a); return {account:await publicAccount(a)};
      });
    }
    if(action==='account_delete') {
      user(context); return withLock(`${scope}:account:${args.account_id||args.id}`,async()=>{
        const a=get(s,scope,args.account_id||args.id,'accounts');
        if(args.purge!==undefined&&typeof args.purge!=='boolean') fail('INVALID_ARGUMENT','purge必须为布尔值');
        if(args.purge && args.confirm_purge!==true) fail('CONFIRM_REQUIRED','彻底删除需要明确确认');
        if(args.purge) { for(const [id,m] of s.messages.entries()) if(m.scope===scope&&m.mailbox_id===a.id) await s.messages.delete(id); for(const [id,d] of s.drafts.entries()) if(d.scope===scope&&d.mailbox_id===a.id) await s.drafts.delete(id); }
        await credentials.delete(scope,a.id); await s.state.delete(a.id); await s.accounts.delete(a.id); return {deleted:true,purged:args.purge===true,account_id:a.id};
      });
    }
    if(action==='list'||action==='search') {
      if(args.mailbox_id) get(s,scope,args.mailbox_id,'accounts');
      const q=clean(args.query??args.q,500).toLocaleLowerCase();
      const rows=values(s.messages).filter(m=>m.scope===scope&&(!args.mailbox_id||m.mailbox_id===args.mailbox_id)&&(!args.category||m.category===args.category)&&(!args.tag||m.tags?.includes(args.tag))&&(!args.since||m.date>=args.since)&&(!args.before||m.date<args.before)&&(!q||`${m.subject} ${m.sender} ${m.to} ${m.body} ${m.summary}`.toLocaleLowerCase().includes(q))).sort((a,b)=>String(b.date||b.created_at).localeCompare(String(a.date||a.created_at))).map(({body,...m})=>({...m,preview:clean(body,240)}));
      return pagination(rows,args,'messages');
    }
    if(action==='read') { const mail=get(s,scope,args.mail_id||args.id,'messages'); const offset=bounded(args.offset,0,0,10000000),limit=bounded(args.limit,12000,1,20000),body=mail.body||''; return {mail:{...mail,body:body.slice(offset,offset+limit)},body_offset:offset,body_length:body.length,next_offset:offset+limit<body.length?offset+limit:null}; }
    if(action==='sync') {
      const accounts=args.account_id||args.mailbox_id?[get(s,scope,args.account_id||args.mailbox_id,'accounts')]:values(s.accounts).filter(a=>a.scope===scope&&a.enabled);
      if(!accounts.length) fail('NO_ACCOUNTS','当前分区没有已启用邮箱');
      const results=[],errors=[];
      for(const account of accounts) {
        ensureSignal(signal);
        try { const result=await withLock(`${scope}:account:${account.id}`,async()=>{
          if(!account.enabled) fail('DISABLED','邮箱未启用');
          const secret=await credentials.get(scope,account.id); if(!secret) fail('SECRET_REQUIRED','邮箱授权码未配置');
          const previous=s.state.get(account.id)||{};
          await s.state.put(account.id,{...previous,scope,status:'syncing'});
          try {
            const result=await transport.sync(account,secret,previous,{maxMessages:o.max_messages,maxBytes:o.max_bytes,initialDays:o.initial_days,retryUids:Array.isArray(previous.retry_uids)?previous.retry_uids:[]},signal);
            if(!Array.isArray(result.messages)||result.messages.length>o.max_messages||!result.uidvalidity) fail('TRANSPORT_INVALID','邮件服务返回无效同步结果');
            const imported=[];
            for(const raw of result.messages) {
              ensureSignal(signal); if(!Number.isInteger(Number(raw.uid))||Number(raw.uid)<1) fail('TRANSPORT_INVALID','邮件UID无效');
              const dedup=`${account.id}:${result.uidvalidity}:${raw.uid}`;
              if(values(s.messages).some(m=>m.scope===scope&&m.dedup===dedup)) continue;
              const id=key(scope,'mail');
              const mail={id,scope,mailbox_id:account.id,dedup,uid:Number(raw.uid),uidvalidity:String(result.uidvalidity),subject:clean(raw.subject,2000),sender:clean(raw.sender,2000),to:clean(raw.to,4000),date:clean(raw.date,100),message_id:clean(raw.message_id,2000),body:clean(raw.body,200000),summary:'',category:o.default_category,category_source:'default',manual_tags:[],ai_tags:[],tags:[],analyzed:false,version:1,created_at:stamp()};
              await s.messages.put(id,mail); imported.push(id);
            }
            await s.state.put(account.id,{scope,uidvalidity:String(result.uidvalidity),last_uid:Number(result.last_uid)||0,status:'idle',last_sync:stamp(),skipped:(result.skipped||[]).slice(0,200),retry_uids:(result.skipped||[]).map(item=>item.uid).slice(0,200)});
            const analysis_errors=[];
            if(o.auto_analyze&&o.analysis_consent&&analyze) for(const id of imported.slice(0,10)) { try{await callInternal(scope,'analyze',{mail_id:id},context);}catch{analysis_errors.push({mail_id:id,code:'ANALYSIS_FAILED'});} }
            return {account_id:account.id,imported:imported.length,imported_ids:imported,skipped:result.skipped||[],analysis_errors};
          } catch(e) { await s.state.put(account.id,{...previous,scope,status:'failed',error:'同步失败，请检查认证、TLS和网络'}); throw e; }
        }); results.push(result); }
        catch(e) { errors.push({account_id:account.id,code:e.safe?e.code:'SYNC_FAILED',message:e.safe?e.message:'同步失败，请检查认证、TLS和网络'}); }
      }
      return {scope,imported:results.reduce((n,r)=>n+r.imported,0),results,errors};
    }
    if(action==='classify'||action==='tag') {
      const id=args.mail_id||args.id; return withLock(`${scope}:mail:${id}`,async()=>{
        const m=get(s,scope,id,'messages');
        if(action==='classify') { if(!o.categories.includes(args.category)) fail('INVALID_CATEGORY','分类不在备选项中'); m.category=args.category; m.category_source=context.source==='ui'?'manual':'ai'; }
        else { const tags=stringList(args.tags,20); if(tags.some(t=>!o.tags.includes(t))) fail('INVALID_TAG','标签不在备选项中'); const k=context.source==='ui'?'manual_tags':'ai_tags', mode=args.mode||'replace'; if(!['add','remove','replace'].includes(mode)) fail('INVALID_ARGUMENT','标签模式无效'); m[k]=mode==='replace'?tags:mode==='add'?[...new Set([...(m[k]||[]),...tags])]:(m[k]||[]).filter(t=>!tags.includes(t)); m.tags=[...new Set([...(m.manual_tags||[]),...(m.ai_tags||[])])]; }
        if(action==='classify'&&context.source!=='ui') { const old=get(s,scope,id,'messages'); if(old.category_source==='manual') {m.category=old.category;m.category_source='manual';} }
        m.version++; await s.messages.put(id,m); return {mail:m};
      });
    }
    if(action==='analyze') {
      if(!o.analysis_consent) fail('CONSENT_REQUIRED','请先在当前分区启用模型分析授权'); if(typeof analyze!=='function') fail('MODEL_UNAVAILABLE','DSH模型分析不可用');
      const ids=args.mail_ids||[args.mail_id||args.id]; if(!Array.isArray(ids)||!ids.length||ids.length>10) fail('INVALID_ARGUMENT','一次最多分析10封邮件');
      const results=[];
      for(const id of ids) { get(s,scope,id,'messages'); results.push(await withLock(`${scope}:mail:${id}`,async()=>{
        const m=get(s,scope,id,'messages');
        try { ensureSignal(signal); const result=await analyze({scope,mail:clone(m),options:{...clone(o),tools:[]},signal}); ensureSignal(signal);
          if(!result||typeof result.summary!=='string'||!o.categories.includes(result.category)||!Array.isArray(result.tags)||result.tags.length>20||result.tags.some(t=>!o.tags.includes(t))) fail('ANALYSIS_INVALID','模型返回的分类或标签不符合白名单');
          const next={...m,summary:clean(result.summary,12000),category:m.category_source==='manual'?m.category:result.category,category_source:m.category_source==='manual'?'manual':'ai',ai_tags:[...new Set(result.tags)],analyzed:true,analysis_error:null,model:clean(result.model,300),usage:result.usage&&typeof result.usage==='object'?JSON.parse(JSON.stringify(result.usage)):null,analyzed_at:stamp(),version:m.version+1}; next.tags=[...new Set([...(next.manual_tags||[]),...next.ai_tags])]; await s.messages.put(id,next); return {mail:next};
        }catch(e){await s.messages.put(id,{...m,analysis_error:'分析失败，可重试',version:m.version+1}); throw e;}
      })); }
      return {results};
    }
    if(action==='draft') {
      const operation=args.operation||'list';
      if(operation==='list') return pagination(values(s.drafts).filter(d=>d.scope===scope).sort((a,b)=>b.updated_at.localeCompare(a.updated_at)),args,'drafts');
      if(operation==='get') return {draft:get(s,scope,args.draft_id||args.id,'drafts')};
      if(!['save','delete'].includes(operation)) fail('INVALID_ARGUMENT','草稿操作无效');
      const input=args.draft||args,id=input.id||input.draft_id||(operation==='delete'?args.id:null)||key(scope,'draft');
      return withLock(`${scope}:draft:${id}`,async()=>{
        const old=s.drafts.get(id)?get(s,scope,id,'drafts'):null; if(input.id||input.draft_id||operation==='delete') {scoped(scope,id);if(!old)fail('NOT_FOUND','草稿不存在');}
        if(old) { revision(old,input.version??args.version); if(!['draft','failed'].includes(old.status)) fail('INVALID_STATE','此草稿当前状态不允许修改或删除'); }
        if(operation==='delete') {await s.drafts.delete(id);return {deleted:true,draft_id:id};}
        const replyId=input.reply_to_id??old?.reply_to_id,original=replyId?get(s,scope,replyId,'messages'):null;
        const accountId=input.mailbox_id??old?.mailbox_id??original?.mailbox_id; const account=get(s,scope,accountId,'accounts');
        const to=input.to??old?.to??(original?[original.sender.match(/<([^>]+)>/)?.[1]||original.sender]:[]);
        if(!Array.isArray(to)||!to.length||to.length>100||to.some(t=>typeof t!=='string'||!noHeaders(t)||!/^[^\s@<>]+@[^\s@<>]+$/.test(t))) fail('INVALID_RECIPIENT','收件人地址无效');
        const subject=clean(input.subject??old?.subject??(original?`Re: ${original.subject}`:''),2000); if(!noHeaders(subject)) fail('INVALID_ARGUMENT','主题包含非法字符');
        const draft={id,scope,mailbox_id:account.id,reply_to_id:replyId||null,to,subject,body:clean(input.body??old?.body,200000),status:'draft',version:(old?.version||0)+1,updated_at:stamp()}; await s.drafts.put(id,draft); return {draft};
      });
    }
    if(action==='send_preview'||action==='send') {
      const id=args.draft_id||args.id;
      const run=async()=>{const d=get(s,scope,id,'drafts'); revision(d,args.version); if(!['draft','failed'].includes(d.status)) fail('INVALID_STATE','此草稿不能发送；待核实状态不会自动重发'); const a=get(s,scope,d.mailbox_id,'accounts');if(!a.enabled)fail('DISABLED','发件邮箱未启用');
        if(action==='send_preview') return {preview:{scope,draft_id:id,version:d.version,account_id:a.id,account_version:a.version,from:a.username,to:d.to,subject:d.subject,body:d.body}};
        if(context.approved!==true) fail('APPROVAL_REQUIRED','发送必须由用户审批'); if(args.account_version!==a.version) fail('VERSION_CONFLICT','发件账号已变化，请重新预览并审批');
        const secret=await credentials.get(scope,a.id); if(!secret) fail('SECRET_REQUIRED','邮箱授权码未配置'); const original=d.reply_to_id?get(s,scope,d.reply_to_id,'messages'):null;
        const sending={...d,status:'sending',version:d.version+1,updated_at:stamp()};await s.drafts.put(id,sending);
        let result;try{result=await transport.send(a,secret,d,original,signal);}catch{result={status:'unknown'};}
        const status=['accepted','failed','unknown'].includes(result?.status)?result.status:'unknown'; const rejected=Math.max(0,Number(result?.rejected_count)||0);
        const detail=status!=='accepted'?(status==='failed'?'邮件提交失败':'发送结果待核实，请勿自动重发'):rejected>0?`服务器已接受部分收件人，${rejected} 个收件人被拒绝；请核对发送记录，不要整体重发`:'服务器已接受';
        const final={...sending,status,version:sending.version+1,updated_at:stamp(),send_detail:detail,rejected_count:rejected};await s.drafts.put(id,final); return {draft:final,status,detail};
      };
      return action==='send'?withLock(`${scope}:draft:${id}`,run):run();
    }
    fail('UNKNOWN_ACTION','不支持的邮件操作');
  }
  return { async call(scope,action,args={},context={}) { try { return await callInternal(scope,action,args||{},context||{}); }catch(e){return {ok:false,error:{code:e.safe?e.code:'OPERATION_FAILED',message:e.safe?e.message:'邮件操作失败，请检查配置或稍后重试'}};} } };
}
