import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { createPlansCore, LIMITS } from '../core.mjs';
import { toolDefinition } from '../tools.mjs';
import { createUiHandler } from '../ui-api.mjs';

function fixture() {
  const data = { personal: new Map(), work: new Map() };
  const stores = Object.fromEntries(Object.entries(data).map(([scope, map]) => [scope, { get: key => structuredClone(map.get(key)), put: async (key, value) => map.set(key, structuredClone(value)) }]));
  let date = '2026-11-19T04:00:00Z', key = 0;
  const make = () => createPlansCore({ stores, now: () => new Date(date) });
  const core = make();
  return { core, stores, data, make, setNow: value => { date = value; }, write: (action, args = {}, scope = 'personal') => core.call(scope, action, { ...args, request_id: args.request_id || `key-${++key}` }) };
}
const item = (extra = {}) => ({ title: '阅读计划', description: '描述', content: '# 计划正文', start_date: '2026-11-01', end_date: null, frequency: 'daily', weekdays: [], status: 'active', ...extra });
async function created(f, extra) { const result = await f.write('save', { item: item(extra) }); assert.equal(result.ok, true, JSON.stringify(result)); return result.value.item; }
function editable(plan, extra = {}) { const { id, title, description, content, start_date, end_date, frequency, weekdays, status } = plan; return { id, title, description, content, start_date, end_date, frequency, weekdays, status, ...extra }; }

