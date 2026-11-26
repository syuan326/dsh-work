window.__ModuleLoader__.load({
  id: '@local/dsh-split-plans',
  factory(require) {
    const React = require('react');
    const { useState, useEffect, useRef, useCallback, useSyncExternalStore } = React;
    const h = React.createElement, NS = 'split-plans';
    const zh = {
      'personal-plans': '个人计划', 'work-plans': '工作计划', intro: '计划书与逐日打卡。个人、工作分别持久化，互不混用。', limits: '未导入原项目数据；本插件不发送自动提醒，也不关联原工作项目。',
      create: '新建计划书', edit: '编辑计划书', save: '保存', cancel: '取消', refresh: '刷新', select: '选择计划书', empty: '暂无计划书，点击“新建计划书”开始。', loading: '加载中…', failed: '加载失败，请刷新重试。旧结果已隐藏，未保存的表单仍保留。',
      title: '标题', description: '摘要', content: '计划书正文（Markdown）', preview: '预览', source: '编辑正文', markdownHelp: '支持标题、列表、任务清单、引用、链接、表格、粗体/斜体、行内代码和代码块；不执行 HTML、脚本或加载外部图片。', noContent: '尚无正文，可编辑补充目标与执行步骤。',
      start_date: '开始日期', end_date: '结束日期（含当天，可空）', frequency: '执行周期', daily: '每天', weekly: '每周', weekdays: '执行星期', mon: '周一', tue: '周二', wed: '周三', thu: '周四', fri: '周五', sat: '周六', sun: '周日',
      status: '计划状态', active: '进行中', paused: '已暂停', completed: '已结束', freeze: '已有打卡后，不能修改日期或执行周期；可继续编辑正文与状态。日期范围为 2000–2099 年。',
      done_count: '已完成', skipped_count: '已跳过', scheduled_count: '累计应执行', completion_rate: '完成率', current_streak: '当前连续', longest_streak: '最长连续', statsHelp: '连续次数按计划执行日计算，不按自然日。今天尚未打卡会中断当前连续。',
      today: '今天', zone: '时区', month: '打卡月历', previous: '上个月', next: '下个月', date: '打卡日期', note: '打卡备注', done: '已完成', skipped: '已跳过', pending: '未打卡', off: '非执行日', markDone: '记录完成', markSkip: '记录跳过', undo: '撤销此日打卡', checkinHelp: '点击月历中的执行日补卡；只允许今天及过去 365 天。补卡/撤销与编辑均校验计划版本。',
      history: '本月打卡记录', noHistory: '本月暂无打卡。', remove: '删除计划书', confirmDelete: '确认永久删除', deleteHelp: '将永久删除此计划书及全部打卡记录，无法撤销。', saved: '操作已保存。', retry: '重试同一请求', uncertain: '请求结果不确定。请重试同一请求（不会重复创建），或取消重试并刷新确认。', abandon: '取消重试并刷新', busy: '正在保存…', unsaved: '请先保存或取消当前编辑。',
      discardHelp: '有未保存的修改，确定放弃？', discard: '放弃修改', keepEditing: '继续编辑', draftRestored: '已恢复上次未保存的草稿；保存或放弃后清除。', conflict: '版本冲突：已加载最新版本，请确认内容后再次保存。', noPlan: '此计划书已不存在，已关闭编辑。',
    };
    const en = {
      'personal-plans': 'Personal plans', 'work-plans': 'Work plans', intro: 'Plan books and daily check-ins, with separate durable personal and work spaces.', limits: 'Source-project data is not imported. No automatic notifications or source work-project links.',
      create: 'Create plan book', edit: 'Edit plan book', save: 'Save', cancel: 'Cancel', refresh: 'Refresh', select: 'Select plan book', empty: 'No plan books yet. Choose Create plan book to begin.', loading: 'Loading…', failed: 'Loading failed. Refresh to retry. Previous results are hidden; unsaved forms are retained.',
      title: 'Title', description: 'Summary', content: 'Plan document (Markdown)', preview: 'Preview', source: 'Edit source', markdownHelp: 'Headings, lists, task items, quotes, links, tables, bold and italic, inline code and code blocks. HTML and scripts are never executed; remote images are not loaded.', noContent: 'No document yet. Edit to add goals and steps.',
      start_date: 'Start date', end_date: 'End date (inclusive, optional)', frequency: 'Frequency', daily: 'Daily', weekly: 'Weekly', weekdays: 'Weekdays', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
      status: 'Plan status', active: 'Active', paused: 'Paused', completed: 'Completed', freeze: 'Dates and recurrence are frozen after the first check-in. Document and status remain editable. Dates must be in 2000–2099.',
      done_count: 'Completed', skipped_count: 'Skipped', scheduled_count: 'Scheduled to date', completion_rate: 'Completion rate', current_streak: 'Current streak', longest_streak: 'Longest streak', statsHelp: 'Streaks count scheduled days, not calendar days. An unchecked scheduled today breaks the current streak.',
      today: 'Today', zone: 'Time zone', month: 'Check-in calendar', previous: 'Previous month', next: 'Next month', date: 'Check-in date', note: 'Check-in note', done: 'Done', skipped: 'Skipped', pending: 'Not checked in', off: 'Not scheduled', markDone: 'Record done', markSkip: 'Record skipped', undo: 'Undo this check-in', checkinHelp: 'Select a scheduled day to log today or the preceding 365 days. Writes check the plan version.',
      history: 'Check-ins this month', noHistory: 'No check-ins this month.', remove: 'Delete plan book', confirmDelete: 'Permanently delete', deleteHelp: 'Permanently delete this plan book and all its check-ins? This cannot be undone.', saved: 'Changes saved.', retry: 'Retry same request', uncertain: 'The request outcome is uncertain. Retry the same request safely, or cancel the retry and refresh to inspect state.', abandon: 'Cancel retry and refresh', busy: 'Saving…', unsaved: 'Save or cancel the current editor first.',
      discardHelp: 'Discard unsaved changes?', discard: 'Discard changes', keepEditing: 'Keep editing', draftRestored: 'Restored an unsaved draft. Saving or discarding clears it.', conflict: 'Version conflict: the latest version is loaded. Review and save again.', noPlan: 'This plan book no longer exists; the editor was closed.',
    };
    const css = `
/* Personal workspace — plans scope */
.bp-page{height:100%;overflow:auto;box-sizing:border-box;min-width:0;padding:calc(var(--dsh-frame-top-clearance,0px) + 22px) clamp(18px,3.2vw,44px) 52px;color:var(--dsw-alias-label-primary);background:radial-gradient(1100px 380px at 112% -160px,color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent),transparent 70%),var(--dsw-alias-bg-base);font:inherit;font-size:14px;line-height:1.55}
.bp-page *{box-sizing:border-box}
.bp-wrap{max-width:1120px;margin:auto}
.bp-page h1{font-size:clamp(26px,2.4vw,32px);line-height:1.18;font-weight:600;letter-spacing:-.02em;margin:0 0 10px}
.bp-wrap>h1::before{content:'';display:block;width:42px;height:3px;border-radius:99px;margin-bottom:16px;background:linear-gradient(90deg,var(--dsw-alias-state-business-primary),color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent))}
.bp-page h2{font-size:19px;line-height:1.3;font-weight:600;letter-spacing:-.01em;margin:0 0 12px;overflow-wrap:anywhere}
.bp-page h3{font-size:15px;font-weight:600}
.bp-wrap>h1+.bp-muted{font-size:14.5px;line-height:1.7;max-width:76ch;margin:0}
.bp-wrap>h1+.bp-muted+.bp-muted{font-size:12.5px;line-height:1.65;max-width:82ch;margin:8px 0 0;padding-left:12px;border-left:2px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 38%,transparent)}
.bp-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.bp-between{justify-content:space-between}
.bp-muted{color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.65;margin:0}
p.bp-card{text-align:center;color:var(--dsw-alias-label-secondary);border-style:dashed;box-shadow:none}
.bp-card{padding:18px;border:1px solid var(--dsw-alias-border-l2);border-radius:16px;margin:16px 0;min-width:0;background:var(--dsw-alias-bg-layer-1);box-shadow:0 1px 2px rgb(16 24 40 / 5%),0 10px 24px -16px rgb(16 24 40 / 22%)}
.bp-page button,.bp-page input,.bp-page select,.bp-page textarea{font:inherit;color:inherit}
.bp-page button{cursor:pointer;min-height:34px;padding:6px 13px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);display:inline-flex;align-items:center;justify-content:center;gap:6px;transition:background .16s,border-color .16s,box-shadow .16s,color .16s,transform .08s}
.bp-page button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l3)}
.bp-page button:active:not(:disabled){transform:translateY(1px)}
.bp-page button:disabled{opacity:.45;cursor:not-allowed}
.bp-page button:focus-visible,.bp-page input:focus-visible,.bp-page textarea:focus-visible,.bp-page select:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
.bp-page .bp-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground);font-weight:600;box-shadow:0 10px 22px -16px color-mix(in srgb,var(--dsw-alias-brand-primary) 65%,transparent)}
.bp-page .bp-primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover);border-color:var(--dsw-alias-button-primary-hover);color:var(--dsw-alias-label-primary-foreground)}
.bp-page .bp-danger{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 32%,var(--dsw-alias-border-l2))}
.bp-page .bp-danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger)}
.bp-page input:not([type=checkbox]),.bp-page textarea,.bp-page select{width:100%;padding:8px 12px;border-radius:10px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);min-width:0;min-height:38px;transition:border-color .16s,box-shadow .16s}
.bp-page input:not([type=checkbox]):hover,.bp-page textarea:hover,.bp-page select:hover{border-color:var(--dsw-alias-border-l3)}
.bp-page input:not([type=checkbox]):focus,.bp-page textarea:focus,.bp-page select:focus{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px;border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 4px color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent)}
.bp-page textarea{resize:vertical;min-height:88px}
.bp-page .bp-document-input{min-height:280px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.7}
.bp-page input[type=checkbox]{width:16px;height:16px;accent-color:var(--dsw-alias-state-business-primary);margin:0}
.bp-field{display:grid;gap:7px;font-size:13px;min-width:0}
.bp-field>span{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500}
.bp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.bp-wide{grid-column:1/-1}
.bp-page fieldset{border:0;padding:0;margin:0;min-width:0;display:grid;gap:14px}
.bp-check{display:inline-flex;align-items:center;gap:7px;min-height:34px;font-size:13px;cursor:pointer}
.bp-notice{position:relative;border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,var(--dsw-alias-border-l1));border-radius:12px;padding:12px 14px 12px 16px;margin:12px 0;overflow-wrap:anywhere;background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent)}
.bp-notice::before{content:'';position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:99px;background:var(--dsw-alias-state-business-primary)}
.bp-notice.bp-error{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 26%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 7%,transparent)}
.bp-notice.bp-error::before{background:var(--dsw-alias-state-error-primary)}
.bp-error{color:var(--dsw-alias-state-error-primary)}
.bp-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.bp-stat{padding:14px 16px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;display:grid;gap:2px}
.bp-stat strong{display:block;font-size:24px;line-height:1.25;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.bp-stat span{font-size:12px;color:var(--dsw-alias-label-secondary);line-height:1.5}
.bp-reading{line-height:1.82;overflow-wrap:anywhere;white-space:normal;font-size:14.5px}
.bp-reading p{white-space:pre-wrap;margin:12px 0}
.bp-reading h1,.bp-reading h2,.bp-reading h3,.bp-reading h4{margin:22px 0 8px;font-size:18px}
.bp-reading ul,.bp-reading ol{padding-left:1.5em}
.bp-reading pre{overflow:auto;white-space:pre-wrap;padding:14px 16px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;font-size:12.5px;line-height:1.7}
.bp-reading code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.92em;padding:1px 5px;border-radius:5px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 6%,transparent)}
.bp-reading h5,.bp-reading h6{margin:20px 0 8px;font-size:15px}
.bp-reading li{margin:4px 0}
.bp-reading pre code{padding:0;background:none;font-size:inherit}
.bp-reading strong{font-weight:600}
.bp-reading em{font-style:italic}
.bp-reading del{text-decoration:line-through;opacity:.72}
.bp-reading a{color:var(--dsw-alias-state-business-primary);text-decoration:underline;text-underline-offset:2px;overflow-wrap:anywhere}
.bp-reading a:hover{text-decoration-thickness:2px}
.bp-reading a:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px;border-radius:3px}
.bp-reading blockquote{margin:14px 0;padding:8px 16px;border-left:3px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent);border-radius:0 10px 10px 0;background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 5%,transparent);color:var(--dsw-alias-label-secondary)}
.bp-reading blockquote p{margin:4px 0}
.bp-reading hr{border:0;border-top:1px solid var(--dsw-alias-border-l2);margin:22px 0}
.bp-reading .bp-task{display:flex;align-items:flex-start;gap:8px}
.bp-reading .bp-task input{width:15px;height:15px;margin:4px 0 0;flex:none;accent-color:var(--dsw-alias-state-business-primary);opacity:1}
.bp-reading .bp-task span{min-width:0}
.bp-reading .bp-table-wrap{margin:14px 0;overflow:auto;border:1px solid var(--dsw-alias-border-l1);border-radius:12px}
.bp-reading table{width:100%;border-collapse:separate;border-spacing:0;font-size:13px;line-height:1.6}
.bp-reading th,.bp-reading td{padding:8px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);text-align:left;vertical-align:top;min-width:90px;overflow-wrap:anywhere}
.bp-reading th{background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent);font-weight:600;white-space:nowrap}
.bp-reading tbody tr:last-child td{border-bottom:0}
.bp-reading .bp-md-image{display:inline-flex;align-items:center;gap:4px}
.bp-reading .bp-md-image::before{content:'▧';opacity:.55;font-size:.9em}
.bp-reading>:first-child{margin-top:0}
.bp-reading>:last-child{margin-bottom:0}
.bp-calendar{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;margin-top:14px}
.bp-calendar>.bp-muted{font-size:11px;letter-spacing:.05em;text-transform:uppercase;padding:2px 0 4px}
.bp-calendar .bp-day{padding:8px 2px;min-height:66px;display:grid;gap:3px;text-align:center;align-content:center;justify-content:center;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;font-size:13px;font-weight:500;transition:background .14s,border-color .14s,box-shadow .14s}
.bp-calendar .bp-day:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l2)}
.bp-calendar .bp-day:disabled{opacity:.6;background:transparent;border-style:dashed}
.bp-calendar .bp-day>span{font-size:13px;font-weight:600;font-variant-numeric:tabular-nums}
.bp-day small{font-size:10.5px;line-height:1.3;overflow-wrap:anywhere;color:var(--dsw-alias-label-secondary)}
.bp-page .bp-day.bp-done{border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 45%,var(--dsw-alias-border-l2));background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,transparent)}
.bp-page .bp-day.bp-skipped{border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 45%,var(--dsw-alias-border-l2));background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 13%,transparent)}
.bp-page .bp-day.bp-done small,.bp-page .bp-day.bp-skipped small{color:var(--dsw-alias-label-primary);font-weight:600}
.bp-page .bp-day.bp-done:disabled,.bp-page .bp-day.bp-skipped:disabled,.bp-page .bp-day.bp-picked:disabled{opacity:1;border-style:solid}
.bp-page .bp-picked{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px;border-color:transparent}
.bp-history{list-style:none;padding:0;margin:0}
.bp-history li{padding:12px 2px;border-bottom:1px solid var(--dsw-alias-border-l1);white-space:pre-wrap;overflow-wrap:anywhere;font-size:13.5px}
.bp-history li:last-child{border-bottom:0}
.bp-history p{margin:4px 0 0;color:var(--dsw-alias-label-secondary)}
.bp-page [role=status]{color:var(--dsw-alias-label-secondary);font-size:13px}
@media(max-width:680px){.bp-grid{grid-template-columns:minmax(0,1fr)}.bp-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.bp-page{padding-inline:16px}.bp-card{padding:14px}.bp-day small{font-size:10px}.bp-calendar{gap:4px}.bp-calendar .bp-day{min-height:58px}.bp-page input:not([type=checkbox]),.bp-page textarea,.bp-page select{font-size:16px}}

/* Card header alignment */
.bp-row>h2{margin-bottom:0}

@media(max-width:430px){.bp-calendar .bp-day{min-height:50px;padding:5px 2px}.bp-calendar .bp-day small{display:none}}
@media (pointer:coarse){.bp-page input:not([type=checkbox]),.bp-page textarea,.bp-page select{font-size:16px}}
@media (prefers-reduced-motion:reduce){.bp-page *,.bp-page *::before,.bp-page *::after{transition:none!important;transform:none!important}}
@media (hover:none){.bp-calendar .bp-day:not(.bp-done):not(.bp-skipped):hover:not(:disabled){background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l1)}}
`;
    function inline(text) {
      const source = String(text == null ? '' : text), out = [];
      const pattern = /(`[^`\n]+`|\*\*[^*\n]+\*\*|\b__[^_\n]+__\b|~~[^~\n]+~~|!\[[^\]\n]*\]\((?:https?:|mailto:)[^\s)]+\)|\[[^\]\n]+\]\((?:https?:|mailto:)[^\s)]+\)|\*[^*\n]+\*|\b_[^_\n]+_\b)/g;
      let last = 0, match;
      while ((match = pattern.exec(source))) {
        if (match.index > last) out.push(source.slice(last, match.index));
        const token = match[0], key = out.length;
        if (token.startsWith('`')) out.push(h('code', { key }, token.slice(1, -1)));
        else if (token.startsWith('**')) out.push(h('strong', { key }, inline(token.slice(2, -2))));
        else if (token.startsWith('__')) out.push(h('strong', { key }, inline(token.slice(2, -2))));
        else if (token.startsWith('~~')) out.push(h('del', { key }, inline(token.slice(2, -2))));
        else if (token.startsWith('![')) {
          const image = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
          if (image) out.push(h('a', { key, className: 'bp-md-image', href: image[2], target: '_blank', rel: 'noopener noreferrer', title: image[2] }, image[1] || image[2]));
          else out.push(token);
        } else if (token.startsWith('[')) {
          const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (link) out.push(h('a', { key, href: link[2], target: '_blank', rel: 'noopener noreferrer' }, inline(link[1])));
          else out.push(token);
        } else out.push(h('em', { key }, inline(token.slice(1, -1))));
        last = pattern.lastIndex;
      }
      if (last < source.length) out.push(source.slice(last));
      return out;
    }
    function splitRow(line) {
      let value = String(line || '').trim();
      if (value.startsWith('|')) value = value.slice(1);
      if (value.endsWith('|')) value = value.slice(0, -1);
      return value.split('|').map((cell) => cell.trim());
    }
    function Markdown({ text }) {
      const lines = String(text || '').replace(/\r\n?/g, '\n').split('\n');
      const nodes = [];
      let list = null, quote = null, code = null;
      const flushList = () => {
        if (!list) return;
        nodes.push(h(list.ordered ? 'ol' : 'ul', { key: nodes.length }, list.items.map((item, index) => h('li', { key: index, style: item.depth ? { marginInlineStart: item.depth * 18 } : undefined },
          item.task == null ? inline(item.text) : h('label', { className: 'bp-task' }, h('input', { type: 'checkbox', checked: item.task, disabled: true, readOnly: true, onChange: () => {} }), h('span', null, inline(item.text)))))));
        list = null;
      };
      const flushQuote = () => {
        if (!quote) return;
        nodes.push(h('blockquote', { key: nodes.length }, quote.map((line, index) => h('p', { key: index }, inline(line)))));
        quote = null;
      };
      const flushAll = () => { flushList(); flushQuote(); };
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        if (code) {
          if (/^\s*```/.test(line)) { nodes.push(h('pre', { key: nodes.length }, h('code', null, code.lines.join('\n')))); code = null; }
          else code.lines.push(line);
          continue;
        }
        const fence = line.match(/^\s*```\s*([\w+-]*)\s*$/);
        if (fence) { flushAll(); code = { lang: fence[1], lines: [] }; continue; }
        if (!line.trim()) { flushAll(); continue; }
        if (/^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)) { flushAll(); nodes.push(h('hr', { key: nodes.length })); continue; }
        const heading = line.match(/^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/);
        if (heading) { flushAll(); nodes.push(h('h' + heading[1].length, { key: nodes.length }, inline(heading[2]))); continue; }
        const quoted = line.match(/^\s{0,3}>\s?(.*)$/);
        if (quoted) { flushList(); if (!quote) quote = []; quote.push(quoted[1]); continue; }
        const bullet = line.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
        if (bullet) {
          flushQuote();
          const ordered = /^\d/.test(bullet[2]);
          const depth = Math.min(4, Math.floor(bullet[1].replace(/\t/g, '  ').length / 2));
          const task = bullet[3].match(/^\[([ xX])\]\s+(.*)$/);
          if (list && list.ordered !== ordered) flushList();
          if (!list) list = { ordered, items: [] };
          list.items.push({ depth, task: task ? task[1].toLowerCase() === 'x' : null, text: task ? task[2] : bullet[3] });
          continue;
        }
        if (index + 1 < lines.length && line.includes('|') && /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])) {
          const head = splitRow(line), separators = splitRow(lines[index + 1]);
          if (head.length > 1 && head.length === separators.length) {
            flushAll();
            const align = separators.map((cell) => cell.startsWith(':') && cell.endsWith(':') ? 'center' : cell.endsWith(':') ? 'right' : cell.startsWith(':') ? 'left' : undefined);
            const rows = [];
            let next = index + 2;
            while (next < lines.length && lines[next].trim() && lines[next].includes('|')) { rows.push(splitRow(lines[next])); next++; }
            nodes.push(h('div', { key: nodes.length, className: 'bp-table-wrap' }, h('table', null,
              h('thead', null, h('tr', null, head.map((cell, column) => h('th', { key: column, style: align[column] ? { textAlign: align[column] } : undefined }, inline(cell))))),
              h('tbody', null, rows.map((row, rowIndex) => h('tr', { key: rowIndex }, head.map((_, column) => h('td', { key: column, style: align[column] ? { textAlign: align[column] } : undefined }, inline(row[column] || '')))))))));
            index = next - 1;
            continue;
          }
        }
        flushAll();
        nodes.push(h('p', { key: nodes.length }, inline(line)));
      }
      if (code) nodes.push(h('pre', { key: nodes.length }, h('code', null, code.lines.join('\n'))));
      flushAll();
      return h('div', { className: 'bp-reading' }, nodes);
    }
    const monthOf = day => day.slice(0, 7);
    const shiftMonth = (value, delta) => { const [y, m] = value.split('-').map(Number); return new Date(Date.UTC(y, m - 1 + delta, 1)).toISOString().slice(0, 7); };
    return { inject: ['slots', 'locale'], apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, 'zh', zh)); ctx.effect(() => ctx.locale.register(NS, 'en', en));
      const t = ctx.locale.bind(NS);
      function useT() { useSyncExternalStore(useCallback(fn => ctx.locale.subscribe(fn), []), useCallback(() => ctx.locale.getSnapshot(), [])); return t; }
      async function api(scope, action, args, signal) {
        let response, result;
        try { response = await fetch('/api/split-plans/' + scope + '/' + action, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-DSH-Plans-UI': '1' }, body: JSON.stringify(args || {}), signal }); result = await response.json(); }
        catch (err) { err.uncertain = true; throw err; }
        if (!response.ok || result.ok !== true) { const err = new Error(result.error?.message || t('failed')); err.code = result.error?.code; err.uncertain = response.status >= 500 || ['STORAGE_ERROR', 'REQUEST_FAILED'].includes(err.code); throw err; }
        return result.value;
      }
      function Button({ children, ...props }) { return h('button', { type: 'button', ...props }, children); }
      function Field({ label, children, wide }) { return h('label', { className: 'bp-field' + (wide ? ' bp-wide' : '') }, h('span', null, label), children); }
      function Icon({ size = 18 }) { return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true }, h('path', { d: 'M6 3h12a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 14h14M8 7h8m-8 4 2 2 4-4' })); }
      function Editor({ scope, item, today, busy, onSave, onCancel }) {
        const t = useT(), draftKey = 'split-plans-draft:' + scope + ':' + (item?.id || 'new');
        const placeholder = { title: '', description: '', content: '', start_date: today, end_date: '', frequency: 'daily', weekdays: [], status: 'active' };
        const initial = useRef(null);
        if (initial.current === null) {
          const base = Object.fromEntries(Object.keys(placeholder).map(key => [key, item?.[key] ?? placeholder[key]]));
          let form = base, restored = false;
          try {
            const raw = sessionStorage.getItem(draftKey), parsed = raw ? JSON.parse(raw) : null;
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && typeof parsed.title === 'string' && typeof parsed.start_date === 'string') {
              form = { ...base, ...Object.fromEntries(Object.keys(placeholder).filter(key => parsed[key] !== undefined).map(key => [key, parsed[key]])) };
              restored = true;
            }
          } catch (_) { /* draft storage is optional */ }
          initial.current = { form, restored, snapshot: JSON.stringify(form) };
        }
        const [form, setForm] = useState(initial.current.form), [restored, setRestored] = useState(initial.current.restored), [confirming, setConfirming] = useState(false), [preview, setPreview] = useState(false);
        const titleRef = useRef(null);
        useEffect(() => { titleRef.current?.focus(); }, []);
        useEffect(() => {
          const data = JSON.stringify(form);
          if (data === initial.current.snapshot) return;
          const timer = setTimeout(() => { try { sessionStorage.setItem(draftKey, data); setRestored(false); } catch (_) { /* storage full or blocked */ } }, 250);
          return () => clearTimeout(timer);
        }, [form, draftKey]);
        const clearDraft = () => { try { sessionStorage.removeItem(draftKey); } catch (_) { /* ignore */ } };
        const change = (key, value) => setForm(f => ({ ...f, [key]: value }));
        const input = (key, props = {}) => h('input', { value: form[key] || '', onChange: e => change(key, e.target.value), ...props });
        const cancel = () => { if (JSON.stringify(form) !== initial.current.snapshot) setConfirming(true); else { clearDraft(); onCancel(); } };
        return h('form', { className: 'bp-card', onSubmit: e => { e.preventDefault(); onSave({ ...form, ...(item ? { id: item.id } : {}), end_date: form.end_date || null, weekdays: form.frequency === 'weekly' ? form.weekdays : [] }, item?.version); } },
          h('h2', null, t(item ? 'edit' : 'create')), h('p', { className: 'bp-muted' }, t('freeze')),
          restored && h('div', { className: 'bp-notice', role: 'status' }, t('draftRestored')),
          h('fieldset', { disabled: busy }, h('div', { className: 'bp-grid' },
            h(Field, { label: t('title'), wide: true }, input('title', { ref: titleRef, required: true, maxLength: 120 })),
            h(Field, { label: t('description'), wide: true }, h('textarea', { value: form.description, maxLength: 4000, onChange: e => change('description', e.target.value) })),
            h(Field, { label: t('start_date') }, input('start_date', { type: 'date', min: '2000-01-01', max: '2099-12-31', required: true })),
            h(Field, { label: t('end_date') }, input('end_date', { type: 'date', min: form.start_date, max: '2099-12-31' })),
            h(Field, { label: t('frequency') }, h('select', { value: form.frequency, onChange: e => change('frequency', e.target.value) }, ['daily', 'weekly'].map(x => h('option', { key: x, value: x }, t(x))))),
            h(Field, { label: t('status') }, h('select', { value: form.status, onChange: e => change('status', e.target.value) }, ['active', 'paused', 'completed'].map(x => h('option', { key: x, value: x }, t(x))))),
            form.frequency === 'weekly' && h('fieldset', { className: 'bp-wide' }, h('legend', null, t('weekdays')), h('div', { className: 'bp-row' }, ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day, i) => h('label', { key: day, className: 'bp-check' }, h('input', { type: 'checkbox', checked: form.weekdays.includes(i), onChange: e => change('weekdays', e.target.checked ? [...form.weekdays, i].sort() : form.weekdays.filter(x => x !== i)) }), t(day))))),
            h('div', { className: 'bp-wide' }, h('div', { className: 'bp-row bp-between' }, h('strong', null, t('content')), h(Button, { onClick: () => setPreview(x => !x) }, t(preview ? 'source' : 'preview'))), h('p', { className: 'bp-muted' }, t('markdownHelp')), preview ? h(Markdown, { text: form.content }) : h('textarea', { 'aria-label': t('content'), className: 'bp-document-input', value: form.content, maxLength: 50000, onChange: e => change('content', e.target.value) })),
          )),
          h('div', { className: 'bp-row', style: { marginTop: 16 } }, confirming
            ? h(React.Fragment, null, h('p', { className: 'bp-muted' }, t('discardHelp')), h(Button, { className: 'bp-danger', disabled: busy, onClick: () => { clearDraft(); onCancel(); } }, t('discard')), h(Button, { disabled: busy, onClick: () => setConfirming(false) }, t('keepEditing')))
            : h(React.Fragment, null, h('button', { type: 'submit', className: 'bp-primary', disabled: busy }, t('save')), h(Button, { disabled: busy, onClick: cancel }, t('cancel')))));
      }
      function Page({ scope }) {
        const t = useT(), [summary, setSummary] = useState(null), [calendar, setCalendar] = useState(null), [selectedId, setSelectedId] = useState(''), [month, setMonth] = useState('');
        const [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [loadFailed, setLoadFailed] = useState(false);
        const [editor, setEditor] = useState(null), [checkin, setCheckin] = useState(null), [deleting, setDeleting] = useState(false), [retry, setRetry] = useState(null);
        const mounted = useRef(false), generation = useRef(0), reads = useRef(new Set()), lock = useRef(false), focusReturn = useRef(null), checkinRef = useRef(null), deleteRef = useRef(null), writeRequest = useRef(null);
        useEffect(() => { mounted.current = true; return () => { mounted.current = false; ++generation.current; for (const controller of reads.current) controller.abort(); writeRequest.current?.abort(); }; }, []);
        const load = useCallback(async targetMonth => {
          const ticket = ++generation.current, controller = new AbortController(); reads.current.add(controller); setLoading(true); setLoadFailed(false);
          try {
            const next = await api(scope, 'summary', {}, controller.signal);
            const value = targetMonth || monthOf(next.today), [year, m] = value.split('-').map(Number);
            const cal = await api(scope, 'calendar', { year, month: m }, controller.signal);
            if (mounted.current && ticket === generation.current) { setSummary(next); setCalendar(cal); setMonth(value); setSelectedId(id => next.plans.some(p => p.id === id) ? id : next.plans[0]?.id || ''); return { next, cal, value }; }
          } catch (err) { if (mounted.current && ticket === generation.current) { setLoadFailed(true); setError(t('failed') + ' ' + err.message); } }
          finally { reads.current.delete(controller); if (mounted.current && ticket === generation.current) setLoading(false); }
          return null;
        }, [scope]);
        useEffect(() => { load(); }, [load]);
        const closeForms = () => { setEditor(null); setCheckin(null); setDeleting(false); focusReturn.current?.focus(); };
        const newRequestId = () => globalThis.crypto?.randomUUID?.() || 'ui-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
        const mutate = async (action, args, requestId) => {
          if (lock.current) return; lock.current = true; setBusy(true); setError(''); setNotice(''); setRetry(null);
          ++generation.current; for (const controller of reads.current) controller.abort();
          let payload, controller;
          try {
            payload = { ...args, request_id: requestId || newRequestId() }; controller = new AbortController(); writeRequest.current = controller;
            await api(scope, action, payload, controller.signal);
            if (mounted.current) {
              if (action === 'save') { try { sessionStorage.removeItem('split-plans-draft:' + scope + ':' + (args.item?.id || 'new')); } catch (_) { /* draft cleanup is best effort */ } }
              closeForms(); setNotice(t('saved')); await load(month);
            }
          } catch (err) {
            if (!mounted.current) return;
            if (err.code === 'VERSION_CONFLICT') {
              const data = await load(month);
              if (!mounted.current) return;
              if (action === 'save' && data) {
                const latest = data.next.plans.find(p => p.id === args.item?.id);
                if (latest) setEditor(current => current?.item ? { item: latest } : current);
                else { setEditor(null); setError(t('noPlan')); }
              }
              setCheckin(null); setDeleting(false);
              if (data) setError(t('conflict'));
            } else if (payload) {
              setError(err.message);
              if (err.uncertain) setRetry({ action, args: payload, requestId: payload.request_id });
            } else setError(t('failed') + ' ' + (err?.message || ''));
          } finally { writeRequest.current = null; lock.current = false; if (mounted.current) { setBusy(false); setLoading(false); } }
        };
        const plan = summary?.plans.find(x => x.id === selectedId), stats = summary?.stats?.[selectedId] || {}, editing = !!editor || !!checkin || deleting, disabled = busy || !!retry || editing;
        const pickDay = (date, trigger) => { if (!plan) return; focusReturn.current = trigger; const existing = calendar.checkins.find(c => c.plan_id === plan.id && c.date === date); setCheckin({ date, note: existing?.note || '', existing: !!existing }); };
        useEffect(() => { if (checkin) checkinRef.current?.focus(); }, [checkin?.date]);
        useEffect(() => { if (deleting) deleteRef.current?.focus(); }, [deleting]);
        const earliest = summary ? new Date(Date.parse(summary.today + 'T00:00:00Z') - 365 * 86400000).toISOString().slice(0, 10) : '';
        return h('section', { className: 'bp-page', 'aria-label': t(scope + '-plans') }, h('style', null, css), h('div', { className: 'bp-wrap', 'aria-busy': loading },
          h('h1', null, t(scope + '-plans')), h('p', { className: 'bp-muted' }, t('intro')), h('p', { className: 'bp-muted' }, t('limits')),
          error && h('div', { className: 'bp-notice bp-error', role: 'alert' }, error), notice && h('div', { className: 'bp-notice', role: 'status' }, notice),
          retry && h('div', { className: 'bp-notice' }, h('p', null, t('uncertain')), h('div', { className: 'bp-row' }, h(Button, { disabled: busy, onClick: () => mutate(retry.action, retry.args, retry.requestId) }, t('retry')), h(Button, { disabled: busy, onClick: () => { setRetry(null); closeForms(); setError(''); load(month); } }, t('abandon')))),
          h('div', { className: 'bp-row bp-between' }, h('p', { className: 'bp-muted' }, summary ? t('today') + ': ' + summary.today + ' · ' + t('zone') + ': ' + summary.timezone : ''), h('div', { className: 'bp-row' }, h(Button, { disabled: busy || loading || !!retry, onClick: () => { setError(''); load(month); } }, t('refresh')), h(Button, { className: 'bp-primary', disabled: disabled || loading || loadFailed, onClick: e => { focusReturn.current = e.currentTarget; setEditor({ item: null }); } }, t('create')))),
          busy && h('p', { role: 'status' }, t('busy')), loading && h('p', { role: 'status' }, t('loading')),
          editor && h(Editor, { key: editor.item?.id || 'new', scope, item: editor.item, today: summary.today, busy: busy || !!retry, onCancel: closeForms, onSave: (item, version) => mutate('save', { item, ...(version ? { version } : {}) }) }),
          !loadFailed && summary && h(React.Fragment, null,
            summary.plans.length === 0 ? h('p', { className: 'bp-card' }, t('empty')) : h(Field, { label: t('select') }, h('select', { value: selectedId, disabled: disabled || loading, onChange: e => { setSelectedId(e.target.value); setError(''); setNotice(''); } }, summary.plans.map(p => h('option', { key: p.id, value: p.id }, p.title + ' · ' + t(p.status))))),
            plan && h(React.Fragment, null,
              h('article', { className: 'bp-card' }, h('div', { className: 'bp-row bp-between' }, h('h2', null, plan.title), h('div', { className: 'bp-row' }, h(Button, { disabled, onClick: e => { focusReturn.current = e.currentTarget; setEditor({ item: plan }); } }, t('edit')), h(Button, { className: 'bp-danger', disabled, onClick: e => { focusReturn.current = e.currentTarget; setDeleting(true); } }, t('remove')))),
                h('p', { className: 'bp-muted' }, t(plan.status) + ' · ' + plan.start_date + ' → ' + (plan.end_date || '∞') + ' · ' + t(plan.frequency) + (plan.frequency === 'weekly' ? ' (' + plan.weekdays.map(i => t(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][i])).join(', ') + ')' : '')), plan.description && h('p', { className: 'bp-reading' }, plan.description), plan.content ? h(Markdown, { text: plan.content }) : h('p', { className: 'bp-muted' }, t('noContent')),
                deleting && h('div', { ref: deleteRef, tabIndex: -1, className: 'bp-notice', role: 'group', 'aria-label': t('confirmDelete'), onKeyDown: e => { if (e.key === 'Escape' && !busy && !retry) closeForms(); } }, h('p', null, t('deleteHelp')), h('strong', null, plan.title), h('div', { className: 'bp-row' }, h(Button, { className: 'bp-danger', disabled: busy || !!retry, onClick: () => mutate('delete', { id: plan.id, version: plan.version }) }, t('confirmDelete')), h(Button, { disabled: busy || !!retry, onClick: closeForms }, t('cancel'))))),
              h('div', { className: 'bp-stats' }, ['scheduled_count', 'done_count', 'skipped_count', 'completion_rate', 'current_streak', 'longest_streak'].map(key => h('div', { className: 'bp-stat', key }, h('strong', null, (stats[key] ?? 0) + (key === 'completion_rate' ? '%' : '')), h('span', { className: 'bp-muted' }, t(key))))), h('p', { className: 'bp-muted' }, t('statsHelp')),
              h('section', { className: 'bp-card' }, h('div', { className: 'bp-row bp-between' }, h('h2', null, t('month')), h('div', { className: 'bp-row' }, h(Button, { disabled: disabled || month <= '2000-01', 'aria-label': t('previous'), onClick: () => load(shiftMonth(month, -1)) }, '‹'), h('strong', null, month), h(Button, { disabled: disabled || month >= '2099-12', 'aria-label': t('next'), onClick: () => load(shiftMonth(month, 1)) }, '›'))), h('p', { className: 'bp-muted' }, t('checkinHelp')),
                                h(Button, { className: 'bp-primary', disabled: disabled || loading || plan.status !== 'active' || !summary.today_scheduled.includes(plan.id), onClick: async e => { const trigger = e.currentTarget, target = monthOf(summary.today), data = month === target ? { cal: calendar } : await load(target); if (!data || !mounted.current) return; const existing = data.cal.checkins.find(c => c.plan_id === plan.id && c.date === summary.today); focusReturn.current = trigger; setCheckin({ date: summary.today, note: existing?.note || '', existing: !!existing }); } }, t('today') + ' · ' + t(summary.today_checkins[plan.id] || 'pending')),
                h('div', { className: 'bp-calendar' }, ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(x => h('span', { className: 'bp-muted', key: x, style: { textAlign: 'center' } }, t(x))),
                  Array.from({ length: (new Date(month + '-01T00:00:00Z').getUTCDay() + 6) % 7 }, (_, i) => h('span', { key: 'blank' + i })),
                  Object.entries(calendar.days).map(([date, day]) => { const state = day.checkins[plan.id], scheduled = day.scheduled.includes(plan.id), allowed = scheduled && date <= summary.today && date >= earliest && (date !== summary.today || plan.status === 'active'); return h(Button, { key: date, className: 'bp-day' + (state ? ' bp-' + state : '') + (checkin?.date === date ? ' bp-picked' : ''), disabled: disabled || loading || !allowed, 'aria-label': date + ' ' + t(state || (scheduled ? 'pending' : 'off')), title: date + ' ' + t(state || (scheduled ? 'pending' : 'off')), onClick: e => pickDay(date, e.currentTarget) }, h('span', null, Number(date.slice(-2))), h('small', null, t(state || (scheduled ? 'pending' : 'off')))); }))),
              checkin && h('form', { className: 'bp-card', onSubmit: e => { e.preventDefault(); mutate('checkin', { id: plan.id, version: plan.version, date: checkin.date, status: 'done', note: checkin.note }); } }, h('h2', null, t('date') + ': ' + checkin.date), h('fieldset', { disabled: busy || !!retry }, h(Field, { label: t('note') }, h('textarea', { ref: checkinRef, value: checkin.note, maxLength: 1000, onChange: e => setCheckin(c => ({ ...c, note: e.target.value })) })), h('div', { className: 'bp-row', style: { marginTop: 12 } }, h('button', { type: 'submit', className: 'bp-primary' }, t('markDone')), h(Button, { onClick: () => mutate('checkin', { id: plan.id, version: plan.version, date: checkin.date, status: 'skipped', note: checkin.note }) }, t('markSkip')), checkin.existing && h(Button, { className: 'bp-danger', onClick: () => mutate('undo_checkin', { id: plan.id, version: plan.version, date: checkin.date }) }, t('undo')), h(Button, { onClick: closeForms }, t('cancel'))))),
              h('section', { className: 'bp-card' }, h('h2', null, t('history')), h('ul', { className: 'bp-history' }, calendar.checkins.filter(c => c.plan_id === plan.id).sort((a, b) => b.date.localeCompare(a.date)).map(c => h('li', { key: c.date }, h('strong', null, c.date + ' · ' + t(c.status)), c.note && h('p', null, c.note)))), !calendar.checkins.some(c => c.plan_id === plan.id) && h('p', { className: 'bp-muted' }, t('noHistory'))),
            )),
        ));
      }
      for (const [scope, order] of [['work', 45], ['personal', 46]]) {
        const id = scope + '-plans';
        ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, locale: NS }, () => h(Page, { scope, key: scope })));
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, locale: NS, label: () => t(id) }, props => h(Icon, props)));
      }
    } };
  },
});
