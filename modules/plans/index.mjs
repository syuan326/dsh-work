import z from 'zod';
import { createPlansCore, SCOPES } from './core.mjs';
import { createUiHandler } from './ui-api.mjs';
import { toolDefinition } from './tools.mjs';

export const name = 'split-plans';
export const inject = ['storageDomain', 'connection', 'webServer'];
export const Config = z.object({ timezone: z.string().default('Asia/Shanghai').refine(value => { try { new Intl.DateTimeFormat('en', { timeZone: value }); return true; } catch { return false; } }, '必须为有效 IANA 时区') }).default({});

const planSchema = z.object({ id: z.string(), version: z.number().int().positive(), title: z.string(), description: z.string(), content: z.string(), start_date: z.string(), end_date: z.string().nullable(), frequency: z.enum(['daily', 'weekly']), weekdays: z.array(z.number().int().min(0).max(6)), status: z.enum(['active', 'paused', 'completed']), created_at: z.string(), updated_at: z.string(), _paused_at: z.string().optional(), _completed_at: z.string().optional(), _paused_ranges: z.array(z.object({ start: z.string(), end: z.string() })).optional() });
const stateSchema = z.object({ plans: z.array(planSchema), checkins: z.array(z.object({ plan_id: z.string(), date: z.string(), status: z.enum(['done', 'skipped']), note: z.string(), version: z.number().int().positive() })), receipts: z.array(z.object({ key: z.string(), fingerprint: z.string(), value: z.unknown() })) });

export async function apply(ctx, config = {}) {
  const { timezone } = Config.parse(config);
  const domains = [], stores = {};
  let core;
  ctx.effect(() => async () => { await core?.idle(); await Promise.all(domains.map(domain => domain.close())); });
  for (const scope of SCOPES) {
    const domain = await ctx.storageDomain.open({ name: `split_plans_${scope}`, version: 1, layout: 'single', tables: { state: { valueSchema: stateSchema } } });
    domains.push(domain);
    stores[scope] = domain.table('state');
  }
  core = createPlansCore({ stores, timezone });
  ctx.effect(() => ctx.provide('splitPlans', core));
  ctx.effect(() => ctx.webServer.register({ kind: 'prefix', path: '/api/split-plans', handler: createUiHandler({ connection: ctx.connection, core }) }));
  ctx.inject(['tools'], scoped => {
    for (const scope of SCOPES) scoped.effect(() => scoped.tools.register(toolDefinition(core, scope)));
  });
}
