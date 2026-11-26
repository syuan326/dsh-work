window.__ModuleLoader__.load({
  id: '@local/personal-ledger',
  factory(require) {
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
  },
});
