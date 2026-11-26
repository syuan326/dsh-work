import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { createNotesCore, LIMITS } from '../core.mjs';
import { toolDefinition } from '../tools.mjs';
import { createUiHandler, MAX_BODY_BYTES } from '../ui-api.mjs';

function setup() {
  const stores = Object.fromEntries(['personal', 'work'].map(scope => {
    const records = new Map();
    return [scope, { get: key => records.get(key), async put(key, value) { records.set(key, structuredClone(value)); } }];
  }));
  let tick = 0;
  const make = () => createNotesCore({ stores, now: () => new Date(Date.UTC(2026, 0, 1, 0, 0, tick++)) });
  return { stores, core: make(), make };
}
const item = overrides => ({ title: '标题', content: '# Markdown\n**正文**', tags: ['学习'], pinned: false, archived: false, ...overrides });
async function create(core, overrides = {}, key = 'create') {
  const result = await core.call('personal', 'save', { item: item(overrides), request_id: key });
  assert.equal(result.ok, true, JSON.stringify(result));
  return result.value.item;
}
function code(result, expected) { assert.deepEqual(Object.keys(result).sort(), ['error', 'ok']); assert.equal(result.ok, false); assert.equal(result.error.code, expected); assert.equal(typeof result.error.message, 'string'); }

test('CRUD, independent spaces, summary contract and defensive copies', async () => {
  const { core } = setup();
  const note = await create(core);
  assert.equal(note.version, 1);
  const listed = (await core.call('personal', 'list')).value.notes;
  assert.deepEqual(Object.keys(listed[0]).sort(), ['id', 'version', 'title', 'tags', 'pinned', 'archived', 'created_at', 'updated_at', 'excerpt'].sort());
  assert.equal(listed[0].excerpt, '# Markdown **正文**');
  assert.deepEqual((await core.call('work', 'list')).value, { notes: [] });
  code(await core.call('work', 'get', { id: note.id }), 'NOT_FOUND');
  const read = await core.call('personal', 'get', { id: note.id });
  assert.deepEqual(read.value, note);
  read.value.tags.push('taint');
  assert.deepEqual((await core.call('personal', 'get', { id: note.id })).value.tags, ['学习']);
  const deleted = await core.call('personal', 'delete', { id: note.id, version: 1, request_id: 'delete' });
  assert.deepEqual(deleted.value, { deleted: true, id: note.id });
  code(await core.call('personal', 'get', { id: note.id }), 'NOT_FOUND');
  code(await core.call('personal', 'versions', { id: note.id }), 'NOT_FOUND');
});

test('full text and tag search, pinned order, archived filtering', async () => {
  const { core } = setup();
  const first = await create(core, { title: 'Alpha', content: 'Needle 中文' });
  const second = await create(core, { title: 'Pinned', pinned: true, tags: ['Exact'] }, 'second');
  await create(core, { archived: true, content: 'Needle' }, 'third');
  const list = async args => (await core.call('personal', 'list', args)).value.notes;
  assert.deepEqual((await list({})).map(n => n.id), [second.id, first.id]);
  assert.equal((await list({ query: 'nEEdLE' }))[0].id, first.id);
  assert.equal((await list({ query: '中文' })).length, 1);
  assert.equal((await list({ tag: 'Exact' }))[0].id, second.id);
  assert.equal((await list({ tag: 'exact' })).length, 0);
  assert.equal((await list({ query: 'exact' })).length, 1);
  assert.equal((await list({ archived: true })).length, 1);
  assert.equal((await list({ archived: 'all' })).length, 3);
  assert.equal((await list({ pinned: false })).length, 1);
});

test('immutable complete snapshots and restore appends new version', async () => {
  const { core } = setup();
  const original = await create(core);
  const updated = await core.call('personal', 'save', { item: item({ id: original.id, title: '修改', content: 'new', pinned: true, archived: true }), version: 1, request_id: 'update' });
  assert.equal(updated.value.item.version, 2);
  const restored = await core.call('personal', 'restore', { id: original.id, version: 2, target_version: 1, request_id: 'restore' });
  assert.equal(restored.ok, true);
  assert.equal(restored.value.item.version, 3);
  assert.equal(restored.value.item.content, original.content);
  assert.equal(restored.value.item.created_at, original.created_at);
  assert.equal(restored.value.item.archived, false);
  assert.notEqual(restored.value.item.updated_at, original.updated_at);
  const history = (await core.call('personal', 'versions', { id: original.id })).value.versions;
  assert.deepEqual(history.map(n => n.version), [3, 2, 1]);
  assert.deepEqual(history[2], original);
  assert.equal(history[1].content, 'new');
  code(await core.call('personal', 'restore', { id: original.id, version: 3, target_version: 999, request_id: 'bad-target' }), 'NOT_FOUND');
});

