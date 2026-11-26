import { registerMailTools, Config } from './tools.mjs';
export { Config };
export const name = 'work-mail-tools';
export const inject = ['tools', 'splitMail', 'agentPresets'];
export function apply(ctx, config) { registerMailTools(ctx, config, 'work'); }
