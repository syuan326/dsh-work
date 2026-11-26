import z from 'zod';
import { createPlannerCore } from './core.mjs';
import { createUiHandler } from './ui-api.mjs';
import { toolDefinition } from './tools.mjs';

export const name = 'split-planner';
export const inject = ['storageDomain', 'connection', 'webServer'];

export async function apply(ctx) {
  const domains = [];
  const stores = {};
  let core;
  ctx.effect(() => async () => { await core?.close(); await Promise.all(domains.map(domain => domain.close())); });
  for (const scope of ['work', 'personal']) {
    const domain = await ctx.storageDomain.open({
      name: `split_planner_${scope}`, version: 1, layout: 'per-record',
      tables: Object.fromEntries(['events', 'tasks'].map(kind => [kind, {
        valueSchema: z.object({ id: z.string(), version: z.number().int().positive(), title: z.string() }).passthrough(),
      }])),
    });
    domains.push(domain);
    stores[scope] = { events: domain.table('events'), tasks: domain.table('tasks') };
  }
  core = createPlannerCore({ stores });
  ctx.effect(() => ctx.provide('splitPlanner', core));
  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix', path: '/api/split-planner',
    handler: createUiHandler({ connection: ctx.connection, core }),
  }));
  ctx.inject(['tools'], scoped => {
    for (const scope of ['work', 'personal']) {
      scoped.effect(() => scoped.tools.register(toolDefinition(core, scope)));
    }
  });
}
