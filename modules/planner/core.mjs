import { randomUUID } from 'node:crypto';

class DomainError extends Error { constructor(code, message) { super(message); this.code = code; } }
const fail = (message, code = 'VALIDATION') => { throw new DomainError(code, message); };
const isDate = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v;
const iso = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/.test(v) && isDate(v.slice(0,10)) && Number(v.slice(11,13)) < 24 && Number(v.slice(14,16)) < 60 && (!v.slice(16).startsWith(':') || Number(v.slice(17,19)) < 60) && Number.isFinite(Date.parse(v));
const dateAdd = (v, n) => new Date(Date.parse(v + 'T00:00:00Z') + n * 86400000).toISOString().slice(0,10);
function parts(ms, zone) { const p = new Intl.DateTimeFormat('en-CA', {timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date(ms)); const get=t=>p.find(x=>x.type===t).value; return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`; }
function wallMs(wall, zone) {
  const target = Date.parse(wall + 'Z'); let result = target;
  for(let i=0;i<5;i++) { const delta=target-Date.parse(parts(result,zone)+'Z'); if(!delta) return result; result+=delta; }
  // Nonexistent local times (DST gaps) are skipped, never silently shifted.
  return parts(result,zone)===wall ? result : null;
}
function zoneCheck(zone) { try { new Intl.DateTimeFormat('en',{timeZone:zone}).format(); } catch { fail('未知时区'); } }
const common = ['id','version','created_at','updated_at','title','description','tags','source_type','source_id','related_ids'];
const fields = {events:[...common,'start','end','all_day','timezone','repeat','cancelled_dates','status','reminder_minutes'],tasks:[...common,'project','project_id','priority','due_at','parent_id','status','reminder_minutes']};
function string(v, name, max=500) { if(typeof v!=='string'||v.length>max) fail(`${name} 必须为字符串且长度不超过 ${max}`); return v; }
function strings(v,name) { if(!Array.isArray(v)||v.length>1000||v.some(x=>typeof x!=='string'||x.length>1000)) fail(`${name} 必须为字符串数组`); return v; }
function validate(kind, input) {
  if(!input||typeof input!=='object'||Array.isArray(input)) fail('item 必须是对象');
  for(const k of Object.keys(input)) if(!fields[kind].includes(k)) fail(`不支持字段 ${k}`);
  const o={title:'',description:'',tags:[],source_type:null,source_id:null,related_ids:[],reminder_minutes:[],...input};
  string(o.title,'title'); if(!o.title.trim()) fail('标题不能为空'); string(o.description,'description',50000);
  strings(o.tags,'tags'); strings(o.related_ids,'related_ids');
  for(const k of ['source_type','source_id']) if(o[k]!==null) string(o[k],k,500);
  if(!Array.isArray(o.reminder_minutes)||o.reminder_minutes.length>100||o.reminder_minutes.some(x=>!Number.isInteger(x)||x<0||x>525600)) fail('提醒分钟必须为 0 至 525600 的整数数组');
  o.reminder_minutes=[...new Set(o.reminder_minutes)].sort((a,b)=>a-b);
  if(kind==='tasks') {
    Object.assign(o,{project:'收集箱',project_id:null,priority:'normal',due_at:null,parent_id:null,status:'open',...o});
    string(o.project,'project'); if(!['low','normal','high'].includes(o.priority)) fail('优先级无效');
    if(!['open','done'].includes(o.status)) fail('任务状态无效');
    if(o.due_at!==null&&!iso(o.due_at)) fail('截止时间必须包含 UTC 偏移');
    for(const k of ['project_id','parent_id']) if(o[k]!==null) string(o[k],k,128);
  } else {
    Object.assign(o,{all_day:false,timezone:'Asia/Shanghai',repeat:null,cancelled_dates:[],status:'active',...o});
    if(typeof o.all_day!=='boolean') fail('all_day 必须为布尔值'); string(o.timezone,'timezone'); zoneCheck(o.timezone);
    if(!['active','cancelled'].includes(o.status)) fail('日程状态无效');
    if(o.all_day ? !isDate(o.start)||!isDate(o.end) : !iso(o.start)||!iso(o.end)) fail('时间格式无效；定时日程须含 UTC 偏移');
    if(Date.parse(o.end)<=Date.parse(o.start)) fail('结束须晚于开始，全天结束日期不包含当天');
    strings(o.cancelled_dates,'cancelled_dates'); if(o.cancelled_dates.some(x=>!isDate(x))) fail('取消日期无效');
    if(o.repeat!==null) {
      const r=o.repeat; if(!r||typeof r!=='object'||Array.isArray(r)||Object.keys(r).some(k=>!['frequency','weekdays','month_day','until','count'].includes(k))) fail('重复规则字段无效');
      if(!['daily','weekly','monthly'].includes(r.frequency)) fail('重复频率无效');
      const days=r.weekdays??[]; if(!Array.isArray(days)||days.some(x=>!Number.isInteger(x)||x<0||x>6)) fail('星期必须在 0 至 6');
      if(r.month_day!=null&&(!Number.isInteger(r.month_day)||r.month_day<1||r.month_day>31)) fail('月日期无效');
      if(r.count!=null&&(!Number.isInteger(r.count)||r.count<1||r.count>10000)) fail('重复次数须在 1 至 10000');
      if(r.until!=null&&!isDate(r.until)) fail('重复截止日期无效');
      o.repeat={frequency:r.frequency,weekdays:[...new Set(days)].sort(),month_day:r.month_day??null,until:r.until??null,count:r.count??null};
    }
  }
  return o;
}
function range(from,to) { if(!iso(from)||!iso(to)||Date.parse(to)<=Date.parse(from)||Date.parse(to)-Date.parse(from)>366*86400000) fail('范围须含偏移、结束晚于开始且不超过 366 天'); return [Date.parse(from),Date.parse(to)]; }
function expand(e, from, to) {
  if(e.status!=='active') return [];
  // Explicit timestamps identify an instant even in a DST fold. Do not round
  // or reconstruct a non-repeating timed event through its local wall clock.
  if(!e.repeat&&!e.all_day) {
    const start=Date.parse(e.start),end=Date.parse(e.end);
    if(e.cancelled_dates.includes(parts(start,e.timezone).slice(0,10))||start>=to||end<=from) return [];
    return [{...e,occurrence_start:new Date(start).toISOString(),occurrence_end:new Date(end).toISOString()}];
  }
  const zone=e.timezone, origin=e.all_day?e.start:parts(Date.parse(e.start),zone).slice(0,10);
  const wall=e.all_day?'00:00:00':parts(Date.parse(e.start),zone).slice(11);
  const duration=Date.parse(e.end)-Date.parse(e.start), days=e.all_day?duration/86400000:0;
  const r=e.repeat; let cursor=r?.count?origin:[origin,dateAdd(parts(from,zone).slice(0,10),-Math.ceil(duration/86400000)-1)].sort().at(-1);
  const endDay=dateAdd(parts(to,zone).slice(0,10),1); let count=0, scanned=0; const out=[];
  while(cursor<=endDay) {
    if(++scanned>200000) fail('重复计算超出 200000 天扫描上限，请缩短历史或调整规则','LIMIT');
    if(r?.until&&cursor>r.until) break;
    const weekday=(new Date(cursor+'T00:00:00Z').getUTCDay()+6)%7;
    const originWeekday=(new Date(origin+'T00:00:00Z').getUTCDay()+6)%7;
    const matches=!r?cursor===origin:r.frequency==='daily'||(r.frequency==='weekly'&&(r.weekdays.length?r.weekdays:[originWeekday]).includes(weekday))||(r.frequency==='monthly'&&Number(cursor.slice(8))===(r.month_day??Number(origin.slice(8))));
    if(matches&&cursor>=origin) {
      count++; if(r?.count&&count>r.count) break;
      if(!e.cancelled_dates.includes(cursor)) {
        const start=wallMs(cursor+'T'+wall,zone);
        const end=e.all_day?wallMs(dateAdd(cursor,days)+'T00:00:00',zone):start===null?null:start+duration;
        if(start!==null&&end!==null&&start<to&&end>from) out.push({...e,start:e.all_day?cursor:new Date(start).toISOString(),end:e.all_day?dateAdd(cursor,days):new Date(end).toISOString(),occurrence_start:new Date(start).toISOString(),occurrence_end:new Date(end).toISOString()});
      }
    }
    if(!r) break;
    cursor=dateAdd(cursor,1);
  }
  return out;
}
export function createPlannerCore({stores,now=()=>new Date()}) {
  const clock=()=>{const v=now();return new Date(v).toISOString();};
  const entries=async table=>{const raw=await table.entries();return [...raw].map(([id,v])=>({...v,id}));};
  let pending = Promise.resolve(), closing = false;
  const execute = async (scope,action,args={}) => { try {
    if(!['personal','work'].includes(scope)||!stores[scope]) fail('未知空间');
    const tables=stores[scope];
    if(action==='calendar') { const [from,to]=range(args.from,args.to); const occurrences=(await entries(tables.events)).flatMap(e=>expand(e,from,to)).sort((a,b)=>a.occurrence_start.localeCompare(b.occurrence_start)); return {ok:true,value:{occurrences}}; }
    if(action==='reminders') {
      const at=args.at??clock(); if(!iso(at)) fail('at 时间无效'); const from=Date.parse(at),to=from+7*86400000,items=[];
      for(const kind of ['events','tasks']) for(const owner of await entries(tables[kind])) {
        if(owner.status!==(kind==='events'?'active':'open')) continue;
        const max=Math.max(0,...owner.reminder_minutes)*60000;
        const occurrences=kind==='events'?expand(owner,from,to+max):owner.due_at?[{...owner,occurrence_start:owner.due_at}]:[];
        for(const occurrence of occurrences) for(const offset of owner.reminder_minutes) {const start=occurrence.occurrence_start,run=Date.parse(start)-offset*60000; if(run>=from&&run<to) items.push({id:`${owner.id}:${start}:${offset}`,kind,owner_id:owner.id,title:owner.title,run_at:new Date(run).toISOString(),start,offset_minutes:offset});}
      }
      items.sort((a,b)=>a.run_at.localeCompare(b.run_at)); return {ok:true,value:{items,total:items.length}};
    }
    const {kind}=args; if(!['events','tasks'].includes(kind)) fail('未知资源类型'); const table=tables[kind];
    if(action==='list') {
      let items=await entries(table);
      if(args.query) {if(typeof args.query!=='string') fail('query 必须为字符串'); const q=args.query.toLocaleLowerCase(); items=items.filter(x=>JSON.stringify(x).toLocaleLowerCase().includes(q));}
      if(args.status&&args.status!=='all') items=items.filter(x=>x.status===args.status);
      if(args.from||args.to) {const [from,to]=range(args.from,args.to);items=items.filter(x=>kind==='events'?expand(x,from,to).length:x.due_at&&Date.parse(x.due_at)>=from&&Date.parse(x.due_at)<to);}
      items.sort((a,b)=>b.created_at.localeCompare(a.created_at)||a.id.localeCompare(b.id)); return {ok:true,value:{items,total:items.length}};
    }
    if(!['save','delete','status'].includes(action)) fail('未知操作');
    const id=action==='save'?args.item?.id:args.id;
    if(action!=='save' && (typeof id!=='string'||!id)) fail('此操作必须提供 ID');
    if(id!==undefined&&(typeof id!=='string'||!id)) fail('ID 无效');
    const previous=id?await table.get(id):null;
    if(id&&!previous) fail('记录不存在','NOT_FOUND');
    const version=args.version??(action==='save'?args.item?.version:undefined);
    if(previous&&version!==previous.version) fail('记录已更新，请刷新后重试','CONFLICT');
    if(action==='delete') {
      if(kind==='tasks'&&(await entries(table)).some(child=>child.parent_id===id)) fail('该任务仍有子任务，请先解除父子关联或删除子任务','HAS_CHILDREN');
      await table.delete(id);return {ok:true,value:{deleted:true}};
    }
    // save is a full replacement: omitted domain fields reset to schema defaults.
    // Client timestamps/version are metadata only; persistence always overwrites them.
    const item=validate(kind,action==='status'?{...previous,status:args.status}:args.item);
    if(kind==='tasks'&&item.parent_id) {
      const visited=new Set(id?[id]:[]); let parentId=item.parent_id;
      while(parentId) {if(visited.has(parentId)) fail('子任务不能形成循环');visited.add(parentId);const parent=await table.get(parentId);if(!parent) fail('父任务不存在于当前空间');parentId=parent.parent_id;}
    }
    const time=clock(); const result={...item,id:id??randomUUID(),version:previous?previous.version+1:1,created_at:previous?.created_at??time,updated_at:time};
    await table.put(result.id,result); return {ok:true,value:{item:result}};
  } catch(e) {return {ok:false,error:{code:e instanceof DomainError?e.code:'INTERNAL',message:e instanceof DomainError?e.message:'存储或业务处理失败'}};} };
  return {call(scope, action, args = {}) {
    if (closing) return Promise.resolve({ok:false,error:{code:'CLOSING',message:'日程服务正在关闭，请稍后重试'}});
    let input;
    try { input = structuredClone(args); } catch { return Promise.resolve({ok:false,error:{code:'VALIDATION',message:'参数必须为可序列化数据'}}); }
    const result = pending.then(() => execute(scope, action, input));
    pending = result.then(() => undefined, () => undefined);
    return result;
  }, async idle() { await pending; }, async close() { closing = true; await pending; }};
}
