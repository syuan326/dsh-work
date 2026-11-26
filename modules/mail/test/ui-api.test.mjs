import test from 'node:test';
import assert from 'node:assert/strict';
import { createUiHandler, createConfirmations } from '../ui-api.mjs';

function request(url, { headers = {}, body = '{}' } = {}) {
  return {
    method: 'POST',
    url,
    headers: { 'content-type': 'application/json', 'x-dsh-mail-ui': '1', ...headers },
    async *[Symbol.asyncIterator]() { yield Buffer.from(body) },
  };
}
function response() {
  return {
    code: 0,
    body: '',
    writeHead(code) { this.code = code },
    end(text) { this.body = text },
  };
}
async function call(handler, req) {
  const res = response();
  await handler(req, res);
  return { code: res.code, body: JSON.parse(res.body || '{}') };
}
function setup({ peerOk = true } = {}) {
  const peer = { id: 'peer-owner' };
  const calls = [];
  const handler = createUiHandler({
    connection: { browserPeer: peer, admit: () => (peerOk ? { peer } : { rejection: 401 }) },
    core: { call: async (scope, action, args, context) => { calls.push({ scope, action, args, context }); return { handled: true } } },
    confirmations: createConfirmations(),
    signal: new AbortController().signal,
    toolAccess: async () => ({ presets: [] }),
    models: async () => ({ default: { provider: 'ai', model: 'deepseek-flash' }, providers: [] }),
    saveToolAccess: async () => ({ ok: true, value: { saved: true } }),
  });
  return { handler, calls };
}

test('handler routes the client path shape to the requested space and action', async () => {
  const { handler, calls } = setup();
  const result = await call(handler, request('/api/split-mail/personal/accounts'));
  assert.equal(result.code, 200);
  assert.deepEqual(calls.map(entry => [entry.scope, entry.action]), [['personal', 'accounts']]);
  assert.equal(result.body.ok, true);
  const work = await call(handler, request('/api/split-mail/work/list'));
  assert.equal(work.code, 200);
  assert.equal(calls.at(-1).scope, 'work');
});

test('handler rejects unauthenticated requests', async () => {
  const { handler } = setup({ peerOk: false });
  assert.equal((await call(handler, request('/api/split-mail/personal/accounts'))).code, 401);
});

test('handler rejects non-page and unknown requests', async () => {
  const { handler, calls } = setup();
  assert.equal((await call(handler, request('/api/split-mail/personal/accounts', { headers: { 'x-dsh-mail-ui': '0' } }))).code, 403);
  assert.equal((await call(handler, request('/api/split-mail/personal/nope'))).code, 404);
  assert.equal(calls.length, 0);
});

test('handler bounds the request body and validates JSON', async () => {
  const { handler } = setup();
  const huge = await call(handler, request('/api/split-mail/personal/draft', { body: 'x'.repeat(1100000) }));
  assert.equal(huge.code, 413);
  const bad = await call(handler, request('/api/split-mail/personal/draft', { body: '[]' }));
  assert.equal(bad.code, 400);
});

test('tool access is read and saved only through the page route', async () => {
  const { handler } = setup();
  const read = await call(handler, request('/api/split-mail/personal/tool_access'));
  assert.equal(read.code, 200);
  assert.deepEqual(read.body.value, { presets: [] });
  const saved = await call(handler, request('/api/split-mail/personal/tool_access_save', { body: JSON.stringify({ personal: ['standard'], work: [] }) }));
  assert.equal(saved.code, 200);
  assert.deepEqual(saved.body.value, { saved: true });
});

test('model directory is served to the page only', async () => {
  const { handler } = setup();
  const result = await call(handler, request('/api/split-mail/personal/models'));
  assert.equal(result.code, 200);
  assert.equal(result.body.value.default.provider, 'ai');
});
