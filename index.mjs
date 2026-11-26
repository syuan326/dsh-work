import { dsh } from './modules/mail/runtime.mjs';
import { apply as mail } from './modules/mail/index.mjs';
import { apply as planner } from './modules/planner/index.mjs';
import { apply as plans } from './modules/plans/index.mjs';
import { apply as notes } from './modules/notes/index.mjs';
import { apply as ledger } from './modules/ledger/index.js';
import { registerMailTools, Config as MailConfig } from './modules/mail/tools.mjs';

const { default: Schema } = await dsh('@deepseek-ai/schemastery');
export const name = 'personal-workspace';
export const inject = ['storageDomain', 'credentials', 'llm', 'agentDefaultModel', 'connection', 'webServer', 'configEditor', 'agentPresets', 'tools'];
export const Config = Schema.object({
  timezone: Schema.string().default('Asia/Shanghai'),
  personalMail: MailConfig.default({}),
  workMail: MailConfig.default({}),
});

export async function apply(ctx, config) {
  config = Config(config ?? {});
  // Validate before opening any existing domain. No data migration is needed:
  // all original storage names, record versions, routes and service keys remain.
  new Intl.DateTimeFormat('en', { timeZone: config.timezone });
  await mail(ctx, config);
  await planner(ctx);
  await plans(ctx, { timezone: config.timezone });
  await notes(ctx);
  await ledger(ctx);
  registerMailTools(ctx, config.personalMail, 'personal');
  registerMailTools(ctx, config.workMail, 'work');
}