test('scope isolation, tools fixed scope, same route/core, reopen persistent state', async () => {
  const f = fixture(), p = await created(f);
  assert.equal((await f.core.call('work', 'summary')).value.plans.length, 0);
  assert.equal((await toolDefinition(f.core, 'personal').execute({ action: 'summary' })).value.plans[0].id, p.id);
  assert.equal((await toolDefinition(f.core, 'work').execute({ action: 'summary' })).value.plans.length, 0);
  const response = await http(f.core, 'personal/summary', {});
  assert.deepEqual(response.body, await f.core.call('personal', 'summary'));
  assert.deepEqual(await f.make().call('personal', 'summary'), await f.core.call('personal', 'summary'));
});
test('durable idempotency replay, conflict across actions, mandatory bounded request key', async () => {
  const f = fixture(), args = { item: item(), request_id: 'stable' };
  const a = await f.core.call('personal', 'save', args);
  assert.deepEqual(await f.make().call('personal', 'save', args), a);
  assert.equal((await f.core.call('personal', 'save', { ...args, item: item({ title: '其他' }) })).error.code, 'IDEMPOTENCY_CONFLICT');
  assert.equal((await f.core.call('personal', 'delete', { id: a.value.item.id, version: 1, request_id: 'stable' })).error.code, 'IDEMPOTENCY_CONFLICT');
  assert.equal((await f.core.call('personal', 'save', { item: item() })).error.code, 'REQUEST_ID_REQUIRED');
  assert.equal((await f.core.call('personal', 'save', { ...args, request_id: 'x'.repeat(129) })).error.code, 'REQUEST_ID_REQUIRED');
});
test('optimistic versions serialize checkins and undo with durable replay', async () => {
  const f = fixture(), p = await created(f);
  const args = { id: p.id, date: '2026-11-19', status: 'done', version: 1 };
  const [a, b] = await Promise.all([f.write('checkin', args), f.write('checkin', { ...args, status: 'skipped' })]);
  assert.equal(a.value.plan.version, 2); assert.equal(b.error.code, 'VERSION_CONFLICT');
  const undo = { id: p.id, date: args.date, version: 2, request_id: 'undo' };
  const result = await f.write('undo_checkin', undo);
  assert.equal(result.value.plan.version, 3); assert.equal(result.value.deleted, true);
  assert.deepEqual(await f.make().call('personal', 'undo_checkin', undo), result);
  assert.equal((await f.write('delete', { id: p.id, version: 2 })).error.code, 'VERSION_CONFLICT');
});
test('pause/resume historical intervals and completed reopen preserve original semantics', async () => {
  const f = fixture(); let p = await created(f);
  p = (await f.write('save', { item: editable(p, { status: 'paused' }), version: p.version })).value.item;
  assert.equal((await f.write('checkin', { id: p.id, date: '2026-11-19', status: 'done', version: p.version })).error.code, 'NOT_SCHEDULED');
  f.setNow('2026-11-22T04:00:00Z');
  p = (await f.write('save', { item: editable(p, { status: 'active' }), version: p.version })).value.item;
  let cal = (await f.core.call('personal', 'calendar', { year: 2026, month: 11 })).value;
  assert.deepEqual(cal.days['2026-11-19'].scheduled, []);
  assert.deepEqual(cal.days['2026-11-21'].scheduled, []);
  assert.deepEqual(cal.days['2026-11-22'].scheduled, [p.id]);
  p = (await f.write('save', { item: editable(p, { status: 'completed' }), version: p.version })).value.item;
  f.setNow('2026-11-25T04:00:00Z');
  p = (await f.write('save', { item: editable(p, { status: 'active' }), version: p.version })).value.item;
  cal = (await f.core.call('personal', 'calendar', { year: 2026, month: 11 })).value;
  assert.deepEqual(cal.days['2026-11-22'].scheduled, [p.id]);
  assert.deepEqual(cal.days['2026-11-23'].scheduled, []);
  assert.deepEqual(cal.days['2026-11-24'].scheduled, []);
  assert.deepEqual(cal.days['2026-11-25'].scheduled, [p.id]);
});
test('checkin freezes cycle/date fields, edits allowed, cascade deletes checkins', async () => {
  const f = fixture(); let p = await created(f);
  p = (await f.write('checkin', { id: p.id, date: '2026-11-19', status: 'done', version: p.version })).value.plan;
  for (const extra of [{ start_date: '2026-11-02' }, { end_date: '2026-12-01' }, { frequency: 'weekly', weekdays: [1] }]) {
    assert.equal((await f.write('save', { item: editable(p, extra), version: p.version })).error.code, 'CYCLE_FROZEN');
  }
  p = (await f.write('save', { item: editable(p, { content: '新内容' }), version: p.version })).value.item;
  assert.equal((await f.write('delete', { id: p.id, version: p.version })).value.deleted, true);
  const state = f.data.personal.get('current'); assert.equal(state.plans.length, 0); assert.equal(state.checkins.length, 0); assert.equal(state.receipts.length, 4);
});
test('backfill inclusive 365 day boundary, no future or nonexecution day; invalid years bounded', async () => {
  const f = fixture(); let p = await created(f, { start_date: '2025-01-01' });
  const check = async date => f.write('checkin', { id: p.id, date, status: 'done', version: p.version });
  p = (await check('2025-11-19')).value.plan;
  assert.equal((await check('2025-11-18')).error.code, 'VALIDATION');
  assert.equal((await check('2026-11-20')).error.code, 'VALIDATION');
  const w = await created(f, { frequency: 'weekly', weekdays: [0], start_date: '2026-11-01' });
  assert.equal((await f.write('checkin', { id: w.id, date: '2026-11-19', status: 'done', version: 1 })).error.code, 'NOT_SCHEDULED');
  for (const year of [0, 1900, 1999, 2100, 1e9, 2026.5]) assert.equal((await f.core.call('personal', 'calendar', { year, month: 1 })).error.code, 'VALIDATION');
  assert.equal((await f.write('save', { item: item({ start_date: '2026-02-30' }) })).error.code, 'VALIDATION');
});
test('timezone today, cumulative streak/rate stats, skip resets scheduled streak', async () => {
  const f = fixture(); f.setNow('2026-11-18T17:00:00Z'); let p = await created(f, { start_date: '2026-11-16' });
  for (const [date, status] of [['2026-11-16', 'done'], ['2026-11-17', 'skipped'], ['2026-11-18', 'done'], ['2026-11-19', 'done']]) p = (await f.write('checkin', { id: p.id, date, status, version: p.version })).value.plan;
  const summary = (await f.core.call('personal', 'summary')).value;
  assert.equal(summary.today, '2026-11-19'); assert.equal(summary.timezone, 'Asia/Shanghai');
  assert.deepEqual(summary.stats[p.id], { scheduled_count: 4, done_count: 3, skipped_count: 1, completion_rate: 75, current_streak: 2, longest_streak: 2, today_status: 'done' });
});
test('storage failure publishes neither mutation nor receipt and retry succeeds', async () => {
  const f = fixture(), original = f.stores.personal.put;
  f.stores.personal.put = async () => { throw new Error('disk full'); };
  const args = { item: item(), request_id: 'retry' };
  assert.equal((await f.core.call('personal', 'save', args)).error.code, 'STORAGE_ERROR');
  assert.equal(f.data.personal.size, 0);
  f.stores.personal.put = original;
  assert.equal((await f.core.call('personal', 'save', args)).ok, true);
  assert.equal((await f.core.call('personal', 'summary')).value.plans.length, 1);
});
test('capacity never evicts receipts; reject reminders/projects/unknown arguments', async () => {
  const f = fixture();
  for (const extra of [{ reminder_enabled: true }, { project_id: 'project' }, { start_date: '1900-01-01' }]) assert.equal((await f.write('save', { item: item(extra) })).error.code, 'VALIDATION');
  f.data.personal.set('current', { plans: [], checkins: [], receipts: Array.from({ length: LIMITS.receipts }, (_, n) => ({ key: `receipt${n}`, fingerprint: 'x', value: {} })) });
  assert.equal((await f.write('save', { item: item() })).error.code, 'CAPACITY');
  assert.equal(f.data.personal.get('current').receipts.length, LIMITS.receipts);
});

