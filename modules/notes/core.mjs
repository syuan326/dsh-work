import { createHash, randomUUID } from 'node:crypto';

export const SCOPES = Object.freeze(['personal', 'work']);
export const ACTIONS = Object.freeze(['list', 'get', 'versions', 'save', 'delete', 'restore']);
export const LIMITS = Object.freeze({ notes: 500, snapshots: 10000, receipts: 2000, bytes: 32 * 1024 * 1024, content: 100000, title: 200, tags: 20, tag: 40 });
const clone = value => structuredClone(value);
const fail = (code, message) => { throw Object.assign(new Error(message), { notesCode: code }); };
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
function exact(value, keys) {
  if (!object(value) || Object.keys(value).some(key => !keys.includes(key))) fail('VALIDATION', '参数必须为对象且不能包含未知字段');
}
function text(value, max, label) {
  if (typeof value !== 'string' || value.length > max) fail('VALIDATION', `${label}必须为文本且不能超过 ${max} 字符`);
  return value;
}
function idOf(value) {
  if (typeof value !== 'string' || !value || value.length > 128) fail('VALIDATION', '笔记 ID 无效');
  return value;
}
function cleanItem(raw) {
  exact(raw, ['id', 'title', 'content', 'tags', 'pinned', 'archived']);
  const title = text(raw.title, LIMITS.title, '标题').trim();
  if (!title) fail('VALIDATION', '标题不能为空');
  const content = text(raw.content, LIMITS.content, 'Markdown 正文');
  if (!Array.isArray(raw.tags) || raw.tags.length > LIMITS.tags) fail('VALIDATION', '标签必须为数组，最多 20 个');
  const tags = [...new Set(raw.tags.map(tag => {
    const clean = text(tag, LIMITS.tag, '标签').trim();
    if (!clean) fail('VALIDATION', '标签不能为空');
    return clean;
  }))];
  if (typeof raw.pinned !== 'boolean' || typeof raw.archived !== 'boolean') fail('VALIDATION', 'pinned/archived 必须为布尔值');
  return { title, content, tags, pinned: raw.pinned, archived: raw.archived };
}
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  return object(value) ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
}
const fields = {
  list: ['query', 'tag', 'pinned', 'archived'], get: ['id'], versions: ['id'],
  save: ['item', 'version', 'request_id'], delete: ['id', 'version', 'request_id'],
  restore: ['id', 'version', 'target_version', 'request_id'],
};

