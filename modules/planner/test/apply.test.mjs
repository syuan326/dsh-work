import test from 'node:test';
import assert from 'node:assert/strict';

function table() {
  const map = new Map();
  return {
    get: key => structuredClone(map.get(key)),
    entries: () => [...map.entries()].map(([k, v]) => [k, structuredClone(v)]),
    keys: () => [...map.keys()],
    get size() { return map.size; },
    put: async (key, value) => { map.set(key, structuredClone(value)); },
    delete: async key => map.delete(key),
    deleteMany: async keys => { let n = 0; for (const k of keys) if (map.delete(k)) n += 1; return n; },
    update: async (key, fn) => { const next = fn(structuredClone(map.get(key))); map.set(key, structuredClone(next)); return next; },
  };
}

function fakeCtx() {
  const state = { domains: [], provided: {}, routes: [], tools: [] };
  const ctx = {
    effect(fn) { const dispose = fn(); return () => dispose?.(); },
    provide(name, service) { state.provided[name] = service; return () => {}; },
    inject(_deps, fn) { fn(ctx); },
    tools: { register(definition) { state.tools.push(definition); return () => {}; } },
    connection: { admit: () => ({ peer: 'browser' }), browserPeer: 'browser' },
    webServer: { register(route) { state.routes.push(route); return () => {}; } },
    storageDomain: {
      async open(spec) {
        const domain = {
          name: spec.name,
          global: { get: () => ({}), set: async () => {} },
          table: () => table(),
          close: async () => {},
        };
        state.domains.push(domain);
        return domain;
      },
    },
  };
  return { ctx, state };
}

test('apply wires storage, HTTP route and tools', async () => {
  const { apply } = await import('../index.mjs');
  const { ctx, state } = fakeCtx();
  await apply(ctx);
  assert.deepEqual(state.domains.map(d => d.name).sort(), ['split_planner_personal', 'split_planner_work']);
  const core = state.provided.splitPlanner;
  assert.equal(typeof core.call, 'function');
  assert.equal(state.routes[0].path, '/api/split-planner');
  assert.deepEqual(state.tools.map(t => t.name).sort(), ['planner_personal', 'planner_work']);

  const saved = await core.call('work', 'save', { kind: 'tasks', item: { title: '发布' } });
  assert.equal(saved.ok, true);
  assert.equal((await core.call('personal', 'list', { kind: 'tasks' })).value.total, 0);

  const route = state.routes[0].handler;
  const response = { status: 0, body: '', writeHead(status) { this.status = status; }, end(body) { this.body = body; } };
  const request = (async function* () {
    yield Buffer.from(JSON.stringify({ kind: 'tasks' }));
  })();
  request.method = 'POST';
  request.headers = { 'x-dsh-planner-ui': '1', 'content-type': 'application/json' };
  request.url = '/api/split-planner/work/list';
  await route(request, response);
  assert.equal(response.status, 200);
  assert.equal(JSON.parse(response.body).value.total, 1);
});