async function http(core, path, body, options = {}) {
  const browserPeer = {}, connection = { browserPeer, admit: () => options.denied ? { rejection: 401 } : { peer: options.apiPeer ? {} : browserPeer } };
  const req = Readable.from([Buffer.from(typeof body === 'string' ? body : JSON.stringify(body))]);
  Object.assign(req, { method: options.method || 'POST', url: `/api/split-plans/${path}`, headers: { 'content-type': 'application/json', 'x-dsh-plans-ui': '1', ...options.headers } });
  const response = {};
  await createUiHandler({ core, connection })(req, { writeHead(status, headers) { response.status = status; response.headers = headers; }, end(text) { response.body = JSON.parse(text); } });
  return response;
}
test('disk-backed table reopen preserves plans, checkins, versions and receipts', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'dsh-plans-test-'));
  const file = join(directory, 'state.json');
  async function reopen() {
    let current;
    try { current = JSON.parse(await readFile(file, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    const table = { get: () => structuredClone(current), put: async (_key, value) => { await writeFile(file, JSON.stringify(value)); current = structuredClone(value); } };
    return createPlansCore({ stores: { personal: table }, now: () => new Date('2026-11-19T04:00:00Z') });
  }
  try {
    const a = await reopen();
    const p = (await a.call('personal', 'save', { item: item(), request_id: 'disk-create' })).value.item;
    const args = { id: p.id, date: '2026-11-19', status: 'done', version: p.version, request_id: 'disk-check' };
    const checked = await a.call('personal', 'checkin', args);
    const b = await reopen();
    assert.deepEqual(await b.call('personal', 'summary'), await a.call('personal', 'summary'));
    assert.deepEqual(await b.call('personal', 'checkin', args), checked);
    assert.equal((await b.call('personal', 'delete', { id: p.id, version: 1, request_id: 'stale' })).error.code, 'VERSION_CONFLICT');
  } finally {
    const absolute = resolve(directory);
    assert.equal(absolute.startsWith(resolve(tmpdir()) + '/dsh-plans-test-'), true);
    await rm(absolute, { recursive: true });
  }
});

test('HTTP browser-only auth, CSRF header, JSON, action allowlist, size bound', async () => {
  const f = fixture();
  assert.equal((await http(f.core, 'personal/summary', {}, { denied: true })).status, 401);
  assert.equal((await http(f.core, 'personal/summary', {}, { apiPeer: true })).status, 403);
  assert.equal((await http(f.core, 'personal/summary', {}, { headers: { 'x-dsh-plans-ui': undefined } })).status, 403);
  assert.equal((await http(f.core, 'personal/summary', {}, { method: 'GET' })).status, 403);
  assert.equal((await http(f.core, 'personal/summary', {}, { headers: { 'content-type': 'application/json-bogus' } })).status, 403);
  assert.equal((await http(f.core, 'personal/tick', {})).status, 404);
  assert.equal((await http(f.core, 'personal/summary', '{bad')).status, 400);
  assert.equal((await http(f.core, 'personal/summary', ' '.repeat(262145))).status, 413);
  const result = await http(f.core, 'work/save', { item: item(), request_id: 'ui-create' });
  assert.equal(result.status, 200);
  assert.equal((await toolDefinition(f.core, 'work').execute({ action: 'summary' })).value.plans[0].id, result.body.value.item.id);
  assert.equal((await f.core.call('personal', 'summary')).value.plans.length, 0);
});
