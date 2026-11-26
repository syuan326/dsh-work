import test from 'node:test';
import assert from 'node:assert/strict';
import { setImmediate as nextTurn } from 'node:timers/promises';
import { apply, Config, inject, name } from '../index.mjs';

function hostFixture(persisted = new Map(), options = {}) {
  const disposers = [], services = new Map(), routes = new Map(), tools = new Map(), domains = [];
  let openCount = 0;
  const ctx = {
    storageDomain: {
      async open(spec) {
        openCount++;
        if (options.failOpen === openCount) throw new Error('open failed');
        assert.equal(spec.version, 1);
        assert.equal(spec.layout, 'single');
        assert.deepEqual(Object.keys(spec.tables), ['state']);
        if (!persisted.has(spec.name)) persisted.set(spec.name, new Map());
        const disk = persisted.get(spec.name);
        const loaded = new Map([...disk].map(([key, value]) => [key, spec.tables.state.valueSchema.parse(structuredClone(value))]));
        const domain = {
          name: spec.name, closed: false,
          table(tableName) {
            assert.equal(tableName, 'state');
            return {
              get(key) { assert.equal(domain.closed, false, 'read after close'); return structuredClone(loaded.get(key)); },
              async put(key, value) {
                assert.equal(key, 'current');
                assert.equal(domain.closed, false, 'write after close');
                const clean = spec.tables.state.valueSchema.parse(structuredClone(value));
                await options.beforePut?.(spec.name);
                disk.set(key, structuredClone(clean));
                loaded.set(key, structuredClone(clean));
              },
            };
          },
          async close() { assert.equal(domain.closed, false, 'double close'); domain.closed = true; },
        };
        domains.push(domain);
        return domain;
      },
    },
    connection: { browserPeer: {} },
    webServer: {
      register(route) {
        assert.equal(routes.has(route.path), false);
        routes.set(route.path, route);
        return () => { assert.equal(routes.delete(route.path), true); };
      },
    },
    tools: {
      register(tool) {
        assert.equal(tools.has(tool.name), false);
        tools.set(tool.name, tool);
        return () => { assert.equal(tools.delete(tool.name), true); };
      },
    },
    effect(factory) { const disposer = factory(); if (typeof disposer === 'function') disposers.push(disposer); },
    provide(key, value) { services.set(key, value); return () => { services.delete(key); }; },
    inject(keys, callback) { assert.deepEqual(keys, ['tools']); callback(ctx); },
  };
  return { ctx, persisted, domains, routes, tools, services, async dispose() { while (disposers.length) await disposers.pop()(); } };
}
const plan = { title: '持久计划书', content: '# 正文', start_date: '2026-01-01', end_date: null, frequency: 'daily', weekdays: [], status: 'active' };

test('Config validates timezone and backend declares exact dependencies', () => {
  assert.equal(name, 'split-plans');
  assert.deepEqual(inject, ['storageDomain', 'connection', 'webServer']);
  assert.equal(Config.parse({}).timezone, 'Asia/Shanghai');
  assert.equal(Config.parse({ timezone: 'UTC' }).timezone, 'UTC');
  assert.throws(() => Config.parse({ timezone: 'invalid/not-a-zone' }));
});

test('apply opens isolated domains, registers shared core/tools/route, disposes all resources', async () => {
  const host = hostFixture();
  await apply(host.ctx, { timezone: 'UTC' });
  assert.deepEqual(host.domains.map(d => d.name).sort(), ['split_plans_personal', 'split_plans_work']);
  assert.deepEqual([...host.tools.keys()].sort(), ['plans_personal', 'plans_work']);
  const route = host.routes.get('/api/split-plans');
  assert.equal(route.kind, 'prefix'); assert.equal(typeof route.handler, 'function');
  const core = host.services.get('splitPlans');
  const result = await host.tools.get('plans_personal').execute({ action: 'save', item: plan, request_id: 'lifecycle-create' });
  assert.equal(result.ok, true, JSON.stringify(result));
  assert.equal((await core.call('personal', 'summary')).value.plans[0].id, result.value.item.id);
  assert.equal((await host.tools.get('plans_work').execute({ action: 'summary' })).value.plans.length, 0);
  assert.equal((await core.call('personal', 'summary')).value.timezone, 'UTC');
  await host.dispose();
  assert.equal(host.services.size, 0); assert.equal(host.routes.size, 0); assert.equal(host.tools.size, 0);
  assert.equal(host.domains.every(d => d.closed), true);
});

test('plugin remount revalidates persistent state and replays receipts', async () => {
  const first = hostFixture(); await apply(first.ctx);
  const args = { action: 'save', item: plan, request_id: 'persistent-plugin-create' };
  const saved = await first.tools.get('plans_work').execute(args);
  assert.equal(saved.ok, true);
  await first.dispose();
  const second = hostFixture(first.persisted); await apply(second.ctx);
  const replay = await second.tools.get('plans_work').execute(args);
  assert.deepEqual(replay, saved);
  assert.equal((await second.services.get('splitPlans').call('work', 'summary')).value.plans.length, 1);
  assert.equal((await second.services.get('splitPlans').call('personal', 'summary')).value.plans.length, 0);
  await second.dispose();
});

test('partial activation failure still closes already-open domain', async () => {
  const host = hostFixture(new Map(), { failOpen: 2 });
  await assert.rejects(() => apply(host.ctx), /open failed/);
  assert.equal(host.domains.length, 1);
  await host.dispose();
  assert.equal(host.domains[0].closed, true);
  assert.equal(host.routes.size, 0); assert.equal(host.tools.size, 0);
});

test('invalid Config fails before opening domains', async () => {
  const host = hostFixture();
  await assert.rejects(() => apply(host.ctx, { timezone: 'bad/zone' }));
  assert.equal(host.domains.length, 0);
  await host.dispose();
});

test('disposer drains in-flight atomic put before closing domains', async () => {
  let release, entered = false;
  const gate = new Promise(resolve => { release = resolve; });
  const host = hostFixture(new Map(), { beforePut: async () => { entered = true; await gate; } });
  await apply(host.ctx);
  const pending = host.services.get('splitPlans').call('personal', 'save', { item: plan, request_id: 'inflight' });
  await nextTurn(); assert.equal(entered, true);
  const disposal = host.dispose();
  await nextTurn(); assert.equal(host.domains.every(d => !d.closed), true);
  release(); assert.equal((await pending).ok, true);
  await disposal;
  assert.equal(host.domains.every(d => d.closed), true);
  assert.equal(host.persisted.get('split_plans_personal').get('current').receipts.length, 1);
});
