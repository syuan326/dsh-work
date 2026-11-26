import { createHash, randomUUID } from 'node:crypto';

export function createConfirmations(now = () => Date.now()) {
  const pending = new Map();
  const digest = preview => createHash('sha256').update(JSON.stringify(preview)).digest('hex');
  return {
    issue(scope, preview, peer) {
      for (const [id, item] of pending) if (item.expires < now()) pending.delete(id);
      if (pending.size >= 1000) throw new Error('Too many pending confirmations');
      const id = randomUUID();
      pending.set(id, { scope, digest: digest(preview), peer, expires: now() + 15 * 60 * 1000 });
      return id;
    },
    consume(id, scope, preview, peer) {
      const item = pending.get(id);
      pending.delete(id);
      return !!item && item.scope === scope && item.peer === peer && item.expires >= now() && item.digest === digest(preview);
    },
    clear() { pending.clear(); },
  };
}

const CORE_ACTIONS = new Set(['accounts', 'list', 'search', 'read', 'sync', 'options', 'settings_save', 'account_save', 'account_delete', 'classify', 'tag', 'analyze', 'draft', 'send_preview', 'send']);

export function createUiHandler({ connection, core, confirmations, signal, toolAccess, saveToolAccess, models }) {
  return async (req, res) => {
    const reply = (status, value) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      res.end(JSON.stringify(value));
    };
    const admission = connection.admit({ headers: req.headers });
    if (admission.rejection || admission.peer !== connection.browserPeer) {
      return reply(admission.rejection || 403, { ok: false, error: { code: 'UNAUTHORIZED', message: '仅已认证的用户页面可访问' } });
    }
    if (req.method !== 'POST' || req.headers['x-dsh-mail-ui'] !== '1' || !String(req.headers['content-type']).startsWith('application/json')) {
      return reply(403, { ok: false, error: { code: 'USER_ONLY', message: '请通过邮件页面操作' } });
    }
    const match = new URL(req.url, 'http://local').pathname.match(/^\/api\/split-mail\/(personal|work)\/([a-z_]+)$/);
    const action = match?.[2];
    if (!match || (!CORE_ACTIONS.has(action) && !['tool_access', 'tool_access_save', 'models'].includes(action))) {
      return reply(404, { ok: false, error: { code: 'NOT_FOUND', message: '操作不存在' } });
    }
    try {
      let size = 0;
      const chunks = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 1048576) return reply(413, { ok: false, error: { code: 'TOO_LARGE', message: '请求过大' } });
        chunks.push(chunk);
      }
      const args = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
      if (!args || Array.isArray(args) || typeof args !== 'object') throw new Error('invalid request');
      const [, scope] = match;
      if (action === 'models') {
        const value = await models();
        return reply(200, { ok: true, value });
      }
      if (action === 'tool_access') {
        const value = await toolAccess();
        return reply(200, { ok: true, value });
      }
      if (action === 'tool_access_save') {
        const result = await saveToolAccess({ personal: args.personal, work: args.work });
        return reply(result.ok === false ? 400 : 200, result);
      }
      const context = { source: 'ui', signal };
      let result;
      if (action === 'send') {
        const current = await core.call(scope, 'send_preview', args, context);
        if (current.ok === false) return reply(400, current);
        if (!confirmations.consume(args.confirmation_id, scope, current.preview, admission.peer)) {
          return reply(403, { ok: false, error: { code: 'CONFIRMATION_INVALID', message: '确认已失效，请重新预览并确认' } });
        }
        result = await core.call(scope, action, { ...args, account_version: current.preview.account_version }, { ...context, approved: true });
      } else {
        result = await core.call(scope, action, args, context);
        if (action === 'send_preview' && result.ok !== false) result = { ...result, confirmation_id: confirmations.issue(scope, result.preview, admission.peer) };
      }
      reply(result.ok === false ? 400 : 200, result.ok === false ? result : { ok: true, value: result });
    } catch {
      return reply(400, { ok: false, error: { code: 'REQUEST_FAILED', message: '请求无效或操作失败，请刷新后重试' } });
    }
  };
}
