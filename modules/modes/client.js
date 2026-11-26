window.__ModuleLoader__.load({
  id: '@local/dsh-personal-workspace/modes',
  factory(require) {
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
  },
});
