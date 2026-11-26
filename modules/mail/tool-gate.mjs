/**
 * Decide whether an Agent's preset is allowed by one tool row's configuration.
 * Kept free of host imports so the rule can be unit tested.
 */
export function presetAllowed(ctx, presets, agent) {
  if (!Array.isArray(presets) || presets.length === 0 || !agent?.ctx) return false;
  try {
    const id = ctx.agentPresets.composedPreset(agent.ctx);
    return typeof id === 'string' && presets.includes(id);
  } catch {
    return false;
  }
}
