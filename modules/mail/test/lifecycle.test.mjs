import assert from 'node:assert/strict';
import test from 'node:test';
import { apply } from '../index.mjs';

function deferred() {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
}
function fixture() {
  const cleanup = [], domains = [];
  const entered = deferred(), release = deferred();
  const peer = {};
  let service, route, writesAfterClose = 0;
  const ctx = {
    effect(setup) { const dispose = setup(); if (typeof dispose === 'function') cleanup.push(dispose); },
    provide(_name, value) { service = value; return () => {}; },
    storageDomain: { async open(spec) {
      const tables = new Map();
      const domain = {
        closed: false, global: { get: () => structuredClone(spec.global.initial), set: async () => {} },
        table(name) {
          if (!tables.has(name)) {
            const rows = new Map();
            tables.set(name, {
              get: key => rows.get(key), entries: () => rows.entries(),
              async put(key, value) {
                if (domain.closed) { writesAfterClose++; throw new Error('Domain already closed'); }
                rows.set(key, structuredClone(value));
              },
              async delete(key) { rows.delete(key); },
            });
          }
          return tables.get(name);
        },
        async close() { domain.closed = true; },
      };
      domains.push(domain); return domain;
    } },
    credentials: {
      async readRecord() { return undefined; },
      async modifyRecord() { entered.resolve(); await release.promise; },
      async deleteRecord() {},
    },
    connection: { browserPeer: peer, admit: () => ({ peer }) },
    webServer: { register(value) { route = value; return () => {}; } },
    configEditor: { configuration: () => [] }, agentPresets: { list: async () => [] },
    llm: {}, agentDefaultModel: {},
  };
  return {
    ctx, domains, entered, release,
    get service() { return service; }, get route() { return route; },
    get writesAfterClose() { return writesAfterClose; },
    async dispose() { for (const dispose of [...cleanup].reverse()) await dispose(); },
  };
}
const args = {
  account: { name: 'Test fixture', username: 'fixture@example.com', imap_host: 'imap.example.com', smtp_host: 'smtp.example.com', enabled: false },
  secret: 'TEST_ONLY_NOT_A_CREDENTIAL',
};
for (const path of ['service', 'http']) {
  test(`unload drains in-flight ${path} account persistence before domain close (no network)`, async () => {
    const f = fixture(); await apply(f.ctx);
    let body;
    const operation = path === 'service'
      ? f.service.call('personal', 'account_save', args, { source: 'ui' })
      : f.route.handler({
        method: 'POST', url: '/api/split-mail/personal/account_save',
        headers: { 'x-dsh-mail-ui': '1', 'content-type': 'application/json' },
        async *[Symbol.asyncIterator]() { yield Buffer.from(JSON.stringify(args)); },
      }, { writeHead() {}, end(value) { body = JSON.parse(value); } });
    await f.entered.promise;
    const shutdown = f.dispose();
    await new Promise(resolve => setImmediate(resolve));
    const closedWhilePending = f.domains.some(domain => domain.closed);
    f.release.resolve();
    const result = await operation;
    await shutdown;
    assert.equal(closedWhilePending, false, 'storage domain must remain open until all core calls settle');
    assert.equal(f.writesAfterClose, 0, 'cancellation does not prevent core cleanup writes');
    assert.notEqual((path === 'service' ? result : body)?.ok, false);
    assert.ok(f.domains.every(domain => domain.closed));
  });
}
