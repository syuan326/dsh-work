// Generated from the workspace module factories by scripts/build-client.mjs.
window.__ModuleLoader__.load({
  id: '@local/dsh-personal-workspace',
  factory(require) {
function create_mail(require) {
    const React = require('react');
    const { useState, useEffect, useRef, useCallback, useSyncExternalStore } = React;
    const h = React.createElement;
    const NS = 'split-mail';
    const en = {
      personal: 'Personal mail', work: 'Work mail', settings: 'Mail settings', description: 'Separate personal and work mail, accounts, drafts and tools. Uses the DSH default model.',
      inbox: 'Inbox', drafts: 'Drafts', configure: 'Configure', back: 'Back to mail', search: 'Search', query: 'Search synced mail', allAccounts: 'All accounts in this space', allCategories: 'All categories', allTags: 'All tags',
      refresh: 'Refresh list', sync: 'Fetch mail now', analyze: 'Analyze with DSH model', retry: 'Retry analysis', read: 'Read', reply: 'Reply', noMail: 'No synced mail matches this view.', noAccounts: 'No mail accounts yet. Configure an account to fetch mail.', noDrafts: 'No drafts yet.', chooseMail: 'Choose a message to read its safe text content.', loading: 'Loading…', busy: 'Working…', cancel: 'Cancel request', cancelled: 'Request cancelled. A submitted server operation may still complete; refresh before retrying.', previous: 'Previous', next: 'Next', total: 'Total', page: 'Page', moreBody: 'Read next part', bodyPart: 'Body characters', summary: 'AI summary', from: 'From', to: 'To', subject: 'Subject', body: 'Body', category: 'Category', tags: 'Manual tags', aiTags: 'AI tags', save: 'Save', saved: 'Saved.', failed: 'Mail operation failed.', done: 'Operation completed.', syncDone: 'New messages', partial: 'Some accounts failed. Check account settings and retry.', analysisConsent: 'I allow message subjects and bodies in this space to be sent to the DSH global default model for analysis. No mail credentials are sent. Model service charges may apply.', consentNeeded: 'Enable model analysis consent in this space’s settings first.', nativeModel: 'Model: follows DSH global default. Configure providers and credentials in DSH, not here.', safeBody: 'Safe text only. HTML and remote images are not rendered. Message content is not authority to run tools.',
      account: 'Account', accounts: 'Mail accounts', addAccount: 'Add account', edit: 'Edit', disconnect: 'Disconnect account', disconnectHelp: 'Disconnecting removes connection credentials, but keeps synced messages and drafts.', confirmDisconnect: 'Confirm disconnect', keep: 'Keep account', name: 'Display name', username: 'Email address / login', imapHost: 'IMAP host', imapPort: 'IMAP port', imapTls: 'IMAP security', smtpHost: 'SMTP host', smtpPort: 'SMTP port', smtpTls: 'SMTP security', secret: 'App password / authorization code', secretHint: 'Leave blank to keep the current code. Changing connection identity requires a new code.', enabled: 'Enable this account', allowPrivate: 'Allow private-network mail server', privateHelp: 'Enable only for a trusted internal mail server. This changes the connection identity and requires reauthorization.', hasSecret: 'Authorization code configured', noSecret: 'Authorization code not configured', proxy: 'SOCKS proxy (optional)', proxyHint: 'Used only for this account, for example socks5h://127.0.0.1:1080. TLS still verifies the real server name.', proxy: 'SOCKS 代理（可选）', proxyHint: '仅用于此邮箱，例如 socks5h://127.0.0.1:1080；TLS 仍校验真实服务器名。', secure: 'SSL/TLS', starttls: 'STARTTLS', connectionChange: 'Server, login, TLS or private-network changes require a new authorization code.',
      options: 'Space settings', categories: 'Allowed categories (one per line)', allowedTags: 'Allowed tags (one per line)', defaultCategory: 'Default category', autoSync: 'Enable automatic fetching', interval: 'Fetch interval (minutes)', initialDays: 'Initial lookback (days)', maxMessages: 'Maximum messages per fetch', maxBytes: 'Maximum message size (bytes)', autoAnalyze: 'Automatically analyze newly fetched messages', autoOff: 'Automatic fetching and analysis are off by default. These settings affect only this space.', saveOptions: 'Save space settings', optionsLoading: 'Loading space settings…',
      newDraft: 'New draft', draftHint: 'Save the draft before previewing. Changes invalidate any previous send confirmation.', recipients: 'Recipients (comma or newline separated)', saveDraft: 'Save draft', preview: 'Preview sending', send: 'Confirm and send this exact message', cancelPreview: 'Cancel preview', previewTitle: 'Review the complete message before sending', previewWarning: 'This is a user-only confirmation. Check the space, sender, recipients and full body. A changed draft or account requires a new preview.', scope: 'Mail space', deleteDraft: 'Delete draft', confirmDelete: 'Confirm delete', deleteHelp: 'Delete this local draft? This cannot be undone.', status: 'Status', draft: 'Draft', accepted: 'Accepted by SMTP server', sending: 'Sending', unknown: 'Delivery status unknown — verify in your mailbox; do not resend automatically.', sendFailed: 'Sending failed', readOnlyDraft: 'This draft’s status does not allow editing or resending.', unsaved: 'Unsaved changes', previewTokenMissing: 'The server did not provide a user confirmation token. Sending is disabled.', analysisModel: 'Analysis model', searchModel: 'Search models…', noModels: 'No matching model in the DSH configuration.', analysisModelHint: 'Choose any model already configured in DSH. No extra key is needed; “follow default” uses the DSH global default model.', followDefault: 'Follow DSH default', analyzeHint: 'Analysis sends this message to the DSH default model. Manual classification and manual tags are retained.',
      disabled: 'Disabled', lastSync: 'Last sync', neverSynced: 'Not synced yet', skipped: 'Skipped (over size limit)', purgeHistory: 'Also delete synced history', purgeWarning: 'This permanently deletes synced messages and drafts of this account in this space. It cannot be undone.', confirmPurge: 'Permanently delete history', toolAccess: 'Preset tool access', toolAccessHelp: 'Each mail space has its own tool set. Check a preset to let its Agents call those tools; a preset without a check never sees them. Only the user can change this.', personalTools: 'Personal tools', workTools: 'Work tools', preset: 'Agent preset', saveToolAccess: 'Save tool access', toolAccessSaved: 'Preset tool access saved.', toolAccessUnavailable: 'The tool plugins are not installed; reinstall the bundle before assigning presets.', noPresets: 'No Agent presets are available yet.',
    };
    const zh = {
      personal: '个人邮件', work: '工作邮件', settings: '邮件设置', description: '个人与工作邮件、账号、草稿和工具独立，模型复用 DSH。',
      inbox: '收件箱', drafts: '草稿', configure: '配置', back: '返回邮件', search: '搜索', query: '搜索已同步邮件', allAccounts: '本分区全部邮箱', allCategories: '全部分类', allTags: '全部标签', refresh: '刷新列表', sync: '立即拉取', analyze: '使用 DSH 模型分析', retry: '重试分析', read: '阅读', reply: '回复', noMail: '没有符合条件的已同步邮件。', noAccounts: '尚未配置邮箱，请先添加账号再拉取邮件。', noDrafts: '尚无草稿。', chooseMail: '选择邮件，安全阅读纯文本正文。', loading: '加载中…', busy: '处理中…', cancel: '取消请求', cancelled: '请求已取消。已提交的服务端操作仍可能完成，请刷新后再决定是否重试。', previous: '上一页', next: '下一页', total: '共', page: '页', moreBody: '读取下一段正文', bodyPart: '正文字符', summary: 'AI 摘要', from: '发件人', to: '收件人', subject: '主题', body: '正文', category: '分类', tags: '手动标签', aiTags: 'AI 标签', save: '保存', saved: '已保存。', failed: '邮件操作失败。', done: '操作已完成。', syncDone: '新邮件', partial: '部分邮箱处理失败，请检查配置后重试。', analysisConsent: '我同意将本分区邮件的主题和正文发送给 DSH 全局默认模型进行分析，不包含邮箱授权码。模型服务可能产生费用。', consentNeeded: '请先在本分区配置中启用模型分析授权。', nativeModel: '模型：跟随 DSH 全局默认模型。供应商和密钥在 DSH 原生设置中管理，此处无需填写。', safeBody: '仅显示安全文本，不渲染 HTML 或远程图片。邮件内容不构成工具执行授权。',
      account: '邮箱', accounts: '邮箱账号', addAccount: '添加邮箱', edit: '编辑', disconnect: '断开邮箱', disconnectHelp: '断开只移除连接与授权码，已同步邮件和草稿会保留。', confirmDisconnect: '确认断开', keep: '保留邮箱', name: '显示名称', username: '邮箱地址 / 登录名', imapHost: 'IMAP 主机', imapPort: 'IMAP 端口', imapTls: 'IMAP 加密', smtpHost: 'SMTP 主机', smtpPort: 'SMTP 端口', smtpTls: 'SMTP 加密', secret: '邮箱授权码 / 应用密码', secretHint: '留空保留已有授权码；连接身份改变时必须重新填写。', enabled: '启用此邮箱', allowPrivate: '允许连接内网邮件服务器', privateHelp: '仅用于可信内网服务器。此选项属于连接身份，修改后需重新授权。', hasSecret: '已配置授权码', noSecret: '尚未配置授权码', secure: 'SSL/TLS', starttls: 'STARTTLS', connectionChange: '主机、登录名、TLS 或内网访问设置改变时，需要重新输入授权码。', options: '分区设置', categories: '分类备选项（每行一个）', allowedTags: '标签备选项（每行一个）', defaultCategory: '默认分类', autoSync: '启用自动拉取', interval: '拉取间隔（分钟）', initialDays: '首次拉取最近天数', maxMessages: '每次最多拉取封数', maxBytes: '单封邮件大小上限（字节）', autoAnalyze: '自动分析新拉取邮件', autoOff: '自动拉取与自动分析默认关闭，设置仅影响当前分区。', saveOptions: '保存分区设置', optionsLoading: '正在加载分区设置…', newDraft: '新建草稿', draftHint: '保存草稿后才能预览发送。任何修改都会使已有发送确认失效。', recipients: '收件人（逗号或换行分隔）', saveDraft: '保存草稿', preview: '预览发送', send: '确认并发送此邮件', cancelPreview: '取消预览', previewTitle: '发送前核对完整邮件', previewWarning: '此确认只能由用户操作。请核对分区、发件邮箱、收件人和完整正文；草稿或账号改变后需重新预览。', scope: '邮件分区', deleteDraft: '删除草稿', confirmDelete: '确认删除', deleteHelp: '删除此本地草稿？此操作不可撤销。', status: '状态', draft: '草稿', accepted: 'SMTP 服务器已接受', sending: '发送中', unknown: '发送结果待核实：请到邮箱核对，切勿自动重发。', sendFailed: '发送失败', readOnlyDraft: '此草稿当前状态不允许编辑或重发。', unsaved: '尚未保存修改', previewTokenMissing: '服务器未提供用户确认令牌，已禁止发送。', analysisModel: '分析模型', searchModel: '搜索模型…', noModels: 'DSH 配置中没有匹配的模型。', analysisModelHint: '只能选择 DSH 已配置的供应商与模型，无需额外密钥；「跟随默认」使用 DSH 全局默认模型。', followDefault: '跟随 DSH 默认', analyzeHint: '分析会将本邮件发送给 DSH 默认模型；保留人工设置的分类和手动标签。',
      disabled: '已停用', lastSync: '上次同步', neverSynced: '尚未同步', skipped: '超过大小上限未导入', purgeHistory: '同时彻底删除历史', purgeWarning: '将永久删除本分区中该邮箱已同步的邮件和草稿，无法恢复。', confirmPurge: '永久删除历史', toolAccess: '预设工具授权', toolAccessHelp: '个人与工作各有一套工具。勾选预设后，该预设的 Agent 才能调用对应工具；未勾选的预设完全看不到这些工具。此设置只允许用户修改。', personalTools: '个人工具', workTools: '工作工具', preset: 'Agent 预设', saveToolAccess: '保存工具授权', toolAccessSaved: '预设工具授权已保存。', toolAccessUnavailable: '工具插件行不存在，请重新安装插件后再分配预设。', noPresets: '当前没有可用的 Agent 预设。',
    };
    const css = `
/* Personal workspace — mail scope */
.sm-page{box-sizing:border-box;height:100%;overflow:auto;padding:calc(var(--dsh-frame-top-clearance,0px) + 22px) clamp(18px,3.2vw,44px) 52px;color:var(--dsw-alias-label-primary);background:radial-gradient(1100px 380px at 112% -160px,color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent),transparent 70%),var(--dsw-alias-bg-base);font:inherit;font-size:14px;line-height:1.55;min-width:0}
.sm-page *{box-sizing:border-box}
.sm-wrap{max-width:1180px;margin:0 auto}
.sm-page h1{font-size:clamp(26px,2.4vw,32px);line-height:1.18;font-weight:600;letter-spacing:-.02em;margin:0 0 10px}
.sm-wrap>h1::before{content:'';display:block;width:42px;height:3px;border-radius:99px;margin-bottom:16px;background:linear-gradient(90deg,var(--dsw-alias-state-business-primary),color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent))}
.sm-page h2{font-size:20px;line-height:1.3;font-weight:600;letter-spacing:-.01em;margin:0 0 14px}
.sm-page h3{font-size:15.5px;line-height:1.35;font-weight:600;margin:0 0 8px}
.sm-wrap>h1+.sm-muted{font-size:14.5px;line-height:1.7;max-width:78ch;margin:0}
.sm-muted{color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.65;margin:0}
.sm-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.sm-spread{justify-content:space-between}
.sm-stack{display:grid;gap:18px}
.sm-tabs{display:inline-flex;gap:3px;margin:20px 0 20px;padding:4px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent);flex-wrap:wrap}
.sm-page button,.sm-page input,.sm-page select,.sm-page textarea{font:inherit;color:inherit}
.sm-page button{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:6px 13px;cursor:pointer;min-height:34px;transition:background .16s,border-color .16s,box-shadow .16s,color .16s,transform .08s}
.sm-page button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l3)}
.sm-page button:active:not(:disabled){transform:translateY(1px)}
.sm-page button:disabled{opacity:.45;cursor:not-allowed}
.sm-page button:focus-visible,.sm-page input:focus-visible,.sm-page select:focus-visible,.sm-page textarea:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
.sm-tabs button{border:0;background:transparent;min-height:30px;padding:5px 14px;border-radius:9px;color:var(--dsw-alias-label-secondary);box-shadow:none;font-size:13px}
.sm-tabs button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.sm-tabs button[aria-pressed=true]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-weight:600;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l3),0 1px 2px rgb(16 24 40 / 10%)}
.sm-page .sm-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground);font-weight:600;box-shadow:0 10px 22px -16px color-mix(in srgb,var(--dsw-alias-brand-primary) 65%,transparent)}
.sm-page .sm-primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover);border-color:var(--dsw-alias-button-primary-hover);color:var(--dsw-alias-label-primary-foreground)}
.sm-page .sm-danger{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 32%,var(--dsw-alias-border-l2))}
.sm-page .sm-danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger)}
.sm-page input:not([type=checkbox]),.sm-page select,.sm-page textarea{width:100%;min-width:0;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:8px 12px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);min-height:38px;transition:border-color .16s,box-shadow .16s}
.sm-page input:not([type=checkbox]):hover,.sm-page select:hover,.sm-page textarea:hover{border-color:var(--dsw-alias-border-l3)}
@supports (appearance:base-select) and selector(select::picker(select)){ @media (forced-colors:none){
  .sm-page .sm-tls-select{appearance:base-select}
  .sm-page .sm-tls-select::picker(select){appearance:base-select}
  .sm-page .sm-tls-select:not(:disabled){cursor:pointer}
  .sm-page .sm-tls-select::picker-icon{color:var(--dsw-alias-label-secondary)}
  .sm-page .sm-tls-select:open::picker-icon{rotate:180deg}
  .sm-page .sm-tls-select::picker(select){margin-block:4px;padding:4px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);box-shadow:0 10px 28px color-mix(in srgb,var(--dsw-alias-label-primary) 16%,transparent)}
  .sm-page .sm-tls-select option{min-height:36px;padding:6px 9px;border-radius:8px;gap:8px}
  .sm-page .sm-tls-select option:checked{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent);font-weight:600}
  .sm-page .sm-tls-select option:checked::checkmark{color:var(--dsw-alias-brand-primary)}
  .sm-page .sm-tls-select option:is(:hover,:focus-visible){background:color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-overlay))}
  .sm-page .sm-tls-select option:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
} }
.sm-page input:not([type=checkbox]):focus,.sm-page select:focus,.sm-page textarea:focus{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px;border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 4px color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent)}
.sm-page textarea{resize:vertical;min-height:100px}
.sm-page input[type=checkbox]{width:16px;height:16px;accent-color:var(--dsw-alias-state-business-primary);margin:0}
.sm-field{display:grid;gap:7px;font-size:13px;min-width:0}
.sm-field>span{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500}
.sm-check{display:flex;align-items:flex-start;gap:9px;min-height:32px;padding-block:2px;font-size:13px;line-height:1.65;cursor:pointer}
.sm-check input{margin-top:3px;flex:none}
.sm-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.sm-card{border:1px solid var(--dsw-alias-border-l2);border-radius:16px;padding:20px;min-width:0;background:var(--dsw-alias-bg-layer-1);box-shadow:0 1px 2px rgb(16 24 40 / 5%),0 10px 24px -16px rgb(16 24 40 / 22%)}
.sm-card .sm-card{padding:14px;box-shadow:none;background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent);border-color:var(--dsw-alias-border-l1)}
.sm-notice{position:relative;border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,var(--dsw-alias-border-l1));border-radius:12px;padding:12px 14px 12px 16px;white-space:pre-wrap;overflow-wrap:anywhere;margin:12px 0;background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent)}
.sm-notice::before{content:'';position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:99px;background:var(--dsw-alias-state-business-primary)}
.sm-notice.sm-error{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 26%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 7%,transparent);font-weight:600}
.sm-notice.sm-error::before{background:var(--dsw-alias-state-error-primary)}
.sm-error{color:var(--dsw-alias-state-error-primary)}
.sm-filter{display:grid;grid-template-columns:minmax(180px,2fr) minmax(140px,1fr) minmax(100px,1fr) minmax(100px,1fr) auto;gap:10px;margin:16px 0;padding:14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent)}
.sm-filter>button[type=submit]{min-height:38px}
.sm-columns{display:grid;grid-template-columns:minmax(280px,390px) minmax(0,1fr);gap:20px;margin-top:18px;align-items:start}
.sm-list{list-style:none;padding:0;margin:0;display:grid;gap:8px}
.sm-page .sm-mail{width:100%;display:grid;justify-items:stretch;gap:3px;text-align:start;padding:11px 12px;min-height:0;border-radius:10px;border:1px solid transparent;background:transparent;box-shadow:none;transition:background .16s,border-color .16s,box-shadow .16s}
.sm-page .sm-mail:not([aria-current=true]):hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:transparent}
.sm-page .sm-mail[aria-current=true]{border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 30%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent);box-shadow:inset 3px 0 0 var(--dsw-alias-state-business-primary)}
.sm-mail strong{font-size:14px;line-height:1.4;font-weight:600;overflow-wrap:anywhere}
.sm-mail span{font-size:12.5px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}
.sm-mail small{font-size:11.5px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}
.sm-body{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;font:inherit;font-size:14.5px;line-height:1.75;margin:16px 0;max-width:100%;padding:16px;border-radius:12px;border:1px solid var(--dsw-alias-border-l1);background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent)}
.sm-detail h2{margin-bottom:12px;overflow-wrap:anywhere}
.sm-detail dl,.sm-preview dl{display:grid;grid-template-columns:88px minmax(0,1fr);gap:8px 14px;font-size:13px;margin:0 0 16px;padding:14px;border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent)}
.sm-detail dt,.sm-preview dt{color:var(--dsw-alias-label-secondary);font-size:11.5px;letter-spacing:.04em;text-transform:uppercase;padding-top:2px}
.sm-detail dd,.sm-preview dd{margin:0;overflow-wrap:anywhere}
.sm-empty{padding:38px 16px;text-align:center;color:var(--dsw-alias-label-secondary);line-height:1.7;border:1px dashed var(--dsw-alias-border-l2);border-radius:14px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 2%,transparent)}
.sm-tags{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
.sm-tags .sm-check{display:inline-flex;align-items:center;gap:6px;min-height:28px;padding:3px 10px;border-radius:999px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 22%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 9%,transparent);font-size:12px;line-height:1.4}
.sm-tags .sm-check input{width:14px;height:14px;margin:0}
.sm-tags .sm-check:has(input:checked){background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 48%,transparent);font-weight:600}
.sm-preview{border:2px solid var(--dsw-alias-state-business-primary);padding:20px;border-radius:16px;background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 4%,transparent)}
.sm-preview-title{font-weight:600;margin:0 0 10px}
.sm-page .sm-preview pre{max-height:none}
.sm-footer{margin-top:16px}
.sm-page .sm-card>.sm-row.sm-footer{padding-top:12px;border-top:1px solid var(--dsw-alias-border-l1)}
.sm-picker{position:relative;min-width:0}
.sm-page .sm-picker-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:8px 12px;text-align:start;cursor:pointer;min-height:38px}
.sm-picker-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sm-picker-caret{color:var(--dsw-alias-label-secondary);font-size:11px}
.sm-picker-panel{margin-top:6px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-overlay);box-shadow:0 18px 44px rgb(0 0 0 / 28%);padding:8px;display:grid;gap:4px;max-height:300px;overflow:auto}
.sm-page input.sm-picker-search{width:100%;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);padding:6px 9px;font-size:13px;min-height:32px}
.sm-picker-list{display:grid;gap:2px}
.sm-picker-group{color:var(--dsw-alias-label-secondary);font-size:11.5px;font-weight:500;padding:8px 10px 2px;letter-spacing:.03em}
.sm-page .sm-picker-row{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;border:0;background:transparent;color:var(--dsw-alias-label-primary);text-align:start;border-radius:8px;padding:8px 10px;cursor:pointer;min-height:32px}
.sm-page .sm-picker-row:hover{background:var(--dsw-alias-interactive-bg-hover)}
.sm-page .sm-picker-row.is-selected{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent)}
.sm-picker-row.is-selected .sm-picker-check{color:var(--dsw-alias-state-business-primary)}
.sm-picker-empty{margin:8px 10px;color:var(--dsw-alias-label-secondary);font-size:13px}
.sm-page [role=status]{color:var(--dsw-alias-label-secondary);font-size:13px}
@media(max-width:980px){.sm-columns{display:flex;flex-direction:column;gap:16px}.sm-columns:has(.sm-detail)>section:first-child{max-height:46vh;overflow:auto;scroll-padding:4px}.sm-columns:has(.sm-detail)>.sm-detail{order:-1}.sm-filter{grid-template-columns:1fr 1fr}.sm-filter>button[type=submit]{grid-column:1/-1}}
@media(max-width:640px){.sm-grid,.sm-filter{grid-template-columns:1fr}.sm-page{padding-inline:16px}.sm-page input,.sm-page select,.sm-page textarea{font-size:16px}.sm-card{padding:16px}.sm-detail dl,.sm-preview dl{grid-template-columns:1fr;gap:2px}.sm-detail dt,.sm-preview dt{padding-top:8px}.sm-tabs{width:100%}.sm-tabs button{flex:1}}

/* Card header alignment */
.sm-row>h2{margin-bottom:0}
.sm-detail>.sm-row{margin-bottom:10px}
.sm-detail>.sm-row>h2{margin-bottom:0}

/* Settings dialog embedding: the host panel owns the page surface. */
.sm-embed{height:auto;overflow:visible;padding:0;background:none;font-size:13px}
.sm-embed .sm-wrap{max-width:none}
.sm-embed .sm-wrap>h1{font-size:18px;line-height:1.3;letter-spacing:-.01em;margin:0 0 6px}
.sm-embed .sm-wrap>h1::before{display:none}
.sm-embed .sm-wrap>h1+.sm-muted{font-size:13px}
.sm-embed .sm-tabs{margin:12px 0 16px}
.sm-embed .sm-card{padding:14px 16px;border-radius:12px}
.sm-embed .sm-card .sm-card{padding:12px}
.sm-embed h2{font-size:16px}

@media (pointer:coarse){.sm-page input:not([type=checkbox]),.sm-page select,.sm-page textarea{font-size:16px}}
@media (prefers-reduced-motion:reduce){.sm-page *,.sm-page *::before,.sm-page *::after{transition:none!important;transform:none!important}}
@media (hover:none){.sm-page .sm-mail:not([aria-current=true]):hover:not(:disabled){background:transparent;border-color:transparent}}
`;
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
          const response = await fetch('/api/split-mail/' + scope + '/' + action, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-DSH-Mail-UI': '1' }, body: JSON.stringify(args || {}), credentials: 'same-origin', signal });
          const result = await response.json();
          if (!response.ok || result.ok !== true) throw new Error(result.error?.message || (typeof result.error === 'string' ? result.error : translate('failed')));
          return result.value;
        }
        function useIO(scope) {
          const [busy, setBusy] = useState(0), [error, setError] = useState(''), [notice, setNotice] = useState('');
          const pending = useRef(new Map()), alive = useRef(true);
          useEffect(() => { alive.current = true; return () => { alive.current = false; for (const item of pending.current.values()) item.abort(); pending.current.clear(); }; }, []);
          const run = useCallback(async (key, action, args) => {
            pending.current.get(key)?.abort();
            const controller = new AbortController(); pending.current.set(key, controller);
            if (alive.current) { setBusy(pending.current.size); setError(''); }
            try { const value = await api(scope, action, args, controller.signal); return alive.current && !controller.signal.aborted ? value : null; }
            catch (e) { if (alive.current && !controller.signal.aborted) setError(e.message || translate('failed')); return null; }
            finally { if (pending.current.get(key) === controller) pending.current.delete(key); if (alive.current) setBusy(pending.current.size); }
          }, [scope]);
          const cancel = () => { for (const c of pending.current.values()) c.abort(); pending.current.clear(); setBusy(0); setNotice(translate('cancelled')); };
          return { run, busy, error, notice, setNotice, setError, cancel };
        }
        function Button({ children, ...props }) { return h('button', { type: 'button', ...props }, children); }
        function Field({ label, children }) { return h('label', { className: 'sm-field' }, h('span', null, label), children); }
        function Check({ label, ...props }) { return h('label', { className: 'sm-check' }, h('input', { type: 'checkbox', ...props }), h('span', null, label)); }
        function Feedback({ io }) { const t = useT(); return h(React.Fragment, null, io.error && h('div', { className: 'sm-notice sm-error', role: 'alert' }, io.error), io.notice && h('div', { className: 'sm-notice', role: 'status' }, io.notice), io.busy > 0 && h('div', { className: 'sm-row', role: 'status' }, h('span', null, t('busy')), h(Button, { onClick: io.cancel }, t('cancel')))); }
        function Icon({ size = 18 }) { return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true }, h('rect', { x: 3, y: 5, width: 18, height: 14, rx: 3 }), h('path', { d: 'm4 7 8 6 8-6' })); }
        function Pager({ offset, next, total, busy, onPage }) { const t = useT(); return h('div', { className: 'sm-row sm-spread sm-footer' }, h('span', { className: 'sm-muted' }, t('total') + ' ' + total + ' · ' + t('page') + ' ' + (Math.floor(offset / 25) + 1)), h('div', { className: 'sm-row' }, h(Button, { disabled: busy || offset === 0, onClick: () => onPage(Math.max(0, offset - 25)) }, t('previous')), h(Button, { disabled: busy || next == null, onClick: () => onPage(next) }, t('next')))); }

        function ModelPicker({ models, value, onChange }) {
          const t = useT();
          const [open, setOpen] = useState(false), [query, setQuery] = useState('');
          const box = useRef(null);
          useEffect(() => {
            if (!open) return undefined;
            const onDown = event => { if (box.current && !box.current.contains(event.target)) setOpen(false); };
            document.addEventListener('mousedown', onDown);
            return () => document.removeEventListener('mousedown', onDown);
          }, [open]);
          const [providerId, modelId] = value ? value.split('|') : ['', ''];
          const selected = (models?.providers || []).find(provider => provider.id === providerId);
          const selectedName = selected?.models.find(model => model.id === modelId)?.name;
          const label = selected && selectedName
            ? selected.name + ' / ' + selectedName
            : models ? t('followDefault') + ' (' + models.default.provider + ' / ' + models.default.model + ')' : t('followDefault');
          const needle = query.trim().toLocaleLowerCase();
          const groups = (models?.providers || [])
            .map(provider => ({
              ...provider,
              models: provider.models.filter(model => !needle || (provider.name + ' ' + model.name + ' ' + model.id).toLocaleLowerCase().includes(needle)),
            }))
            .filter(provider => provider.models.length > 0);
          const choose = (provider, model) => {
            onChange(provider, model);
            setOpen(false);
            setQuery('');
          };
          return h('div', { className: 'sm-picker', ref: box, onKeyDown: event => { if (event.key === 'Escape' && open) { event.stopPropagation(); setOpen(false); } } },
            h('button', { type: 'button', className: 'sm-picker-trigger', 'aria-haspopup': 'listbox', 'aria-expanded': open, onClick: () => setOpen(current => !current) },
              h('span', { className: 'sm-picker-value' }, label),
              h('span', { className: 'sm-picker-caret', 'aria-hidden': true }, '\u25be')),
            open && h('div', { className: 'sm-picker-panel' },
              h('input', { className: 'sm-picker-search', value: query, placeholder: t('searchModel'), 'aria-label': t('searchModel'), onChange: event => setQuery(event.target.value) }),
              h('div', { className: 'sm-picker-list', role: 'listbox', 'aria-label': t('analysisModel') },
                h('button', { type: 'button', role: 'option', 'aria-selected': !value, className: 'sm-picker-row' + (value ? '' : ' is-selected'), onClick: () => choose('', '') },
                  h('span', null, models ? t('followDefault') + ' (' + models.default.provider + ' / ' + models.default.model + ')' : t('followDefault')), !value && h('span', { className: 'sm-picker-check', 'aria-hidden': true }, '\u2713')),
                groups.map(provider => h(React.Fragment, { key: provider.id },
                  h('div', { className: 'sm-picker-group' }, provider.name),
                  provider.models.map(model => {
                    const active = provider.id === providerId && model.id === modelId;
                    return h('button', { key: provider.id + '|' + model.id, type: 'button', role: 'option', 'aria-selected': active, className: 'sm-picker-row' + (active ? ' is-selected' : ''), onClick: () => choose(provider.id, model.id) },
                      h('span', null, model.name),
                      active && h('span', { className: 'sm-picker-check', 'aria-hidden': true }, '\u2713'));
                  }))),
                !groups.length && h('p', { className: 'sm-picker-empty', role: 'status' }, t('noModels')))));
        }
        function Settings({ scope }) {
          const t = useT(), io = useIO(scope);
          const [accounts, setAccounts] = useState([]), [options, setOptions] = useState(null), [models, setModels] = useState(null), [form, setForm] = useState(null), [secret, setSecret] = useState(''), [remove, setRemove] = useState(null);
          const [categoryText, setCategoryText] = useState(''), [tagText, setTagText] = useState(''), [purge, setPurge] = useState(false);
          const load = async () => { const [a, o, m] = await Promise.all([io.run('accounts', 'accounts'), io.run('options', 'options'), io.run('models', 'models')]); if (a) setAccounts(a.accounts || []); if (o) { setOptions(o.options); setCategoryText(o.options.categories.join('\n')); setTagText(o.options.tags.join('\n')); } if (m) setModels(m); };
          useEffect(() => { void load(); }, []);
          const change = (k, v) => setForm(f => ({ ...f, [k]: v }));
          const option = (k, v) => setOptions(o => ({ ...o, [k]: v }));
          const lines = text => [...new Set(text.split(/\r?\n/).map(v => v.trim()).filter(Boolean))];
          const start = a => { setSecret(''); setRemove(null); setPurge(false); setForm(a ? { ...a } : { name: '', username: '', imap_host: '', imap_port: 993, imap_tls: 'ssl', smtp_host: '', smtp_port: 465, smtp_tls: 'ssl', enabled: false, allow_private: false, proxy: '' }); };
          const saveAccount = async e => { e.preventDefault(); const result = await io.run('save-account', 'account_save', { account: form, ...(secret ? { secret } : {}) }); if (result) { setForm(null); setSecret(''); await load(); io.setNotice(t('saved')); } };
          const saveOptions = async e => { e.preventDefault(); const result = await io.run('save-options', 'settings_save', { options: { ...options, categories: lines(categoryText), tags: lines(tagText), auto_analyze: options.analysis_consent && options.auto_analyze } }); if (result) { setOptions(result.options); io.setNotice(t('saved')); } };
          return h('div', { className: 'sm-stack' }, h(Feedback, { io }), h('section', { className: 'sm-card' }, h('div', { className: 'sm-row sm-spread' }, h('h2', null, t('accounts')), h(Button, { onClick: () => start(), disabled: !!io.busy }, t('addAccount'))), h('p', { className: 'sm-muted' }, t('disconnectHelp')),
            !accounts.length && !io.busy && h('p', { className: 'sm-empty' }, t('noAccounts')),
            accounts.map(a => h('article', { className: 'sm-card sm-footer', key: a.id }, h('div', { className: 'sm-row sm-spread' }, h('div', null, h('strong', null, a.name || a.username), h('div', { className: 'sm-muted' }, a.username), h('div', { className: 'sm-muted' }, a.imap_host + ' · ' + a.imap_tls + ' · ' + ((a.has_secret || a.has_password) ? t('hasSecret') : t('noSecret'))), h('div', { className: 'sm-muted', role: 'status' }, (a.enabled ? t('enabled') : t('disabled')) + ' · ' + (a.sync?.last_sync ? t('lastSync') + ' ' + a.sync.last_sync : t('neverSynced')) + (a.sync?.skipped ? ' · ' + t('skipped') + ' ' + a.sync.skipped : '')), a.sync?.error && h('div', { className: 'sm-notice sm-error', role: 'alert' }, a.sync.error)), h('div', { className: 'sm-row' }, h(Button, { disabled: !!io.busy, onClick: () => start(a) }, t('edit')), h(Button, { disabled: !!io.busy, onClick: () => { setPurge(false); setRemove(a); } }, t('disconnect')))), remove?.id === a.id && h('div', { className: 'sm-notice' }, h('p', null, t('disconnectHelp')), h('div', { className: 'sm-row' }, h(Button, { disabled: !!io.busy, onClick: async () => { const r = await io.run('disconnect', 'account_delete', { account_id: a.id, purge: false }); if (r) { setRemove(null); await load(); } } }, t('confirmDisconnect')), !purge && h(Button, { disabled: !!io.busy, onClick: () => setPurge(true) }, t('purgeHistory')), purge && h(Button, { className: 'sm-danger', disabled: !!io.busy, onClick: async () => { const r = await io.run('purge', 'account_delete', { account_id: a.id, purge: true, confirm_purge: true }); if (r) { setRemove(null); setPurge(false); await load(); } } }, t('confirmPurge')), h(Button, { onClick: () => { setRemove(null); setPurge(false); } }, t('keep'))), purge && h('p', { className: 'sm-error', role: 'alert' }, t('purgeWarning'))))),
            form && h('form', { onSubmit: saveAccount, className: 'sm-card sm-stack sm-footer', autoComplete: 'off' }, h('h3', null, form.id ? t('edit') : t('addAccount')), h('p', { className: 'sm-muted' }, t('connectionChange')), h('div', { className: 'sm-grid' }, ['name', 'username', 'imap_host', 'imap_port', 'smtp_host', 'smtp_port', 'proxy'].map(k => h(Field, { key: k, label: t(({ imap_host: 'imapHost', imap_port: 'imapPort', smtp_host: 'smtpHost', smtp_port: 'smtpPort', proxy: 'proxy' })[k] || k) }, h('input', { value: form[k] ?? '', required: !['name', 'proxy'].includes(k), type: k.endsWith('port') ? 'number' : k === 'username' ? 'email' : 'text', min: 1, max: 65535, placeholder: k === 'proxy' ? 'socks5h://127.0.0.1:1080' : undefined, onChange: e => change(k, k.endsWith('port') ? Number(e.target.value) : e.target.value) }))), ['imap_tls', 'smtp_tls'].map(k => h(Field, { key: k, label: t(k === 'imap_tls' ? 'imapTls' : 'smtpTls') }, h('select', { className: 'sm-tls-select', value: form[k], onChange: e => change(k, e.target.value) }, h('option', { value: 'ssl' }, t('secure')), h('option', { value: 'starttls' }, t('starttls')))))), h(Field, { label: t('secret') }, h('input', { type: 'password', value: secret, autoComplete: 'new-password', onChange: e => setSecret(e.target.value) })), h('p', { className: 'sm-muted' }, t('secretHint')), h(Check, { label: t('enabled'), checked: form.enabled, onChange: e => change('enabled', e.target.checked) }), h(Check, { label: t('allowPrivate'), checked: form.allow_private, onChange: e => change('allow_private', e.target.checked) }), h('p', { className: 'sm-muted' }, t('privateHelp')), h('div', { className: 'sm-row' }, h('button', { type: 'submit', className: 'sm-primary', disabled: !!io.busy }, t('save')), h(Button, { disabled: !!io.busy, onClick: () => { setSecret(''); setForm(null); } }, t('cancelPreview'))))),
            options ? h('form', { onSubmit: saveOptions, className: 'sm-card sm-stack' }, h('h2', null, t('options')), h('p', { className: 'sm-muted' }, t('autoOff')), h('div', { className: 'sm-grid' }, h(Field, { label: t('categories') }, h('textarea', { value: categoryText, onChange: e => setCategoryText(e.target.value), required: true })), h(Field, { label: t('allowedTags') }, h('textarea', { value: tagText, onChange: e => setTagText(e.target.value) }))), h(Field, { label: t('defaultCategory') }, h('select', { value: options.default_category, onChange: e => option('default_category', e.target.value) }, lines(categoryText).map(c => h('option', { key: c, value: c }, c)))), h(Check, { label: t('autoSync'), checked: options.auto_sync, onChange: e => option('auto_sync', e.target.checked) }), h('div', { className: 'sm-grid' }, [['sync_interval_minutes', 'interval', 1, 1440], ['initial_days', 'initialDays', 1, 3650], ['max_messages', 'maxMessages', 1, 200], ['max_bytes', 'maxBytes', 1024, 26214400]].map(([k, label, min, max]) => h(Field, { key: k, label: t(label) }, h('input', { type: 'number', min, max, required: true, value: options[k], onChange: e => option(k, Number(e.target.value)) })))), h(Field, { label: t('analysisModel') }, h(ModelPicker, { models, value: options.analysis_provider ? options.analysis_provider + '|' + options.analysis_model : '', onChange: (provider, model) => setOptions(o => ({ ...o, analysis_provider: provider, analysis_model: model })) })), h('p', { className: 'sm-muted' }, t('analysisModelHint')), h('p', { className: 'sm-muted' }, t('nativeModel')), h(Check, { label: t('analysisConsent'), checked: options.analysis_consent, onChange: e => setOptions(o => ({ ...o, analysis_consent: e.target.checked, auto_analyze: e.target.checked && o.auto_analyze })) }), h(Check, { label: t('autoAnalyze'), checked: options.auto_analyze, disabled: !options.analysis_consent, onChange: e => option('auto_analyze', e.target.checked) }), h('div', null, h('button', { type: 'submit', disabled: !!io.busy, className: 'sm-primary' }, t('saveOptions')))) : h('p', { role: 'status' }, t('optionsLoading')));
        }
        function DraftEditor({ scope, accounts, initial, onSaved }) {
          const t = useT(), io = useIO(scope);
          const [draft, setDraft] = useState(initial), [recipientText, setRecipientText] = useState((initial.to || []).join(', ')), [dirty, setDirty] = useState(!initial.id), [preview, setPreview] = useState(null), [deleting, setDeleting] = useState(false);
          const previewRef = useRef(null);
          useEffect(() => { if (preview) previewRef.current?.focus(); }, [preview]);
          const locked = draft.status && !['draft', 'failed'].includes(draft.status);
          const change = (k, v) => { setDraft(d => ({ ...d, [k]: v })); setDirty(true); setPreview(null); setDeleting(false); };
          const save = async e => { e.preventDefault(); setPreview(null); const result = await io.run('save', 'draft', { operation: 'save', draft }); if (result) { setDraft(result.draft); setDirty(false); onSaved(); io.setNotice(t('saved')); } };
          const statusText = status => ({ accepted: t('accepted'), unknown: t('unknown'), failed: t('sendFailed'), sending: t('sending'), draft: t('draft') })[status] || status;
          return h('section', { className: 'sm-card sm-stack' }, h(Feedback, { io }), h('h2', null, draft.id ? t('draft') : t('newDraft')), h('p', { className: 'sm-muted' }, t('draftHint')), draft.status && h('p', { role: 'status' }, t('status') + ': ' + statusText(draft.status)), locked && h('p', { className: 'sm-notice' }, t('readOnlyDraft')), h('form', { onSubmit: save, className: 'sm-stack' }, h(Field, { label: t('from') }, h('select', { value: draft.mailbox_id || '', disabled: locked || !!io.busy, required: true, onChange: e => change('mailbox_id', e.target.value) }, h('option', { value: '' }, '—'), accounts.map(a => h('option', { key: a.id, value: a.id, disabled: !a.enabled }, (a.name ? a.name + ' · ' : '') + a.username)))), h(Field, { label: t('recipients') }, h('input', { value: (draft.to || []).join(', '), required: true, readOnly: locked, onChange: e => change('to', e.target.value.split(/[,;\n]/).map(x => x.trim()).filter(Boolean)) })), h(Field, { label: t('subject') }, h('input', { value: draft.subject || '', readOnly: locked, onChange: e => change('subject', e.target.value) })), h(Field, { label: t('body') }, h('textarea', { rows: 14, value: draft.body || '', readOnly: locked, onChange: e => change('body', e.target.value) })), h('div', { className: 'sm-row' }, h('button', { type: 'submit', disabled: !!io.busy || locked, className: 'sm-primary' }, t('saveDraft')), dirty && h('span', { className: 'sm-muted' }, t('unsaved')), h(Button, { disabled: !!io.busy || dirty || !draft.id || locked, onClick: async () => { const r = await io.run('preview', 'send_preview', { draft_id: draft.id, version: draft.version }); if (r) setPreview(r); } }, t('preview')), h(Button, { disabled: !!io.busy || !draft.id || locked, onClick: () => { setDeleting(true); setPreview(null); } }, t('deleteDraft')))),
            deleting && h('div', { className: 'sm-notice' }, h('p', null, t('deleteHelp')), h('div', { className: 'sm-row' }, h(Button, { disabled: !!io.busy, onClick: async () => { const r = await io.run('delete', 'draft', { operation: 'delete', draft_id: draft.id, version: draft.version }); if (r) onSaved(true); } }, t('confirmDelete')), h(Button, { onClick: () => setDeleting(false), disabled: !!io.busy }, t('cancelPreview')))),
            preview && h('section', { className: 'sm-preview', role: 'group', 'aria-labelledby': 'sm-preview-title', tabIndex: -1, ref: previewRef, onKeyDown: e => { if (e.key === 'Escape') setPreview(null); } }, h('h2', { id: 'sm-preview-title' }, t('previewTitle')), h('p', { className: 'sm-muted' }, t('previewWarning')), h('dl', null, [['scope', t(scope)], ['from', preview.preview.from], ['to', (preview.preview.to || []).join(', ')], ['subject', preview.preview.subject]].map(([k, v]) => h(React.Fragment, { key: k }, h('dt', null, t(k)), h('dd', null, v)))), h('h3', null, t('body')), h('pre', { className: 'sm-body' }, preview.preview.body), !preview.confirmation_id && h('p', { role: 'alert' }, t('previewTokenMissing')), h('div', { className: 'sm-row' }, h(Button, { className: 'sm-primary', disabled: !!io.busy || !preview.confirmation_id, onClick: async () => { const p = preview; setPreview(null); const r = await io.run('send', 'send', { draft_id: p.preview.draft_id, version: p.preview.version, account_version: p.preview.account_version, confirmation_id: p.confirmation_id }); if (r) { if (r.draft) setDraft(r.draft); io.setNotice(r.detail || statusText(r.status) || t('done')); onSaved(); } } }, t('send')), h(Button, { disabled: !!io.busy, onClick: () => setPreview(null) }, t('cancelPreview')))));
        }
        function MailPage({ scope }) {
          const t = useT(), io = useIO(scope);
          const [tab, setTab] = useState('inbox'), [accounts, setAccounts] = useState([]), [options, setOptions] = useState(null), [list, setList] = useState({ messages: [], total: 0, next_offset: null }), [offset, setOffset] = useState(0);
          const [query, setQuery] = useState(''), [search, setSearch] = useState(''), [mailbox, setMailbox] = useState(''), [category, setCategory] = useState(''), [tag, setTag] = useState('');
          const [selected, setSelected] = useState(null), [readResult, setReadResult] = useState(null), [choice, setChoice] = useState(''), [manualTags, setManualTags] = useState([]);
          const [drafts, setDrafts] = useState({ drafts: [], total: 0, next_offset: null }), [draftOffset, setDraftOffset] = useState(0), [editor, setEditor] = useState(null), [revision, setRevision] = useState(0);
          const selection = useRef(null), listTicket = useRef(0);
          const bootstrap = async () => { const [a, o] = await Promise.all([io.run('accounts', 'accounts'), io.run('options', 'options')]); if (a) setAccounts(a.accounts || []); if (o) setOptions(o.options); };
          useEffect(() => { void bootstrap(); }, [revision, tab]);
          useEffect(() => { if (tab !== 'inbox') return; const ticket = ++listTicket.current; io.run('list', search ? 'search' : 'list', { query: search, mailbox_id: mailbox || undefined, category: category || undefined, tag: tag || undefined, offset, limit: 25 }).then(r => { if (r && ticket === listTicket.current) setList(r); }); }, [tab, search, mailbox, category, tag, offset, revision]);
          useEffect(() => { if (tab === 'drafts') io.run('draft-list', 'draft', { operation: 'list', offset: draftOffset, limit: 25 }).then(r => { if (r) setDrafts(r); }); }, [tab, draftOffset, revision]);
          const selectMail = async (id, start = 0) => { selection.current = id; setSelected(id); if (!start) setReadResult(null); const r = await io.run('read', 'read', { mail_id: id, offset: start, limit: 12000 }); if (r && selection.current === id) { setReadResult(r); setChoice(r.mail.category || ''); setManualTags(r.mail.manual_tags || []); } };
          const refresh = () => setRevision(n => n + 1);
          const updateMail = async (action, args) => { const id = selected; const r = await io.run('modify-mail', action, args); if (r && selection.current === id) { await selectMail(id, readResult?.body_offset || 0); refresh(); io.setNotice(t('saved')); } };
          const compose = initial => { setEditor({ ...initial, _key: String(Date.now()) }); setTab('drafts'); };
          const m = readResult?.mail;
          const content = tab === 'configure' ? h(Settings, { scope, key: scope + '-settings' }) : tab === 'drafts' ? h('div', { className: 'sm-stack' }, h('div', { className: 'sm-row' }, h(Button, { onClick: () => compose({ mailbox_id: accounts.find(a => a.enabled)?.id || '', to: [], subject: '', body: '' }) }, t('newDraft'))), h('div', { className: 'sm-columns' }, h('section', { className: 'sm-card', 'aria-label': t('drafts') }, !drafts.drafts.length && h('p', { className: 'sm-empty' }, t('noDrafts')), h('ul', { className: 'sm-list' }, drafts.drafts.map(d => h('li', { key: d.id }, h(Button, { className: 'sm-mail', 'aria-current': editor?.id === d.id ? 'true' : undefined, disabled: !!io.busy, onClick: async () => { const r = await io.run('draft-get', 'draft', { operation: 'get', draft_id: d.id }); if (r) setEditor({ ...r.draft, _key: d.id + ':' + r.draft.version }); } }, h('strong', null, d.subject || '—'), h('span', null, (d.to || []).join(', ')), h('small', null, d.status))))), h(Pager, { offset: draftOffset, next: drafts.next_offset, total: drafts.total, busy: !!io.busy, onPage: setDraftOffset })), editor ? h(DraftEditor, { key: editor._key, scope, accounts, initial: editor, onSaved: deleted => { refresh(); if (deleted) setEditor(null); } }) : h('p', { className: 'sm-empty' }, t('noDrafts')))) : h(React.Fragment, null,
            h('form', { className: 'sm-filter', onSubmit: e => { e.preventDefault(); setOffset(0); setSearch(query); } }, h('input', { value: query, onChange: e => setQuery(e.target.value), placeholder: t('query'), 'aria-label': t('query') }), h('select', { value: mailbox, 'aria-label': t('account'), onChange: e => { setMailbox(e.target.value); setOffset(0); setSelected(null); setReadResult(null); selection.current = null; } }, h('option', { value: '' }, t('allAccounts')), accounts.map(a => h('option', { key: a.id, value: a.id }, a.name || a.username))), h('select', { value: category, 'aria-label': t('category'), onChange: e => { setCategory(e.target.value); setOffset(0); } }, h('option', { value: '' }, t('allCategories')), (options?.categories || []).map(c => h('option', { value: c, key: c }, c))), h('select', { value: tag, 'aria-label': t('tags'), onChange: e => { setTag(e.target.value); setOffset(0); } }, h('option', { value: '' }, t('allTags')), (options?.tags || []).map(c => h('option', { value: c, key: c }, c))), h('button', { type: 'submit', disabled: !!io.busy }, t('search'))),
            h('div', { className: 'sm-row' }, h(Button, { disabled: !!io.busy || !accounts.some(a => a.enabled), onClick: async () => { const r = await io.run('sync', 'sync', { mailbox_id: mailbox || undefined }); if (r) { refresh(); io.setNotice(t('syncDone') + ': ' + r.imported + (() => { const skipped = (r.results || []).reduce((n, x) => n + (x.skipped?.length || 0), 0); return skipped ? '\n' + t('skipped') + ': ' + skipped : ''; })() + (r.errors?.length ? '\n' + t('partial') + '\n' + r.errors.map(e => e.message).join('\n') : '')); } } }, t('sync')), h(Button, { disabled: !!io.busy, onClick: refresh }, t('refresh')), h(Button, { disabled: !accounts.length, onClick: () => compose({ mailbox_id: accounts.find(a => a.enabled)?.id || '', to: [], subject: '', body: '' }) }, t('newDraft'))),
            !accounts.length && h('div', { className: 'sm-notice' }, t('noAccounts'), ' ', h(Button, { onClick: () => setTab('configure') }, t('configure'))),
            h('div', { className: 'sm-columns' }, h('section', { className: 'sm-card', 'aria-label': t('inbox') }, !list.messages.length && h('p', { className: 'sm-empty' }, t('noMail')), h('ul', { className: 'sm-list' }, list.messages.map(mail => h('li', { key: mail.id }, h(Button, { className: 'sm-mail', 'aria-current': selected === mail.id ? 'true' : undefined, onClick: () => selectMail(mail.id) }, h('strong', null, mail.subject || '—'), h('span', null, mail.sender), h('small', null, [mail.date, mail.category, ...(mail.tags || [])].filter(Boolean).join(' · ')), mail.analysis_error && h('small', null, mail.analysis_error))))), h(Pager, { offset, next: list.next_offset, total: list.total, busy: !!io.busy, onPage: setOffset })),
            m ? h('article', { className: 'sm-card sm-detail', 'aria-label': t('read') }, h('h2', null, m.subject || '—'), h('dl', null, [['from', m.sender], ['to', m.to], ['account', accounts.find(a => a.id === m.mailbox_id)?.username || m.mailbox_id]].map(([k, v]) => h(React.Fragment, { key: k }, h('dt', null, t(k)), h('dd', null, v)))), h('p', { className: 'sm-muted' }, t('safeBody')), m.summary && h('section', { className: 'sm-notice' }, h('h3', null, t('summary')), h('pre', { className: 'sm-body' }, m.summary)), h('pre', { className: 'sm-body', tabIndex: 0 }, m.body), h('div', { className: 'sm-muted' }, t('bodyPart') + ': ' + readResult.body_offset + '–' + (readResult.body_offset + m.body.length) + ' / ' + readResult.body_length), readResult.next_offset != null && h(Button, { disabled: !!io.busy, onClick: () => selectMail(m.id, readResult.next_offset) }, t('moreBody')), h('div', { className: 'sm-row sm-footer' }, h(Button, { disabled: !!io.busy || !options?.analysis_consent, title: options?.analysis_consent ? t('analyzeHint') : t('consentNeeded'), onClick: () => updateMail('analyze', { mail_ids: [m.id], retry_failed: !!m.analysis_error }) }, m.analysis_error ? t('retry') : t('analyze')), h(Button, { className: 'sm-primary', onClick: () => compose({ mailbox_id: m.mailbox_id, reply_to_id: m.id, to: [m.sender.match(/<([^>]+)>/)?.[1] || m.sender], subject: /^re:/i.test(m.subject) ? m.subject : 'Re: ' + m.subject, body: '' }) }, t('reply'))), h('p', { className: 'sm-muted' }, options?.analysis_consent ? t('analyzeHint') : t('consentNeeded')), h('div', { className: 'sm-row' }, h(Field, { label: t('category') }, h('select', { value: choice, onChange: e => setChoice(e.target.value) }, (options?.categories || []).map(c => h('option', { value: c, key: c }, c)))), h(Button, { disabled: !!io.busy || !choice, onClick: () => updateMail('classify', { mail_id: m.id, category: choice }) }, t('save'))), h('h3', { className: 'sm-footer' }, t('tags')), h('div', { className: 'sm-tags' }, (options?.tags || []).map(v => h(Check, { key: v, label: v, checked: manualTags.includes(v), onChange: e => setManualTags(old => e.target.checked ? [...old, v] : old.filter(x => x !== v)) }))), h(Button, { disabled: !!io.busy, onClick: () => updateMail('tag', { mail_id: m.id, tags: manualTags, mode: 'replace' }) }, t('save')), m.ai_tags?.length > 0 && h('p', { className: 'sm-muted' }, t('aiTags') + ': ' + m.ai_tags.join(', '))) : h('p', { className: 'sm-empty', role: 'status' }, selected ? t('loading') : t('chooseMail'))));
          return h('div', { className: 'sm-page' }, h('style', null, css), h('div', { className: 'sm-wrap' }, h('h1', null, t(scope)), h('p', { className: 'sm-muted' }, t('description')), h('nav', { className: 'sm-tabs', 'aria-label': t(scope) }, ['inbox', 'drafts', 'configure'].map(k => h(Button, { key: k, 'aria-pressed': tab === k, onClick: () => setTab(k) }, t(k)))), h(Feedback, { io }), content));
        }

        function ToolAccess() {
          const t = useT(), io = useIO('personal');
          const [state, setState] = useState(null);
          const load = async () => { const value = await io.run('tool-access', 'tool_access', {}); if (value) setState(value); };
          useEffect(() => { void load(); }, []);
          const toggle = (kind, id) => setState(current => {
            if (!current) return current;
            const list = current[kind] || [];
            return { ...current, [kind]: list.includes(id) ? list.filter(x => x !== id) : [...list, id] };
          });
          const save = async () => {
            if (!state) return;
            const result = await io.run('tool-access-save', 'tool_access_save', { personal: state.personal, work: state.work });
            if (result) { setState(result); io.setNotice(t('toolAccessSaved')); }
          };
          if (!state && !io.busy) return h('section', { className: 'sm-card' }, h(Feedback, { io }), h('h2', null, t('toolAccess')), h('p', { className: 'sm-muted' }, t('toolAccessHelp')));
          const presets = state?.presets || [];
          return h('section', { className: 'sm-card sm-stack' }, h(Feedback, { io }), h('h2', null, t('toolAccess')), h('p', { className: 'sm-muted' }, t('toolAccessHelp')), state && !state.available && h('p', { className: 'sm-notice', role: 'alert' }, t('toolAccessUnavailable')), !presets.length && h('p', { className: 'sm-empty' }, t('noPresets')),
            presets.length > 0 && h('div', { role: 'group', 'aria-label': t('toolAccess') }, h('div', { className: 'sm-row sm-spread sm-muted' }, h('span', null, t('preset')), h('span', { className: 'sm-row' }, h('span', null, t('personalTools')), h('span', null, t('workTools')))), presets.map(preset => h('div', { key: preset.id, className: 'sm-row sm-spread sm-footer' }, h('span', null, preset.name + (preset.broken ? ' (' + preset.broken + ')' : '')), h('span', { className: 'sm-row' }, h('input', { type: 'checkbox', 'aria-label': t('personalTools') + ': ' + preset.name, checked: (state.personal || []).includes(preset.id), onChange: () => toggle('personal', preset.id) }), h('input', { type: 'checkbox', 'aria-label': t('workTools') + ': ' + preset.name, checked: (state.work || []).includes(preset.id), onChange: () => toggle('work', preset.id) }))))),
            h('div', { className: 'sm-row' }, h('button', { type: 'button', className: 'sm-primary', disabled: !!io.busy || !state?.available, onClick: save }, t('saveToolAccess')), h(Button, { disabled: !!io.busy, onClick: load }, t('refresh'))));
        }
        function SettingsPage() {
          const t = useT(), [scope, setScope] = useState('personal');
          return h('div', { className: 'sm-page sm-embed' }, h('style', null, css), h('div', { className: 'sm-wrap' }, h('h1', null, t('settings')), h('p', { className: 'sm-muted' }, t('description')), h('nav', { className: 'sm-tabs', 'aria-label': t('scope') }, ['personal', 'work'].map(s => h(Button, { key: s, 'aria-pressed': scope === s, onClick: () => setScope(s) }, t(s)))), h(Settings, { scope, key: scope }), h(ToolAccess, { key: 'tool-access' })));
        }
        for (const [scope, id, order] of [['personal', 'personal-mail', 31], ['work', 'work-mail', 32]]) {
          ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, locale: NS }, () => h(MailPage, { scope })));
          ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, locale: NS, label: () => translate(scope) }, Icon));
        }
        ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'split-mail', order: 60, locale: NS, label: () => translate('settings') }, SettingsPage));
        ctx.slots.inject('settings.section.icon', () => ctx.slots.register({ name: 'settings.section.icon', id: 'split-mail' }, Icon));
      },
    };
}

