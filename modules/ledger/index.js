import z from 'zod';
import { createLedgerCore, createInitialState, validateState } from './core.mjs';
import { createToolDefinitions } from './tools.mjs';
import { createUiHandler } from './ui-api.mjs';

export const name = 'personal-ledger';
export const inject = ['storageDomain', 'tools', 'connection', 'webServer'];

export async function apply(ctx) {
  const schema = z.custom(value => {
    try { validateState(value); return true; } catch { return false; }
  }, { message: '个人账本数据损坏或版本不兼容；不会用空账本覆盖，请保留原数据并恢复备份。' });
  const domain = await ctx.storageDomain.open({
    name: 'personal_ledger', version: 1, layout: 'single', tables: {},
    global: { schema, initial: createInitialState() },
  });
  let closing = false;
  const pending = new Set();
  ctx.effect(() => async () => {
    closing = true;
    await Promise.allSettled([...pending]);
    await domain.close();
  });
  const core = createLedgerCore({ store: domain.global });
  function call(action, args = {}) {
    if (closing) return Promise.reject(new Error('账本服务正在关闭，请稍后重试'));
    const operation = Promise.resolve().then(() => core.call(action, args));
    pending.add(operation);
    operation.then(() => pending.delete(operation), () => pending.delete(operation));
    return operation;
  }
  // A single application operation is shared by the human page and narrow LLM tools.
  ctx.effect(() => ctx.provide('personalLedger', { call }));
  for (const definition of createToolDefinitions(call)) ctx.effect(() => ctx.tools.register(definition));
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact', path: '/api/personal-ledger',
    handler: createUiHandler({ connection: ctx.connection, call }),
  }));
}
