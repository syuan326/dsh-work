export const UI_ACTIONS = new Set(['options', 'query', 'summary', 'planning', 'export', 'import_preview', 'import_apply', 'save_options', 'save', 'delete', 'settle', 'create']);
const MAX_BODY = 22 * 1024 * 1024;
export function createUiHandler({ connection, call }) {
  return async (req, res) => {
    const reply = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      res.end(JSON.stringify(body));
    };
    const admission = connection.admit({ headers: req.headers });
    if (admission.rejection || admission.peer !== connection.browserPeer) return reply(admission.rejection ?? 403, { ok: false, error: { code: 'UNAUTHORIZED', message: '仅已认证的用户页面可访问个人账本' } });
    if (req.method !== 'POST' || req.headers['x-dsh-ledger-ui'] !== '1' || !String(req.headers['content-type']).startsWith('application/json')) return reply(403, { ok: false, error: { code: 'USER_ONLY', message: '请从账本页面操作' } });
    try {
      let size = 0;
      const chunks = [];
      for await (const chunk of req) {
        size += Buffer.byteLength(chunk);
        if (size > MAX_BODY) return reply(413, { ok: false, error: { code: 'TOO_LARGE', message: '请求不能超过22 MiB' } });
        chunks.push(Buffer.from(chunk));
      }
      const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      if (!payload || typeof payload !== 'object' || Array.isArray(payload) || !UI_ACTIONS.has(payload.action)) throw new Error('未知账本操作');
      const value = await call(payload.action, payload.args ?? {});
      reply(200, { ok: true, value });
    } catch (error) {
      const code = String(error.code ?? 'INVALID_REQUEST');
      reply(code === 'CONFLICT' ? 409 : 400, { ok: false, error: { code, message: String(error.message ?? '账本操作失败') } });
    }
  };
}