/** All state, snapshots and receipts commit together in one durable table record. */
export function createNotesCore({ stores, now = () => new Date() }) {
  let queue = Promise.resolve();
  async function run(scope, action, args) {
    if (!SCOPES.includes(scope) || !ACTIONS.includes(action)) fail('VALIDATION', '空间或操作无效');
    exact(args, fields[action]);
    const table = stores[scope];
    const state = clone(table.get('current') || { notes: [], snapshots: [], receipts: [] });
    const write = ['save', 'delete', 'restore'].includes(action);
    let fingerprint;
    if (write) {
      if (typeof args.request_id !== 'string' || !/^[A-Za-z0-9._:-]{1,128}$/.test(args.request_id)) fail('REQUEST_ID_REQUIRED', '写入前生成并保留稳定 request_id（1–128 ASCII 字母数字或 ._:-），重试必须使用同键同参数');
      fingerprint = createHash('sha256').update(JSON.stringify(canonical({ action, args }))).digest('hex');
      const prior = state.receipts.find(receipt => receipt.key === args.request_id);
      if (prior) {
        if (prior.fingerprint !== fingerprint) fail('IDEMPOTENCY_CONFLICT', 'request_id 已用于不同操作或参数');
        return clone(prior.value);
      }
      if (state.receipts.length >= LIMITS.receipts) fail('CAPACITY', '每个空间最多 2000 条持久化幂等收据；不会自动淘汰，容量已满，拒绝新写入');
    }
    if (action === 'list') {
      const query = args.query === undefined ? '' : text(args.query, 1000, '搜索关键词').trim().toLowerCase();
      const tag = args.tag === undefined ? undefined : text(args.tag, LIMITS.tag, '标签').trim();
      if (tag === '') fail('VALIDATION', '搜索标签不能为空');
      if (args.pinned !== undefined && typeof args.pinned !== 'boolean') fail('VALIDATION', 'pinned 必须为布尔值');
      if (args.archived !== undefined && typeof args.archived !== 'boolean' && args.archived !== 'all') fail('VALIDATION', "archived 必须为布尔值或 'all'");
      const notes = state.notes.filter(note => (args.archived === 'all' || note.archived === (args.archived ?? false)) && (args.pinned === undefined || note.pinned === args.pinned) && (tag === undefined || note.tags.includes(tag)) && (!query || [note.title, note.content, ...note.tags].some(value => value.toLowerCase().includes(query))))
        .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updated_at.localeCompare(a.updated_at) || b.id.localeCompare(a.id))
        .map(({ content, ...summary }) => ({ ...summary, excerpt: content.replace(/\s+/gu, ' ').trim().slice(0, 200) }));
      return { notes };
    }
    const id = action === 'save' ? args.item?.id : idOf(args.id);
    if (id !== undefined) idOf(id);
    const previous = state.notes.find(note => note.id === id);
    if (action !== 'save' || id !== undefined) {
      if (!previous) fail('NOT_FOUND', '笔记不存在');
    }
    if (action === 'get') return clone(previous);
    if (action === 'versions') return { versions: state.snapshots.filter(note => note.id === id).sort((a, b) => b.version - a.version) };
    if (previous) {
      if (!Number.isSafeInteger(args.version) || args.version < 1 || args.version !== previous.version) fail('VERSION_CONFLICT', '笔记版本已变化，请重新读取最新版本后重试');
      if (previous.version === Number.MAX_SAFE_INTEGER) fail('CAPACITY', '笔记版本已达上限');
    } else if (args.version !== undefined) fail('VALIDATION', '新建笔记不能指定 version');
    let value;
    if (action === 'delete') {
      state.notes = state.notes.filter(note => note.id !== id);
      state.snapshots = state.snapshots.filter(note => note.id !== id);
      value = { deleted: true, id };
    } else {
      let item;
      if (action === 'save') item = cleanItem(args.item);
      else {
        if (!Number.isSafeInteger(args.target_version) || args.target_version < 1) fail('VALIDATION', 'target_version 必须为正整数');
        const target = state.snapshots.find(note => note.id === id && note.version === args.target_version);
        if (!target) fail('NOT_FOUND', '目标历史版本不存在');
        item = cleanItem({ title: target.title, content: target.content, tags: target.tags, pinned: target.pinned, archived: target.archived });
      }
      if (!previous && state.notes.length >= LIMITS.notes) fail('CAPACITY', '每个空间最多 500 篇笔记');
      if (state.snapshots.length >= LIMITS.snapshots) fail('CAPACITY', '每个空间最多 10000 个完整版本快照；不会自动删除历史');
      const timestamp = new Date(now()).toISOString();
      const saved = { ...item, id: previous?.id || randomUUID(), version: (previous?.version || 0) + 1, created_at: previous?.created_at || timestamp, updated_at: timestamp };
      if (previous) state.notes[state.notes.indexOf(previous)] = saved;
      else state.notes.push(saved);
      state.snapshots.push(clone(saved));
      value = { item: saved };
    }
    state.receipts.push({ key: args.request_id, fingerprint, value: clone(value) });
    if (Buffer.byteLength(JSON.stringify(state), 'utf8') > LIMITS.bytes) fail('CAPACITY', '每个空间总容量上限 32 MiB（包含正文、完整历史版本及持久化收据）；拒绝写入，不淘汰收据');
    await table.put('current', state);
    return clone(value);
  }
  return {
    call(scope, action, args = {}) {
      // Snapshot caller input now, before waiting on queued operations.
      let input;
      try { input = clone(args); } catch { return Promise.resolve({ ok: false, error: { code: 'VALIDATION', message: '参数必须为可序列化数据' } }); }
      const result = queue.then(() => run(scope, action, input)).then(value => ({ ok: true, value }), error => ({ ok: false, error: { code: error.notesCode || 'STORAGE_ERROR', message: error.notesCode ? error.message : '存储失败，请使用相同 request_id 和参数重试' } }));
      queue = result.then(() => undefined);
      return result;
    },
    async idle() { await queue; },
  };
}
