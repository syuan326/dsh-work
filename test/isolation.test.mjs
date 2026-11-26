// Run in a DSH shell: node --test test/isolation.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as mask from '../modules/modes/mask.mjs';
import { dsh } from '../modules/mail/runtime.mjs';
import { presetAllowed } from '../modules/mail/tool-gate.mjs';

const [{ Context }, { createScope }, { ToolsService }, { SystemPrompt }] = await Promise.all(
  ['cordis', 'dsh-scope', 'dsh-tools', 'dsh-system-prompt'].map(name => dsh('@deepseek-ai/' + name)),
);

test('workspace scopes filter both schema admission and execution lookup', async () => {
  const host = new Context();
  await host.plugin(SystemPrompt);
  await host.plugin(ToolsService);
  assert.ok(host.tools);
  const scopes = new Map();
  try {
    const register = (name, when) => host.tools.register({
      name, description: name, parameters: { type: 'object' },
      output: { schema: { type: 'object' }, render: () => [] }, execute: async () => ({}),
    }, when ? { when } : {});
    const ledger = ['ledger_options', 'ledger_query', 'ledger_summary', 'ledger_planning', 'create_ledger_entry'];
    for (const name of ['notes_work', 'notes_personal', 'unrelated', ...ledger]) register(name);
    for (const space of ['work', 'personal']) {
      const key = {};
      const scope = createScope(host, key);
      scopes.set(space, { key, scope });
      await scope.ctx.plugin(mask, { space });
    }
    const lookup = { agentPresets: { composedPreset: ctx => ctx.mode } };
    for (const space of scopes.keys()) {
      register(`planner_${space}`)();
      register(`planner_${space}`);
      register(`plans_${space}`);
      register(`${space}_mail_list`, ({ agent }) => presetAllowed(lookup, [`${space}-mode`], agent));
    }
    const unit = s => [`notes_${s}`, `planner_${s}`, `plans_${s}`, `${s}_mail_list`];
    for (const [space, { key }] of scopes) {
      const agent = { ctx: { mode: `${space}-mode` } };
      const child = createScope(host, agent, { parent: key });
      try {
        const set = await host.tools.resolve({ agent, signal: new AbortController().signal, modelSelection: {} });
        try {
          const expected = [...unit(space), 'unrelated', ...(space === 'personal' ? ledger : [])];
          assert.deepEqual(host.tools.schemas(agent, set).map(x => x.name).sort(), expected.sort());
          const denied = [...unit(space === 'work' ? 'personal' : 'work'), ...(space === 'work' ? ledger : [])];
          for (const name of denied) assert.equal(host.tools.executable(name, agent, set), undefined, name);
        } finally { set.dispose(); }
      } finally { await child.dispose(); }
    }
    assert.ok(host.tools.get('notes_work') && host.tools.get('notes_personal'));
  } finally {
    for (const { scope } of [...scopes.values()].reverse()) await scope.dispose();
  }
});
