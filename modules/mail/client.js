window.__ModuleLoader__.load({
  id: '@local/dsh-split-mail',
  factory(require) {
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
  },
});
