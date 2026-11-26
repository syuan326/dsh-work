export const name = 'workspace-mode-tool-mask';
export const inject = ['tools'];

const personalLedger = new Set([
  'ledger_options', 'ledger_query', 'ledger_summary', 'ledger_planning', 'create_ledger_entry',
]);

function belongsTo(name, space) {
  return name === `notes_${space}` || name === `planner_${space}` || name === `plans_${space}`
    || name.startsWith(`${space}_mail_`);
}

export function apply(ctx, { space }) {
  if (space !== 'work' && space !== 'personal') throw new Error('Expected work or personal space');
  const other = space === 'work' ? 'personal' : 'work';
  const masked = new Set();
  const sync = () => {
    // Preset and Host activation can settle in either order. Only mask registered
    // names; keep each mask after unregistration so hot reloading cannot reopen it.
    const deny = ctx.tools.definitions().map(tool => tool.name).filter(name =>
      !masked.has(name) && (belongsTo(name, other) || (space === 'work' && personalLedger.has(name))));
    if (deny.length === 0) return;
    // Restrict emits tools/change synchronously, so mark names before registering.
    for (const name of deny) masked.add(name);
    try {
      ctx.effect(() => ctx.tools.restrict({ deny }));
    } catch (error) {
      for (const name of deny) masked.delete(name);
      throw error;
    }
  };
  ctx.on('tools/change', sync);
  sync();
}
