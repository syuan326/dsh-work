import { randomUUID, createHash } from 'node:crypto';

export const SCOPES = ['personal', 'work'];
export const ACTIONS = ['summary', 'calendar', 'save', 'delete', 'checkin', 'undo_checkin'];
export const LIMITS = { plans: 200, checkins: 50000, receipts: 2000, bytes: 16 * 1024 * 1024 };
const DAY = 86400000;
const clone = value => structuredClone(value);
const fail = (code, message) => { throw Object.assign(new Error(message), { code }); };
const object = value => value && typeof value === 'object' && !Array.isArray(value);
function exact(value, keys) {
  if (!object(value) || Object.keys(value).some(k => !keys.includes(k))) fail('VALIDATION', '参数包含未知字段或不是对象');
}
function text(value, max, fallback) {
  if (value === undefined && fallback !== undefined) return fallback;
  if (typeof value !== 'string' || value.length > max) fail('VALIDATION', `文本长度不能超过 ${max}`);
  return value;
}
function day(value) {
  if (typeof value !== 'string' || !/^20\d\d-\d{2}-\d{2}$/.test(value)) fail('VALIDATION', '日期必须为 YYYY-MM-DD，年份限 2000–2099');
  const ms = Date.parse(value + 'T00:00:00Z');
  if (!Number.isFinite(ms) || new Date(ms).toISOString().slice(0, 10) !== value) fail('VALIDATION', '日期不存在');
  return value;
}
const shift = (date, n) => new Date(Date.parse(date + 'T00:00:00Z') + n * DAY).toISOString().slice(0, 10);
const weekday = date => (new Date(date + 'T00:00:00Z').getUTCDay() + 6) % 7;
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  return object(value) ? Object.fromEntries(Object.keys(value).sort().map(k => [k, canonical(value[k])])) : value;
}
export function matches(plan, date, history = false) {
  if (plan.status !== 'active') {
    const cutoff = plan._paused_at || plan._completed_at;
    if (!history || !cutoff || date > cutoff) return false;
  }
  if (history && (plan._paused_ranges || []).some(r => r.start <= date && date <= r.end)) return false;
  return plan.start_date <= date && (!plan.end_date || date <= plan.end_date) && (plan.frequency === 'daily' || plan.weekdays.includes(weekday(date)));
}
function cleanItem(raw) {
  exact(raw, ['id', 'title', 'description', 'content', 'start_date', 'end_date', 'frequency', 'weekdays', 'status', 'reminder_enabled']);
  if (raw.reminder_enabled !== undefined && raw.reminder_enabled !== false) fail('VALIDATION', '没有自动提醒，不支持开启 reminder_enabled');
  const title = text(raw.title, 120).trim();
  if (!title) fail('VALIDATION', '标题不能为空');
  const start_date = day(raw.start_date), end_date = raw.end_date == null ? null : day(raw.end_date);
  if (end_date && end_date < start_date) fail('VALIDATION', '结束日期不能早于开始日期');
  const frequency = raw.frequency ?? 'daily', status = raw.status ?? 'active';
  if (!['daily', 'weekly'].includes(frequency) || !['active', 'paused', 'completed'].includes(status)) fail('VALIDATION', '周期或状态无效');
  const days = raw.weekdays ?? [];
  if (!Array.isArray(days) || days.length > 7 || days.some(n => !Number.isInteger(n) || n < 0 || n > 6)) fail('VALIDATION', '星期须为 0（周一）到 6（周日）');
  const weekdays = frequency === 'daily' ? [] : [...new Set(days)].sort();
  if (frequency === 'weekly' && !weekdays.length) fail('VALIDATION', '每周计划至少选择一天');
  return { title, description: text(raw.description, 4000, ''), content: text(raw.content, 50000, ''), start_date, end_date, frequency, weekdays, status };
}
function statsFor(plans, checkins, today) {
  return Object.fromEntries(plans.map(plan => {
    const logs = checkins.filter(c => c.plan_id === plan.id), done = new Set(logs.filter(c => c.status === 'done').map(c => c.date));
    let scheduled_count = 0, longest_streak = 0, run = 0;
    const last = plan.end_date && plan.end_date < today ? plan.end_date : today;
    for (let date = plan.start_date; date <= last; date = shift(date, 1)) {
      if (!matches(plan, date, true)) continue;
      scheduled_count++;
      run = done.has(date) ? run + 1 : 0;
      longest_streak = Math.max(longest_streak, run);
    }
    const done_count = logs.filter(c => c.status === 'done').length;
    return [plan.id, { scheduled_count, done_count, skipped_count: logs.filter(c => c.status === 'skipped').length, completion_rate: scheduled_count ? Math.round(done_count / scheduled_count * 100) : 0, current_streak: run, longest_streak, today_status: logs.find(c => c.date === today)?.status ?? null }];
  }));
}
function transition(previous, item, today) {
  const ranges = clone(previous?._paused_ranges || []);
  if (previous?.status === 'paused' && item.status !== 'paused') {
    const start = previous._paused_at, end = shift(today, -1);
    if (start && start <= end) ranges.push({ start, end });
  }
  if (previous?.status === 'completed' && item.status === 'active') {
    const start = previous._completed_at ? shift(previous._completed_at, 1) : today, end = shift(today, -1);
    if (start <= end) ranges.push({ start, end });
  }
  if (item.status === 'paused') item._paused_at = previous?._paused_at || today;
  if (item.status === 'completed') item._completed_at = previous?._completed_at || today;
  if (ranges.length) item._paused_ranges = ranges;
  return item;
}
export function createPlansCore({ stores, timezone = 'Asia/Shanghai', now = () => new Date() }) {
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' });
  let queue = Promise.resolve();
  function todayAt() {
    const parts = Object.fromEntries(formatter.formatToParts(new Date(now())).map(p => [p.type, p.value]));
    return day(`${parts.year}-${parts.month}-${parts.day}`);
  }
  async function run(scope, action, args) {
    if (!SCOPES.includes(scope) || !ACTIONS.includes(action)) fail('VALIDATION', '空间或操作无效');
    const table = stores[scope];
    const state = clone(table.get('current') || { plans: [], checkins: [], receipts: [] });
    exact(args, action === 'summary' ? [] : action === 'calendar' ? ['year', 'month'] : action === 'save' ? ['item', 'version', 'request_id'] : action === 'delete' ? ['id', 'version', 'request_id'] : action === 'checkin' ? ['id', 'date', 'status', 'note', 'version', 'request_id'] : ['id', 'date', 'version', 'request_id']);
    const write = !['summary', 'calendar'].includes(action);
    let fingerprint;
    if (write) {
      if (typeof args.request_id !== 'string' || !/^[A-Za-z0-9._:-]{1,128}$/.test(args.request_id)) fail('REQUEST_ID_REQUIRED', '写入前请先生成并保存稳定 request_id（1–128 ASCII 字母数字或 ._:-），重试使用同键同参数');
      fingerprint = createHash('sha256').update(JSON.stringify(canonical({ action, args }))).digest('hex');
      const receipt = state.receipts.find(r => r.key === args.request_id);
      if (receipt) {
        if (receipt.fingerprint !== fingerprint) fail('IDEMPOTENCY_CONFLICT', '请求键已用于不同参数或操作');
        return clone(receipt.value);
      }
      if (state.receipts.length >= LIMITS.receipts) fail('CAPACITY', '幂等收据容量已满；为避免重复写入不会自动淘汰');
    }
    const today = todayAt();
    if (!write) {
      const plans = state.plans.slice().sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id));
      const stats = statsFor(plans, state.checkins, today);
      if (action === 'summary') return { plans, stats, today, today_scheduled: plans.filter(p => matches(p, today, true)).map(p => p.id), today_checkins: Object.fromEntries(state.checkins.filter(c => c.date === today).map(c => [c.plan_id, c.status])), timezone };
      const { year, month } = args;
      if (!Number.isInteger(year) || year < 2000 || year > 2099 || !Number.isInteger(month) || month < 1 || month > 12) fail('VALIDATION', '年月限 2000–2099 年、1–12 月');
      const prefix = `${year}-${String(month).padStart(2, '0')}`;
      const checkins = state.checkins.filter(c => c.date.startsWith(prefix)), days = {};
      for (let n = 1; n <= new Date(Date.UTC(year, month, 0)).getUTCDate(); n++) {
        const date = `${prefix}-${String(n).padStart(2, '0')}`;
        const scheduled = plans.filter(p => matches(p, date, date <= today)).map(p => p.id);
        days[date] = { scheduled, checkins: Object.fromEntries(checkins.filter(c => c.date === date && scheduled.includes(c.plan_id)).map(c => [c.plan_id, c.status])) };
      }
      return { year, month, days, checkins, stats };
    }
    const timestamp = new Date(now()).toISOString();
    let value;
    const id = action === 'save' ? args.item?.id : args.id;
    if (id !== undefined && (typeof id !== 'string' || !id || id.length > 128)) fail('VALIDATION', '计划 ID 无效');
    let plan = state.plans.find(p => p.id === id);
    if (action !== 'save' || id !== undefined) {
      if (!plan) fail('NOT_FOUND', '计划不存在');
      if (!Number.isSafeInteger(args.version) || args.version !== plan.version) fail('VERSION_CONFLICT', '计划版本已变化，请刷新后重试');
    } else if (args.version !== undefined) fail('VALIDATION', '新建计划不能指定 version');
    if (action === 'save') {
      const item = cleanItem(args.item);
      if (plan && state.checkins.some(c => c.plan_id === plan.id) && ['start_date', 'end_date', 'frequency', 'weekdays'].some(k => JSON.stringify(plan[k]) !== JSON.stringify(item[k]))) fail('CYCLE_FROZEN', '已有打卡后不能修改日期或周期；请新建计划保留历史');
      if (!plan && state.plans.length >= LIMITS.plans) fail('CAPACITY', '最多保存 200 个计划');
      const saved = { ...transition(plan, item, today), id: plan?.id || randomUUID(), version: (plan?.version || 0) + 1, created_at: plan?.created_at || timestamp, updated_at: timestamp };
      if (plan) state.plans[state.plans.indexOf(plan)] = saved; else state.plans.push(saved);
      value = { item: saved };
    } else if (action === 'delete') {
      state.plans = state.plans.filter(p => p.id !== id);
      state.checkins = state.checkins.filter(c => c.plan_id !== id);
      value = { deleted: true, id };
    } else {
      const date = day(args.date);
      if (date > today || date < shift(today, -365)) fail('VALIDATION', '只能记录或撤销今天及过去 365 天内的打卡');
      const existing = state.checkins.find(c => c.plan_id === id && c.date === date);
      if (action === 'checkin') {
        if (!['done', 'skipped'].includes(args.status)) fail('VALIDATION', '打卡状态只能为 done/skipped');
        if (!matches(plan, date, date < today)) fail('NOT_SCHEDULED', '该日期不在计划执行日内');
        const note = text(args.note, 1000, '');
        if (!existing && state.checkins.length >= LIMITS.checkins) fail('CAPACITY', '打卡记录容量已满');
        const item = { plan_id: id, date, status: args.status, note, version: (existing?.version || 0) + 1 };
        if (existing) state.checkins[state.checkins.indexOf(existing)] = item; else state.checkins.push(item);
        value = { item };
      } else {
        state.checkins = state.checkins.filter(c => !(c.plan_id === id && c.date === date));
        value = { deleted: !!existing, plan_id: id, date };
      }
      plan.version++;
      plan.updated_at = timestamp;
      value.plan = clone(plan);
    }
    state.receipts.push({ key: args.request_id, fingerprint, value: clone(value) });
    if (Buffer.byteLength(JSON.stringify(state)) > LIMITS.bytes) fail('CAPACITY', '存储容量超过 16 MiB');
    await table.put('current', state);
    return clone(value);
  }
  return {
    call(scope, action, args = {}) {
      let input;
      try { input = clone(args); } catch { return Promise.resolve({ ok: false, error: { code: 'VALIDATION', message: '参数必须为可序列化数据' } }); }
      const result = queue.then(() => run(scope, action, input)).then(value => ({ ok: true, value }), error => ({ ok: false, error: { code: error.code || 'STORAGE_ERROR', message: error.code ? error.message : '存储失败，请使用同一请求键重试' } }));
      queue = result.then(() => undefined);
      return result;
    },
    async idle() { await queue; },
  };
}