test('optimistic locking serializes races and preserves state on conflicts', async () => {
  const { core } = setup();
  const note = await create(core);
  const results = await Promise.all(['a', 'b'].map(key => core.call('personal', 'save', { item: item({ id: note.id, title: key }), version: 1, request_id: key })));
  assert.equal(results.filter(r => r.ok).length, 1);
  code(results.find(r => !r.ok), 'VERSION_CONFLICT');
  for (const action of ['save', 'delete', 'restore']) {
    const args = action === 'save' ? { item: item({ id: note.id }) } : { id: note.id, ...(action === 'restore' ? { target_version: 1 } : {}) };
    code(await core.call('personal', action, { ...args, version: 1, request_id: action }), 'VERSION_CONFLICT');
  }
});

test('durable idempotency survives restart, reordered keys, update and deletion', async () => {
  const { core, make } = setup();
  const note = await create(core);
  const args = { item: item({ id: note.id, title: 'saved' }), version: 1, request_id: 'u' };
  const result = await core.call('personal', 'save', args);
  const restarted = make();
  assert.deepEqual(await restarted.call('personal', 'save', { request_id: 'u', version: 1, item: args.item }), result);
  code(await restarted.call('personal', 'save', { ...args, item: { ...args.item, content: 'different' } }), 'IDEMPOTENCY_CONFLICT');
  const deletion = { id: note.id, version: 2, request_id: 'd' };
  const deleted = await restarted.call('personal', 'delete', deletion);
  assert.deepEqual(await make().call('personal', 'delete', deletion), deleted);
  assert.deepEqual((await make().call('personal', 'save', { item: item(), request_id: 'create' })).value.item, note);
  assert.equal((await make().call('personal', 'list')).value.notes.length, 0);
  // Same request key in work is independent.
  assert.equal((await make().call('work', 'save', { item: item(), request_id: 'create' })).ok, true);
});

test('validation, full item requirements and content length boundary', async () => {
  const { core } = setup();
  for (const bad of [{ title: '' }, { content: 'x'.repeat(LIMITS.content + 1) }, { tags: [''] }, { tags: Array(21).fill('a') }, { tags: ['a'.repeat(41)] }, { pinned: 1 }, { archived: null }, { extra: true }, { title: 'x'.repeat(201) }]) code(await core.call('personal', 'save', { item: item(bad), request_id: 'bad' }), 'VALIDATION');
  code(await core.call('personal', 'save', { item: { title: 'missing fields' }, request_id: 'missing' }), 'VALIDATION');
  code(await core.call('personal', 'save', { item: item() }), 'REQUEST_ID_REQUIRED');
  code(await core.call('personal', 'save', { item: item(), request_id: 'bad key' }), 'REQUEST_ID_REQUIRED');
  code(await core.call('personal', 'save', { item: item(), version: 1, request_id: 'new-version' }), 'VALIDATION');
  code(await core.call('personal', 'list', { unknown: true }), 'VALIDATION');
  code(await core.call('other', 'list'), 'VALIDATION');
  code(await core.call('personal', 'invalid'), 'VALIDATION');
  code(await core.call('personal', 'list', { archived: 'false' }), 'VALIDATION');
  const note = await create(core, { content: '中'.repeat(100000), tags: [' a ', 'a'] });
  assert.equal(note.content.length, 100000);
  assert.deepEqual(note.tags, ['a']);
});

test('explicit capacities reject atomically, receipts never evicted and replay works at cap', async () => {
  const { core, stores } = setup();
  const note = await create(core);
  const state = structuredClone(stores.personal.get('current'));
  state.receipts = Array.from({ length: LIMITS.receipts - 1 }, (_, n) => ({ key: `filler-${n}`, fingerprint: 'x', value: {} })).concat(state.receipts);
  await stores.personal.put('current', state);
  code(await core.call('personal', 'delete', { id: note.id, version: 1, request_id: 'full' }), 'CAPACITY');
  assert.equal(stores.personal.get('current').receipts.length, LIMITS.receipts);
  assert.deepEqual((await core.call('personal', 'save', { item: item(), request_id: 'create' })).value.item, note);
  for (const field of ['notes', 'snapshots']) {
    const capacityState = { notes: [note], snapshots: [note], receipts: [] };
    capacityState[field] = Array(LIMITS[field]).fill(note);
    await stores.personal.put('current', capacityState);
    code(await core.call('personal', 'save', { item: item(), request_id: field }), 'CAPACITY');
    assert.deepEqual(stores.personal.get('current'), capacityState);
  }
  const bytesState = { notes: [note], snapshots: [note], receipts: [{ key: 'huge', fingerprint: 'x', value: 'x'.repeat(LIMITS.bytes) }] };
  await stores.personal.put('current', bytesState);
  code(await core.call('personal', 'delete', { id: note.id, version: 1, request_id: 'bytes' }), 'CAPACITY');
  assert.equal(stores.personal.get('current').notes.length, 1);
});