function create_planner(require) {
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
}

function create_plans(require) {
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
}

function create_notes(require) {
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

function create_ledger(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'personal-ledger-ui';
    const LIMIT = 30;
    const MAX_CENTS = 100_000_000_000_000;
    const dictionaries = {
      zh: {
        ledger: '账本', title: '个人账本', subtitle: '收支、预算与规划，统一保存在 DSH Host。',
        overview: '概览', entries: '交易明细', analysis: '统计', budgets: '预算', planning: '规划', settings: '分类与数据',
        month: '月份', monthRange: '月', quarter: '季度', q1: '第一季度', q2: '第二季度', q3: '第三季度', q4: '第四季度', year: '年', granularity: '统计周期', range: '日期范围',
        refresh: '刷新', loading: '正在加载…', saving: '正在保存…', loadFailed: '加载失败', retry: '重试',
        income: '收入', expense: '支出', balance: '本期结余', allBalance: '累计结余', count: '记录数',
        add: '新增', edit: '编辑', remove: '删除', save: '保存', cancel: '取消', close: '关闭', saved: '已保存到 Host。', deleted: '已删除。',
        newEntry: '新增账目', amount: '金额（元）', type: '收支方向', category: '分类', date: '日期', description: '备注',
        search: '搜索备注或分类', allTypes: '全部收支', allCategories: '全部分类', applyFilter: '筛选',
        previous: '上一页', next: '下一页', page: '页码', total: '总计', empty: '没有符合条件的记录。', noData: '暂无数据',
        periodTotals: '本期收支', categoryStats: '分类统计', trend: '收支趋势', cumulative: '累计结余',
        budgetTitle: '分类预算', newBudget: '新增预算', budgetAmounts: '分类预算金额（元）', budgetHelp: '未设置的分类按 0 计算；保存将更新整个月份的预算。',
        spent: '已支出', remaining: '剩余', budgetTotal: '预算总额', budgetProgress: '预算执行', budgetWarning: '支出已达到预算的 80%。', budgetExceeded: '支出已达到或超过预算。',
        goals: '储蓄目标', debts: '分期与借贷', reimbursements: '报销', settlements: '结算记录',
        newGoal: '新增储蓄目标', newDebt: '新增分期／借贷', newReimbursement: '新增报销',
        name: '名称', note: '说明', target: '目标金额（元）', startMonth: '起始月份', deadline: '截止日期',
        debtKind: '借贷类型', installment: '分期', loan: '借贷', direction: '借贷方向', out: '借出（别人欠我）', in: '借入（我欠别人）',
        totalAmount: '总金额（元）', periods: '分期期数', startDate: '起始日期', closed: '已结清', source: '报销来源',
        paid: '已结算', savedAmount: '已储蓄', settle: '登记还款／回款', syncEntry: '同步生成收支记录',
        owner: '关联项目', settleHelp: '登记结算会更新项目进度；勾选后同时生成对应收支账目。',
        deleteTitle: '确认删除', deleteHelp: '此操作不可撤销。关联结算或自动生成的账目可能同时调整，请确认后再删除。',
        export: '导出 JSON 备份', exported: '备份已生成。', importFile: '选择 JSON 导入', legacyImport: '读取旧浏览器账本并预览',
        dataHelp: '导入前先预览，确认后才写入 Host。原秘书账本请先导出 JSON 再迁移，不会自动读取原数据库。旧浏览器账本只在点击迁移按钮时读取，且不会自动清理。',
        importPreview: '导入预览', importApply: '确认导入', imported: '导入成功。', conflicts: '冲突', monthly: '逐月合计', counts: '记录数量',
        canImport: '预览通过，可以确认导入。', cannotImport: '存在冲突或校验错误，不能导入。', noLegacy: '本浏览器没有旧版账本记录。',
        invalidLegacy: '旧浏览器账本格式不正确，未进行导入。', fileTooLarge: 'JSON 文件不能超过 20 MiB。',
        incomeCategories: '收入分类（每行一项）', expenseCategories: '支出分类（每行一项）', budgetAlerts: '开启预算 80%／100% 提醒标记',
        optionsHelp: '分类变更不改写已有历史账目。提醒显示在账本预算状态中，不代表系统后台推送。',
        invalidAmount: '请输入有效金额，最多两位小数且不能超出范围。', positiveAmount: '金额必须大于 0。', invalidPeriod: '分期期数必须是 1 至 360 的整数。',
        invalidMonth: '请选择有效月份。', invalidDate: '请选择有效日期。', requestFailed: '操作失败', invalidResponse: 'Host 返回了无效响应。',
        unsaved: '取消将丢弃尚未保存的表单内容。', confirmDiscard: '确认放弃', budgetCategory: '分类', value: '金额',
        hostStorage: '数据由 Host 持久化，页面与 LLM 工具共用同一账本。', operationFailed: '请求未完成；内容已保留，可以重试。',
        filterNote: '筛选只影响明细列表，不改变本期汇总。', linkedEntry: '此账目由结算生成，请在规划的结算记录中编辑或删除。', reloadOptions: '放弃分类草稿并重新载入', reloadHelp: '若其他页面修改了分类导致版本冲突，请放弃草稿、重新载入后再编辑。', version: '版本', optional: '可选', details: '详情',
      },
      en: {
        ledger: 'Ledger', title: 'Personal ledger', subtitle: 'Income, budgets, and plans stored together on the DSH Host.',
        overview: 'Overview', entries: 'Transactions', analysis: 'Analytics', budgets: 'Budgets', planning: 'Planning', settings: 'Categories and data',
        month: 'Month', monthRange: 'Month', quarter: 'Quarter', q1: 'Q1', q2: 'Q2', q3: 'Q3', q4: 'Q4', year: 'Year', granularity: 'Period', range: 'Date range',
        refresh: 'Refresh', loading: 'Loading…', saving: 'Saving…', loadFailed: 'Could not load data', retry: 'Retry',
        income: 'Income', expense: 'Expenses', balance: 'Period balance', allBalance: 'Cumulative balance', count: 'Transactions',
        add: 'Add', edit: 'Edit', remove: 'Delete', save: 'Save', cancel: 'Cancel', close: 'Close', saved: 'Saved to Host.', deleted: 'Deleted.',
        newEntry: 'Add transaction', amount: 'Amount (CNY)', type: 'Transaction type', category: 'Category', date: 'Date', description: 'Description',
        search: 'Search description or category', allTypes: 'All types', allCategories: 'All categories', applyFilter: 'Filter',
        previous: 'Previous', next: 'Next', page: 'Page', total: 'Total', empty: 'No matching records.', noData: 'No data yet',
        periodTotals: 'Period totals', categoryStats: 'By category', trend: 'Income and expense trend', cumulative: 'Cumulative balance',
        budgetTitle: 'Category budgets', newBudget: 'Add budget', budgetAmounts: 'Category amounts (CNY)', budgetHelp: 'Unset categories count as zero. Saving replaces the budget for the entire month.',
        spent: 'Spent', remaining: 'Remaining', budgetTotal: 'Total budget', budgetProgress: 'Budget usage', budgetWarning: 'Expenses have reached 80% of the budget.', budgetExceeded: 'Expenses have reached or exceeded the budget.',
        goals: 'Savings goals', debts: 'Installments and loans', reimbursements: 'Reimbursements', settlements: 'Settlements',
        newGoal: 'Add savings goal', newDebt: 'Add installment or loan', newReimbursement: 'Add reimbursement',
        name: 'Title', note: 'Notes', target: 'Target amount (CNY)', startMonth: 'Starting month', deadline: 'Deadline',
        debtKind: 'Debt type', installment: 'Installment', loan: 'Loan', direction: 'Loan direction', out: 'Lent (others owe me)', in: 'Borrowed (I owe others)',
        totalAmount: 'Total amount (CNY)', periods: 'Installments', startDate: 'Starting date', closed: 'Closed', source: 'Reimbursement source',
        paid: 'Settled', savedAmount: 'Saved', settle: 'Record repayment / collection', syncEntry: 'Create a matching transaction',
        owner: 'Related item', settleHelp: 'Settlement updates the plan progress and optionally creates a matching transaction.',
        deleteTitle: 'Confirm deletion', deleteHelp: 'This cannot be undone. Related settlements or generated transactions may also be adjusted. Confirm before continuing.',
        export: 'Export JSON backup', exported: 'Backup generated.', importFile: 'Choose JSON to import', legacyImport: 'Read old browser ledger and preview',
        dataHelp: 'Preview before confirming writes to Host. Export JSON from the original secretary ledger to migrate it; the old database is not read automatically. Old browser data is read only after clicking migration and is not automatically removed.',
        importPreview: 'Import preview', importApply: 'Confirm import', imported: 'Import completed.', conflicts: 'Conflicts', monthly: 'Monthly totals', counts: 'Record counts',
        canImport: 'Preview passed. Ready to confirm import.', cannotImport: 'Import is blocked by conflicts or validation errors.', noLegacy: 'No old ledger records were found in this browser.',
        invalidLegacy: 'The old browser ledger format is invalid. Nothing was imported.', fileTooLarge: 'JSON files must be at most 20 MiB.',
        incomeCategories: 'Income categories (one per line)', expenseCategories: 'Expense categories (one per line)', budgetAlerts: 'Enable budget 80% / 100% alert markers',
        optionsHelp: 'Category changes do not rewrite past transactions. Budget markers do not imply background system notifications.',
        invalidAmount: 'Enter a valid amount with at most two decimal places within the allowed range.', positiveAmount: 'Amount must be greater than zero.', invalidPeriod: 'Installments must be an integer between 1 and 360.',
        invalidMonth: 'Select a valid month.', invalidDate: 'Select a valid date.', requestFailed: 'Operation failed', invalidResponse: 'Host returned an invalid response.',
        unsaved: 'Canceling discards the unsaved form.', confirmDiscard: 'Discard changes', budgetCategory: 'Category', value: 'Amount',
        hostStorage: 'Data is persisted on Host and shared by the page and LLM tools.', operationFailed: 'The request did not complete. Your input is preserved for retry.',
        filterNote: 'Filters affect the transaction list only, not period totals.', linkedEntry: 'This transaction was generated by a settlement. Edit or delete it in Planning settlements.', reloadOptions: 'Discard category draft and reload', reloadHelp: 'If another page changed categories and caused a version conflict, discard the draft and reload before editing.', version: 'Version', optional: 'Optional', details: 'Details',
      },
    };
    function toCents(input, t, positive = true) {
      const text = String(input == null ? '' : input).trim();
      if (!/^\d+(\.\d{1,2})?$/.test(text)) throw new Error(t('invalidAmount'));
      const [whole, fraction = ''] = text.split('.');
      const value = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
      if (!Number.isSafeInteger(value) || value > MAX_CENTS) throw new Error(t('invalidAmount'));
      if (positive && value <= 0) throw new Error(t('positiveAmount'));
      return value;
    }
    const amountText = (cents) => `${Math.floor((cents || 0) / 100)}.${String((cents || 0) % 100).padStart(2, '0')}`;
    function rangeOf(month, period) {
      if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month) || Number(month.slice(0, 4)) < 1) return null;
      const year = Number(month.slice(0, 4)), m = Number(month.slice(5));
      const first = period === 'year' ? 1 : period === 'quarter' ? Math.floor((m - 1) / 3) * 3 + 1 : m;
      const last = first + (period === 'year' ? 11 : period === 'quarter' ? 2 : 0);
      const days = new Date(Date.UTC(year, last, 0)).getUTCDate();
      return { start: `${month.slice(0, 4)}-${String(first).padStart(2, '0')}-01`, end: `${month.slice(0, 4)}-${String(last).padStart(2, '0')}-${days}` };
    }
    async function call(action, args, t, signal) {
      const response = await fetch('/api/personal-ledger', {
        method: 'POST', credentials: 'same-origin', signal,
        headers: { 'Content-Type': 'application/json', 'X-DSH-Ledger-UI': '1' },
        body: JSON.stringify({ action, args: args || {} }),
      });
      const envelope = await response.json().catch(() => { throw new Error(t('invalidResponse')); });
      if (!response.ok || envelope.ok !== true) {
        const error = new Error(envelope.error && envelope.error.message || t('requestFailed'));
        error.code = envelope.error && envelope.error.code;
        throw error;
      }
      return envelope.value;
    }
    function WalletIcon({ size = 22 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true },
        h('path', { d: 'M4 7V6a2 2 0 0 1 2-2h13v16H6a2 2 0 0 1-2-2V7Zm0 0h15M19 11h-5v5h5' }),
        h('path', { d: 'M16 13.5h.01' }));
    }
    function Modal({ title, children, onClose, busy, t }) {
      const root = React.useRef(null);
      const latest = React.useRef({ busy, onClose });
      latest.current = { busy, onClose };
      React.useEffect(() => {
        const previous = document.activeElement;
        const element = root.current;
        const focusable = () => [...element.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')];
        (focusable()[0] || element).focus();
        function keydown(event) {
          if (event.key === 'Escape' && !latest.current.busy) { event.preventDefault(); latest.current.onClose(); }
          if (event.key === 'Tab') {
            const nodes = focusable(), first = nodes[0], last = nodes[nodes.length - 1];
            if (!first) { event.preventDefault(); return; }
            if (event.shiftKey && (document.activeElement === first || document.activeElement === element)) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
          }
        }
        element.addEventListener('keydown', keydown);
        return () => { element.removeEventListener('keydown', keydown); if (previous && previous.isConnected) previous.focus(); };
      }, []);
      return h('div', { className: 'pl-modal-backdrop' }, h('section', { ref: root, className: 'pl-modal', role: 'dialog', 'aria-modal': true, 'aria-label': title, tabIndex: -1 },
        h('header', { className: 'pl-line' }, h('h2', null, title), h('button', { type: 'button', onClick: onClose, disabled: busy, 'aria-label': t('close') }, t('close'))), children));
    }
    const css = `
/* Personal workspace — ledger scope */
.pl-root{height:100%;min-height:0;box-sizing:border-box;overflow:auto;padding:calc(var(--dsh-frame-top-clearance,0px) + 22px) clamp(18px,3.2vw,44px) 52px;background:radial-gradient(1100px 380px at 112% -160px,color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent),transparent 70%),var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:14px;line-height:1.55}
.pl-root *{box-sizing:border-box}
.pl-shell{max-width:1180px;margin:auto}
.pl-root h1{font-size:clamp(26px,2.4vw,32px);line-height:1.18;font-weight:600;letter-spacing:-.02em;margin:0}
.pl-header>div>h1::before{content:'';display:block;width:42px;height:3px;border-radius:99px;margin-bottom:16px;background:linear-gradient(90deg,var(--dsw-alias-state-business-primary),color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent))}
.pl-root h2{font-size:19px;line-height:1.3;font-weight:600;letter-spacing:-.01em;margin:0 0 14px}
.pl-root h3{font-size:15px;font-weight:600;margin:0}
.pl-root p{margin:6px 0 12px}
.pl-root>p,.pl-header p{font-size:14px;line-height:1.7;max-width:78ch}
.pl-muted,.pl-root small{color:var(--dsw-alias-label-secondary);font-size:12.5px;line-height:1.6}
.pl-muted{margin:0}
.pl-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:20px}
.pl-header p{margin:8px 0 0;color:var(--dsw-alias-label-secondary)}
.pl-line{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.pl-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.pl-root button,.pl-root input,.pl-root select,.pl-root textarea{font:inherit;color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:7px 12px;max-width:100%;transition:background .16s,border-color .16s,box-shadow .16s,color .16s,transform .08s}
.pl-root button{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:34px}
.pl-root button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l3)}
.pl-root button:active:not(:disabled){transform:translateY(1px)}
.pl-root button:disabled{opacity:.45;cursor:not-allowed}
.pl-root :focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
.pl-root input:not([type=checkbox]),.pl-root select,.pl-root textarea{min-height:38px;background:var(--dsw-alias-bg-layer-1)}
.pl-root input:not([type=checkbox]):hover,.pl-root select:hover,.pl-root textarea:hover{border-color:var(--dsw-alias-border-l3)}
.pl-root input:not([type=checkbox]):focus,.pl-root select:focus,.pl-root textarea:focus{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px;border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 4px color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent)}
.pl-root input[type=checkbox]{width:16px;height:16px;accent-color:var(--dsw-alias-state-business-primary);margin:0;padding:0}
.pl-root .pl-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground);font-weight:600;box-shadow:0 10px 22px -16px color-mix(in srgb,var(--dsw-alias-brand-primary) 65%,transparent)}
.pl-root .pl-primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover);border-color:var(--dsw-alias-button-primary-hover);color:var(--dsw-alias-label-primary-foreground)}
.pl-root .pl-danger{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 32%,var(--dsw-alias-border-l2))}
.pl-root .pl-danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger)}
.pl-tabs{display:inline-flex;gap:3px;flex-wrap:wrap;margin:0 0 20px;padding:4px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent)}
.pl-tabs button{border:0;background:transparent;border-radius:9px;min-height:30px;padding:5px 14px;color:var(--dsw-alias-label-secondary);font-size:13px;box-shadow:none}
.pl-tabs button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.pl-tabs button[aria-selected=true]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-weight:600;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l3),0 1px 2px rgb(16 24 40 / 10%)}
.pl-toolbar{display:flex;gap:12px;align-items:end;flex-wrap:wrap;margin-bottom:16px;padding:14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent)}
.pl-field{display:grid;gap:7px;font-size:13px;min-width:0}
.pl-field>span{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500}
.pl-field textarea{min-height:100px;resize:vertical}
.pl-toolbar .pl-field{min-width:150px}
.pl-period-range{flex:1 1 100%;font-size:12px;color:var(--dsw-alias-label-secondary);line-height:1.5;font-variant-numeric:tabular-nums}
.pl-card{padding:18px;border:1px solid var(--dsw-alias-border-l2);border-radius:16px;background:var(--dsw-alias-bg-layer-1);margin-bottom:16px;box-shadow:0 1px 2px rgb(16 24 40 / 5%),0 10px 24px -16px rgb(16 24 40 / 22%)}
.pl-card .pl-card{background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent);box-shadow:none;border-color:var(--dsw-alias-border-l1);padding:16px;margin:12px 0}
.pl-totals{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:18px}
.pl-total{display:grid;gap:4px;padding:16px 18px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:linear-gradient(165deg,color-mix(in srgb,var(--dsw-alias-state-business-primary) 9%,var(--dsw-alias-bg-layer-1)),var(--dsw-alias-bg-layer-1) 58%);box-shadow:0 1px 2px rgb(16 24 40 / 4%);position:relative;overflow:hidden}
.pl-total::before{content:'';position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,var(--dsw-alias-state-business-primary),transparent)}
.pl-total:nth-child(1)::before{background:linear-gradient(90deg,var(--dsw-alias-state-success-primary),transparent)}
.pl-total:nth-child(2)::before{background:linear-gradient(90deg,var(--dsw-alias-state-warn-primary),transparent)}
.pl-total>span{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);font-weight:500}
.pl-total strong{font-size:clamp(20px,3.2vw,26px);line-height:1.2;white-space:nowrap;overflow-wrap:normal;font-variant-numeric:tabular-nums;letter-spacing:-.02em;font-weight:600}
.pl-total small{font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.pl-income{color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 55%,var(--dsw-alias-label-primary))}
.pl-expense{color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 55%,var(--dsw-alias-label-primary))}
.pl-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.pl-grid>.pl-card{margin:0}
.pl-list{display:grid;gap:2px}
.pl-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 10px;border-radius:10px;border-bottom:1px solid var(--dsw-alias-border-l1);transition:background .14s}
.pl-row:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent)}
.pl-row:last-child{border-bottom:0}
.pl-row-copy{min-width:0;flex:1;overflow-wrap:anywhere}
.pl-row-copy strong{font-size:13.5px;font-weight:600}
.pl-row-copy small{display:block;font-size:11.5px}
.pl-row-copy span{display:block;font-size:12.5px;color:var(--dsw-alias-label-secondary);margin-top:2px}
.pl-money{font-variant-numeric:tabular-nums;white-space:nowrap;font-weight:600}
.pl-empty{padding:34px 12px;text-align:center;color:var(--dsw-alias-label-secondary);border:1px dashed var(--dsw-alias-border-l2);border-radius:14px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 2%,transparent)}
.pl-notice{position:relative;padding:12px 14px 12px 16px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,var(--dsw-alias-border-l1));border-radius:12px;margin-bottom:12px;overflow-wrap:anywhere;background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent)}
.pl-notice::before{content:'';position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:99px;background:var(--dsw-alias-state-business-primary)}
.pl-notice.pl-error{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 26%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 7%,transparent)}
.pl-notice.pl-error::before{background:var(--dsw-alias-state-error-primary)}
.pl-notice.pl-success{border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 26%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 7%,transparent)}
.pl-notice.pl-success::before{background:var(--dsw-alias-state-success-primary)}
.pl-error{color:var(--dsw-alias-state-error-primary)}
.pl-success{color:var(--dsw-alias-state-success-primary)}
.pl-root progress{display:block;width:100%;height:8px;margin:10px 0;appearance:none;border:0;border-radius:999px;overflow:hidden;background:color-mix(in srgb,var(--dsw-alias-label-primary) 8%,transparent)}
.pl-root progress::-webkit-progress-bar{background:color-mix(in srgb,var(--dsw-alias-label-primary) 8%,transparent);border-radius:999px}
.pl-root progress::-webkit-progress-value{background:linear-gradient(90deg,var(--dsw-alias-state-business-primary),color-mix(in srgb,var(--dsw-alias-state-business-primary) 55%,var(--dsw-alias-state-success-primary)));border-radius:999px}
.pl-root progress::-moz-progress-bar{background:var(--dsw-alias-state-business-primary);border-radius:999px}
.pl-table-wrap{overflow:auto}
.pl-root table{width:100%;border-collapse:separate;border-spacing:0;text-align:left;font-size:13px}
.pl-root th,.pl-root td{padding:10px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);white-space:nowrap}
.pl-root th{color:var(--dsw-alias-label-secondary);font-size:11.5px;font-weight:500;letter-spacing:.05em;text-transform:uppercase;background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent)}
.pl-root tbody tr:hover td{background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent)}
.pl-root td:first-child{font-weight:500}
.pl-footer{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:24px;padding-top:14px;border-top:1px solid var(--dsw-alias-border-l1)}
.pl-form{display:grid;gap:16px}
.pl-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.pl-check{display:flex;gap:8px;align-items:center;min-height:32px;padding-block:2px;font-size:13px;cursor:pointer}
.pl-root .pl-check input{width:16px;height:16px}
.pl-import-input{display:block;margin:12px 0}
.pl-report{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;max-height:220px;overflow:auto;padding:12px;border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent);border:1px solid var(--dsw-alias-border-l1)}
.pl-modal-backdrop{position:fixed;inset:0;z-index:1000;background:var(--dsw-alias-bg-mask-3);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:18px}
.pl-modal{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:16px;padding:22px;width:min(660px,100%);max-height:90vh;overflow:auto;box-shadow:0 32px 80px rgb(0 0 0 / 32%)}
.pl-modal>header{margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.pl-modal>header h2{margin:0;font-size:18px}
.pl-modal>header button{flex:none}
.pl-chart{width:100%;height:auto;display:block;margin:6px 0;overflow:visible}
.pl-chart text{fill:var(--dsw-alias-label-secondary);font-size:13px}
.pl-chart line{stroke:var(--dsw-alias-border-l1)}
.pl-chart rect{rx:3px;transition:opacity .14s}
.pl-chart rect:hover{opacity:.82}
.pl-root [role=status]{color:var(--dsw-alias-label-secondary);font-size:13px}
@media(max-width:820px){.pl-totals{grid-template-columns:repeat(2,minmax(0,1fr))}.pl-grid{grid-template-columns:1fr}.pl-header{align-items:flex-start}.pl-row{flex-wrap:wrap}.pl-row-copy{flex-basis:55%}.pl-form-grid{grid-template-columns:1fr}.pl-root{padding-inline:16px}.pl-toolbar{gap:8px}.pl-toolbar .pl-field{flex:1 1 140px}.pl-tabs button{padding:6px 10px}}
@media(max-width:680px){.pl-chart{min-width:520px}.pl-card{overflow-x:auto}}
@media(max-width:560px){.pl-totals{grid-template-columns:1fr 1fr;gap:8px}.pl-total{padding:13px 14px}.pl-total strong{font-size:21px}.pl-card{padding:14px}.pl-tabs{width:100%}.pl-tabs button{flex:1}.pl-root input,.pl-root select,.pl-root textarea{font-size:16px}}

/* Card header alignment */
.pl-line>h2{margin-bottom:0}

@media (pointer:coarse){.pl-root input:not([type=checkbox]),.pl-root select,.pl-root textarea{font-size:16px}}
@media (prefers-reduced-motion:reduce){.pl-root *,.pl-root *::before,.pl-root *::after{transition:none!important;transform:none!important}}
@media (hover:none){.pl-row:hover{background:transparent}.pl-root tbody tr:hover td{background:transparent}}
`;
    function Panel({ locale, t }) {
      const localeSnapshot = React.useSyncExternalStore((fn) => locale.subscribe(fn), () => locale.getSnapshot());
      const money = (value) => new Intl.NumberFormat(localeSnapshot.active, { style: 'currency', currency: 'CNY' }).format((value || 0) / 100);
      const initialMonth = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit' }).format(new Date());
      const [tab, setTab] = React.useState('overview');
      const [month, setMonth] = React.useState(initialMonth);
      const [period, setPeriod] = React.useState('month');
      const [yearInput, setYearInput] = React.useState(initialMonth.slice(0,4));
      const [revision, setRevision] = React.useState(0);
      const [data, setData] = React.useState(null);
      const [loading, setLoading] = React.useState(true);
      const [loadError, setLoadError] = React.useState('');
      const [notice, setNotice] = React.useState('');
      const [busy, setBusy] = React.useState(false);
      const busyRef = React.useRef(false);
      const mounted = React.useRef(true);
      const downloads = React.useRef(new Map());
      const [filters, setFilters] = React.useState({ type: '', category: '', query: '' });
      const [draftFilters, setDraftFilters] = React.useState(filters);
      const [offset, setOffset] = React.useState(0);
      const [entries, setEntries] = React.useState({ items: [], total: 0 });
      const [queryLoading, setQueryLoading] = React.useState(false);
      const [queryError, setQueryError] = React.useState('');
      const [editor, setEditor] = React.useState(null);
      const [confirmDelete, setConfirmDelete] = React.useState(null);
      const [discard, setDiscard] = React.useState(false);
      const [formError, setFormError] = React.useState('');
      const [importState, setImportState] = React.useState(null);
      const [optionsForm, setOptionsForm] = React.useState(null);
      const optionsKey = React.useRef(null);
      const optionsDirty = React.useRef(false);
      const [budgetOffset, setBudgetOffset] = React.useState(0);
      const range = rangeOf(month, period);
      const monthValue = Number(month.slice(5,7)), quarterValue = Math.floor((monthValue-1)/3)+1;
      const applyYear = (value) => { setYearInput(value); if (!/^\d{4}$/.test(value)) return; const year = Number(value); if (year < 1 || year > 9999) return; setMonth(`${value}-${month.slice(5,7)}`); };
      const commitYear = () => { const digits = String(yearInput).trim(); if (!/^\d{1,4}$/.test(digits) || Number(digits) < 1) { setYearInput(month.slice(0,4)); return; } const value = digits.padStart(4,'0'); setYearInput(value); if (value !== month.slice(0,4)) setMonth(`${value}-${month.slice(5,7)}`); };
      const setQuarter = (value) => { const q = Number(value); if (!Number.isInteger(q) || q < 1 || q > 4) return; const current = Number(month.slice(5,7)); const within = current >= (q-1)*3+1 && current <= q*3 ? current : (q-1)*3+1; setMonth(`${month.slice(0,4)}-${String(within).padStart(2,'0')}`); };
      const yearLabel = range ? new Intl.DateTimeFormat(localeSnapshot.active, { year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month.slice(0,4)}-01-01T00:00:00Z`)) : '';
      const periodTitle = !range ? '' : period === 'year' ? yearLabel : period === 'quarter' ? `${yearLabel} · ${t('q'+quarterValue)}` : new Intl.DateTimeFormat(localeSnapshot.active, { year: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${month}-01T00:00:00Z`));
      React.useEffect(() => { mounted.current = true; return () => { mounted.current = false; for (const [url, timer] of downloads.current) { clearTimeout(timer); URL.revokeObjectURL(url); } downloads.current.clear(); }; }, []);
      React.useEffect(() => {
        const controller = new AbortController();
        if (!range) { setLoadError(t('invalidMonth')); setLoading(false); return () => controller.abort(); }
        setLoading(true); setLoadError('');
        Promise.all([call('options', {}, t, controller.signal), call('summary', range, t, controller.signal), call('planning', {}, t, controller.signal), call('query', { kind: 'budgets', offset: budgetOffset, limit: LIMIT }, t, controller.signal)])
          .then(([options, summary, planning, budgets]) => { if (!controller.signal.aborted) setData({ options, summary, planning, budgets: budgets.items || [], budgetTotal: budgets.total || 0 }); })
          .catch((error) => { if (!controller.signal.aborted) setLoadError(error.message); })
          .finally(() => { if (!controller.signal.aborted) setLoading(false); });
        return () => controller.abort();
      }, [month, period, revision, budgetOffset]);
      React.useEffect(() => {
        if (!range || !data) return;
        const controller = new AbortController();
        setQueryLoading(true); setQueryError('');
        call('query', { ...range, ...filters, offset, limit: LIMIT }, t, controller.signal)
          .then((value) => { if (!controller.signal.aborted) setEntries(value); })
          .catch((error) => { if (!controller.signal.aborted) setQueryError(error.message); })
          .finally(() => { if (!controller.signal.aborted) setQueryLoading(false); });
        return () => controller.abort();
      }, [month, period, filters, offset, revision, !!data]);
      React.useEffect(() => { setOffset(0); }, [month, period]);
      React.useEffect(() => { setYearInput(month.slice(0,4)); }, [month, period]);
      React.useEffect(() => {
        if (data && !optionsDirty.current) {
          setOptionsForm({ income: data.options.income_categories.join('\n'), expense: data.options.expense_categories.join('\n'), alerts: !!data.options.budget_alerts, version: data.options.version });
          optionsKey.current = crypto.randomUUID();
        }
      }, [data]);
      const button = (key, onClick, props) => h('button', { type: 'button', onClick, disabled: busy, ...props }, t(key));
      const field = (key, value, onChange, props = {}) => h('label', { className: 'pl-field' }, h('span', null, t(key)), h('input', { value: value == null ? '' : value, onChange: (event) => onChange(event.target.value), disabled: busy, ...props }));
      const select = (key, value, onChange, choices) => h('label', { className: 'pl-field' }, h('span', null, t(key)), h('select', { value, onChange: (event) => onChange(event.target.value), disabled: busy }, choices.map(([v, label]) => h('option', { value: v, key: v }, label))));
      const empty = () => h('div', { className: 'pl-empty' }, t('empty'));
      const refresh = () => setRevision((value) => value + 1);
      async function mutate(action, args, success, after) {
        if (busyRef.current) return;
        busyRef.current = true; setBusy(true); setFormError(''); setNotice('');
        try {
          const value = await call(action, args, t);
          if (mounted.current) { if (after) after(value); setNotice(t(success)); refresh(); }
          return true;
        } catch (error) {
          if (mounted.current) setFormError(`${t('requestFailed')}: ${error.message}. ${t('operationFailed')}`);
          return false;
        } finally { busyRef.current = false; if (mounted.current) setBusy(false); }
      }
      function open(kind, record = null, owner = null) {
        if (!data || busy) return;
        setFormError(''); setDiscard(false);
        const value = record || {};
        let form;
        if (kind === 'entries') form = { type: value.type || 'expense', category: value.category || data.options.expense_categories[0], amount: record ? amountText(value.amount_cents) : '', date: value.date || data.options.today, description: value.description || '' };
        else if (kind === 'budgets') form = { month: value.month || month, amounts: Object.fromEntries([...new Set([...data.options.expense_categories, ...Object.keys(value.amounts || {})])].map((name) => [name, amountText((value.amounts || {})[name] || 0)])) };
        else if (kind === 'settlements') form = { amount: amountText(value.amount_cents || owner.next_amount_cents || owner.remaining_cents || 0), date: value.date || data.options.today, sync_entry: record ? value.sync_entry : true };
        else form = { title: value.title || '', note: value.note || '', amount: record ? amountText(value.target_cents || value.total_cents) : '', start_month: value.start_month || month, deadline: value.deadline || '', kind: value.kind || 'installment', direction: value.direction || 'out', periods: value.periods || 1, start_date: value.start_date || '', date: value.date || data.options.today, closed: !!value.closed, source: value.source || '' };
        setEditor({ kind, record, owner, form, key: crypto.randomUUID() });
      }
      function change(name, value) { setEditor((current) => ({ ...current, key: crypto.randomUUID(), form: { ...current.form, [name]: value } })); }
      function closeEditor() { if (!busy) setDiscard(true); }
      async function submit(event) {
        event.preventDefault(); if (!editor || busyRef.current) return;
        try {
          const { kind, record, form: f, key, owner } = editor;
          let value;
          if (kind === 'entries') value = { type: f.type, category: f.category, amount_cents: toCents(f.amount, t), date: f.date, description: f.description };
          else if (kind === 'budgets') value = { month: f.month, amounts: Object.fromEntries(Object.entries(f.amounts).map(([name, amount]) => [name, toCents(amount || '0', t, false)])) };
          else if (kind === 'settlements') value = { owner_kind: owner.resource.replace(/^ledger_/, ''), owner_id: owner.id, owner_version: owner.version, amount_cents: toCents(f.amount, t), date: f.date, sync_entry: f.sync_entry };
          else {
            value = { title: f.title, note: f.note, ...(record && record.reminder_at ? { reminder_at: record.reminder_at } : {}) };
            if (kind === 'goals') Object.assign(value, { target_cents: toCents(f.amount, t), start_month: f.start_month || null, deadline: f.deadline || null });
            if (kind === 'debts') {
              const n = Number(f.periods);
              if (!Number.isInteger(n) || n < 1 || n > 360) throw new Error(t('invalidPeriod'));
              Object.assign(value, { total_cents: toCents(f.amount, t), kind: f.kind, direction: f.direction, periods: n, start_date: f.start_date || null, closed: f.closed });
            }
            if (kind === 'reimbursements') Object.assign(value, { total_cents: toCents(f.amount, t), source: f.source, date: f.date, closed: f.closed });
          }
          if (kind === 'settlements') await mutate('settle', { data: { ...value, ...(record ? { version: record.version } : {}) }, ...(record ? { id: record.id } : {}), idempotency_key: key }, 'saved', () => setEditor(null));
          else await mutate('save', { kind, data: value, ...(record ? { id: record.id, version: record.version } : {}), idempotency_key: key }, 'saved', () => { setEditor(null); if (kind === 'entries') { setMonth(f.date.slice(0, 7)); setOffset(0); } if (kind === 'budgets') setMonth(f.month); });
        } catch (error) { setFormError(error.message); }
      }
      function askDelete(kind, record) { setFormError(''); setConfirmDelete({ kind, record, key: crypto.randomUUID() }); }
      async function remove() {
        const item = confirmDelete;
        await mutate('delete', { kind: item.kind, id: item.record.id, version: item.record.version, idempotency_key: item.key }, 'deleted', () => { setConfirmDelete(null); setEditor(null); });
      }
      async function previewImport(payload) {
        if (busyRef.current) return;
        setFormError(''); setNotice(''); setImportState(null); setBusy(true); busyRef.current = true;
        try { const report = await call('import_preview', { payload }, t); if (mounted.current) setImportState({ payload, report, key: crypto.randomUUID() }); }
        catch (error) { if (mounted.current) setFormError(error.message); }
        finally { busyRef.current = false; if (mounted.current) setBusy(false); }
      }
      async function importFile(event) {
        const file = event.target.files && event.target.files[0]; event.target.value = ''; if (!file) return;
        try { if (file.size > 20 * 1024 * 1024) throw new Error(t('fileTooLarge')); await previewImport(JSON.parse(await file.text())); }
        catch (error) { setFormError(error.message); }
      }
      async function importLegacy() {
        try {
          const raw = localStorage.getItem('dsh.personal-ledger.v1');
          if (!raw) throw new Error(t('noLegacy'));
          const rows = JSON.parse(raw);
          if (!Array.isArray(rows) || !rows.length) throw new Error(t('noLegacy'));
          const records = rows.map((row) => {
            if (!row || typeof row.id !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(row.id) || !Number.isSafeInteger(row.cents) || row.cents <= 0 || row.cents > MAX_CENTS || !['income', 'expense'].includes(row.type) || typeof row.category !== 'string' || typeof row.date !== 'string') throw new Error(t('invalidLegacy'));
            const stamp = new Date(row.createdAt || Date.now()).toISOString();
            return { kind: 'entries', id: row.id, created_at: stamp, updated_at: stamp, data: { type: row.type, category: row.category, description: typeof row.memo === 'string' ? row.memo : '', amount_cents: row.cents, date: row.date, origin: 'import' } };
          });
          await previewImport({ app: 'pardo-secretary-ledger', version: 2, records });
        } catch (error) { setFormError(error.message); }
      }
      async function exportData() {
        if (busyRef.current) return;
        setBusy(true); busyRef.current = true; setFormError('');
        try {
          const payload = await call('export', {}, t);
          const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
          const anchor = document.createElement('a'); anchor.href = url; anchor.download = `dsh-ledger-${data.options.today}.json`; anchor.click(); downloads.current.set(url, setTimeout(() => { URL.revokeObjectURL(url); downloads.current.delete(url); }, 1000));
          if (mounted.current) setNotice(t('exported'));
        } catch (error) { if (mounted.current) setFormError(error.message); }
        finally { busyRef.current = false; if (mounted.current) setBusy(false); }
      }
      const summary = data && data.summary;
      function totals() {
        return h('section', { className: 'pl-totals', 'aria-label': t('periodTotals') }, [['income', 'income_cents'], ['expense', 'expense_cents'], ['balance', 'balance_cents'], ['allBalance', 'all_balance_cents']].map(([label, key]) => h('article', { key, className: 'pl-total' }, h('span', { className: 'pl-muted' }, t(label)), h('strong', { className: label === 'income' ? 'pl-income' : label === 'expense' ? 'pl-expense' : '' }, money(summary[key])), h('small', null, `${summary.start || range.start} – ${summary.end || range.end}`))));
      }
      function categories() {
        return h('section', { className: 'pl-card' }, h('h2', null, t('categoryStats')), (summary.categories || []).length ? h('div', { className: 'pl-list' }, summary.categories.map((row) => h('div', { className: 'pl-row', key: `${row.type}:${row.category}` }, h('div', { className: 'pl-row-copy' }, h('strong', null, row.category), h('small', null, t(row.type))), h('strong', { className: 'pl-money' }, money(row.amount_cents))))) : empty());
      }
      function trend() {
        const points = period === 'month' ? summary.daily || [] : summary.series || [];
        const max = Math.max(100, ...points.flatMap((row) => [row.income_cents || 0, row.expense_cents || 0]));
        const step = 560 / Math.max(1, points.length), base = 170;
        return h('section', { className: 'pl-card' }, h('h2', null, t('trend')), !points.length ? empty() : h(React.Fragment, null,
          h('svg', { className: 'pl-chart', viewBox: '0 0 620 215', role: 'img', 'aria-label': t('trend') },
            [0, 1, 2].map((i) => h('g', { key: i }, h('line', { x1: 48, x2: 610, y1: 20 + i * 75, y2: 20 + i * 75 }), h('text', { x: 44, y: 24 + i * 75, textAnchor: 'end' }, Math.round(max * (1 - i / 2) / 100)))),
            points.map((row, index) => h('g', { key: row.month || index }, ['income_cents', 'expense_cents'].map((key, k) => h('rect', { key, x: 50 + index * step + k * step * .34, y: base - (row[key] || 0) / max * 150, width: Math.max(1, step * .3), height: (row[key] || 0) / max * 150, fill: k ? 'var(--dsw-alias-state-warn-primary)' : 'var(--dsw-alias-state-success-primary)' }, h('title', null, `${row.month} ${t(k ? 'expense' : 'income')}: ${money(row[key])}`))), (points.length <= 12 || index % 5 === 0) ? h('text', { x: 50 + index * step, y: 195 }, (row.month || '').slice(5)) : null))),
          h('div', { className: 'pl-actions' }, h('span', { className: 'pl-income' }, t('income')), h('span', { className: 'pl-expense' }, t('expense')))));
      }
      function entryList() {
        const categories = [...new Set([...data.options.income_categories, ...data.options.expense_categories])];
        return h('section', { className: 'pl-card' }, h('div', { className: 'pl-line' }, h('h2', null, t('entries')), button('newEntry', () => open('entries'), { className: 'pl-primary' })),
          h('form', { className: 'pl-toolbar', onSubmit: (event) => { event.preventDefault(); setOffset(0); setFilters({ ...draftFilters }); } },
            select('type', draftFilters.type, (value) => setDraftFilters((f) => ({ ...f, type: value })), [['', t('allTypes')], ['income', t('income')], ['expense', t('expense')]]),
            select('category', draftFilters.category, (value) => setDraftFilters((f) => ({ ...f, category: value })), [['', t('allCategories')], ...categories.map((name) => [name, name])]),
            field('search', draftFilters.query, (value) => setDraftFilters((f) => ({ ...f, query: value })), { maxLength: 200 }), h('button', { type: 'submit', disabled: busy || queryLoading }, t('applyFilter'))),
          h('small', null, t('filterNote')),
          queryError ? h('div', { className: 'pl-notice pl-error', role: 'alert' }, queryError, button('retry', refresh)) : queryLoading ? h('p', { role: 'status' }, t('loading')) : entries.items.length ? h('div', { className: 'pl-list' }, entries.items.map((row) => h('article', { key: row.id, className: 'pl-row' }, h('div', { className: 'pl-row-copy' }, h('strong', null, row.category), h('small', null, `${row.date} · ${t(row.type)}`), row.description ? h('span', null, row.description) : null), h('strong', { className: `pl-money ${row.type === 'income' ? 'pl-income' : 'pl-expense'}` }, money(row.amount_cents)), h('div', { className: 'pl-actions' }, row.settlement_id ? h('small', null, t('linkedEntry')) : null, button('edit', () => open('entries', row), { disabled: busy || !!row.settlement_id }), button('remove', () => askDelete('entries', row), { className: 'pl-danger', disabled: busy || !!row.settlement_id }))))) : empty(),
          h('footer', { className: 'pl-line' }, h('small', null, `${t('total')}: ${entries.total} · ${t('page')}: ${Math.floor(offset / LIMIT) + 1}`), h('div', { className: 'pl-actions' }, button('previous', () => setOffset(Math.max(0, offset - LIMIT)), { disabled: busy || queryLoading || offset === 0 }), button('next', () => setOffset(offset + LIMIT), { disabled: busy || queryLoading || offset + LIMIT >= entries.total }))));
      }
      function budgetList() {
        return h('section', { className: 'pl-card' }, h('div', { className: 'pl-line' }, h('h2', null, t('budgetTitle')), button('newBudget', () => open('budgets', data.budgets.find((b) => b.month === month) || (summary.budgets || []).find((b) => b.month === month) || null), { className: 'pl-primary' })),
          data.budgets.length ? data.budgets.slice().sort((a, b) => b.month.localeCompare(a.month)).map((budget) => {
            const status = (summary.budgets || []).find((b) => b.id === budget.id);
            const total = Object.values(budget.amounts || {}).reduce((sum, n) => sum + n, 0);
            return h('article', { className: 'pl-card', key: budget.id }, h('div', { className: 'pl-line' }, h('h3', null, budget.month), h('div', { className: 'pl-actions' }, button('edit', () => open('budgets', budget)), button('remove', () => askDelete('budgets', budget), { className: 'pl-danger' }))),
              h('p', null, `${t('budgetTotal')}: ${money(total)}`),
              status ? h('div', null, h('progress', { value: Math.max(0, status.spent_cents || 0), max: Math.max(1, total), 'aria-label': t('budgetProgress') }), h('small', null, `${t('spent')}: ${money(status.spent_cents)} · ${t('remaining')}: ${money(status.remaining_cents)}`)) : null,
              status && data.options.budget_alerts && total > 0 && status.spent_cents >= total * .8 ? h('p', { className: 'pl-expense', role: 'status' }, t(status.spent_cents >= total ? 'budgetExceeded' : 'budgetWarning')) : null,
              h('div', { className: 'pl-list' }, Object.entries(budget.amounts || {}).map(([name, value]) => h('div', { className: 'pl-row', key: name }, h('span', null, name), h('span', { className: 'pl-money' }, money(value))))));
          }) : empty(),
          h('footer', { className: 'pl-line' }, h('small', null, `${t('total')}: ${data.budgetTotal} · ${t('page')}: ${Math.floor(budgetOffset / LIMIT) + 1}`), h('div', { className: 'pl-actions' }, button('previous', () => setBudgetOffset(Math.max(0, budgetOffset - LIMIT)), { disabled: busy || budgetOffset === 0 }), button('next', () => setBudgetOffset(budgetOffset + LIMIT), { disabled: busy || budgetOffset + LIMIT >= data.budgetTotal }))));
      }
      function planList() {
        return h('div', { className: 'pl-grid' }, ['goals', 'debts', 'reimbursements'].map((kind) => h('section', { className: 'pl-card', key: kind }, h('div', { className: 'pl-line' }, h('h2', null, t(kind)), button(({ goals: 'newGoal', debts: 'newDebt', reimbursements: 'newReimbursement' })[kind], () => open(kind))),
          (data.planning[kind] || []).length ? data.planning[kind].map((row) => h('article', { className: 'pl-card', key: row.id }, h('h3', null, row.title), row.note ? h('p', { className: 'pl-muted' }, row.note) : null,
            h('p', null, `${t(kind === 'goals' ? 'target' : 'totalAmount')}: ${money(row.target_cents || row.total_cents)}`),
            h('p', null, `${t(kind === 'goals' ? 'savedAmount' : 'paid')}: ${money(kind === 'goals' ? row.saved_cents : row.paid_cents)} · ${t('remaining')}: ${money(row.remaining_cents)}`),
            row.deadline ? h('small', null, `${t('deadline')}: ${row.deadline}`) : null, row.closed ? h('p', { className: 'pl-muted' }, t('closed')) : null,
            h('div', { className: 'pl-actions' }, button('edit', () => open(kind, row)), kind !== 'goals' ? button('settle', () => open('settlements', null, row), { disabled: busy || row.closed || row.remaining_cents <= 0 }) : null, button('remove', () => askDelete(kind, row), { className: 'pl-danger' })))) : empty())),
          h('section', { className: 'pl-card' }, h('h2', null, t('settlements')), (data.planning.settlements || []).length ? data.planning.settlements.map((row) => {
            const owner = (data.planning[row.owner_kind] || []).find((item) => item.id === row.owner_id);
            return h('article', { className: 'pl-row', key: row.id }, h('div', { className: 'pl-row-copy' }, h('strong', null, owner ? owner.title : row.owner_id), h('small', null, row.date)), h('strong', null, money(row.amount_cents)), h('div', { className: 'pl-actions' }, owner ? button('edit', () => open('settlements', row, owner)) : null, button('remove', () => askDelete('settlements', row), { className: 'pl-danger' })));
          }) : empty()));
      }
      function settings() {
        return h('div', { className: 'pl-grid' }, h('section', { className: 'pl-card' }, h('h2', null, t('settings')), h('p', { className: 'pl-muted' }, t('optionsHelp')), h('p', { className: 'pl-muted' }, t('reloadHelp')), button('reloadOptions', () => { optionsDirty.current = false; setOptionsForm(null); refresh(); }),
          optionsForm ? h('form', { className: 'pl-form', onSubmit: async (event) => {
            event.preventDefault();
            const list = (text) => [...new Set(text.split('\n').map((v) => v.trim()).filter(Boolean))];
            await mutate('save_options', { data: { income_categories: list(optionsForm.income), expense_categories: list(optionsForm.expense), budget_alerts: optionsForm.alerts }, version: optionsForm.version, idempotency_key: optionsKey.current }, 'saved', () => { optionsDirty.current = false; });
          } }, ['income', 'expense'].map((kind) => h('label', { className: 'pl-field', key: kind }, h('span', null, t(kind === 'income' ? 'incomeCategories' : 'expenseCategories')), h('textarea', { value: optionsForm[kind], disabled: busy, onChange: (event) => { const value = event.target.value; optionsDirty.current = true; optionsKey.current = crypto.randomUUID(); setOptionsForm((f) => ({ ...f, [kind]: value })); } }))),
            h('label', { className: 'pl-check' }, h('input', { type: 'checkbox', checked: optionsForm.alerts, disabled: busy, onChange: (event) => { const checked = event.target.checked; optionsDirty.current = true; optionsKey.current = crypto.randomUUID(); setOptionsForm((f) => ({ ...f, alerts: checked })); } }), t('budgetAlerts')), h('button', { type: 'submit', disabled: busy, className: 'pl-primary' }, t(busy ? 'saving' : 'save'))) : null),
          h('section', { className: 'pl-card' }, h('h2', null, t('importFile')), h('p', { className: 'pl-muted' }, t('dataHelp')), h('div', { className: 'pl-actions' }, button('export', exportData), button('legacyImport', importLegacy)), h('label', { className: 'pl-field pl-import-input' }, h('span', null, t('importFile')), h('input', { type: 'file', accept: '.json,application/json', disabled: busy, onChange: importFile })),
            importState ? h('section', null, h('h3', null, t('importPreview')), h('p', { className: importState.report.can_apply ? 'pl-success' : 'pl-error' }, t(importState.report.can_apply ? 'canImport' : 'cannotImport')), ['counts', 'monthly', 'conflicts'].map((key) => h('div', { key }, h('h3', null, t(key)), h('pre', { className: 'pl-report' }, JSON.stringify(importState.report[key] || [], null, 2)))),
              h('div', { className: 'pl-actions' }, button('importApply', () => mutate('import_apply', { payload: importState.payload, fingerprint: importState.report.fingerprint, idempotency_key: importState.key }, 'imported', () => { setImportState(null); optionsDirty.current = false; }), { disabled: busy || !importState.report.can_apply, className: 'pl-primary' }), button('cancel', () => setImportState(null)))) : null));
      }
      function editorFields() {
        const { kind, form: f, record } = editor;
        const input = (key, name, props) => field(key, f[name], (value) => change(name, value), props);
        const check = (key, name) => h('label', { className: 'pl-check' }, h('input', { type: 'checkbox', checked: f[name], disabled: busy, onChange: (event) => change(name, event.target.checked) }), t(key));
        if (kind === 'entries') {
          const names = [...new Set([...(data.options[`${f.type}_categories`] || []), ...(record && record.type === f.type ? [record.category] : [])])];
          return h(React.Fragment, null, select('type', f.type, (type) => { change('type', type); change('category', data.options[`${type}_categories`][0]); }, [['expense', t('expense')], ['income', t('income')]]),
            h('div', { className: 'pl-form-grid' }, input('amount', 'amount', { inputMode: 'decimal', required: true }), input('date', 'date', { type: 'date', required: true })), select('category', f.category, (value) => change('category', value), names.map((name) => [name, name])), input('description', 'description', { maxLength: 2000 }));
        }
        if (kind === 'budgets') return h(React.Fragment, null, input('month', 'month', { type: 'month', required: true }), h('p', { className: 'pl-muted' }, t('budgetHelp')), h('div', { className: 'pl-form-grid' }, Object.entries(f.amounts).map(([name, value]) => h('label', { className: 'pl-field', key: name }, h('span', null, name), h('input', { inputMode: 'decimal', value, disabled: busy, onChange: (event) => change('amounts', { ...f.amounts, [name]: event.target.value }) })))));
        if (kind === 'settlements') return h(React.Fragment, null, h('p', null, `${t('owner')}: ${editor.owner.title}`), h('p', { className: 'pl-muted' }, t('settleHelp')), input('amount', 'amount', { inputMode: 'decimal', required: true }), input('date', 'date', { type: 'date', required: true }), check('syncEntry', 'sync_entry'));
        return h(React.Fragment, null, input('name', 'title', { maxLength: 200, required: true }), input('note', 'note', { maxLength: 2000 }), input(kind === 'goals' ? 'target' : 'totalAmount', 'amount', { inputMode: 'decimal', required: true }),
          kind === 'goals' ? h('div', { className: 'pl-form-grid' }, input('startMonth', 'start_month', { type: 'month' }), input('deadline', 'deadline', { type: 'date' })) : null,
          kind === 'debts' ? h(React.Fragment, null, select('debtKind', f.kind, (value) => change('kind', value), [['installment', t('installment')], ['loan', t('loan')]]), f.kind === 'loan' ? select('direction', f.direction, (value) => change('direction', value), [['out', t('out')], ['in', t('in')]]) : null, h('div', { className: 'pl-form-grid' }, f.kind === 'installment' ? input('periods', 'periods', { type: 'number', min: 1, max: 360, step: 1, required: true }) : null, input('startDate', 'start_date', { type: 'date' }))) : null,
          kind === 'reimbursements' ? h(React.Fragment, null, input('source', 'source', { maxLength: 200 }), input('date', 'date', { type: 'date', required: true })) : null,
          kind !== 'goals' ? check('closed', 'closed') : null);
      }
      return h('main', { className: 'pl-root' }, h('style', null, css), h('div', { className: 'pl-shell' },
        h('header', { className: 'pl-header' }, h('div', null, h('h1', null, t('title')), h('p', { className: 'pl-muted' }, t('subtitle'))), button('refresh', refresh, { disabled: busy || loading })),
        h('nav', { className: 'pl-tabs', role: 'tablist', 'aria-label': t('ledger') }, ['overview', 'entries', 'analysis', 'budgets', 'planning', 'settings'].map((key) => h('button', { type: 'button', key, role: 'tab', 'aria-selected': tab === key, tabIndex: tab === key ? 0 : -1, disabled: busy, onKeyDown: (event) => { const keys = ['overview', 'entries', 'analysis', 'budgets', 'planning', 'settings']; let index = keys.indexOf(key); if (event.key === 'ArrowRight') index = (index + 1) % keys.length; else if (event.key === 'ArrowLeft') index = (index + keys.length - 1) % keys.length; else if (event.key === 'Home') index = 0; else if (event.key === 'End') index = keys.length - 1; else return; event.preventDefault(); setTab(keys[index]); event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[index].focus(); }, onClick: () => setTab(key) }, t(key)))),
        notice ? h('div', { className: 'pl-notice pl-success', role: 'status' }, notice) : null,
        formError && !editor && !confirmDelete ? h('div', { className: 'pl-notice pl-error', role: 'alert' }, formError) : null,
        loadError ? h('div', { className: 'pl-notice pl-error', role: 'alert' }, `${t('loadFailed')}: ${loadError} `, button('retry', refresh)) : null,
        ['overview', 'entries', 'analysis', 'budgets'].includes(tab) ? h('div', { className: 'pl-toolbar' },
          period === 'month' ? field('month', month, setMonth, { type: 'month' }) : field('year', yearInput, applyYear, { type: 'number', min: 1, max: 9999, step: 1, inputMode: 'numeric', onBlur: commitYear }),
          period === 'quarter' ? select('quarter', String(quarterValue), setQuarter, [['1', t('q1')], ['2', t('q2')], ['3', t('q3')], ['4', t('q4')]]) : null,
          select('granularity', period, setPeriod, [['month', t('monthRange')], ['quarter', t('quarter')], ['year', t('year')]]),
          range ? h('small', { className: 'pl-period-range', 'aria-live': 'polite' }, `${periodTitle} · ${range.start} – ${range.end}`) : null
        ) : null,
        loading ? h('p', { role: 'status', 'aria-live': 'polite' }, t('loading')) : null,
        data && !loading && !loadError ? h('div', { role: 'tabpanel', 'aria-label': t(tab) },
          tab === 'overview' ? h(React.Fragment, null, totals(), h('div', { className: 'pl-line' }, h('p', { className: 'pl-muted' }, `${t('count')}: ${summary.count || 0}`), button('newEntry', () => open('entries'), { className: 'pl-primary' })), h('div', { className: 'pl-grid' }, trend(), categories())) : null,
          tab === 'entries' ? entryList() : null,
          tab === 'analysis' ? h(React.Fragment, null, totals(), trend(), categories(), h('section', { className: 'pl-card pl-table-wrap' }, h('h2', null, t('cumulative')), h('table', null, h('thead', null, h('tr', null, ['month', 'income', 'expense', 'balance', 'cumulative'].map((key) => h('th', { key, scope: 'col' }, t(key))))), h('tbody', null, (summary.series || []).map((row) => h('tr', { key: row.month }, h('td', null, row.month), ...['income_cents', 'expense_cents', 'balance_cents', 'cumulative_cents'].map((key) => h('td', { key }, money(row[key]))))))))) : null,
          tab === 'budgets' ? budgetList() : null, tab === 'planning' ? planList() : null, tab === 'settings' ? settings() : null) : null,
        h('footer', { className: 'pl-footer' }, t('hostStorage'))),
        editor ? h(Modal, { title: `${t(editor.record ? 'edit' : 'add')} · ${t(editor.kind)}`, onClose: closeEditor, busy, t },
          discard ? h('div', { className: 'pl-form' }, h('p', null, t('unsaved')), h('div', { className: 'pl-actions' }, button('confirmDiscard', () => { setEditor(null); setDiscard(false); setFormError(''); }, { className: 'pl-danger' }), button('cancel', () => setDiscard(false)))) :
            h('form', { className: 'pl-form', onSubmit: submit }, editorFields(), formError ? h('div', { className: 'pl-error', role: 'alert' }, formError) : null, h('div', { className: 'pl-actions' }, h('button', { type: 'submit', className: 'pl-primary', disabled: busy }, t(busy ? 'saving' : 'save')), button('cancel', closeEditor)))) : null,
        confirmDelete ? h(Modal, { title: t('deleteTitle'), onClose: () => { if (!busy) setConfirmDelete(null); }, busy, t }, h('p', null, t('deleteHelp')), h('p', null, confirmDelete.record.title || confirmDelete.record.category || confirmDelete.record.month || confirmDelete.record.date), formError ? h('div', { className: 'pl-error', role: 'alert' }, formError) : null, h('div', { className: 'pl-actions' }, button('remove', remove, { className: 'pl-danger' }), button('cancel', () => setConfirmDelete(null)))) : null);
    }
    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const cleanups = [];
        cleanups.push(ctx.locale.register(NS, 'zh', dictionaries.zh));
        cleanups.push(ctx.locale.register(NS, 'en', dictionaries.en));
        const t = ctx.locale.bind(NS);
        cleanups.push(ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id: 'personal-ledger', order: 20, label: () => t('ledger') }, WalletIcon)));
        cleanups.push(ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: 'personal-ledger' }, () => h(Panel, { locale: ctx.locale, t }))));
        return () => { for (const dispose of cleanups.reverse()) dispose(); };
      },
    };
}

