import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { apply, Config } from '../index.mjs';
import { createToolAccess } from '../modules/mail/tool-access.mjs';

function fixture(config = Config({})) {
  const cleanup = [], domains = [], tools = new Map(), routes = new Map();
  const entry = { options: { id: 'personal-workspace' } };
  let saved = structuredClone(config), edits = 0;
  const ctx = {
    fiber: { entry },
    effect(setup) { const dispose = setup(); if (typeof dispose === 'function') cleanup.push(dispose); return dispose; },
    provide(name, value) { ctx[name] = value; return () => { delete ctx[name]; }; },
    inject(_names, callback) { callback(ctx); },
    tools: { register(definition, options) { assert.ok(!tools.has(definition.name)); tools.set(definition.name, { definition, options }); return () => tools.delete(definition.name); } },
    webServer: { register(route) { assert.ok(!routes.has(route.path)); routes.set(route.path, route); return () => routes.delete(route.path); } },
    storageDomain: { async open(spec) {
      assert.ok(!domains.some(domain => domain.name === spec.name));
      let global = structuredClone(spec.global?.initial);
      const tables = new Map();
      const domain = { name: spec.name, closed: false,
        global: { get: () => structuredClone(global), async set(value) { global = structuredClone(value); } },
        table(name) { if (!tables.has(name)) { const rows = new Map(); tables.set(name, { get: key => structuredClone(rows.get(key)), entries: () => rows.entries(), keys: () => rows.keys(), get size() { return rows.size; }, async put(key, value) { spec.tables[name].valueSchema.parse(value); rows.set(key, structuredClone(value)); }, async delete(key) { return rows.delete(key); } }); } return tables.get(name); },
        async close() { domain.closed = true; },
      }; domains.push(domain); return domain;
    } },
    credentials: {}, llm: {}, agentDefaultModel: {}, connection: {},
    agentPresets: { async list() { return [{ id: 'standard', name: 'Standard' }, { id: 'cordis' }]; }, composedPreset(agentCtx) { return agentCtx.preset; } },
    configEditor: {
      configuration() { return [{ entry, inherited: config, override: saved }]; },
      async edit(target, mutate) { assert.equal(target, entry); saved = Config(mutate(saved)); edits++; },
    },
  };
  return { ctx, domains, tools, routes, get saved() { return saved; }, get edits() { return edits; }, async dispose() { for (const dispose of cleanup.reverse()) await dispose(); } };
}

test('one Host entry opens every original domain and registers all 33 narrow tools', async () => {
  const f = fixture(); await apply(f.ctx, Config({}));
  assert.equal(f.domains.length, 9);
  assert.equal(f.tools.size, 33);
  assert.equal(f.routes.size, 5);
  assert.ok(f.domains.some(d => d.name === 'personal_ledger'));
  for (const scope of ['personal', 'work']) for (const kind of ['mail', 'planner', 'plans', 'notes']) assert.ok(f.domains.some(d => d.name === `split_${kind}_${scope}`));
  assert.equal(f.tools.get('personal_mail_read').options.when({ agent: { ctx: { preset: 'standard' } } }), false);
  assert.ok(f.ctx.splitMail && f.ctx.splitPlanner && f.ctx.splitPlans && f.ctx.splitNotes && f.ctx.personalLedger);
  await f.dispose(); assert.ok(f.domains.every(d => d.closed));
});

test('one atomic config edit preserves independent action subsets and timezone', async () => {
  const config = Config({ personalMail: { presets: [], enabledTools: ['read'] }, workMail: { presets: [], enabledTools: ['list'] }, timezone: 'UTC' });
  const f = fixture(config), access = createToolAccess(f.ctx, config);
  const result = await access.saveToolAccess({ personal: ['standard', 'standard'], work: ['cordis'] });
  assert.equal(result.ok, true); assert.equal(f.edits, 1);
  assert.deepEqual(f.saved.personalMail, { presets: ['standard'], enabledTools: ['read'] });
  assert.deepEqual(f.saved.workMail, { presets: ['cordis'], enabledTools: ['list'] });
  assert.equal(f.saved.timezone, 'UTC');
  assert.deepEqual((await access.toolAccess()).personal, ['standard']);
  assert.equal((await access.saveToolAccess({ personal: ['unknown'], work: [] })).ok, false);
  assert.equal(f.edits, 1);
});

test('invalid timezone fails before opening storage and Client artifact has one identity', async () => {
  const f = fixture(); await assert.rejects(() => apply(f.ctx, { timezone: 'Not/AZone' })); assert.equal(f.domains.length, 0);
  const client = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
  assert.equal(client.match(/window\.__ModuleLoader__\.load\(/g)?.length, 1);
  assert.ok(client.includes("id: '@local/dsh-personal-workspace'"));
  assert.ok(!client.includes("require('@deepseek-ai/dsh-client"));
  const patch = fs.readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8');
  assert.match(client, /const modes = create_modes\(require\)/);
  assert.match(client, /ctx\.inject\(modes\.inject,/);
  assert.deepEqual([...patch.matchAll(/^    - id: (.+)$/gm)].map(match => match[1]), [
    'personal-workspace', 'preset-work-mode', 'preset-personal-mode',
  ]);
  assert.match(patch, /personalMail:\n          presets: \[personal-mode\]/);
  assert.match(patch, /workMail:\n          presets: \[work-mode\]/);
  assert.equal(patch.match(/@local\/dsh-personal-workspace\/mask/g)?.length, 2);
  assert.doesNotMatch(patch, /@local\/dsh-workspace-agent-modes/);
});

test('combined Client registers the existing views and mounts the picker with its own services', () => {
  const artifacts = [], registrations = [], pending = [];
  const client = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
  vm.runInNewContext(client, { window: { __ModuleLoader__: { load: entry => artifacts.push(entry) } } });
  assert.deepEqual(artifacts.map(entry => entry.id), ['@local/dsh-personal-workspace']);
  const plugin = artifacts[0].factory(name => { assert.equal(name, 'react'); return {}; });
  const ctx = {
    effect: setup => setup(),
    locale: { register: () => () => {}, bind: () => key => key },
    slots: {
      inject: (_name, setup) => { setup(); return () => {}; },
      register: meta => { registrations.push(meta); return () => {}; },
    },
    inject: (names, setup) => pending.push({ names, setup }),
  };
  plugin.apply(ctx);
  assert.ok(registrations.some(meta => meta.id === 'personal-ledger'));
  assert.ok(registrations.some(meta => meta.id === 'split-mail' && meta.name === 'settings.section'));
  assert.ok(registrations.some(meta => meta.id === 'work-notes'));
  assert.ok(!registrations.some(meta => meta.id === 'workspace-mode-picker'));
  assert.equal(pending.length, 1);
  assert.deepEqual([...pending[0].names], ['slots', 'locale', 'remote.agentPresets', 'sessions', 'conversation']);
  pending[0].setup({ ...ctx, conversation: { blocks: {} } });
  assert.equal(registrations.filter(meta => meta.id === 'workspace-mode-picker' && meta.name === 'conversation.input.dock').length, 1);
});
