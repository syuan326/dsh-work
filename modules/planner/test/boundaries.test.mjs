import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlannerCore } from '../core.mjs';
import { toolDefinition } from '../tools.mjs';
import { createUiHandler } from '../ui-api.mjs';

function setup() {
  const table = () => {
    const rows = new Map();
    return { get: k => structuredClone(rows.get(k)), entries: () => rows.entries(), put: async (k, v) => rows.set(k, structuredClone(v)), delete: async k => rows.delete(k) };
  };
  return createPlannerCore({ stores: Object.fromEntries(['personal', 'work'].map(scope => [scope, { events: table(), tasks: table() }])) });
}
async function request(handler, scope, action, args, headers = {}) {
  const req = (async function* () { yield Buffer.from(JSON.stringify(args)); })();
  Object.assign(req, { method: 'POST', url: `/api/split-planner/${scope}/${action}`, headers: { 'content-type': 'application/json', 'x-dsh-planner-ui': '1', ...headers } });
  const res = { status: 0, body: null, writeHead(status) { this.status = status; }, end(body) { this.body = JSON.parse(body); } };
  await handler(req, res);
  return res;
}

test('non-repeating events preserve exact instants including milliseconds and DST fold', async () => {
  const core = setup();
  for (const [start, end, timezone] of [
    ['2030-01-01T09:00:00.123+08:00', '2030-01-01T09:00:00.456+08:00', 'Asia/Shanghai'],
    ['2030-11-03T01:30:00-05:00', '2030-11-03T01:45:00-05:00', 'America/New_York'],
  ]) {
    const saved = await core.call('work', 'save', { kind: 'events', item: { title: 'exact', start, end, timezone } });
    assert.equal(saved.ok, true);
    const result = await core.call('work', 'calendar', { from: new Date(Date.parse(start) - 1).toISOString(), to: new Date(Date.parse(end) + 1).toISOString() });
    assert.equal(result.value.occurrences.length, 1);
    assert.equal(result.value.occurrences[0].occurrence_start, new Date(start).toISOString());
    assert.equal(result.value.occurrences[0].occurrence_end, new Date(end).toISOString());
  }
});

test('parent deletion cannot leave children pointing to an absent task', async () => {
  const core = setup();
  const parent = (await core.call('personal', 'save', { kind: 'tasks', item: { title: 'parent' } })).value.item;
  const child = (await core.call('personal', 'save', { kind: 'tasks', item: { title: 'child', parent_id: parent.id } })).value.item;
  const blocked = await core.call('personal', 'delete', { kind: 'tasks', id: parent.id, version: 1 });
  assert.equal(blocked.ok, false);
  assert.equal(blocked.error.code, 'HAS_CHILDREN');
  assert.equal((await core.call('personal', 'list', { kind: 'tasks' })).value.total, 2);
  await core.call('personal', 'save', { kind: 'tasks', version: 1, item: { ...child, parent_id: null } });
  assert.equal((await core.call('personal', 'delete', { kind: 'tasks', id: parent.id, version: 1 })).ok, true);
});

test('UI and separate tools share operations without allowing scope overrides', async () => {
  const core = setup();
  const handler = createUiHandler({ core, connection: { admit: () => ({ peer: 'owner' }), browserPeer: 'owner' } });
  const personal = toolDefinition(core, 'personal');
  const work = toolDefinition(core, 'work');
  const saved = await personal.execute({ action: 'save', kind: 'tasks', scope: 'work', item: { title: 'personal test' } });
  const item = saved.value.item;
  const listed = await request(handler, 'personal', 'list', { kind: 'tasks' });
  assert.equal(listed.status, 200);
  assert.deepEqual(listed.body, await personal.execute({ action: 'list', kind: 'tasks' }));
  assert.equal((await work.execute({ action: 'list', kind: 'tasks' })).value.total, 0);
  for (const action of ['status', 'delete']) {
    const args = { kind: 'tasks', id: item.id, version: 1, status: 'done' };
    const ui = await request(handler, 'work', action, args);
    assert.equal(ui.status, 400);
    assert.deepEqual(ui.body, await work.execute({ action, ...args }));
    assert.equal(ui.body.error.code, 'NOT_FOUND');
  }
  const args = { kind: 'tasks', id: item.id, version: 1, status: 'done' };
  assert.equal((await request(handler, 'personal', 'status', args)).body.value.item.status, 'done');
  assert.equal((await personal.execute({ action: 'status', ...args })).error.code, 'CONFLICT');
});

test('HTTP API rejects unauthenticated, non-owner and malformed requests', async () => {
  const core = setup();
  for (const admission of [{ rejection: 401 }, { peer: 'api-peer' }]) {
    const handler = createUiHandler({ core, connection: { admit: () => admission, browserPeer: 'owner' } });
    const res = await request(handler, 'personal', 'list', { kind: 'tasks' });
    assert.equal(res.status, admission.rejection || 403);
  }
  const handler = createUiHandler({ core, connection: { admit: () => ({ peer: 'owner' }), browserPeer: 'owner' } });
  assert.equal((await request(handler, 'personal', 'save', { kind: 'tasks', item: { title: 'not saved' } }, { 'x-dsh-planner-ui': '' })).status, 403);
  assert.equal((await request(handler, 'other', 'list', { kind: 'tasks' })).status, 404);
  assert.equal((await request(handler, 'personal', 'list', [])).status, 400);
  assert.equal((await core.call('personal', 'list', { kind: 'tasks' })).value.total, 0);
});
