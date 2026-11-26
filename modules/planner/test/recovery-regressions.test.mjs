import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createPlannerCore } from '../core.mjs';
import { createPlansCore } from '../../plans/core.mjs';

function table() {
  const rows = new Map();
  return { get: key => structuredClone(rows.get(key)), entries: () => rows.entries(),
    put: async (key, value) => rows.set(key, structuredClone(value)), delete: async key => rows.delete(key) };
}
function stores() { return Object.fromEntries(['personal', 'work'].map(s => [s, { events: table(), tasks: table() }])); }

test('planner snapshots queued arguments and close drains admitted work then refuses new calls', async () => {
  const data = stores(); let release, entered;
  const started = new Promise(resolve => { entered = resolve; });
  const gate = new Promise(resolve => { release = resolve; });
  const original = data.personal.tasks.put;
  data.personal.tasks.put = async (...args) => { entered(); await gate; return original(...args); };
  const core = createPlannerCore({ stores: data });
  const args = { kind: 'tasks', item: { title: 'original' } };
  const write = core.call('personal', 'save', args);
  args.item.title = 'mutated after admission';
  await started;
  let closed = false;
  const close = core.close().then(() => { closed = true; });
  assert.equal((await core.call('personal', 'list', { kind: 'tasks' })).error.code, 'CLOSING');
  await Promise.resolve(); assert.equal(closed, false);
  release();
  assert.equal((await write).value.item.title, 'original');
  await close; assert.equal(closed, true);
});

test('plans snapshots caller arguments before queue admission', async () => {
  const data = { personal: table(), work: table() };
  const core = createPlansCore({ stores: data, now: () => new Date('2026-11-19T12:00:00+08:00') });
  const args = { request_id: 'stable-write', item: { title: 'original', start_date: '2026-11-19' } };
  const operation = core.call('personal', 'save', args);
  args.item.title = 'mutated'; args.request_id = 'changed';
  const result = await operation;
  assert.equal(result.ok, true);
  assert.equal(result.value.item.title, 'original');
  assert.equal(data.personal.get('current').receipts[0].key, 'stable-write');
  assert.equal((await core.call('personal', 'save', { item: () => {} })).error.code, 'VALIDATION');
});

test('planner disposer waits for active persistence before closing either storage domain', async () => {
  const { apply } = await import('../index.mjs');
  const disposers = [], domains = [], services = {};
  let release, entered;
  const started = new Promise(resolve => { entered = resolve; });
  const gate = new Promise(resolve => { release = resolve; });
  const ctx = {
    effect(fn) { const dispose = fn(); if (typeof dispose === 'function') disposers.push(dispose); },
    provide(name, value) { services[name] = value; return () => {}; },
    inject(_keys, fn) { fn(ctx); }, tools: { register: () => () => {} },
    connection: {}, webServer: { register: () => () => {} },
    storageDomain: { async open() {
      const tasks = table(), events = table(), put = tasks.put;
      tasks.put = async (...args) => { entered(); await gate; return put(...args); };
      const domain = { closed: false, table: name => name === 'tasks' ? tasks : events, async close() { this.closed = true; } };
      domains.push(domain); return domain;
    } },
  };
  await apply(ctx);
  const write = services.splitPlanner.call('personal', 'save', { kind: 'tasks', item: { title: 'durable' } });
  await started;
  const disposal = (async () => { for (const dispose of disposers.reverse()) await dispose(); })();
  await Promise.resolve();
  assert.ok(domains.every(domain => !domain.closed));
  release(); assert.equal((await write).ok, true);
  await disposal; assert.ok(domains.every(domain => domain.closed));
});

test('planner client source preserves non-editable link metadata and guards unsaved editor', async () => {
  // Static artifact contract only, not a browser rendering test.
  const source = await readFile(new URL('../client.js', import.meta.url), 'utf8');
  for (const field of ['source_type', 'source_id', 'related_ids', 'project_id']) assert.match(source, new RegExp(field + ':.*item\\?\\.' + field));
  assert.match(source, /disabled: busy \|\| !!editor \|\| !canEdit\(item\)/);
  assert.match(source, /dirty \? setDiscarding\(true\) : onCancel\(\)/);
  assert.match(source, /removeEventListener\('beforeunload', leave\)/);
  assert.doesNotMatch(source, /--dsw-alias-state-danger-primary/);
  assert.match(source, /--dsw-alias-state-error-primary/);
});
