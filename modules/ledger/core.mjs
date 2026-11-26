import { createHash, randomUUID } from 'node:crypto';

const KINDS = ['entries', 'budgets', 'goals', 'debts', 'reimbursements', 'settlements'];
const INTERNAL = ['origin', 'legacy', 'settlement_id', 'base_paid_cents', 'base_paid_periods'];
const MAX = 100_000_000_000_000;
const clone = (v) => structuredClone(v);
function fail(message, code = 'VALIDATION_ERROR') { throw Object.assign(new Error(message), { code }); }
const assert = (ok, message, code) => { if (!ok) fail(message, code); };
function object(v) { assert(v && typeof v === 'object' && !Array.isArray(v), '需要 JSON 对象'); return v; }
function exact(v, fields) { object(v); for (const k of Object.keys(v)) assert(fields.includes(k), `不支持字段: ${k}`); }
function text(v, max, empty = true) { assert(typeof v === 'string' && v.length <= max && (empty || v.length > 0), '文本长度或类型不正确'); return v; }
function integer(v, max = MAX, min = 0) { assert(Number.isSafeInteger(v) && v >= min && v <= max, '整数金额或数值超出范围'); return v; }
function sum(values) { let n = 0; for (const v of values) { n += v; assert(Number.isSafeInteger(n), '汇总金额超过安全整数范围', 'AMOUNT_OVERFLOW'); } return n; }
function date(v) { assert(typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v), '日期须为 YYYY-MM-DD'); const d = new Date(`${v}T00:00:00Z`); assert(v.slice(0, 4) !== '0000' && Number.isFinite(+d) && d.toISOString().slice(0, 10) === v, '日期不存在'); return v; }
function month(v) { assert(typeof v === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(v), '月份须为 YYYY-MM'); date(v + '-01'); return v; }
function moment(v) { assert(typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,6})?)?(?:Z|[+-]\d{2}:\d{2})$/.test(v) && Number.isFinite(Date.parse(v)), '时间必须是包含时区的 ISO 日期时间'); date(v.slice(0,10)); assert(Number(v.slice(11,13))<24&&Number(v.slice(14,16))<60&&(!v.slice(16).startsWith(':')||Number(v.slice(17,19))<60),'时刻不存在'); return v; }
function bool(v) { assert(typeof v === 'boolean', '需要布尔值'); return v; }
function choice(v, values) { assert(values.includes(v), '选项不正确'); return v; }
const canonical = (v) => Array.isArray(v) ? `[${v.map(canonical).join(', ')}]` : v && typeof v === 'object' ? `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}: ${canonical(v[k])}`).join(', ')}}` : JSON.stringify(v);
const digest = (v) => createHash('sha256').update(canonical(v)).digest('hex');
const equal = (a, b) => canonical(a) === canonical(b);
function options(data) {
  exact(data, ['income_categories', 'expense_categories', 'budget_alerts']);
  const out = {};
  for (const name of ['income_categories', 'expense_categories']) {
    assert(Array.isArray(data[name]), '需要分类数组');
    out[name] = [...new Set(data[name].map(v => text(v, 80, false).trim()))];
    assert(out[name].length >= 1 && out[name].length <= 200 && out[name].every(Boolean), '收支分类各需保留 1 至 200 项');
  }
  out.budget_alerts = bool(data.budget_alerts ?? false); return out;
}
export function createInitialState() {
  return { schema_version: 1, options_initialized: false, options: { income_categories: ['工资', '奖金', '投资收益', '兼职', '其他收入'], expense_categories: ['餐饮', '住房', '交通', '购物', '娱乐', 'AI', '医疗', '教育', '其他'], budget_alerts: false, version: 1 }, entries: [], budgets: [], goals: [], debts: [], reimbursements: [], settlements: [], receipts: {} };
}
function validateData(kind, input, internal = false) {
  const fields = { entries: ['type','category','description','amount_cents','date'], budgets: ['month','amounts'], goals: ['title','note','reminder_at','target_cents','start_month','deadline'], debts: ['title','note','reminder_at','kind','direction','total_cents','periods','start_date','closed'], reimbursements: ['title','note','reminder_at','source','total_cents','date','closed'], settlements: ['owner_kind','owner_id','amount_cents','date','sync_entry'] };
  assert(KINDS.includes(kind), '账本资源不存在', 'NOT_FOUND'); exact(input, [...fields[kind], ...(internal ? INTERNAL : [])]);
  const d = input, out = {};
  if (kind === 'entries') { out.type = choice(d.type,['income','expense']); out.category = text(d.category,80,false).trim(); assert(out.category,'分类不能为空'); out.description = text(d.description ?? '',2000); out.amount_cents = integer(d.amount_cents,MAX,1); out.date = date(d.date); }
  else if (kind === 'budgets') { out.month = month(d.month); object(d.amounts); out.amounts = {}; for (const [k,v] of Object.entries(d.amounts)) { text(k,80,false); Object.defineProperty(out.amounts,k,{value:integer(v),enumerable:true,writable:true,configurable:true}); } }
  else if (kind === 'settlements') { out.owner_kind=choice(d.owner_kind,['debts','reimbursements']); out.owner_id=text(d.owner_id,64,false); out.amount_cents=integer(d.amount_cents,MAX,1); out.date=date(d.date); out.sync_entry=bool(d.sync_entry ?? true); }
  else {
    out.title=text(d.title,200,false); out.note=text(d.note ?? '',2000); out.reminder_at=d.reminder_at == null ? null : moment(d.reminder_at);
    if (kind === 'goals') { out.target_cents=integer(d.target_cents,MAX,1); out.start_month=d.start_month == null ? null : month(d.start_month); out.deadline=d.deadline == null ? null : date(d.deadline); }
    else { out.total_cents=integer(d.total_cents,MAX,1); out.closed=bool(d.closed ?? false);
      if(kind==='debts') { out.kind=choice(d.kind ?? 'installment',['installment','loan']); out.direction=choice(d.direction ?? 'out',['out','in']); out.periods=integer(d.periods ?? 1,360,1); out.start_date=d.start_date == null ? null : date(d.start_date); assert(out.kind!=='installment'||out.total_cents>=out.periods,'每期金额至少需要一分钱'); }
      else {out.source=text(d.source ?? '',200);out.date=date(d.date);}
    }
  }
  if(internal) for(const k of INTERNAL) if(Object.hasOwn(d,k)) {
    if(k==='base_paid_cents'||k==='base_paid_periods') integer(d[k]);
    else if(k==='origin') text(d[k],80,false);
    else if(k==='settlement_id') text(d[k],64,false);
    else object(d[k]); out[k]=clone(d[k]);
  }
  assert((out.base_paid_cents ?? 0)<=(out.total_cents ?? 0),'历史已付金额超过总额');
  if(kind==='debts') assert((out.base_paid_periods ?? 0)<=out.periods,'历史已还期数超过总期数');
  return out;
}
const dataOf = (r) => Object.fromEntries(Object.entries(r).filter(([k]) => !['id','resource','version','created_at','updated_at','workspace_id'].includes(k)));
function references(state) {
  // Persist only states whose public Number-based reports remain exactly readable.
  sum(state.entries.filter(e=>e.type==='income').map(e=>e.amount_cents));
  sum(state.entries.filter(e=>e.type==='expense').map(e=>e.amount_cents));
  for (const budget of state.budgets) sum(Object.values(budget.amounts));
  for (const goal of state.goals) {
    const saved = sum(state.entries.filter(e=>!goal.start_month||e.date.slice(0,7)>=goal.start_month).map(e=>e.type==='income'?e.amount_cents:-e.amount_cents));
    sum([goal.target_cents, -saved]);
  }
  const budgets=new Set(); const ids=new Set();
  for(const k of KINDS) for(const r of state[k]) { assert(!ids.has(r.id),'重复记录 ID'); ids.add(r.id); if(k==='budgets'){assert(!budgets.has(r.month),'此月份已有预算','CONFLICT');budgets.add(r.month);} }
  for(const p of state.settlements) {
    const owner=state[p.owner_kind].find(r=>r.id===p.owner_id); assert(owner,'结算所属规划缺失');
    const linked=state.entries.filter(e=>e.settlement_id===p.id); assert(linked.length===(p.sync_entry?1:0),'结算关联账目缺失或重复');
    const income=p.owner_kind==='reimbursements'||(owner.kind==='loan'&&owner.direction==='out');
    for(const e of linked) assert(e.amount_cents===p.amount_cents&&e.date===p.date&&e.type===(income?'income':'expense'),'结算与关联账目不一致');
  }
  for(const e of state.entries) if(e.settlement_id) assert(state.settlements.some(p=>p.id===e.settlement_id),'账目关联结算缺失');
  for(const k of ['debts','reimbursements']) for(const owner of state[k]) { const p=progress(state,owner);assert(p.paid_cents<=owner.total_cents,'结算总额超出规划总额');if(k==='debts'&&owner.kind==='installment') assert(p.paid_periods<=owner.periods,'已还期数超出规划总期数'); }
}
export function validateState(snapshot) {
  object(snapshot); assert(snapshot.schema_version===1,'不支持的账本存储版本');
  const o=snapshot.options;object(o); const {version,...rest}=o; assert(equal(options(rest),rest),'持久化分类设置缺少字段或未经归一化');integer(version,Number.MAX_SAFE_INTEGER,1); if(snapshot.options_initialized!==undefined)bool(snapshot.options_initialized); object(snapshot.receipts);
  function jsonValue(value,ancestors=new Set(),depth=0){assert(depth<=100,'回执嵌套过深');if(value===null||typeof value==='string'||typeof value==='boolean')return;if(typeof value==='number'){assert(Number.isSafeInteger(value),'回执包含无效数字');return;}assert(value&&typeof value==='object'&&(Array.isArray(value)||Object.getPrototypeOf(value)===Object.prototype||Object.getPrototypeOf(value)===null),'回执必须是 JSON 数据');assert(!ancestors.has(value),'回执包含循环引用');ancestors.add(value);for(const item of Object.values(value))jsonValue(item,ancestors,depth+1);ancestors.delete(value);}
  for(const [key,receipt] of Object.entries(snapshot.receipts)){assert(key.length>0&&key.length<=200&&/^[A-Za-z0-9_.:-]+$/.test(key),'回执键格式不正确');exact(receipt,['fingerprint','result']);assert(typeof receipt.fingerprint==='string'&&/^[a-f0-9]{64}$/.test(receipt.fingerprint)&&Object.hasOwn(receipt,'result'),'回执格式不正确');jsonValue(receipt.result);}
  for(const kind of KINDS) {assert(Array.isArray(snapshot[kind]),'账本记录必须为数组');for(const r of snapshot[kind]) {object(r);assert(typeof r.id==='string'&&/^[A-Za-z0-9_-]{1,64}$/.test(r.id),'非法 ID');assert(r.resource===`ledger_${kind}`,'记录资源类型不一致');integer(r.version,Number.MAX_SAFE_INTEGER,1);moment(r.created_at);moment(r.updated_at);assert(r.workspace_id==='personal','账本仅在个人空间提供');assert(equal(validateData(kind,dataOf(r),true),dataOf(r)),'持久化业务记录缺少字段或未经归一化');} }
  references(snapshot);return snapshot;
}
function progress(s,o,excluding='') {const p=s.settlements.filter(r=>r.owner_id===o.id&&r.id!==excluding);const paid=sum([o.base_paid_cents??0,...p.map(r=>r.amount_cents)]), periods=(o.base_paid_periods??0)+p.length,remaining=Math.max(0,o.total_cents-paid),installment=o.resource==='ledger_debts'&&o.kind==='installment';return {paid_cents:paid,paid_periods:periods,remaining_cents:remaining,done:o.closed||remaining===0||(installment&&periods>=o.periods),next_amount_cents:installment?(periods+1>=o.periods?remaining:Math.min(remaining,Math.floor(o.total_cents/o.periods))):remaining};}
function shift(m,n){const [y,mo]=m.split('-').map(Number);const index=y*12+mo-1+n;const year=Math.floor(index/12);assert(year>=1&&year<=9999,'月份超出范围');return `${String(year).padStart(4,'0')}-${String(index%12+1).padStart(2,'0')}`;}
function lastDay(m){const [y,mo]=m.split('-').map(Number);const d=new Date(0);d.setUTCFullYear(y,mo,0);return `${m}-${String(d.getUTCDate()).padStart(2,'0')}`;}
function report(s,start,end,today){ start=start||today.slice(0,7)+'-01';end=end||lastDay(today.slice(0,7));date(start);date(end);const monthsDiff=(Number(end.slice(0,4))-Number(start.slice(0,4)))*12+Number(end.slice(5,7))-Number(start.slice(5,7));assert(start<=end&&monthsDiff<=120,'统计范围须为 0 至 120 个月');const selected=s.entries.filter(e=>e.date>=start&&e.date<=end);const totals=rows=>({income_cents:sum(rows.filter(r=>r.type==='income').map(r=>r.amount_cents)),expense_cents:sum(rows.filter(r=>r.type==='expense').map(r=>r.amount_cents))});const t=totals(selected),all=totals(s.entries);let cumulative=sum(s.entries.filter(e=>e.date<start).map(e=>e.type==='income'?e.amount_cents:-e.amount_cents));const series=[];for(let n=0;n<=monthsDiff;n++){const m=shift(start.slice(0,7),n),v=totals(selected.filter(e=>e.date.startsWith(m)));const net=sum([v.income_cents,-v.expense_cents]);cumulative=sum([cumulative,net]);series.push({month:m,...v,balance_cents:net,cumulative_cents:cumulative});}const daily=[];if(start.slice(0,7)===end.slice(0,7)){let carry=sum(s.entries.filter(e=>e.date<start).map(e=>e.type==='income'?e.amount_cents:-e.amount_cents));for(let day=Number(start.slice(8));day<=Number(end.slice(8));day++){const d=start.slice(0,8)+String(day).padStart(2,'0'),v=totals(selected.filter(e=>e.date===d)),net=sum([v.income_cents,-v.expense_cents]);carry=sum([carry,net]);daily.push({month:d,...v,balance_cents:net,cumulative_cents:carry});}}
  const groups=new Map();for(const e of selected){const key=JSON.stringify([e.type,e.category]);groups.set(key,sum([groups.get(key)||0,e.amount_cents]));}
  const budgets=s.budgets.filter(b=>b.month>=start.slice(0,7)&&b.month<=end.slice(0,7)).map(b=>{const spending=Object.create(null);for(const e of s.entries.filter(e=>e.type==='expense'&&e.date.startsWith(b.month)))spending[e.category]=sum([spending[e.category]||0,e.amount_cents]);const total=sum(Object.values(b.amounts)),spent=sum(Object.values(spending)),days=b.month===today.slice(0,7)?Number(lastDay(b.month).slice(8))-Number(today.slice(8)):0;return {...b,total_cents:total,spent_cents:spent,remaining_cents:total-spent,daily_cents:days?Math.floor((total-spent)/days):null,spent_by_category:{...spending}};}).sort((a,b)=>a.month.localeCompare(b.month));
  return {start,end,count:selected.length,...t,balance_cents:t.income_cents-t.expense_cents,all_balance_cents:all.income_cents-all.expense_cents,categories:[...groups].map(([k,amount_cents])=>{const [type,category]=JSON.parse(k);return {type,category,amount_cents};}).sort((a,b)=>b.amount_cents-a.amount_cents),series,daily,budgets,months:[...new Set(s.entries.map(e=>e.date.slice(0,7)))].sort()};
}
export function createLedgerCore({store,now=()=>new Date()}) {
  let queue=Promise.resolve();
  const iso=()=>new Date(now()).toISOString();
  const today=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now()));
  const read=()=>clone(validateState(store.get()));
  const find=(s,k,id)=>{assert(KINDS.includes(k),'账本资源不存在','NOT_FOUND');const r=s[k].find(r=>r.id===id);assert(r,'账本记录不存在','NOT_FOUND');return r;};
  const version=(r,v)=>assert(r.version===v,'记录已更新，请刷新后重试','CONFLICT');
  const record=(kind,data)=>({id:randomUUID().replaceAll('-',''),resource:`ledger_${kind}`,version:1,created_at:iso(),updated_at:iso(),workspace_id:'personal',...data});
  const change=(r,d)=>{const meta={id:r.id,resource:r.resource,version:r.version+1,created_at:r.created_at,updated_at:iso(),workspace_id:'personal'};for(const k of Object.keys(r)) delete r[k];Object.assign(r,meta,d);return r;};
  function normalize(payload,s) {
    object(payload);assert(Buffer.byteLength(JSON.stringify(payload),'utf8')<=20*1024*1024,'JSON 不能超过 20 MiB');assert(payload.app==='pardo-secretary-ledger'&&payload.version===2,'仅支持 pardo-secretary-ledger v2 备份','UNSUPPORTED_FORMAT');assert(Array.isArray(payload.records)&&payload.records.length<=100000,'备份记录数量超出限制');const opts=payload.options?options(payload.options):null;const ids=new Set();const rows=payload.records.map(r=>{object(r);assert(typeof r.id==='string'&&/^[A-Za-z0-9_-]{1,64}$/.test(r.id),'非法 ID');assert(!ids.has(r.id),'备份内存在重复 ID');ids.add(r.id);return {id:r.id,resource:`ledger_${r.kind}`,version:1,workspace_id:'personal',created_at:moment(r.created_at||iso()),updated_at:moment(r.updated_at||r.created_at||iso()),...validateData(r.kind,r.data,true)};});return {rows,opts};
  }
  function inspect(s,payload){const {rows,opts}=normalize(payload,s),merged=clone(s),counts=Object.fromEntries(KINDS.map(k=>[k,0])),conflicts=[],monthly=Object.create(null);let added=0,unchanged=0;for(const r of rows){const kind=r.resource.slice(7);counts[kind]++;const prior=KINDS.flatMap(k=>s[k]).find(p=>p.id===r.id);if(!prior){added++;merged[kind].push(r);}else if(prior.resource===r.resource&&equal(dataOf(prior),dataOf(r)))unchanged++;else conflicts.push({kind,id:r.id,reason:'已有记录内容不同'});if(kind==='entries'){const m=r.date.slice(0,7),v=monthly[m]??={count:0,income_cents:0,expense_cents:0};v.count++;v[r.type+'_cents']=sum([v[r.type+'_cents'],r.amount_cents]);}}if(!conflicts.length){const seenBudgets=new Map();for(const budget of merged.budgets){if(seenBudgets.has(budget.month))conflicts.push({kind:'budgets',id:budget.id,reason:'此月份已有其他预算'});seenBudgets.set(budget.month,budget.id);}if(!conflicts.length)references(merged);}return {rows,opts,report:{counts,new:added,unchanged,conflicts,monthly:{...monthly},can_apply:!conflicts.length,fingerprint:digest(payload)}};}
  async function execute(action,args){object(args);const s=read();const mutations=['save_options','save','delete','settle','create','import_apply'];if(!mutations.includes(action)){
    if(action==='options')return {...s.options,today:today(),timezone:'Asia/Shanghai'};
    if(action==='query'){const kind=args.kind||'entries';assert(KINDS.includes(kind),'资源不存在');if(args.start)date(args.start);if(args.end)date(args.end);integer(args.offset??0,Number.MAX_SAFE_INTEGER);integer(args.limit??50,200,1);if(args.type)choice(args.type,['income','expense']);const query=String(args.query||'').toLowerCase();const rows=s[kind].filter(r=>(!args.start||r.date>=args.start)&&(!args.end||r.date<=args.end)&&(!args.type||r.type===args.type)&&(!args.category||r.category===args.category)&&(!args.entry_id||r.id===args.entry_id)&&(!query||`${r.description||''} ${r.category||''}`.toLowerCase().includes(query))).sort((a,b)=>String(b.date||b.month||'').localeCompare(String(a.date||a.month||''))||b.created_at.localeCompare(a.created_at)||b.id.localeCompare(a.id));const offset=args.offset??0,limit=args.limit??50;return {items:rows.slice(offset,offset+limit),total:rows.length,offset,next_offset:offset+limit<rows.length?offset+limit:null,income_cents:sum(rows.filter(r=>r.type==='income').map(r=>r.amount_cents)),expense_cents:sum(rows.filter(r=>r.type==='expense').map(r=>r.amount_cents))};}
    if(action==='summary')return report(s,args.start,args.end,today());
    if(action==='planning'){const result={goals:[],debts:[],reimbursements:[],settlements:s.settlements};for(const k of ['debts','reimbursements'])result[k]=s[k].map(r=>({...r,...progress(s,r)}));result.goals=s.goals.map(g=>{const saved=sum(s.entries.filter(e=>!g.start_month||e.date.slice(0,7)>=g.start_month).map(e=>e.type==='income'?e.amount_cents:-e.amount_cents)),remaining=Math.max(0,sum([g.target_cents,-saved])),recent=[...new Set(s.entries.filter(e=>e.date.slice(0,7)<=today().slice(0,7)).map(e=>e.date.slice(0,7)))].sort().slice(-3),net=sum(s.entries.filter(e=>recent.includes(e.date.slice(0,7))).map(e=>e.type==='income'?e.amount_cents:-e.amount_cents)),average=recent.length?Math.floor(net/recent.length):0,months=average>0?Math.ceil(remaining/average):null;return {...g,saved_cents:saved,remaining_cents:remaining,done:saved>=g.target_cents,recent_monthly_surplus_cents:average,forecast_month:months!==null&&months<1200?shift(today().slice(0,7),months):null};});return result;}
    if(action==='export'){const {version,...opts}=s.options;return {app:'pardo-secretary-ledger',version:2,exported_at:iso(),options:opts,records:KINDS.flatMap(kind=>s[kind].map(r=>({kind,id:r.id,data:dataOf(r),created_at:r.created_at,updated_at:r.updated_at})))};}
    if(action==='import_preview')return inspect(s,args.payload).report;
    fail('未知账本操作','UNKNOWN_ACTION');
  }
  const key=text(args.idempotency_key,200,false);assert(/^[A-Za-z0-9_.:-]+$/.test(key),'幂等键格式不正确');const signature=digest([action,args]);const prior=Object.hasOwn(s.receipts,key)?s.receipts[key]:undefined;if(prior){assert(prior.fingerprint===signature,'请求标识已被不同操作使用','CONFLICT');return clone(prior.result);}
  let result;
  if(action==='save_options'){const d={...(args.data||{})};const v=args.version??d.version;delete d.version;version(s.options,v);s.options={...options(d),version:s.options.version+1};s.options_initialized=true;result=s.options;}
  if(action==='save'||action==='create'){const kind=action==='create'?'entries':args.kind;assert(kind!=='settlements','请通过结算接口操作');const d=clone(action==='create'?Object.fromEntries(Object.entries(args).filter(([k])=>k!=='idempotency_key')):args.data||{});const v=args.version??d.version;delete d.version;if(action==='create'&&!d.date)d.date=today();const value=validateData(kind,d),old=args.id?find(s,kind,args.id):null;if(old)version(old,v);if(kind==='entries'){assert(!old?.settlement_id,'关联账目请通过原还款或回款记录修改','CONFLICT');if(!old||old.type!==value.type||old.category!==value.category)assert(s.options[value.type+'_categories'].includes(value.category),'请先在账本设置中添加分类');}if(kind==='budgets')assert(!s.budgets.some(r=>r.month===value.month&&r.id!==old?.id),'此月份已有预算','CONFLICT');if(old&&['debts','reimbursements'].includes(kind)){const p=progress(s,old);assert(value.total_cents>=p.paid_cents,'总金额不能小于已结算金额');if(kind==='debts'&&p.paid_cents){assert(value.kind===old.kind&&value.direction===old.direction,'已有结算不能更改类型或方向','CONFLICT');assert(value.periods>=p.paid_periods,'总期数不能少于已还期数');}}if(old){for(const k of INTERNAL)if(Object.hasOwn(old,k))value[k]=old[k];result=change(old,value);}else{result=record(kind,{...value,origin:action==='create'?'ai':'manual'});s[kind].push(result);}}
  if(action==='delete'){const r=find(s,args.kind,args.id);version(r,args.version);assert(!(args.kind==='entries'&&r.settlement_id),'关联账目请通过结算记录撤销','CONFLICT');if(args.kind==='settlements'){s.entries=s.entries.filter(e=>e.settlement_id!==r.id);const owner=find(s,r.owner_kind,r.owner_id);change(owner,dataOf(owner));}if(['debts','reimbursements'].includes(args.kind)){const payments=s.settlements.filter(p=>p.owner_id===r.id);for(const p of payments){for(const e of s.entries.filter(e=>e.settlement_id===p.id)){const d=dataOf(e);delete d.settlement_id;change(e,d);}}s.settlements=s.settlements.filter(p=>p.owner_id!==r.id);}s[args.kind]=s[args.kind].filter(e=>e.id!==r.id);result={deleted:r.id};}
  if(action==='settle'){const d=clone(args.data||args);const v=args.version??d.version,ov=args.owner_version??d.owner_version;delete d.version;delete d.owner_version;if(!args.data){delete d.id;delete d.idempotency_key;}const value=validateData('settlements',d),old=args.id?find(s,'settlements',args.id):null;if(old){version(old,v);assert(old.owner_kind===value.owner_kind&&old.owner_id===value.owner_id,'不能更换结算所属项目');}const owner=find(s,value.owner_kind,value.owner_id);version(owner,ov);const p=progress(s,owner,old?.id);assert(!p.done,'此项目已经结清或关闭','CONFLICT');assert(value.amount_cents<=p.remaining_cents,'结算金额不能超过剩余金额');if(owner.resource==='ledger_debts'&&owner.kind==='installment')assert(value.amount_cents===(old?old.amount_cents:p.next_amount_cents),'分期金额须等于本期应还金额，最后一期补齐尾差');const payment=old?change(old,value):record('settlements',value);if(!old)s.settlements.push(payment);const linked=s.entries.find(e=>e.settlement_id===payment.id);if(!payment.sync_entry)s.entries=s.entries.filter(e=>e.settlement_id!==payment.id);else {const income=value.owner_kind==='reimbursements'||(owner.kind==='loan'&&owner.direction==='out'),type=income?'income':'expense',choices=s.options[type+'_categories'],preferred=income?'其他收入':'其他',e={type,category:choices.includes(preferred)?preferred:choices.at(-1),description:(income?'收到回款 · ':'偿还款项 · ')+owner.title,amount_cents:payment.amount_cents,date:payment.date,settlement_id:payment.id,origin:'settlement'};if(linked)change(linked,e);else s.entries.push(record('entries',e));}change(owner,dataOf(owner));result={settlement:payment,owner_version:owner.version};}
  if(action==='import_apply'){assert(digest(args.payload)===args.fingerprint,'导入内容已变化，请重新预览','CONFLICT');const {rows,opts,report:r}=inspect(s,args.payload);assert(r.can_apply,'导入存在冲突，未写入任何数据','CONFLICT');for(const row of rows){const kind=row.resource.slice(7);if(!s[kind].some(e=>e.id===row.id))s[kind].push(row);}const base=opts&&!s.options_initialized?opts:Object.fromEntries(Object.entries(s.options).filter(([k])=>k!=='version'));for(const row of rows.filter(r=>r.resource==='ledger_entries')){const list=base[row.type+'_categories'];if(!list.includes(row.category))list.push(row.category);}s.options={...options(base),version:s.options.version+1};s.options_initialized=true;result=r;}
  assert(result!==undefined,'未知账本写操作');Object.defineProperty(s.receipts,key,{value:{fingerprint:signature,result:clone(result)},enumerable:true,writable:true,configurable:true});validateState(s);try{await store.set(clone(s));}catch(error){throw Object.assign(new Error(`账本保存失败：${error?.message||String(error)}`),{code:'STORAGE_ERROR',cause:error});}return clone(result);
  }
  return {call(action,args={}){let copied;try{copied=clone(args);}catch(error){return Promise.reject(Object.assign(new Error('参数必须为可复制 JSON 数据'),{code:'VALIDATION_ERROR',cause:error}));}const task=queue.then(()=>execute(action,copied)).catch(error=>{if(error?.code)throw error;throw Object.assign(new Error(error?.message||String(error)),{code:'INTERNAL_ERROR',cause:error});});queue=task.catch(()=>{});return task;}};
}