function create_modes(require) {
    const { createElement: h, useEffect, useId, useRef, useState } = require('react');
    const NS = 'workspaceModes';
    const slot = 'conversation.input.dock';
    const modes = ['work-mode', 'personal-mode'];
    const copy = {
      zh: {
        title: '会话模式', hint: '发送第一条消息前可切换',
        work: '工作', workDetail: '工作邮件、笔记、日历、任务和计划',
        personal: '个人', personalDetail: '个人邮件、笔记、日历、任务、计划和账本',
        switching: '正在切换模式…', failed: '未能切换模式，请重试。',
      },
      en: {
        title: 'Session mode', hint: 'Switch before sending your first message',
        work: 'Work', workDetail: 'Work mail, notes, calendar, tasks and plans',
        personal: 'Personal', personalDetail: 'Personal mail, notes, calendar, tasks, plans and ledger',
        switching: 'Switching mode…', failed: 'Could not switch modes. Try again.',
      },
    };
    const css = `
      .dsh-wm-picker{margin:4px 16px 8px 20px;min-width:0;color:var(--dsw-alias-label-primary)}
      .dsh-wm-heading{display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:2px 10px;margin:0 0 7px}
      .dsh-wm-title{margin:0;font-size:13px;line-height:1.35;font-weight:650}
      .dsh-wm-hint,.dsh-wm-detail,.dsh-wm-status{font-size:12px;line-height:1.4;color:var(--dsw-alias-label-secondary)}
      .dsh-wm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%, 13rem),1fr));gap:8px}
      .dsh-wm-option{box-sizing:border-box;display:grid;grid-template-columns:auto minmax(0,1fr) 16px;align-items:center;gap:9px;min-width:0;padding:8px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-1);color:inherit;font:inherit;text-align:start;cursor:pointer;touch-action:manipulation}
      .dsh-wm-option[aria-pressed=true]{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-module-platform)}
      .dsh-wm-option[aria-disabled=true]{cursor:wait}
      @media (hover:hover){.dsh-wm-option[aria-pressed=false]:not([aria-disabled=true]):hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-selected)}}
      .dsh-wm-option:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
      .dsh-wm-icon{display:grid;place-items:center;width:30px;height:30px;align-self:start;border-radius:8px;background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
      .dsh-wm-option[aria-pressed=true] .dsh-wm-icon{background:var(--dsw-alias-interactive-bg-active);color:var(--dsw-alias-brand-primary)}
      .dsh-wm-name,.dsh-wm-detail{display:block;overflow-wrap:anywhere}
      .dsh-wm-name{font-size:13px;line-height:1.35;font-weight:650;margin-bottom:2px}
      .dsh-wm-check{color:var(--dsw-alias-brand-primary)}
      .dsh-wm-status:not(:empty){margin-top:6px}
      .dsh-wm-status[role=alert]{color:var(--dsw-alias-label-primary)}
    `;
    const glyphs = {
      'work-mode': 'M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M3 12a22 22 0 0 0 18 0M10 14h4M5 7h14a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a2 2 0 0 1 2-2Z',
      'personal-mode': 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 20v-1a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v1',
      check: 'm5 12 4 4L19 6',
    };
    function icon(id, size, className) {
      return h('svg', { viewBox: '0 0 24 24', width: size, height: size, fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
        className, 'aria-hidden': true, focusable: 'false',
      }, h('path', { d: glyphs[id] }));
    }

    function Picker({ sessionId, current, load, select, inputBusy, t }) {
      const uid = useId();
      const inFlight = useRef(false);
      const [available, setAvailable] = useState(false);
      const [pending, setPending] = useState(false);
      const [failed, setFailed] = useState(false);
      useEffect(() => {
        let live = true;
        void load().then(ok => { if (live) setAvailable(ok); });
        return () => { live = false; };
      }, [load]);
      if (!available) return null;

      async function choose(id) {
        if (inFlight.current || inputBusy || current === id) return;
        inFlight.current = true;
        setFailed(false);
        setPending(true);
        try {
          setFailed(!await select(sessionId, id, t('switching')));
        } finally {
          inFlight.current = false;
          setPending(false);
        }
      }

      return h('section', { className: 'dsh-wm-picker', 'aria-labelledby': `${uid}-title` },
        h('style', null, css),
        h('div', { className: 'dsh-wm-heading' },
          h('h2', { id: `${uid}-title`, className: 'dsh-wm-title' }, t('title')),
          h('span', { className: 'dsh-wm-hint' }, t('hint'))),
        h('div', { className: 'dsh-wm-grid' }, modes.map((id, i) => {
          const selected = current === id;
          const label = i === 0 ? 'work' : 'personal';
          const nameId = `${uid}-${label}`;
          const detailId = `${nameId}-detail`;
          return h('button', { type: 'button', key: id, className: 'dsh-wm-option',
            'aria-pressed': selected, 'aria-disabled': pending || inputBusy,
            'aria-labelledby': nameId, 'aria-describedby': detailId,
            onClick: () => { void choose(id); },
          }, h('span', { className: 'dsh-wm-icon' }, icon(id, 17)),
          h('span', null, h('span', { id: nameId, className: 'dsh-wm-name' }, t(label)),
            h('span', { id: detailId, className: 'dsh-wm-detail' }, t(`${label}Detail`))),
          selected ? icon('check', 16, 'dsh-wm-check') : null);
        })),
        h('div', { className: 'dsh-wm-status', role: 'status' }, pending ? t('switching') : ''),
        h('div', { className: 'dsh-wm-status', role: 'alert' }, failed ? t('failed') : ''));
    }

    function Dock({ sessionId, useSessions, useSessionRetainInfo, input, load, select, t }) {
      const main = useSessionRetainInfo(info => (info?.retainedBy.mainView ?? 0) > 0);
      const blank = useSessions(state => state.byId[sessionId]?.blank === true);
      const current = useSessions(state => state.byId[sessionId]?.projectionValues?.agentPreset);
      if (!main || !blank) return null;
      return h(Picker, { key: sessionId, sessionId, current, load, select, inputBusy: input.phase !== 'plain', t });
    }

    return {
      inject: ['slots', 'locale', 'remote.agentPresets', 'sessions', 'conversation'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, copy));
        const blocks = ctx.conversation.blocks;
        const ownBlocks = new Map();
        const release = (id, block) => {
          if (ownBlocks.get(id) !== block) return;
          ownBlocks.delete(id);
          if (blocks.storeFor(id).getSnapshot() === block) blocks.set(id, undefined);
        };
        ctx.effect(() => () => {
          for (const [id, block] of ownBlocks) release(id, block);
        });
        const load = async () => {
          try {
            const result = await ctx.remote.agentPresets.list();
            return result.ok && modes.every(id => result.value.presets.some(p => p.id === id && p.broken === undefined));
          } catch {
            return false; // Leave the built-in picker available if the roster cannot load.
          }
        };
        const select = async (id, mode, reason) => {
          const summary = ctx.sessions.list.getSnapshot().byId[id];
          if (!summary?.blank || !(summary.retainedBy.mainView > 0) || !modes.includes(mode)) return false;
          const block = { reason };
          // Don't override another plugin's hold, or clear one that replaced ours.
          if (blocks.storeFor(id).getSnapshot() === undefined) {
            ownBlocks.set(id, block);
            blocks.set(id, block);
          }
          try {
            const result = await ctx.remote.agentPresets.select(id, mode);
            return result.ok && result.value === mode;
          } catch {
            return false;
          } finally {
            release(id, block);
          }
        };
        ctx.slots.inject(slot, () => ctx.slots.register({
          name: slot, id: 'workspace-mode-picker', order: -10, locale: NS, inject: () => ({ load, select }),
        }, Dock));
      },
    };
}

    const views = [create_mail(require), create_planner(require), create_plans(require), create_notes(require), create_ledger(require)];
    const modes = create_modes(require);
    return { inject: ['slots', 'locale'], apply(ctx) {
      for (const view of views) ctx.effect(() => view.apply(ctx));
      ctx.inject(modes.inject, scoped => scoped.effect(() => modes.apply(scoped)));
    } };
  },
});
