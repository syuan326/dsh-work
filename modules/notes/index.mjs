import z from 'zod';
import { createNotesCore, SCOPES } from './core.mjs';
import { createUiHandler } from './ui-api.mjs';
import { toolDefinition } from './tools.mjs';

export const name = 'split-notes';
export const inject = ['storageDomain', 'connection', 'webServer'];
export const Config = z.object({}).strict().default({});
const noteSchema = z.object({ id: z.string(), version: z.number().int().positive(), title: z.string(), content: z.string(), tags: z.array(z.string()), pinned: z.boolean(), archived: z.boolean(), created_at: z.string(), updated_at: z.string() });
const stateSchema = z.object({ notes: z.array(noteSchema), snapshots: z.array(noteSchema), receipts: z.array(z.object({ key: z.string(), fingerprint: z.string(), value: z.unknown() })) });

export async function apply(ctx, config = {}) {
  Config.parse(config);
  const domains = [], stores = {};
  let core;
  ctx.effect(() => async () => { await core?.idle(); await Promise.all(domains.map(domain => domain.close())); });
  for (const scope of SCOPES) {
    const domain = await ctx.storageDomain.open({ name: `split_notes_${scope}`, version: 1, layout: 'single', tables: { state: { valueSchema: stateSchema } } });
    domains.push(domain);
    stores[scope] = domain.table('state');
  }
  core = createNotesCore({ stores });
  ctx.effect(() => ctx.provide('splitNotes', core));
  ctx.effect(() => ctx.webServer.register({ kind: 'prefix', path: '/api/split-notes', handler: createUiHandler({ connection: ctx.connection, core }) }));
  ctx.inject(['tools'], scoped => {
    for (const scope of SCOPES) scoped.effect(() => scoped.tools.register(toolDefinition(core, scope)));
  });
}
