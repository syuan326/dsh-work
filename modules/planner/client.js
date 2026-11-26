window.__ModuleLoader__.load({
  id: '@local/dsh-split-planner',
  factory(require) {
    const React = require('react');
    const { useState, useEffect, useRef, useCallback, useSyncExternalStore } = React;
    const h = React.createElement;
    const NS = 'split-planner';
    const en = {
      'work-calendar': 'Work calendar', 'work-tasks': 'Work tasks', 'personal-calendar': 'Personal calendar', 'personal-tasks': 'Personal tasks',
      intro: 'Work and personal data are separate. Existing calendar and task data have NOT been migrated.',
      overviewHelp: 'Reminder overview only: this plugin does not send background notifications.',
      add: 'Create', edit: 'Edit', save: 'Save', cancel: 'Cancel', refresh: 'Refresh', search: 'Search title, description or tags', filter: 'Status filter', all: 'All statuses',
      title: 'Title', description: 'Description', tags: 'Tags (comma separated)', status: 'Status', active: 'Active', cancelled: 'Cancelled', open: 'Open', done: 'Done',
      start: 'Start', end: 'End (exclusive for all-day events)', allDay: 'All-day event', timezone: 'Time zone (IANA)', timeHelp: 'Timed values require an explicit offset or Z, e.g. 2026-11-19T09:00:00+08:00. Offset must match your intended instant; no automatic +08 conversion.',
      dateHelp: 'All-day dates use YYYY-MM-DD. End is exclusive: a one-day event ends on the following date.',
      timezoneHelp: 'Default: Asia/Shanghai. You can change this IANA time zone; it controls recurrence and does not rewrite your explicit timestamps.',
      repeat: 'Repeat', none: 'Does not repeat', daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', weekdays: 'Weekdays', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
      monthDay: 'Day of month (1–31)', until: 'Last repeat date (YYYY-MM-DD)', count: 'Number of occurrences', stop: 'Repeat ends', forever: 'No end', byDate: 'On a date', byCount: 'After a count',
      excluded: 'Cancelled occurrence dates (YYYY-MM-DD, comma separated)', reminders: 'Reminder lead times (minutes, comma separated)', remindersHelp: 'For example 0,15,60. Leave blank for none. Overview only; no background push.',
      project: 'Project', inbox: 'Inbox', priority: 'Priority', low: 'Low', normal: 'Normal', high: 'High', due: 'Due at (optional, offset ISO)', parent: 'Parent task (optional)', noParent: 'No parent', complete: 'Complete', reopen: 'Reopen',
      remove: 'Delete', confirmDelete: 'Permanently delete', deleteHelp: 'Delete this item? This cannot be undone. Repeated events are deleted as an entire series.',
      saved: 'Saved.', removed: 'Deleted.', updated: 'Status updated.', failed: 'Request failed. Refresh before retrying a write if its outcome is uncertain.', loading: 'Loading…', busy: 'Saving changes…', empty: 'No items match this view.', total: 'Total',
      calendarView: 'Calendar', listView: 'List', today: 'Today', previousMonth: 'Previous month', nextMonth: 'Next month', noMonthEvents: 'No events this month.', calendar: 'Calendar occurrences', rangeHelp: 'Offset ISO range; end is exclusive. Default range is the current UTC month. Display keeps each returned timestamp/offset.', from: 'From (offset ISO)', to: 'To (offset ISO, exclusive)', showRange: 'Load range', noOccurrences: 'No occurrences in this range.', overview: 'Reminder overview', noReminders: 'No reminders returned.',
      invalidTime: 'Use a valid ISO timestamp with Z or ±HH:MM offset.', invalidDate: 'Use a valid YYYY-MM-DD date.', invalidRange: 'End must be later than start.', invalidMinutes: 'Reminder minutes must be non-negative integers.', invalidRepeat: 'Choose weekdays and a valid repeat end, or a day of month between 1 and 31.', invalidTimezone: 'Enter a valid IANA time zone.', required: 'Title is required.', versionMissing: 'This item has no version. Refresh before editing it.',
      discardHelp: 'Discard unsaved changes? Save or cancel this editor before editing another item.', discard: 'Discard changes', keepEditing: 'Keep editing',
      version: 'Version', reminderAt: 'Reminder time', occurrence: 'Occurrence', unsaved: 'Editor (changes are not saved until you choose Save)', parentHelp: 'Only tasks currently shown in the list are offered. Existing parent is retained. Backend checks parent relationships.',
    };
    const zh = {
      'work-calendar': '工作日程', 'work-tasks': '工作待办', 'personal-calendar': '个人日程', 'personal-tasks': '个人待办',
      intro: '工作与个人数据独立。尚未迁移原有日程和待办数据。', overviewHelp: '提醒仅作概览：此插件不提供后台推送通知。',
      add: '新建', edit: '编辑', save: '保存', cancel: '取消', refresh: '刷新', search: '搜索标题、描述或标签', filter: '状态筛选', all: '全部状态',
      title: '标题', description: '描述', tags: '标签（逗号分隔）', status: '状态', active: '有效', cancelled: '已取消', open: '未完成', done: '已完成',
      start: '开始', end: '结束（全天日程不含此日期）', allDay: '全天日程', timezone: '时区（IANA）', timeHelp: '时间必须带明确偏移量或 Z，例如 2026-11-19T09:00:00+08:00。偏移量应对应目标时刻，不会自动按 +08 转换。',
      dateHelp: '全天日程使用 YYYY-MM-DD，结束日期不包含在内：一天的日程应在次日结束。', timezoneHelp: '默认 Asia/Shanghai，可修改为其他 IANA 时区；用于重复规则，不会改写输入的带偏移量时间。',
      repeat: '重复', none: '不重复', daily: '每天', weekly: '每周', monthly: '每月', weekdays: '每周重复日', mon: '周一', tue: '周二', wed: '周三', thu: '周四', fri: '周五', sat: '周六', sun: '周日',
      monthDay: '每月第几日（1–31）', until: '重复截止日（YYYY-MM-DD）', count: '总发生次数', stop: '重复结束条件', forever: '不设截止', byDate: '截止日期', byCount: '指定次数',
      excluded: '取消的发生日期（YYYY-MM-DD，逗号分隔）', reminders: '提前提醒分钟（逗号分隔）', remindersHelp: '例如 0,15,60，留空表示无提醒。仅供概览，不后台推送。',
      project: '项目', inbox: '收集箱', priority: '优先级', low: '低', normal: '普通', high: '高', due: '截止时间（可空，带偏移量 ISO）', parent: '父任务（可选）', noParent: '无父任务', complete: '完成', reopen: '重新打开',
      remove: '删除', confirmDelete: '永久删除', deleteHelp: '确定删除此条目？无法撤销。重复日程会删除整个系列。', saved: '已保存。', removed: '已删除。', updated: '状态已更新。', failed: '请求失败。写入结果不确定时，请先刷新再决定是否重试。', loading: '加载中…', busy: '正在保存更改…', empty: '没有符合条件的条目。', total: '共',
      calendarView: '日历', listView: '列表', today: '今天', previousMonth: '上个月', nextMonth: '下个月', noMonthEvents: '本月暂无日程。', calendar: '日历发生列表', rangeHelp: '范围使用带偏移量 ISO，结束时刻不包含在内。默认显示当前 UTC 月；保留返回时间及其偏移量。', from: '从（带偏移量 ISO）', to: '至（带偏移量 ISO，不包含）', showRange: '加载范围', noOccurrences: '此范围内没有日程。', overview: '提醒概览', noReminders: '暂无返回的提醒。',
      discardHelp: '确定放弃未保存修改？请先保存或取消当前编辑，再编辑其他条目。', discard: '放弃修改', keepEditing: '继续编辑',
      invalidTime: '请输入有效的 ISO 时间，必须带 Z 或 ±HH:MM 偏移量。', invalidDate: '请输入有效的 YYYY-MM-DD 日期。', invalidRange: '结束必须晚于开始。', invalidMinutes: '提醒分钟必须为非负整数。', invalidRepeat: '请选择重复星期、有效的截止条件，或 1–31 的每月日期。', invalidTimezone: '请输入有效的 IANA 时区。', required: '请填写标题。', versionMissing: '条目缺少版本号，请刷新后再编辑。', version: '版本', reminderAt: '提醒时间', occurrence: '发生时间', unsaved: '编辑区（点击保存才会写入）', parentHelp: '备选项仅含当前列表中的任务；保留现有父任务。父子关系由后端校验。',
    };
    const css = `
/* Personal workspace — planner scope */
.sp-page{box-sizing:border-box;height:100%;overflow:auto;min-width:0;padding:calc(var(--dsh-frame-top-clearance,0px) + 22px) clamp(18px,3.2vw,44px) 52px;background:radial-gradient(1100px 380px at 112% -160px,color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent),transparent 70%),var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:14px;line-height:1.55}
.sp-page *{box-sizing:border-box}
.sp-wrap{max-width:1120px;margin:auto}
.sp-page h1{font-size:clamp(26px,2.4vw,32px);line-height:1.18;font-weight:600;letter-spacing:-.02em;margin:0 0 10px}
.sp-wrap>h1::before{content:'';display:block;width:42px;height:3px;border-radius:99px;margin-bottom:16px;background:linear-gradient(90deg,var(--dsw-alias-state-business-primary),color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent))}
.sp-page h2{font-size:19px;line-height:1.3;font-weight:600;letter-spacing:-.01em;margin:0 0 12px}
.sp-page h3{font-size:15px;font-weight:600;margin:0;overflow-wrap:anywhere}
.sp-wrap>h1+.sp-muted{font-size:14.5px;line-height:1.7;max-width:76ch;margin:0}
.sp-wrap>h1+.sp-muted+.sp-muted{font-size:12.5px;line-height:1.65;max-width:82ch;margin:8px 0 0;padding-left:12px;border-left:2px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 38%,transparent)}
.sp-muted{font-size:13px;line-height:1.65;color:var(--dsw-alias-label-secondary);margin:0}
.sp-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.sp-between{justify-content:space-between}
.sp-stack{display:grid;gap:16px}
.sp-card{border:1px solid var(--dsw-alias-border-l2);border-radius:16px;padding:18px;margin:16px 0;min-width:0;background:var(--dsw-alias-bg-layer-1);box-shadow:0 1px 2px rgb(16 24 40 / 5%),0 10px 24px -16px rgb(16 24 40 / 22%)}
.sp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.sp-field{display:grid;align-content:start;gap:7px;font-size:13px;min-width:0}
.sp-field>span{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500}
.sp-wide{grid-column:1/-1}
.sp-page button,.sp-page input,.sp-page select,.sp-page textarea{font:inherit;color:inherit}
.sp-page button{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:6px 13px;min-height:34px;cursor:pointer;transition:background .16s,border-color .16s,box-shadow .16s,color .16s,transform .08s}
.sp-page button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l3)}
.sp-page button:active:not(:disabled){transform:translateY(1px)}
.sp-page button:disabled{opacity:.45;cursor:not-allowed}
.sp-page button:focus-visible,.sp-page input:focus-visible,.sp-page select:focus-visible,.sp-page textarea:focus-visible,.sp-page summary:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
.sp-page .sp-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground);font-weight:600;box-shadow:0 10px 22px -16px color-mix(in srgb,var(--dsw-alias-brand-primary) 65%,transparent)}
.sp-page .sp-primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover);border-color:var(--dsw-alias-button-primary-hover);color:var(--dsw-alias-label-primary-foreground)}
.sp-page .sp-danger{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 32%,var(--dsw-alias-border-l2))}
.sp-page .sp-danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger)}
.sp-page input:not([type=checkbox]),.sp-page select,.sp-page textarea{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:8px 12px;width:100%;min-width:0;min-height:38px;color:var(--dsw-alias-label-primary);transition:border-color .16s,box-shadow .16s}
.sp-page input:not([type=checkbox]):hover,.sp-page select:hover,.sp-page textarea:hover{border-color:var(--dsw-alias-border-l3)}
.sp-page input:not([type=checkbox]):focus,.sp-page select:focus,.sp-page textarea:focus{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px;border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 4px color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent)}
.sp-page textarea{resize:vertical;min-height:84px}
.sp-page input[type=checkbox]{width:16px;height:16px;accent-color:var(--dsw-alias-state-business-primary);margin:0}
.sp-check{display:inline-flex;gap:7px;align-items:center;min-height:34px;font-size:13px;cursor:pointer}
.sp-page fieldset{min-width:0;border:0;padding:0;margin:0;display:grid;gap:14px}
.sp-page legend{padding:0}
.sp-page small{display:block;font-size:12px;line-height:1.6;color:var(--dsw-alias-label-secondary)}
.sp-notice{position:relative;padding:12px 14px 12px 16px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,var(--dsw-alias-border-l1));border-radius:12px;margin:12px 0;overflow-wrap:anywhere;background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent)}
.sp-notice::before{content:'';position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:99px;background:var(--dsw-alias-state-business-primary)}
.sp-notice.sp-error{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 26%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 7%,transparent)}
.sp-notice.sp-error::before{background:var(--dsw-alias-state-error-primary)}
.sp-error{color:var(--dsw-alias-state-error-primary)}
.sp-list{list-style:none;padding:0;margin:0;display:grid;gap:4px}
.sp-item{padding:12px;border-radius:12px;border:0;border-top:1px solid var(--dsw-alias-border-l1);overflow-wrap:anywhere;transition:background .16s}
.sp-item:first-child{border-top:0}
.sp-item:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent)}
.sp-item.sp-stack{gap:10px}
.sp-text{white-space:pre-wrap;overflow-wrap:anywhere;margin:6px 0 0;font-size:13.5px}
.sp-page summary{cursor:pointer;padding:2px 0;font-size:15px;font-weight:600;list-style:none;display:flex;align-items:center;gap:8px}
.sp-page summary::-webkit-details-marker{display:none}
.sp-page summary::after{content:'';width:7px;height:7px;margin-left:auto;border-right:1.5px solid var(--dsw-alias-label-secondary);border-bottom:1.5px solid var(--dsw-alias-label-secondary);transform:rotate(45deg);transition:transform .16s;flex:none}
.sp-page details[open]>summary::after{transform:rotate(-135deg)}
.sp-page details[open]>summary{margin-bottom:6px}
.sp-page details>.sp-muted{margin:0 0 12px}
.sp-toolbar{margin:20px 0 8px;padding:14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent);align-items:end}
.sp-toolbar .sp-field:first-child{flex:1;min-width:min(100%,220px)}
.sp-toolbar .sp-field{flex:0 1 auto;min-width:150px}
.sp-empty{padding:34px 12px;color:var(--dsw-alias-label-secondary);text-align:center;border:1px dashed var(--dsw-alias-border-l2);border-radius:14px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 2%,transparent);margin:0}
.sp-page [role=status]{color:var(--dsw-alias-label-secondary);font-size:13px}
@media(max-width:680px){.sp-grid{grid-template-columns:minmax(0,1fr)}.sp-page{padding-inline:16px}.sp-card{padding:14px}.sp-toolbar{align-items:stretch}.sp-toolbar .sp-field{flex:1 1 100%}.sp-page input,.sp-page select,.sp-page textarea{font-size:16px}}

/* Card header alignment */
.sp-row>h2{margin-bottom:0}

@media (pointer:coarse){.sp-page input:not([type=checkbox]),.sp-page select,.sp-page textarea{font-size:16px}}
@media (prefers-reduced-motion:reduce){.sp-page *,.sp-page *::before,.sp-page *::after{transition:none!important;transform:none!important}}
@media (hover:none){.sp-item:hover{background:transparent}}
/* 日程月历与待办完成控件 */
.sp-view-switch{display:inline-flex;gap:3px;padding:3px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent)}
.sp-view-switch button{border:0;background:transparent;min-height:28px;padding:4px 12px;border-radius:7px;font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.sp-view-switch button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.sp-view-switch button[aria-pressed=true]{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-weight:600;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l3)}
.sp-calendar-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.sp-calendar-head button{min-height:30px;padding:4px 10px}
.sp-calendar-title{font-size:16px;font-weight:600;letter-spacing:-.01em;min-width:7em;text-align:center}
.sp-calendar-weekdays{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;margin:0 0 6px}
.sp-calendar-weekday{font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);text-align:center}
.sp-calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px}
.sp-calendar-day{min-width:0;min-height:96px;padding:6px;border:1px solid var(--dsw-alias-border-l1);border-radius:11px;background:var(--dsw-alias-bg-layer-1);display:flex;flex-direction:column;gap:4px}
.sp-calendar-day-empty{border-style:dashed;background:transparent;opacity:.5}
.sp-calendar-today{border-color:var(--dsw-alias-state-business-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-state-business-primary)}
.sp-calendar-day-head{display:flex;align-items:center;justify-content:space-between;gap:4px;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.sp-calendar-today .sp-calendar-day-head{color:var(--dsw-alias-state-business-primary)}
.sp-calendar-count{font-size:10px;font-weight:500;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-label-primary) 6%,transparent);border-radius:999px;padding:0 5px}
.sp-calendar-events{display:grid;gap:3px;min-width:0}
.sp-calendar-event{display:block;min-width:0;font-size:11px;line-height:1.35;padding:2px 5px;border-radius:5px;border-left:2px solid var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 9%,transparent);color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sp-calendar-event-allday{border-left-color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 9%,transparent)}
.sp-calendar-event-time{font-weight:600;color:var(--dsw-alias-label-secondary);margin-right:4px;font-variant-numeric:tabular-nums}
.sp-calendar-event-title{font-weight:500}
.sp-calendar-more{font-size:10.5px;color:var(--dsw-alias-label-secondary);padding:0 5px}
.sp-calendar .sp-empty{margin:14px 0 0}
.sp-item-head{display:flex;align-items:flex-start;gap:10px;min-width:0}
.sp-item-copy{flex:1;min-width:0}
.sp-task-toggle{display:inline-flex;align-items:center;gap:7px;flex:none;padding-top:2px;font-size:12px;color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none}
.sp-task-toggle input{width:18px;height:18px;min-height:0;margin:0;accent-color:var(--dsw-alias-state-business-primary);flex:none}
.sp-task-toggle:hover{color:var(--dsw-alias-label-primary)}
.sp-item.sp-done .sp-item-copy{opacity:.72}
.sp-item.sp-done .sp-item-copy h3{text-decoration:line-through;text-decoration-thickness:1px}
@media(max-width:680px){
  .sp-calendar-weekdays,.sp-calendar-grid{gap:3px}
  .sp-calendar-day{min-height:70px;padding:4px;border-radius:9px}
  .sp-calendar-event{font-size:10px;padding:1px 3px}
  .sp-calendar-event-time{display:none}
  .sp-calendar-title{font-size:15px}
  .sp-view-switch{width:100%}
  .sp-view-switch button{flex:1}
}

`;
    const split = value => value.split(/[,，\n]/).map(x => x.trim()).filter(Boolean);
    const dateOK = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
    const timeOK = value => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value)) && dateOK(value.slice(0, 10));
    const monthRange = () => { const now = new Date(); return { from: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString(), to: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).toISOString() }; };
    const monthKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const shiftMonthKey = (value, delta) => { const [year, month] = value.split('-').map(Number); const date = new Date(year, month - 1 + delta, 1); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; };
    const monthBounds = (value) => { const [year, month] = value.split('-').map(Number); const from = new Date(year, month - 1, 1), to = new Date(year, month, 1); return { from: new Date(from.getTime() - 86400000).toISOString(), to: new Date(to.getTime() + 86400000).toISOString() }; };
    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, 'en', en));
        ctx.effect(() => ctx.locale.register(NS, 'zh', zh));
        const translate = ctx.locale.bind(NS);
        function useT() {
          useSyncExternalStore(useCallback(fn => ctx.locale.subscribe(fn), []), useCallback(() => ctx.locale.getSnapshot(), []));
          return translate;
        }
        async function api(scope, action, args, signal) {
          const response = await fetch('/api/split-planner/' + scope + '/' + action, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-DSH-Planner-UI': '1' }, body: JSON.stringify(args || {}), signal });
          let result;
          try { result = await response.json(); } catch (_) { throw new Error(translate('failed') + ' (HTTP ' + response.status + ')'); }
          if (!response.ok || result.ok !== true) throw new Error(result.error?.message || translate('failed'));
          return result.value;
        }
        function Button({ children, ...props }) { return h('button', { type: 'button', ...props }, children); }
        function Field({ label, children, wide }) { return h('label', { className: 'sp-field' + (wide ? ' sp-wide' : '') }, h('span', null, label), children); }
        function Icon({ task, size = 18 }) { return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true }, h('rect', { x: 4, y: 4, width: 16, height: 17, rx: 2 }), h('path', { d: task ? 'm8 12 3 3 5-6' : 'M4 9h16M8 2v4M16 2v4' })); }
        function Editor({ kind, item, items, busy, onSave, onCancel }) {
          const t = useT(), event = kind === 'events';
          const [form, setForm] = useState(() => ({ title: item?.title || '', description: item?.description || '', tags: (item?.tags || []).join(', '),
            start: item?.start || '', end: item?.end || '', all_day: item?.all_day || false, timezone: item?.timezone || 'Asia/Shanghai', status: item?.status || (event ? 'active' : 'open'),
            frequency: item?.repeat?.frequency || '', weekdays: item?.repeat?.weekdays || [], month_day: item?.repeat?.month_day || 1,
            stop: item?.repeat?.until ? 'date' : item?.repeat?.count ? 'count' : '', until: item?.repeat?.until || '', count: item?.repeat?.count || 1,
            cancelled_dates: (item?.cancelled_dates || []).join(', '), reminder_minutes: (item?.reminder_minutes || []).join(', '), project: item?.project || '收集箱', priority: item?.priority || 'normal', due_at: item?.due_at || '', parent_id: item?.parent_id || '',
          }));
          const [error, setError] = useState(''), [dirty, setDirty] = useState(false), [discarding, setDiscarding] = useState(false);
          const titleRef = useRef(null);
          useEffect(() => { titleRef.current?.focus(); }, []);
          useEffect(() => { if (!dirty) return; const leave = e => { e.preventDefault(); e.returnValue = ''; }; window.addEventListener('beforeunload', leave); return () => window.removeEventListener('beforeunload', leave); }, [dirty]);
          const change = (name, value) => { setDirty(true); setDiscarding(false); setForm(current => ({ ...current, [name]: value })); };
          const input = (name, options = {}) => h('input', { value: form[name], onChange: e => change(name, e.target.value), ...options });
          const select = (name, choices) => h('select', { value: form[name], onChange: e => change(name, e.target.value) }, choices.map(([value, label]) => h('option', { key: value, value }, label)));
          const save = e => {
            e.preventDefault(); setError('');
            try {
              if (!form.title.trim()) throw new Error(t('required'));
              if (item?.id && item.version == null) throw new Error(t('versionMissing'));
              const minutes = split(form.reminder_minutes);
              if (minutes.some(x => !/^\d+$/.test(x) || !Number.isSafeInteger(Number(x)))) throw new Error(t('invalidMinutes'));
              const value = { source_type: item?.source_type ?? null, source_id: item?.source_id ?? null, related_ids: [...(item?.related_ids || [])], title: form.title.trim(), description: form.description, tags: [...new Set(split(form.tags))], reminder_minutes: [...new Set(minutes.map(Number))], status: form.status };
              if (event) {
                if (!(form.all_day ? dateOK(form.start) && dateOK(form.end) : timeOK(form.start) && timeOK(form.end))) throw new Error(t(form.all_day ? 'invalidDate' : 'invalidTime'));
                if (Date.parse(form.end) <= Date.parse(form.start)) throw new Error(t('invalidRange'));
                try { new Intl.DateTimeFormat('en', { timeZone: form.timezone }).format(); } catch (_) { throw new Error(t('invalidTimezone')); }
                const excluded = split(form.cancelled_dates);
                if (excluded.some(x => !dateOK(x))) throw new Error(t('invalidDate'));
                let repeat = null;
                if (form.frequency) {
                  repeat = { frequency: form.frequency };
                  if (form.frequency === 'weekly') { if (!form.weekdays.length) throw new Error(t('invalidRepeat')); repeat.weekdays = [...form.weekdays].sort((a, b) => a - b); }
                  if (form.frequency === 'monthly') { if (!Number.isInteger(Number(form.month_day)) || Number(form.month_day) < 1 || Number(form.month_day) > 31) throw new Error(t('invalidRepeat')); repeat.month_day = Number(form.month_day); }
                  if (form.stop === 'date') { if (!dateOK(form.until) || form.until < form.start.slice(0, 10)) throw new Error(t('invalidRepeat')); repeat.until = form.until; }
                  if (form.stop === 'count') { if (!/^\d+$/.test(String(form.count)) || Number(form.count) < 1 || !Number.isSafeInteger(Number(form.count))) throw new Error(t('invalidRepeat')); repeat.count = Number(form.count); }
                }
                Object.assign(value, { start: form.start, end: form.end, all_day: form.all_day, timezone: form.timezone, repeat, cancelled_dates: [...new Set(excluded)] });
              } else {
                if (form.due_at && !timeOK(form.due_at)) throw new Error(t('invalidTime'));
                Object.assign(value, { project_id: item?.project_id ?? null, project: form.project.trim() || '收集箱', priority: form.priority, due_at: form.due_at || null, parent_id: form.parent_id || null });
              }
              if (item?.id) value.id = item.id;
              onSave(value, item?.version);
            } catch (err) { setError(err.message); }
          };
          const parents = items.filter(x => x.id !== item?.id);
          if (form.parent_id && !parents.some(x => x.id === form.parent_id)) parents.push({ id: form.parent_id, title: form.parent_id });
          return h('form', { className: 'sp-card sp-stack', onSubmit: save, 'aria-label': t('unsaved') }, h('h2', null, t(item ? 'edit' : 'add')), h('p', { className: 'sp-muted' }, t('unsaved')),
            error && h('div', { role: 'alert', className: 'sp-notice sp-error' }, error),
            h('fieldset', { disabled: busy }, h('legend', null, t('title')), h('div', { className: 'sp-grid' },
              h(Field, { label: t('title'), wide: true }, input('title', { required: true, maxLength: 500, ref: titleRef })),
              h(Field, { label: t('description'), wide: true }, h('textarea', { value: form.description, onChange: e => change('description', e.target.value) })),
              h(Field, { label: t('tags') }, input('tags')), h(Field, { label: t('status') }, select('status', (event ? ['active', 'cancelled'] : ['open', 'done']).map(x => [x, t(x)]))),
              event ? h(React.Fragment, null,
                h('label', { className: 'sp-check sp-wide' }, h('input', { type: 'checkbox', checked: form.all_day, onChange: e => change('all_day', e.target.checked) }), t('allDay')),
                h('p', { className: 'sp-muted sp-wide' }, t(form.all_day ? 'dateHelp' : 'timeHelp')),
                h(Field, { label: t('start') }, input('start', { required: true, placeholder: form.all_day ? '2026-11-19' : '2026-11-19T09:00:00+08:00' })),
                h(Field, { label: t('end') }, input('end', { required: true, placeholder: form.all_day ? '2026-11-20' : '2026-11-19T10:00:00+08:00' })),
                h(Field, { label: t('timezone'), wide: true }, input('timezone', { required: true }), h('small', { className: 'sp-muted' }, t('timezoneHelp'))),
                h(Field, { label: t('repeat') }, select('frequency', ['', 'daily', 'weekly', 'monthly'].map(x => [x, t(x || 'none')]))),
                form.frequency === 'weekly' && h('fieldset', { className: 'sp-wide' }, h('legend', null, t('weekdays')), h('div', { className: 'sp-row' }, ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day, index) => h('label', { key: day, className: 'sp-check' }, h('input', { type: 'checkbox', checked: form.weekdays.includes(index), onChange: e => change('weekdays', e.target.checked ? [...form.weekdays, index] : form.weekdays.filter(x => x !== index)) }), t(day))))),
                form.frequency === 'monthly' && h(Field, { label: t('monthDay') }, input('month_day', { type: 'number', min: 1, max: 31, required: true })),
                form.frequency && h(React.Fragment, null, h(Field, { label: t('stop') }, select('stop', [['', t('forever')], ['date', t('byDate')], ['count', t('byCount')]])), form.stop === 'date' && h(Field, { label: t('until') }, input('until', { type: 'date', required: true })), form.stop === 'count' && h(Field, { label: t('count') }, input('count', { type: 'number', min: 1, required: true }))),
                h(Field, { label: t('excluded'), wide: true }, input('cancelled_dates')),
              ) : h(React.Fragment, null,
                h(Field, { label: t('project') }, input('project')), h(Field, { label: t('priority') }, select('priority', ['low', 'normal', 'high'].map(x => [x, t(x)]))),
                h(Field, { label: t('due'), wide: true }, input('due_at', { placeholder: '2026-11-19T18:00:00+08:00' }), h('small', { className: 'sp-muted' }, t('timeHelp'))),
                h(Field, { label: t('parent'), wide: true }, select('parent_id', [['', t('noParent')], ...parents.map(x => [x.id, x.title])]), h('small', { className: 'sp-muted' }, t('parentHelp'))),
              ),
              h(Field, { label: t('reminders'), wide: true }, input('reminder_minutes', { placeholder: '0,15,60' }), h('small', { className: 'sp-muted' }, t('remindersHelp'))),
            )), h('div', { className: 'sp-row' }, h('button', { type: 'submit', className: 'sp-primary', disabled: busy }, t('save')), h(Button, { disabled: busy, onClick: () => dirty ? setDiscarding(true) : onCancel() }, t('cancel'))), discarding && h('div', { className: 'sp-notice', role: 'group', 'aria-label': t('discard'), onKeyDown: e => { if (e.key === 'Escape') setDiscarding(false); } }, h('p', null, t('discardHelp')), h(Button, { disabled: busy, className: 'sp-danger', onClick: onCancel }, t('discard')), h(Button, { disabled: busy, onClick: () => setDiscarding(false) }, t('keepEditing'))));
        }
        function Page({ scope, kind, panel, locale }) {
          const t = useT(), event = kind === 'events', activeLocale = locale?.getSnapshot?.()?.active;
          const [items, setItems] = useState([]), [total, setTotal] = useState(0), [query, setQuery] = useState(''), [status, setStatus] = useState('');
          const [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState('');
          const [editor, setEditor] = useState(null), [deleting, setDeleting] = useState(null), [range, setRange] = useState(monthRange), [occurrences, setOccurrences] = useState(null), [reminders, setReminders] = useState(null);
          const [rangeBusy, setRangeBusy] = useState(false), [reminderBusy, setReminderBusy] = useState(false);
          const [view, setView] = useState(event ? 'calendar' : 'list'), [month, setMonth] = useState(monthKey);
          const [monthOccurrences, setMonthOccurrences] = useState(null), [monthBusy, setMonthBusy] = useState(false), [monthRevision, setMonthRevision] = useState(0);
          const mounted = useRef(false), requests = useRef(new Map()), writeLock = useRef(false), editorReturn = useRef(null), deleteReturn = useRef(null);
          useEffect(() => { mounted.current = true; return () => { mounted.current = false; for (const c of requests.current.values()) c.abort(); requests.current.clear(); }; }, []);
          const request = useCallback(async (key, action, args) => {
            requests.current.get(key)?.abort(); const controller = new AbortController(); requests.current.set(key, controller);
            try { const result = await api(scope, action, args, controller.signal); return mounted.current && !controller.signal.aborted ? result : null; }
            catch (err) { if (mounted.current && !controller.signal.aborted) setError(err.message || translate('failed')); return null; }
            finally { if (requests.current.get(key) === controller) requests.current.delete(key); }
          }, [scope]);
          const listGeneration = useRef(0);
          const load = useCallback(async () => { const generation = ++listGeneration.current; setLoading(true); const result = await request('list', 'list', { kind, ...(query.trim() ? { query: query.trim() } : {}), ...(status ? { status } : {}) }); if (mounted.current && generation === listGeneration.current) { if (result) { setItems(result.items || []); setTotal(result.total || 0); } setLoading(false); } }, [kind, query, status, request]);
          useEffect(() => { load(); }, [load]);
          const closeEditor = () => { setEditor(null); editorReturn.current?.focus(); };
          const closeDelete = () => { setDeleting(null); deleteReturn.current?.focus(); };
          const mutate = async (action, args, success) => {
            if (writeLock.current) return; writeLock.current = true; setBusy(true); setError(''); setNotice('');
            // Invalidate pre-write auxiliary reads so they cannot republish stale data.
            ++rangeGeneration.current; ++reminderGeneration.current;
            requests.current.get('calendar')?.abort(); requests.current.get('reminders')?.abort();
            setRangeBusy(false); setReminderBusy(false);
            const result = await request('write', action, { kind, ...args });
            if (mounted.current) { setBusy(false); if (result) { closeEditor(); closeDelete(); setNotice(t(success)); setOccurrences(null); setReminders(null); load(); setMonthRevision(n => n + 1); } }
            writeLock.current = false;
          };
          const rangeGeneration = useRef(0), reminderGeneration = useRef(0), monthGeneration = useRef(0);
          const loadRange = async () => {
            setError(''); if (!timeOK(range.from) || !timeOK(range.to)) { setError(t('invalidTime')); return; }
            if (Date.parse(range.from) >= Date.parse(range.to)) { setError(t('invalidRange')); return; }
            const generation = ++rangeGeneration.current; setRangeBusy(true); const result = await request('calendar', 'calendar', range);
            if (mounted.current && generation === rangeGeneration.current) { if (result) setOccurrences(result.occurrences || []); setRangeBusy(false); }
          };
          const loadReminders = async () => { const generation = ++reminderGeneration.current; setReminderBusy(true); const result = await request('reminders', 'reminders', {}); if (mounted.current && generation === reminderGeneration.current) { if (result) setReminders(result.items || []); setReminderBusy(false); } };
          const loadMonth = useCallback(async () => {
            if (!event || view !== 'calendar') return;
            const generation = ++monthGeneration.current;
            setMonthBusy(true); setMonthOccurrences(null);
            const result = await request('month', 'calendar', monthBounds(month));
            if (mounted.current && generation === monthGeneration.current) { setMonthOccurrences(result ? result.occurrences || [] : []); setMonthBusy(false); }
          }, [event, view, month, request]);
          useEffect(() => { loadMonth(); }, [loadMonth, monthRevision]);
          const canEdit = item => item.version != null;
          const todayKey = new Intl.DateTimeFormat('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
          const [calendarYear, calendarMonth] = month.split('-').map(Number);
          const monthLabel = new Intl.DateTimeFormat(activeLocale, { year: 'numeric', month: 'long' }).format(new Date(calendarYear, calendarMonth - 1, 1));
          const leadDays = (new Date(calendarYear, calendarMonth - 1, 1).getDay() + 6) % 7;
          const daysInMonth = new Date(calendarYear, calendarMonth, 0).getDate();
          const occurrenceDate = (occurrence) => {
            if (occurrence.all_day) return String(occurrence.start || occurrence.occurrence_start || '').slice(0, 10);
            try { return new Intl.DateTimeFormat('sv-SE', { timeZone: occurrence.timezone || 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(occurrence.occurrence_start)); }
            catch (_) { return new Date(occurrence.occurrence_start).toISOString().slice(0, 10); }
          };
          const occurrenceTime = (occurrence) => {
            try { return new Intl.DateTimeFormat(activeLocale, { hour: '2-digit', minute: '2-digit', timeZone: occurrence.timezone || 'Asia/Shanghai' }).format(new Date(occurrence.occurrence_start)); }
            catch (_) { return new Date(occurrence.occurrence_start).toLocaleTimeString(); }
          };
          const byDate = new Map();
          for (const occurrence of monthOccurrences || []) { const key = occurrenceDate(occurrence); if (!byDate.has(key)) byDate.set(key, []); byDate.get(key).push(occurrence); }
          const monthCard = () => h('section', { className: 'sp-card sp-calendar' },
            h('div', { className: 'sp-calendar-head' },
              h('div', { className: 'sp-row' },
                h(Button, { disabled: busy || monthBusy, 'aria-label': t('previousMonth'), onClick: () => setMonth(current => shiftMonthKey(current, -1)) }, '‹'),
                h('strong', { className: 'sp-calendar-title' }, monthLabel),
                h(Button, { disabled: busy || monthBusy, 'aria-label': t('nextMonth'), onClick: () => setMonth(current => shiftMonthKey(current, 1)) }, '›')),
              h('div', { className: 'sp-row' },
                h(Button, { disabled: busy || monthBusy, onClick: () => setMonth(monthKey()) }, t('today')),
                monthBusy && h('span', { className: 'sp-muted', role: 'status' }, t('loading')))),
            h('div', { className: 'sp-calendar-weekdays' }, ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => h('span', { key: day, className: 'sp-calendar-weekday' }, t(day)))),
            h('div', { className: 'sp-calendar-grid' },
              Array.from({ length: leadDays }, (_, index) => h('div', { key: 'lead-' + index, className: 'sp-calendar-day sp-calendar-day-empty', 'aria-hidden': true })),
              Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1, key = `${month}-${String(day).padStart(2, '0')}`, list = byDate.get(key) || [], shown = list.slice(0, 3), more = list.length - shown.length;
                return h('div', { key, className: 'sp-calendar-day' + (key === todayKey ? ' sp-calendar-today' : '') },
                  h('div', { className: 'sp-calendar-day-head' }, h('span', null, String(day)), list.length ? h('span', { className: 'sp-calendar-count' }, String(list.length)) : null),
                  h('div', { className: 'sp-calendar-events' },
                    shown.map((occurrence, chipIndex) => h('span', { key: (occurrence.id || '') + ':' + chipIndex, className: 'sp-calendar-event' + (occurrence.all_day ? ' sp-calendar-event-allday' : ''), title: (occurrence.all_day ? t('allDay') : occurrenceTime(occurrence)) + ' · ' + occurrence.title },
                      occurrence.all_day ? null : h('span', { className: 'sp-calendar-event-time' }, occurrenceTime(occurrence)),
                      h('span', { className: 'sp-calendar-event-title' }, occurrence.title))),
                    more > 0 ? h('span', { className: 'sp-calendar-more' }, '+ ' + more) : null));
              })),
            monthOccurrences && monthOccurrences.length === 0 && !monthBusy && h('p', { className: 'sp-empty' }, t('noMonthEvents'))
          );
          return h('section', { className: 'sp-page', 'aria-label': t(panel) }, h('style', null, css), h('div', { className: 'sp-wrap' },
            h('h1', null, t(panel)), h('p', { className: 'sp-muted' }, t('intro')), h('p', { className: 'sp-muted' }, t('overviewHelp')),
            error && h('div', { className: 'sp-notice sp-error', role: 'alert' }, error), notice && h('div', { className: 'sp-notice', role: 'status' }, notice), busy && h('p', { role: 'status' }, t('busy')),
            h('div', { className: 'sp-row sp-toolbar' },
              event ? h('div', { className: 'sp-view-switch', role: 'group', 'aria-label': t('calendarView') },
                h(Button, { type: 'button', 'aria-pressed': view === 'calendar', onClick: () => setView('calendar') }, t('calendarView')),
                h(Button, { type: 'button', 'aria-pressed': view === 'list', onClick: () => setView('list') }, t('listView'))) : null,
              (!event || view === 'list') && h(Field, { label: t('search') }, h('input', { type: 'search', value: query, disabled: busy, onChange: e => setQuery(e.target.value) })),
              (!event || view === 'list') && h(Field, { label: t('filter') }, h('select', { value: status, disabled: busy, onChange: e => setStatus(e.target.value) }, h('option', { value: '' }, t('all')), (event ? ['active', 'cancelled'] : ['open', 'done']).map(x => h('option', { key: x, value: x }, t(x))))),
              h(Button, { disabled: busy || loading, onClick: () => { setError(''); load(); if (event && view === 'calendar') setMonthRevision(n => n + 1); } }, t('refresh')),
              h(Button, { className: 'sp-primary', disabled: busy || !!editor, onClick: e => { editorReturn.current = e.currentTarget; setDeleting(null); setEditor({ item: null }); } }, t('add'))),
            editor && h(Editor, { key: editor.item?.id || 'new', kind, item: editor.item, items, busy, onCancel: closeEditor, onSave: (item, version) => mutate('save', { item, ...(version != null ? { version } : {}) }, 'saved') }),
            (!event || view === 'list') && h('div', { className: 'sp-card', 'aria-busy': loading },
              h('div', { className: 'sp-row sp-between' }, h('h2', null, t(panel)), h('span', { className: 'sp-muted' }, t('total') + ' ' + total)),
              loading ? h('p', { role: 'status' }, t('loading')) : !items.length ? h('p', { className: 'sp-empty' }, t('empty')) : h('ul', { className: 'sp-list' }, items.map(item => h('li', { className: 'sp-item sp-stack' + (item.status === 'done' && !event ? ' sp-done' : ''), key: item.id },
                h('div', { className: 'sp-item-head' },
                  !event && h('label', { className: 'sp-task-toggle', title: t(item.status === 'done' ? 'reopen' : 'complete') },
                    h('input', { type: 'checkbox', checked: item.status === 'done', disabled: busy || !!editor || !canEdit(item), 'aria-label': t(item.status === 'done' ? 'reopen' : 'complete'), onChange: () => mutate('status', { id: item.id, version: item.version, status: item.status === 'done' ? 'open' : 'done' }, 'updated') }),
                    h('span', null, t(item.status === 'done' ? 'done' : 'complete'))),
                  h('div', { className: 'sp-item-copy' },
                    h('h3', null, item.title),
                    h('p', { className: 'sp-muted' }, t(item.status) + ' · ' + (event ? item.start + ' → ' + item.end + ' · ' + item.timezone + (item.all_day ? ' · ' + t('allDay') : '') + (item.repeat ? ' · ' + t(item.repeat.frequency) : '') : (item.project || t('inbox')) + ' · ' + t(item.priority) + (item.due_at ? ' · ' + item.due_at : ''))),
                    item.description && h('p', { className: 'sp-text' }, item.description),
                    item.tags?.length > 0 && h('p', { className: 'sp-muted' }, item.tags.join(' · ')))),
                h('div', { className: 'sp-row' },
                  h(Button, { disabled: busy || !!editor || !canEdit(item), title: !canEdit(item) ? t('versionMissing') : undefined, onClick: e => { editorReturn.current = e.currentTarget; setDeleting(null); setEditor({ item }); } }, t('edit')),
                  h(Button, { disabled: busy || !!editor || !canEdit(item), className: 'sp-danger', onClick: e => { deleteReturn.current = e.currentTarget; setDeleting(item); } }, t('remove'))),
                deleting?.id === item.id && h('div', { className: 'sp-notice', role: 'group', 'aria-label': t('confirmDelete'), onKeyDown: e => { if (e.key === 'Escape' && !busy) closeDelete(); } }, h('p', null, t('deleteHelp')), h('strong', null, item.title), h('div', { className: 'sp-row' }, h(Button, { className: 'sp-danger', disabled: busy, onClick: () => mutate('delete', { id: item.id, version: item.version }, 'removed') }, t('confirmDelete')), h(Button, { disabled: busy, onClick: closeDelete }, t('cancel')))),
              )))),
            event && view === 'calendar' && monthCard(),
            event && view === 'list' && h('details', { className: 'sp-card' }, h('summary', null, t('calendar')), h('p', { className: 'sp-muted' }, t('rangeHelp')), h('div', { className: 'sp-grid' }, ['from', 'to'].map(key => h(Field, { label: t(key), key }, h('input', { value: range[key], onChange: e => { setRange(current => ({ ...current, [key]: e.target.value })); setOccurrences(null); } })))), h(Button, { disabled: rangeBusy || busy, onClick: loadRange }, t('showRange')), rangeBusy && h('p', { role: 'status' }, t('loading')), occurrences && (!occurrences.length ? h('p', { className: 'sp-empty' }, t('noOccurrences')) : h('ul', { className: 'sp-list' }, occurrences.map((item, index) => h('li', { className: 'sp-item', key: item.id + ':' + item.start + ':' + index }, h('strong', null, item.title), h('p', { className: 'sp-muted' }, item.start + ' → ' + item.end + (item.all_day ? ' · ' + t('allDay') : ''))))))),
            h('details', { className: 'sp-card' }, h('summary', null, t('overview')), h('p', { className: 'sp-muted' }, t('overviewHelp')), h(Button, { disabled: reminderBusy || busy, onClick: loadReminders }, t('refresh')), reminderBusy && h('p', { role: 'status' }, t('loading')), reminders && (!reminders.length ? h('p', { className: 'sp-empty' }, t('noReminders')) : h('ul', { className: 'sp-list' }, reminders.map((item, index) => h('li', { className: 'sp-item', key: (item.id || index) + ':' + index }, h('strong', null, item.title || item.item?.title || item.id), h('p', { className: 'sp-muted' }, [item.run_at, item.start, item.offset_minutes != null ? item.offset_minutes + ' min' : ''].filter(Boolean).join(' · '))))))),
          ));
        }
        for (const [scope, view, order] of [['work', 'calendar', 41], ['work', 'tasks', 42], ['personal', 'calendar', 43], ['personal', 'tasks', 44]]) {
          const id = scope + '-' + view, kind = view === 'calendar' ? 'events' : 'tasks';
          ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, locale: NS }, () => h(Page, { scope, kind, panel: id, locale: ctx.locale, key: id })));
          ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, locale: NS, label: () => translate(id) }, props => h(Icon, { ...props, task: view === 'tasks' })));
        }
      },
    };
  },
});
