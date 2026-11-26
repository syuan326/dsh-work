// User-only preset authorization, persisted on the unified plugin's own row.
export function createToolAccess(ctx, config = {}) {
  const entry = ctx.fiber?.entry;
  const key = scope => scope === 'personal' ? 'personalMail' : 'workMail';
  function rowConfig(scope) {
    const row = ctx.configEditor.configuration().find(item => item.entry === entry);
    return { ...(config[key(scope)] ?? {}), ...(row?.inherited?.[key(scope)] ?? {}), ...(row?.override?.[key(scope)] ?? {}) };
  }
  async function presets() {
    return (await ctx.agentPresets.list()).map(preset => ({ id: preset.id, name: preset.name ?? preset.id, broken: preset.broken ?? null }));
  }
  async function toolAccess() {
    return {
      presets: await presets(),
      personal: Array.isArray(rowConfig('personal').presets) ? rowConfig('personal').presets : [],
      work: Array.isArray(rowConfig('work').presets) ? rowConfig('work').presets : [],
      available: Boolean(entry),
    };
  }
  async function saveToolAccess(request = {}) {
    const roster = await presets(), known = new Set(roster.map(preset => preset.id));
    const lists = {};
    for (const scope of ['personal', 'work']) {
      const value = request[scope];
      if (!Array.isArray(value) || value.length > 100 || value.some(id => typeof id !== 'string' || id.length > 100)) {
        return { ok: false, error: { code: 'INVALID_ARGUMENT', message: '预设列表格式无效' } };
      }
      lists[scope] = [...new Set(value)];
      if (lists[scope].some(id => !known.has(id))) return { ok: false, error: { code: 'UNKNOWN_PRESET', message: '列表包含未知预设，请刷新后重试' } };
    }
    if (!entry) return { ok: false, error: { code: 'UNAVAILABLE', message: '无法定位插件配置行' } };
    try {
      // Both spaces change in one validated write, preserving all other config.
      await ctx.configEditor.edit(entry, current => ({
        ...current,
        personalMail: { ...rowConfig('personal'), ...(current.personalMail ?? {}), presets: lists.personal },
        workMail: { ...rowConfig('work'), ...(current.workMail ?? {}), presets: lists.work },
      }));
    } catch (error) {
      return { ok: false, error: { code: 'WRITE_FAILED', message: `保存失败：${error?.message ?? '配置被拒绝'}` } };
    }
    return { ok: true, value: { presets: roster, personal: lists.personal, work: lists.work, available: true } };
  }
  return { toolAccess, saveToolAccess };
}
