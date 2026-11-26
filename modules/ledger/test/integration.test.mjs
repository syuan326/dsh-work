import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { createToolDefinitions, toCents } from '../tools.mjs';
import { createUiHandler } from '../ui-api.mjs';
import { createLedgerCore, createInitialState } from '../core.mjs';

const peer = { id: 'browser' };
async function request(handler, payload, override = {}) {
  const req = Readable.from([Buffer.from(JSON.stringify(payload))]);
  req.method = 'POST';
  req.headers = { 'content-type': 'application/json', 'x-dsh-ledger-ui': '1' };
  Object.assign(req, override);
  let status, value;
  const res = { writeHead(code) { status = code; }, end(body) { value = JSON.parse(body); } };
  await handler(req, res);
  return { status, value };
}
const connection = { browserPeer: peer, admit: () => ({ peer }) };

test('amount conversion accepts ordinary decimals and rejects ambiguous/unsafe inputs', () => {
  for (const [raw, expected] of [['36.50',3650], ['100',10000], ['0.01',1], ['0002.1',210]]) assert.equal(toCents(raw), expected);
  for (const raw of ['0','-2','1.001','1e2','Infinity','NaN','1,000','9007199254740991',36.5]) assert.throws(() => toCents(raw));
});

test('only five narrow tools are exposed and both paths call the same operation', async () => {
  const calls = [];
  const call = async (action, args) => { calls.push({ action, args }); return { action, args }; };
  const tools = createToolDefinitions(call);
  assert.deepEqual(tools.map(t => t.name), ['ledger_options','ledger_query','ledger_summary','ledger_planning','create_ledger_entry']);
  const args = { type: 'expense', category: '餐饮', amount: '36.50', description: '午餐', idempotency_key: 'lunch-1' };
  const result = await tools[4].execute(args, { signal: new AbortController().signal });
  assert.equal(result.args.amount_cents, 3650);
  assert.equal(result.args.idempotency_key, 'lunch-1');
  const handler = createUiHandler({ connection, call });
  const response = await request(handler, { action: 'create', args: { ...result.args } });
  assert.equal(response.status, 200);
  assert.deepEqual(calls[0], calls[1]);
  await assert.rejects(tools[4].execute({ ...args, action: 'delete' }), /未知/);
  await assert.rejects(tools[4].execute({ ...args, amount: '0.001' }), /金额/);
  await assert.rejects(tools[1].execute({ limit: 1000 }), /100/);
  await assert.rejects(tools[4].execute({ type: 'expense' }), /缺少/);
});

test('HTTP rejects unauthenticated/API-peer/CSRF requests without invoking core', async () => {
  let invoked = false;
  const call = () => { invoked = true; };
  const payload = { action: 'delete', args: {} };
  let handler = createUiHandler({ connection: { ...connection, admit: () => ({ rejection: 401 }) }, call });
  assert.equal((await request(handler, payload)).status, 401);
  handler = createUiHandler({ connection: { ...connection, admit: () => ({ peer: { id: 'api' } }) }, call });
  assert.equal((await request(handler, payload)).status, 403);
  handler = createUiHandler({ connection, call });
  assert.equal((await request(handler, payload, { headers: { 'content-type': 'application/json' } })).status, 403);
  assert.equal((await request(handler, payload, { method: 'GET' })).status, 403);
  assert.equal((await request(handler, { action: 'unknown' })).status, 400);
  assert.equal(invoked, false);
});

test('LLM writes persist across reopening and UI reads exactly the same ledger', async () => {
  let durable = createInitialState();
  const store = { get: () => structuredClone(durable), set: async value => { durable = structuredClone(value); } };
  const now = () => new Date('2026-11-19T04:00:00Z');
  const first = createLedgerCore({ store, now });
  const tools = createToolDefinitions((action, args) => first.call(action, args));
  const write = tools.find(t => t.name === 'create_ledger_entry');
  const args = { type: 'expense', category: '餐饮', amount: '36.50', description: '午餐', idempotency_key: 'user-lunch-1' };
  const created = await write.execute(args);
  assert.equal(created.amount_cents, 3650);
  assert.equal(created.date, '2026-11-19');
  assert.equal((await write.execute(args)).id, created.id);
  const reopened = createLedgerCore({ store, now });
  const handler = createUiHandler({ connection, call: (action, data) => reopened.call(action, data) });
  const queried = await request(handler, { action: 'query', args: { start: '2026-11-01', end: '2026-11-30' } });
  assert.equal(queried.value.value.total, 1);
  assert.equal(queried.value.value.items[0].id, created.id);
  const summarized = await request(handler, { action: 'summary', args: {} });
  assert.equal(summarized.value.value.expense_cents, 3650);
  await assert.rejects(write.execute({ ...args, category: '不存在', idempotency_key: 'bad-class' }), /分类/);
  const uiFailure = await request(handler, { action: 'create', args: { type: 'expense', category: '不存在', amount_cents: 3650, idempotency_key: 'bad-class-ui' } });
  assert.equal(uiFailure.value.ok, false);
  assert.match(uiFailure.value.error.message, /分类/);
  assert.equal((await reopened.call('query')).total, 1);
});

test('HTTP failures remain explicit and version conflicts return 409', async () => {
  const handler = createUiHandler({ connection, call: () => { throw Object.assign(new Error('版本已变化'), { code: 'CONFLICT' }); } });
  const response = await request(handler, { action: 'save', args: {} });
  assert.equal(response.status, 409);
  assert.equal(response.value.ok, false);
  assert.equal(response.value.error.message, '版本已变化');
});
