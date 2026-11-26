window.__ModuleLoader__.load({
  id: '@local/dsh-split-notes',
  factory(require) {
    const React = require('react'), { useState, useEffect, useRef, useCallback, useSyncExternalStore } = React;
    const h = React.createElement, NS = 'split-notes';
    const zh = {
      'personal-notes': '个人笔记', 'work-notes': '工作笔记', intro: '留住想法，也留住来处。个人与工作笔记独立保存。', limits: '不自动导入旧数据，不关联原项目，也不自动生成长期记忆。',
      create: '新建笔记', edit: '编辑', save: '保存笔记', cancel: '取消', close: '关闭', refresh: '刷新', title: '标题', content: '正文（Markdown）', tags: '标签（用逗号分隔）', pinned: '置顶', archived: '已归档', active: '未归档', all: '全部', filter: '笔记范围', search: '全文搜索', tag: '按标签筛选', searchHelp: '搜索标题、完整正文与标签；标签筛选为精确匹配。', empty: '没有符合条件的笔记。可以调整筛选，或新建一篇。', select: '选择一篇笔记阅读，或点击“新建笔记”。', loading: '加载中…', failed: '请求失败，请重试。', noContent: '暂无正文。', preview: '预览', source: '编辑正文', markdownHelp: '支持标题、列表、任务清单、引用、链接、表格、粗体/斜体、行内代码和代码块；不执行 HTML，不加载外部图片。',
      history: '历史版本', revision: '版本', current: '当前', restore: '恢复此版本', restoreHelp: '将此历史内容保存为新的当前版本，保留已有历史。', remove: '删除笔记', deleteHelp: '删除这篇笔记及其可浏览的历史版本，无法撤销。用于防止重复写入的内部幂等收据仍可能保留先前内容；这不是安全擦除。', confirm: '确认操作', saved: '操作已保存。', busy: '正在保存…', discard: '放弃修改', discardHelp: '有未保存的草稿，确定放弃？', keep: '继续编辑', draft: '已恢复本标签页的未保存草稿。', uncertain: '请求结果尚未确认。请重试同一请求，不会重复写入；或先刷新检查结果。', retry: '重试同一请求', abandon: '刷新核对（保留待确认请求）', conflict: '版本已变化，未覆盖新内容。你的草稿已保留；请先复制需要的内容，然后放弃草稿并重新打开最新笔记。', changed: '数据已更新，请刷新后重试。', count: '篇笔记', updated: '更新于', back: '关闭历史', tagLimit: '最多 20 个标签，每个最多 40 字。', pending: '有待确认的写入，请先处理重试。', storage: '浏览器草稿存储不可用；离开页面可能丢失未保存内容。'
    };
    const en = {
      'personal-notes': 'Personal notes', 'work-notes': 'Work notes', intro: 'Keep your ideas and their context. Personal and work notes are stored separately.', limits: 'No legacy import, source-project links or automatic long-term memory generation.',
      create: 'Create note', edit: 'Edit', save: 'Save note', cancel: 'Cancel', close: 'Close', refresh: 'Refresh', title: 'Title', content: 'Body (Markdown)', tags: 'Tags (comma-separated)', pinned: 'Pinned', archived: 'Archived', active: 'Unarchived', all: 'All', filter: 'Note scope', search: 'Full-text search', tag: 'Filter by tag', searchHelp: 'Search titles, full bodies and tags. Tag filters match exactly.', empty: 'No matching notes. Change the filters or create a note.', select: 'Select a note to read, or create a new one.', loading: 'Loading…', failed: 'Request failed. Please retry.', noContent: 'No content yet.', preview: 'Preview', source: 'Edit source', markdownHelp: 'Headings, lists, task items, quotes, links, tables, bold and italic, inline code and code blocks. HTML is never executed and remote images are not loaded.',
      history: 'Revision history', revision: 'Revision', current: 'Current', restore: 'Restore this revision', restoreHelp: 'Save this historical content as a new current revision. Existing history is retained.', remove: 'Delete note', deleteHelp: 'Delete this note and its browsable revision history? This cannot be undone. Internal idempotency receipts may retain prior content to prevent duplicate writes; this is not secure erasure.', confirm: 'Confirm operation', saved: 'Changes saved.', busy: 'Saving…', discard: 'Discard changes', discardHelp: 'Discard your unsaved draft?', keep: 'Keep editing', draft: 'Restored an unsaved draft from this tab.', uncertain: 'The write outcome is not confirmed. Retry the same request safely, or refresh to inspect the result.', retry: 'Retry same request', abandon: 'Refresh (keep pending request)', conflict: 'The revision changed. Newer content was not overwritten and your draft is retained. Copy any needed text, then discard the draft and reopen the latest note.', changed: 'The data changed. Refresh and retry.', count: 'notes', updated: 'Updated', back: 'Close history', tagLimit: 'Up to 20 tags, 40 characters each.', pending: 'Resolve the unconfirmed write first.', storage: 'Browser draft storage is unavailable. Leaving may lose unsaved changes.'
    };
    const css = `
/* Personal workspace — notes scope */
.sn-page{height:100%;min-width:0;overflow:auto;box-sizing:border-box;padding:calc(var(--dsh-frame-top-clearance,0px) + 22px) clamp(18px,3.2vw,44px) 52px;color:var(--dsw-alias-label-primary);background:radial-gradient(1100px 380px at 112% -160px,color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent),transparent 70%),var(--dsw-alias-bg-base);font:inherit;font-size:14px;line-height:1.55}
.sn-page *{box-sizing:border-box}
.sn-wrap{max-width:1180px;margin:0 auto}
.sn-page h1{font-size:clamp(26px,2.4vw,32px);line-height:1.18;font-weight:600;letter-spacing:-.02em;margin:0 0 10px}
.sn-wrap>h1::before{content:'';display:block;width:42px;height:3px;border-radius:99px;margin-bottom:16px;background:linear-gradient(90deg,var(--dsw-alias-state-business-primary),color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent))}
.sn-page h2{font-size:20px;line-height:1.3;font-weight:600;letter-spacing:-.01em;margin:0;overflow-wrap:anywhere}
.sn-page h3{font-size:15.5px;line-height:1.35;font-weight:600;margin:0}
.sn-wrap>h1+.sn-muted{font-size:14.5px;line-height:1.7;max-width:74ch;margin:0}
.sn-wrap>h1+.sn-muted+.sn-muted{font-size:12.5px;line-height:1.65;max-width:82ch;margin:8px 0 0;padding-left:12px;border-left:2px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 38%,transparent)}
.sn-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.sn-between{justify-content:space-between}
.sn-muted{font-size:13px;line-height:1.65;color:var(--dsw-alias-label-secondary);margin:0}
.sn-card{border:1px solid var(--dsw-alias-border-l2);border-radius:16px;padding:20px;min-width:0;background:var(--dsw-alias-bg-layer-1);box-shadow:0 1px 2px rgb(16 24 40 / 5%),0 10px 24px -16px rgb(16 24 40 / 22%)}
.sn-toolbar{margin:24px 0 14px}
.sn-page button,.sn-page input,.sn-page textarea,.sn-page select{font:inherit;color:inherit}
.sn-page button{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:6px 13px;min-height:34px;cursor:pointer;transition:background .16s,border-color .16s,box-shadow .16s,color .16s,transform .08s}
.sn-page button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l3)}
.sn-page button:active:not(:disabled){transform:translateY(1px)}
.sn-page button:disabled{opacity:.45;cursor:not-allowed}
.sn-page button:focus-visible,.sn-page input:focus-visible,.sn-page textarea:focus-visible,.sn-page select:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
.sn-page .sn-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-bg-base);font-weight:600;box-shadow:0 10px 22px -16px color-mix(in srgb,var(--dsw-alias-brand-primary) 65%,transparent)}
.sn-page .sn-primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover);border-color:var(--dsw-alias-button-primary-hover);color:var(--dsw-alias-bg-base)}
.sn-page .sn-danger{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 32%,var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1)}
.sn-page .sn-danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 52%,var(--dsw-alias-border-l2))}
.sn-error{color:var(--dsw-alias-state-error-primary)}
.sn-page input:not([type=checkbox]),.sn-page select,.sn-page textarea{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:9px 12px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);width:100%;min-width:0;min-height:38px;transition:border-color .16s,box-shadow .16s,background .16s}
.sn-page input:not([type=checkbox]):hover,.sn-page select:hover,.sn-page textarea:hover{border-color:var(--dsw-alias-border-l3)}
.sn-page input:not([type=checkbox]):focus,.sn-page select:focus,.sn-page textarea:focus{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px;border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 4px color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent)}
.sn-page input::placeholder,.sn-page textarea::placeholder{color:var(--dsw-alias-label-secondary);opacity:.75}
.sn-page textarea{resize:vertical;min-height:320px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.7}
.sn-page input[type=checkbox]{width:16px;height:16px;accent-color:var(--dsw-alias-state-business-primary);margin:0}
.sn-field{display:grid;gap:7px;min-width:0;font-size:13px}
.sn-field>span{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500;letter-spacing:.02em}
.sn-filters{display:grid;grid-template-columns:minmax(140px,2fr) minmax(110px,1fr) minmax(110px,1fr) auto;gap:12px;align-items:end;padding:16px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent)}
.sn-filters>button[type=submit]{min-height:38px}
.sn-notice{position:relative;padding:12px 14px 12px 16px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,var(--dsw-alias-border-l1));border-radius:12px;margin:12px 0;line-height:1.65;overflow-wrap:anywhere;background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent)}
.sn-notice::before{content:'';position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:99px;background:var(--dsw-alias-state-business-primary)}
.sn-notice.sn-error{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 26%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 7%,transparent)}
.sn-notice.sn-error::before{background:var(--dsw-alias-state-error-primary)}
.sn-notice h3{margin:0 0 4px}
.sn-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;min-width:0}
.sn-list>.sn-muted{grid-column:1/-1;padding:30px 14px;text-align:center;border:1px dashed var(--dsw-alias-border-l2);border-radius:14px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 2%,transparent)}
.sn-page .sn-note{width:100%;display:grid;align-content:start;justify-items:stretch;gap:5px;text-align:start;padding:13px 15px;border-radius:12px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);box-shadow:0 1px 1px rgb(16 24 40 / 3%);transition:background .16s,border-color .16s,box-shadow .16s}
.sn-page .sn-note:not([aria-pressed=true]):hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l2)}
.sn-list .sn-note:focus-visible{outline-offset:-2px}
.sn-page .sn-note[aria-pressed=true]{border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 46%,var(--dsw-alias-border-l2));background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 7%,var(--dsw-alias-bg-layer-1));box-shadow:inset 3px 0 0 var(--dsw-alias-state-business-primary)}
.sn-note strong{font-size:14px;line-height:1.45;font-weight:600;overflow-wrap:anywhere}
.sn-excerpt{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;font-size:12.5px}
.sn-note small{font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.sn-tags{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0 4px}
.sn-tag{font-size:11.5px;line-height:1.5;padding:3px 9px;border-radius:999px;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 22%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 9%,transparent)}
.sn-reading{line-height:1.82;overflow-wrap:anywhere;font-size:14.5px;color:var(--dsw-alias-label-primary)}
.sn-reading h1{font-size:24px;margin:26px 0 10px}
.sn-reading h2{font-size:20px;margin:24px 0 10px}
.sn-reading h3{font-size:17px;margin:22px 0 8px}
.sn-reading h4,.sn-reading h5,.sn-reading h6{font-size:15px;margin:20px 0 8px}
.sn-reading p{margin:12px 0}
.sn-reading ul,.sn-reading ol{margin:12px 0;padding-left:1.5em}
.sn-reading li{margin:4px 0}
.sn-reading pre{overflow:auto;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:14px 16px;white-space:pre;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.7}
.sn-reading code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.92em;padding:1px 5px;border-radius:5px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 6%,transparent)}
.sn-reading pre code{padding:0;background:none;font-size:inherit}
.sn-reading strong{font-weight:600}
.sn-reading em{font-style:italic}
.sn-reading del{text-decoration:line-through;opacity:.72}
.sn-reading a{color:var(--dsw-alias-state-business-primary);text-decoration:underline;text-underline-offset:2px;overflow-wrap:anywhere}
.sn-reading a:hover{text-decoration-thickness:2px}
.sn-reading a:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px;border-radius:3px}
.sn-reading blockquote{margin:14px 0;padding:8px 16px;border-left:3px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent);border-radius:0 10px 10px 0;background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 5%,transparent);color:var(--dsw-alias-label-secondary)}
.sn-reading blockquote p{margin:4px 0}
.sn-reading hr{border:0;border-top:1px solid var(--dsw-alias-border-l2);margin:22px 0}
.sn-reading .sn-task{display:flex;align-items:flex-start;gap:8px}
.sn-reading .sn-task input{width:15px;height:15px;margin:4px 0 0;flex:none;accent-color:var(--dsw-alias-state-business-primary);opacity:1}
.sn-reading .sn-task span{min-width:0}
.sn-reading .sn-table-wrap{margin:14px 0;overflow:auto;border:1px solid var(--dsw-alias-border-l1);border-radius:12px}
.sn-reading table{width:100%;border-collapse:separate;border-spacing:0;font-size:13px;line-height:1.6}
.sn-reading th,.sn-reading td{padding:8px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);text-align:left;vertical-align:top;min-width:90px;overflow-wrap:anywhere}
.sn-reading th{background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent);font-weight:600;white-space:nowrap}
.sn-reading tbody tr:last-child td{border-bottom:0}
.sn-reading .sn-md-image{display:inline-flex;align-items:center;gap:4px}
.sn-reading .sn-md-image::before{content:'▧';opacity:.55;font-size:.9em}
.sn-reading>:first-child{margin-top:0}
.sn-reading>:last-child{margin-bottom:0}
.sn-editor{display:block;min-width:0}
.sn-editor fieldset{border:0;padding:0;margin:0;display:grid;gap:16px;min-width:0}
.sn-editor fieldset[disabled]{opacity:.85}
.sn-editor h2{padding-bottom:2px}
.sn-check{display:inline-flex;align-items:center;gap:7px;font-size:13px;min-height:32px;cursor:pointer}
.sn-history{border-top:1px solid var(--dsw-alias-border-l1);margin-top:22px;padding-top:20px}
.sn-history h3{margin-bottom:10px}
.sn-history details{margin:10px 0;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px 14px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 2%,transparent)}
.sn-history summary{cursor:pointer;overflow-wrap:anywhere;font-size:13px;font-weight:500}
.sn-history summary:hover{color:var(--dsw-alias-state-business-primary)}
.sn-page details[open] summary{margin-bottom:8px}
.sn-spacer{margin-top:16px}
.sn-page [role=status]{color:var(--dsw-alias-label-secondary);font-size:13px}
@media(max-width:860px){.sn-filters{grid-template-columns:1fr 1fr}.sn-filters>:first-child{grid-column:1/-1}}
@media(max-width:560px){.sn-page{padding-inline:16px}.sn-card{padding:16px}.sn-page input:not([type=checkbox]),.sn-page select,.sn-page textarea{font-size:16px}.sn-filters{grid-template-columns:1fr}.sn-toolbar{margin-top:20px}}

/* Card header alignment */
.sn-page .sn-card>.sn-row{margin-bottom:10px}
.sn-page .sn-card>.sn-row+.sn-muted{margin-top:0}

@media (pointer:coarse){.sn-page input:not([type=checkbox]),.sn-page select,.sn-page textarea{font-size:16px}}
@media (prefers-reduced-motion:reduce){.sn-page *,.sn-page *::before,.sn-page *::after{transition:none!important;transform:none!important}}
@media (hover:none){.sn-page .sn-note:not([aria-pressed=true]):hover:not(:disabled){background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l1)}}

/* Modal reader, editor and confirm surfaces */
.sn-page.sn-modal-open{overflow:hidden}
.sn-modal-backdrop{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:18px;background:var(--dsw-alias-bg-mask-3);backdrop-filter:blur(6px);overscroll-behavior:contain}
.sn-modal{position:relative;width:min(920px,100%);max-height:90vh;overflow:auto;padding:0;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:16px;box-shadow:0 32px 80px rgb(0 0 0 / 32%);overscroll-behavior:contain}
.sn-modal-bar{position:sticky;top:0;z-index:2;display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:14px 20px;background:var(--dsw-alias-bg-layer-1);border-bottom:1px solid var(--dsw-alias-border-l1);border-radius:16px 16px 0 0}
.sn-modal-bar h2,.sn-modal-bar h3{flex:1 1 220px;font-size:20px;line-height:1.35;font-weight:600;letter-spacing:-.01em;margin:0;overflow-wrap:anywhere}
.sn-modal-bar h3{font-size:17px}
.sn-modal-bar .sn-row{flex:0 0 auto;justify-content:flex-end}
.sn-page .sn-modal-close{flex:none;width:34px;height:34px;min-height:34px;padding:0;border-radius:10px;font-size:20px;line-height:1;color:var(--dsw-alias-label-secondary)}
.sn-page .sn-modal-close:hover:not(:disabled){color:var(--dsw-alias-label-primary)}
.sn-modal-body{padding:18px 20px 24px;min-width:0}
.sn-modal .sn-reading{max-width:76ch}
.sn-modal .sn-tags{margin-top:8px}
.sn-editor-body{display:grid;gap:16px;padding:18px 20px 24px;min-width:0}
.sn-editor-footer{position:sticky;bottom:0;z-index:2;display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap;padding:12px 20px;background:var(--dsw-alias-bg-layer-1);border-top:1px solid var(--dsw-alias-border-l1);border-radius:0 0 16px 16px}
.sn-editor-footer>span{flex:1 1 220px;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.6}
.sn-editor-status{flex:1 1 100%;font-size:12.5px;line-height:1.55;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}
.sn-editor-status.sn-error{color:var(--dsw-alias-state-error-primary);font-weight:600}
.sn-editor-modal{width:min(780px,100%)}
.sn-confirm-modal{width:min(560px,100%)}
.sn-confirm-backdrop{z-index:1100}
.sn-confirm-modal .sn-modal-body{display:grid;gap:12px}
.sn-confirm-modal .sn-modal-body p{margin:0}
@media(max-width:640px){
  .sn-modal-backdrop{padding:0}
  .sn-modal{width:100%;max-width:none;height:100vh;height:100dvh;max-height:100vh;max-height:100dvh;border-radius:0;border:0;box-shadow:none}
  .sn-modal-bar{border-radius:0;padding:12px 16px}
  .sn-modal-bar h2{font-size:18px;flex:1 1 auto}
  .sn-modal-bar .sn-row{width:100%;justify-content:flex-start}
  .sn-modal-body,.sn-editor-body{padding:16px}
  .sn-editor-footer{padding:12px 16px;border-radius:0}
  .sn-page .sn-modal-close{width:32px;height:32px;min-height:32px}
  .sn-list{grid-template-columns:1fr}
  .sn-confirm-backdrop{padding:16px}
  .sn-confirm-modal{height:auto;max-height:calc(100dvh - 32px);border-radius:16px;border:1px solid var(--dsw-alias-border-l2)}
  .sn-confirm-modal .sn-modal-bar{border-radius:16px 16px 0 0}
}
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
          if (image) out.push(h('a', { key, className: 'sn-md-image', href: image[2], target: '_blank', rel: 'noopener noreferrer', title: image[2] }, image[1] || image[2]));
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
    function excerptText(text) {
      let value = String(text == null ? '' : text);
      value = value.replace(/```[\s\S]*?```/g, ' ').replace(/```/g, ' ');
      value = value.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
      value = value.replace(/<[a-zA-Z/][^>]*>/g, ' ');
      value = value.replace(/(^|\s)(#{1,6}|>)\s+/g, '$1');
      value = value.replace(/(^|\s)[-*+]\s+(?:\[[ xX]\]\s+)?/g, '$1');
      value = value.replace(/(^|\s)\d+[.)]\s+/g, '$1');
      value = value.replace(/\|\s*:?-{3,}:?\s*(?=\|)/g, ' ').replace(/-{3,}/g, ' ');
      value = value.replace(/[\[\]`*_~|]/g, ' ');
      return value.replace(/\s+/g, ' ').trim().slice(0, 220);
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
          item.task == null ? inline(item.text) : h('label', { className: 'sn-task' }, h('input', { type: 'checkbox', checked: item.task, disabled: true, readOnly: true, onChange: () => {} }), h('span', null, inline(item.text)))))));
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
            nodes.push(h('div', { key: nodes.length, className: 'sn-table-wrap' }, h('table', null,
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
      return h('div', { className: 'sn-reading' }, nodes);
    }
    return { inject:['slots','locale'], apply(ctx) {
      ctx.effect(()=>ctx.locale.register(NS,'zh',zh));ctx.effect(()=>ctx.locale.register(NS,'en',en));const t=ctx.locale.bind(NS);
      function useT(){useSyncExternalStore(useCallback(fn=>ctx.locale.subscribe(fn),[]),useCallback(()=>ctx.locale.getSnapshot(),[]));return t;}
      async function api(scope,action,args={},signal){
        let response,result;try{response=await fetch('/api/split-notes/'+scope+'/'+action,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-DSH-Notes-UI':'1'},body:JSON.stringify(args),signal});result=await response.json();}catch(e){e.uncertain=true;throw e;}
        if(!response.ok||result.ok!==true){const err=new Error(result.error?.message||t('failed'));err.code=result.error?.code;err.uncertain=response.status>=500||['STORAGE_ERROR','REQUEST_FAILED'].includes(err.code);throw err;}return result.value;
      }
      function Button({children,...props}){return h('button',{type:'button',...props},children);}
      function Field({label,children}){return h('label',{className:'sn-field'},h('span',null,label),children);}
      function Icon({size=18}){return h('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.6,'aria-hidden':true},h('path',{d:'M7 3h11a2 2 0 0 1 2 2v16H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm1 0v18m3-13h6m-6 4h6m-6 4h4'}));}
      function Editor({draft,busy,error,pending,onChange,onSave,onCancel}){
        const t=useT(),[preview,setPreview]=useState(false),[discard,setDiscard]=useState(false),ref=useRef(null),discardRef=useRef(null),f=draft.form,locked=busy||pending;
        useEffect(()=>{ref.current?.focus();},[]);
        useEffect(()=>{if(discard)discardRef.current?.focus();},[discard]);
        const set=(k,v)=>onChange({...draft,form:{...f,[k]:v}});
        return h('form',{className:'sn-editor',onSubmit:e=>{e.preventDefault();onSave();},onKeyDown:e=>{if(e.key==='Escape'){e.stopPropagation();if(!busy)setDiscard(true);}}},
          h('div',{className:'sn-modal-bar'},h('h2',null,t(draft.id?'edit':'create')),h('button',{type:'button',className:'sn-modal-close',disabled:busy,'aria-label':t('close'),onClick:()=>setDiscard(true)},'×')),
          h('div',{className:'sn-editor-body'},
            h('fieldset',{disabled:locked||discard},h(Field,{label:t('title')},h('input',{ref,value:f.title,required:true,maxLength:200,onChange:e=>set('title',e.target.value)})),h(Field,{label:t('tags')},h('input',{value:f.tagText,onChange:e=>set('tagText',e.target.value)})),h('small',{className:'sn-muted'},t('tagLimit')),
              h('div',{className:'sn-row'},['pinned','archived'].map(k=>h('label',{className:'sn-check',key:k},h('input',{type:'checkbox',checked:f[k],onChange:e=>set(k,e.target.checked)}),t(k)))),
              h('div',{className:'sn-row sn-between'},h('strong',null,t('content')),h(Button,{onClick:()=>setPreview(x=>!x)},t(preview?'source':'preview'))),
              h('small',{className:'sn-muted'},t('markdownHelp')),
              preview?h(Markdown,{text:f.content}):h('textarea',{'aria-label':t('content'),value:f.content,maxLength:100000,onChange:e=>set('content',e.target.value)}))),
          h('div',{className:'sn-editor-footer'},error&&h('div',{className:'sn-editor-status sn-error',role:'alert'},error),pending&&h('div',{className:'sn-editor-status',role:'status'},t('uncertain')),discard?h(React.Fragment,null,h('span',null,t('discardHelp')),h('button',{type:'button',ref:discardRef,disabled:busy,className:'sn-danger',onClick:onCancel},t('discard')),h(Button,{disabled:busy,onClick:()=>{setDiscard(false);requestAnimationFrame(()=>ref.current?.focus());}},t('keep'))):h(React.Fragment,null,h('button',{type:'submit',disabled:locked,className:'sn-primary'},t('save')),h(Button,{disabled:busy,onClick:()=>setDiscard(true)},t('cancel'))))
          );
      }
      function Page({scope}){
        const t=useT(),draftKey='split-notes-draft:'+scope,pendingKey='split-notes-pending:'+scope;
        const [notes,setNotes]=useState([]),[note,setNote]=useState(null),[versions,setVersions]=useState(null),[draft,setDraft]=useState(null),[pending,setPending]=useState(null),[confirm,setConfirm]=useState(null),[detailOpen,setDetailOpen]=useState(false);
        const [query,setQuery]=useState(''),[tag,setTag]=useState(''),[filter,setFilter]=useState('active'),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState('');
        const mounted=useRef(false),seq=useRef(0),reads=useRef(new Set()),lock=useRef(false),request=useRef(null),confirmRef=useRef(null),trigger=useRef(null),rowTrigger=useRef(null),listRef=useRef(null),closeRef=useRef(null);
        const store=(key,value)=>{try{value===null?sessionStorage.removeItem(key):sessionStorage.setItem(key,JSON.stringify(value));}catch(_){setNotice(t('storage'));}};
        const updateDraft=value=>{setDraft(value);store(draftKey,value);};
        const read=async(action,args)=>{const controller=new AbortController();reads.current.add(controller);try{return await api(scope,action,args,controller.signal);}finally{reads.current.delete(controller);}};
        const load=async(selectedId=note?.id)=>{const ticket=++seq.current;setLoading(true);setError('');setVersions(null);setNote(null);try{const result=await read('list',{query,...(tag.trim()?{tag:tag.trim()}:{}),archived:filter==='all'?'all':filter==='archived'});if(!mounted.current||seq.current!==ticket)return;setNotes(result.notes);if(selectedId&&result.notes.some(n=>n.id===selectedId)){const current=await read('get',{id:selectedId});if(mounted.current&&seq.current===ticket)setNote(current);}}catch(e){if(mounted.current&&seq.current===ticket){setNotes([]);setError(e.message);}}finally{if(mounted.current&&seq.current===ticket)setLoading(false);}};
        useEffect(()=>{
          mounted.current=true;
          try{const d=JSON.parse(sessionStorage.getItem(draftKey)||'null');if(d&&d.form&&typeof d.form.title==='string'&&typeof d.form.content==='string'&&typeof d.form.tagText==='string'){setDraft(d);setNotice(t('draft'));}const p=JSON.parse(sessionStorage.getItem(pendingKey)||'null');if(p&&['save','restore','delete'].includes(p.action)&&p.args?.request_id)setPending(p);}catch(_){setNotice(t('storage'));}
          load(null);return()=>{mounted.current=false;++seq.current;for(const c of reads.current)c.abort();request.current?.abort();};
        },[scope]);
        useEffect(()=>{if(!draft)return;const listener=e=>{e.preventDefault();e.returnValue='';};window.addEventListener('beforeunload',listener);return()=>window.removeEventListener('beforeunload',listener);},[!!draft]);
        useEffect(()=>{if(confirm)confirmRef.current?.focus();},[confirm]);
        useEffect(()=>{if(detailOpen&&note&&!draft&&!busy)closeRef.current?.focus();},[detailOpen,note?.id,!!draft,busy]);
        const focusBack=()=>{for(const target of [rowTrigger.current,trigger.current,listRef.current]){if(target&&document.contains(target)){target.focus();return;}}};
        const closeDetail=()=>{if(busy)return;setDetailOpen(false);setVersions(null);focusBack();};
        const closeConfirm=()=>{if(busy)return;setConfirm(null);trigger.current?.focus();};
        const trapTab=e=>{if(e.key!=='Tab')return;const root=e.currentTarget,nodes=[...root.querySelectorAll('button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])')].filter(node=>node.offsetParent!==null||node===document.activeElement);if(!nodes.length){e.preventDefault();return;}const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}};
        const pick=async(id,e)=>{rowTrigger.current=e.currentTarget;trigger.current=e.currentTarget;const ticket=++seq.current;setDetailOpen(false);setLoading(true);setError('');setNotice('');setNote(null);setVersions(null);try{const n=await read('get',{id});if(mounted.current&&ticket===seq.current){setNote(n);setDetailOpen(true);}}catch(e){if(mounted.current&&ticket===seq.current)setError(e.message);}finally{if(mounted.current&&ticket===seq.current)setLoading(false);}};
        const mutate=async(action,args,isRetry=false)=>{
          if(lock.current)return;lock.current=true;setBusy(true);setError('');setNotice('');++seq.current;for(const c of reads.current)c.abort();
          const op={action,args:isRetry?args:{...args,request_id:crypto.randomUUID()}};setPending(op);store(pendingKey,op);
          try{const controller=new AbortController();request.current=controller;const result=await api(scope,action,op.args,controller.signal);if(!mounted.current)return;setPending(null);store(pendingKey,null);if(action==='save'){updateDraft(null);}setConfirm(null);setVersions(null);setNotice(t('saved'));await load(result.item?.id|| (action==='delete'?null:note?.id));
            if(action==='delete'){setDetailOpen(false);requestAnimationFrame(()=>focusBack());}
            else{setDetailOpen(true);requestAnimationFrame(()=>{(closeRef.current||listRef.current)?.focus();});}
          }
          catch(e){if(!mounted.current)return;if(!e.uncertain){setPending(null);store(pendingKey,null);}if(e.code==='VERSION_CONFLICT'&&action!=='save'){setConfirm(null);setVersions(null);await load(note?.id);if(mounted.current)setError(t('changed'));}else setError(e.code==='VERSION_CONFLICT'?t('conflict'):e.message);}
          finally{lock.current=false;request.current=null;if(mounted.current){setBusy(false);setLoading(false);}}
        };
        const start=(n,e)=>{trigger.current=e.currentTarget;if(!n)rowTrigger.current=null;setNotice('');setVersions(null);setDetailOpen(!!n);updateDraft({id:n?.id,version:n?.version,form:{title:n?.title||'',content:n?.content||'',tagText:(n?.tags||[]).join(', '),pinned:n?.pinned||false,archived:n?.archived||false}});};
        const history=async()=>{const ticket=seq.current;setLoading(true);setError('');try{const data=await read('versions',{id:note.id});if(mounted.current&&ticket===seq.current)setVersions(data.versions);}catch(e){if(mounted.current&&ticket===seq.current)setError(e.message);}finally{if(mounted.current&&ticket===seq.current)setLoading(false);}};
        const blocked=busy||!!pending||!!draft||!!confirm,disabled=blocked||loading,modalOpen=!!draft||(!!detailOpen&&!!note)||!!confirm;
        return h('section',{className:'sn-page'+(modalOpen?' sn-modal-open':''),'aria-label':t(scope+'-notes')},h('style',null,css),h('div',{className:'sn-wrap'},h('h1',null,t(scope+'-notes')),h('p',{className:'sn-muted'},t('intro')),h('p',{className:'sn-muted'},t('limits')),
          error&&h('div',{className:'sn-notice sn-error',role:'alert'},error),notice&&h('div',{className:'sn-notice',role:'status'},notice),
          pending&&h('div',{className:'sn-notice'},h('p',null,t('uncertain')),h('div',{className:'sn-row'},h(Button,{disabled:busy,onClick:()=>mutate(pending.action,pending.args,true)},t('retry')),h(Button,{disabled:busy,onClick:()=>load()},t('abandon')))),
          h('div',{className:'sn-row sn-between sn-toolbar'},h('span',{className:'sn-muted'},notes.length+' '+t('count')),h('div',{className:'sn-row'},h(Button,{disabled:busy||loading||!!confirm,onClick:()=>load()},t('refresh')),h(Button,{className:'sn-primary',disabled,onClick:e=>start(null,e)},t('create')))),
          h('form',{className:'sn-filters',onSubmit:e=>{e.preventDefault();load(null);}},h(Field,{label:t('search')},h('input',{type:'search',value:query,disabled:blocked,onChange:e=>setQuery(e.target.value)})),h(Field,{label:t('tag')},h('input',{value:tag,disabled:blocked,maxLength:40,onChange:e=>setTag(e.target.value)})),h(Field,{label:t('filter')},h('select',{value:filter,disabled:blocked,onChange:e=>setFilter(e.target.value)},['active','archived','all'].map(k=>h('option',{key:k,value:k},t(k))))),h('button',{type:'submit',disabled},t('search'))),h('p',{className:'sn-muted'},t('searchHelp')),
          (loading||busy)&&h('p',{role:'status'},t(busy?'busy':'loading')),
          h('nav',{className:'sn-list',ref:listRef,tabIndex:-1,'aria-label':t(scope+'-notes')},!loading&&notes.length===0&&h('p',{className:'sn-muted'},t('empty')),notes.map(n=>h(Button,{className:'sn-note',key:n.id,disabled,'aria-pressed':note?.id===n.id,onClick:e=>pick(n.id,e)},h('strong',null,(n.pinned?'↑ ':'')+n.title),h('span',{className:'sn-muted sn-excerpt'},excerptText(n.excerpt)),h('small',{className:'sn-muted'},(n.tags||[]).join(' · '))))),
          draft&&h('div',{className:'sn-modal-backdrop'},h('div',{className:'sn-modal sn-editor-modal',role:'dialog','aria-modal':true,'aria-label':t(draft.id?'edit':'create'),tabIndex:-1,onKeyDown:trapTab},
            h(Editor,{key:draft.id||'new',draft,busy,error,pending,onChange:updateDraft,onCancel:()=>{const editing=!!draft.id;updateDraft(null);if(editing&&note){setDetailOpen(true);requestAnimationFrame(()=>closeRef.current?.focus());}else focusBack();},onSave:()=>{const f=draft.form;mutate('save',{item:{...(draft.id?{id:draft.id}:{}),title:f.title,content:f.content,tags:f.tagText.split(/[,，]/).map(x=>x.trim()).filter(Boolean),pinned:f.pinned,archived:f.archived},...(draft.version?{version:draft.version}:{})});}}))),
          !draft&&note&&detailOpen&&h('div',{className:'sn-modal-backdrop',onClick:e=>{if(e.target===e.currentTarget)closeDetail();}},h('article',{className:'sn-card sn-modal',role:'dialog','aria-modal':true,'aria-label':note.title,tabIndex:-1,onKeyDown:e=>{if(e.key==='Escape'){e.stopPropagation();if(!busy)closeDetail();}else trapTab(e);}},
            h('div',{className:'sn-modal-bar'},h('h2',null,note.title),h('div',{className:'sn-row'},h(Button,{disabled,onClick:e=>start(note,e)},t('edit')),h(Button,{disabled,onClick:()=>versions?setVersions(null):history()},t(versions?'back':'history')),h(Button,{disabled,className:'sn-danger',onClick:e=>{trigger.current=e.currentTarget;setConfirm({action:'delete',args:{id:note.id,version:note.version}});}},t('remove')),h('button',{type:'button',ref:closeRef,className:'sn-modal-close',disabled:busy,'aria-label':t('close'),onClick:closeDetail},'×'))),
            h('div',{className:'sn-modal-body'},error&&h('div',{className:'sn-notice sn-error',role:'alert'},error),notice&&h('div',{className:'sn-notice',role:'status'},notice),pending&&h('div',{className:'sn-notice',role:'status'},t('uncertain')),
              h('p',{className:'sn-muted'},t('revision')+' '+note.version+' · '+t('updated')+' '+new Date(note.updated_at).toLocaleString()),h('div',{className:'sn-tags'},[...(note.pinned?[t('pinned')]:[]),...(note.archived?[t('archived')]:[]),...note.tags].map((x,i)=>h('span',{key:i,className:'sn-tag'},x))),note.content?h(Markdown,{text:note.content}):h('p',{className:'sn-muted'},t('noContent')),
              versions&&h('section',{className:'sn-history'},h('h3',null,t('history')),versions.map(v=>h('details',{key:v.version},h('summary',null,t('revision')+' '+v.version+' · '+v.title+(v.version===note.version?' · '+t('current'):'')),h('div',{className:'sn-muted'},new Date(v.updated_at).toLocaleString()),h('p',{className:'sn-muted'},(v.tags||[]).join(' · ')),h(Markdown,{text:v.content}),v.version!==note.version&&h(Button,{disabled,onClick:e=>{trigger.current=e.currentTarget;setConfirm({action:'restore',args:{id:note.id,version:note.version,target_version:v.version}});}},t('restore')))))))),
          confirm&&h('div',{className:'sn-modal-backdrop sn-confirm-backdrop',onClick:e=>{if(e.target===e.currentTarget)closeConfirm();}},h('div',{className:'sn-modal sn-confirm-modal',ref:confirmRef,tabIndex:-1,role:'dialog','aria-modal':true,'aria-label':t('confirm'),onKeyDown:e=>{if(e.key==='Escape'){e.stopPropagation();closeConfirm();}else trapTab(e);}},
            h('div',{className:'sn-modal-bar'},h('h3',null,t(confirm.action==='delete'?'remove':'restore')),h('button',{type:'button',className:'sn-modal-close',disabled:busy,'aria-label':t('close'),onClick:closeConfirm},'×')),
            h('div',{className:'sn-modal-body'},error&&h('div',{className:'sn-notice sn-error',role:'alert'},error),pending&&h('div',{className:'sn-notice',role:'status'},t('uncertain')),h('strong',null,note?.title),confirm.action==='restore'&&h('p',null,t('revision')+' '+confirm.args.target_version),h('p',null,t(confirm.action==='delete'?'deleteHelp':'restoreHelp')),h('div',{className:'sn-row'},h(Button,{disabled:busy||!!pending,className:confirm.action==='delete'?'sn-danger':'sn-primary',onClick:()=>mutate(confirm.action,confirm.args)},t('confirm')),h(Button,{disabled:busy||!!pending,onClick:closeConfirm},t('cancel'))))))
        ));
      }
      for(const [scope,order] of [['work',47],['personal',48]]){const id=scope+'-notes';ctx.slots.inject('main',()=>ctx.slots.register({name:'main',key:id,locale:NS},()=>h(Page,{scope,key:scope})));ctx.slots.inject('sidebar.panellist',()=>ctx.slots.register({name:'sidebar.panellist',id,order,locale:NS,label:()=>t(id)},props=>h(Icon,props)));}
    }};
  }
});