test('failed durability leaves no mutation or receipt and can retry', async () => {
  const { core, stores } = setup();
  const originalPut = stores.personal.put;
  stores.personal.put = async () => { throw Object.assign(new Error('sensitive backend path'), { code: 'LEAK' }); };
  const args = { item: item(), request_id: 'retry' };
  const result = await core.call('personal', 'save', args);
  code(result, 'STORAGE_ERROR');
  assert.equal(JSON.stringify(result).includes('sensitive'), false);
  assert.equal(stores.personal.get('current'), undefined);
  stores.personal.put = originalPut;
  assert.equal((await core.call('personal', 'save', args)).ok, true);
});

test('tool scopes and transport share identical core logic', async () => {
  const { core } = setup();
  const personal = toolDefinition(core, 'personal'), work = toolDefinition(core, 'work');
  assert.equal(personal.name, 'notes_personal');
  assert.equal(work.name, 'notes_work');
  const saved = await personal.execute({ action: 'save', item: item(), request_id: 'tool' });
  assert.equal(saved.ok, true);
  assert.deepEqual(await personal.execute({ action: 'get', id: saved.value.item.id }), await core.call('personal', 'get', { id: saved.value.item.id }));
  assert.deepEqual((await work.execute({ action: 'list' })).value.notes, []);
  assert.equal(personal.isConcurrencySafe({ action: 'restore' }), false);
  assert.equal(personal.isConcurrencySafe({ action: 'versions' }), true);
  assert.match(personal.description, /untrusted DATA/);
  assert.match(personal.description, /explicit user intent/);
});

async function ui({ body = '{}', headers = {}, method = 'POST', url = '/api/split-notes/personal/list', admission } = {}, core) {
  const peer = {};
  const connection = { browserPeer: peer, admit: () => admission ?? { peer } };
  const req = Readable.from([Buffer.from(body)]);
  Object.assign(req, { headers: { 'content-type': 'application/json', 'x-dsh-notes-ui': '1', ...headers }, method, url });
  const output = {};
  const res = { writeHead(status, responseHeaders) { output.status = status; output.headers = responseHeaders; }, end(value) { output.body = JSON.parse(value); } };
  await createUiHandler({ connection, core })(req, res);
  return output;
}

test('UI authentication and CSRF fence, JSON/object validation, routing and body cap', async () => {
  const { core } = setup();
  assert.equal((await ui({}, core)).status, 200);
  assert.equal((await ui({ admission: { rejection: 401 } }, core)).status, 401);
  assert.equal((await ui({ admission: { peer: {} } }, core)).status, 403);
  assert.equal((await ui({ headers: { 'x-dsh-notes-ui': undefined } }, core)).status, 403);
  assert.equal((await ui({ method: 'GET' }, core)).status, 403);
  assert.equal((await ui({ headers: { 'content-type': 'text/plain' } }, core)).status, 403);
  assert.equal((await ui({ url: '/api/split-notes/work/unknown' }, core)).status, 404);
  assert.equal((await ui({ body: '[]' }, core)).status, 400);
  assert.equal((await ui({ body: '{bad' }, core)).status, 400);
  assert.equal((await ui({ body: ' '.repeat(MAX_BODY_BYTES + 1) }, core)).status, 413);
  assert.equal((await ui({ headers: { 'content-length': String(MAX_BODY_BYTES + 1) } }, core)).status, 413);
  const body = JSON.stringify({ item: item({ content: '\u0001'.repeat(100000) }), request_id: 'large-ui' });
  assert.ok(Buffer.byteLength(body) > 600000);
  const response = await ui({ url: '/api/split-notes/personal/save', body }, core);
  assert.equal(response.status, 200);
  assert.equal(response.body.value.item.content.length, 100000);
  assert.equal(response.headers['Cache-Control'], 'no-store');
});
