export function createUiHandler({ connection, core }) {
  const actions = new Set(['list', 'save', 'delete', 'status', 'calendar', 'reminders']);
  return async (req, res) => {
    const reply = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      res.end(JSON.stringify(body));
    };
    const admission = connection.admit({ headers: req.headers });
    if (admission.rejection || admission.peer !== connection.browserPeer) return reply(admission.rejection || 403, { ok: false, error: { code: 'UNAUTHORIZED', message: '请从已登录的 DSH 页面访问' } });
    if (req.method !== 'POST' || req.headers['x-dsh-planner-ui'] !== '1' || !String(req.headers['content-type']).startsWith('application/json')) return reply(403, { ok: false, error: { code: 'INVALID_REQUEST', message: '请求格式无效' } });
    const match = new URL(req.url, 'http://local').pathname.match(/^\/api\/split-planner\/(personal|work)\/([a-z]+)$/);
    if (!match || !actions.has(match[2])) return reply(404, { ok: false, error: { code: 'NOT_FOUND', message: '操作不存在' } });
    try {
      const chunks = [];
      let bytes = 0;
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > 262144) return reply(413, { ok: false, error: { code: 'TOO_LARGE', message: '请求内容过大' } });
        chunks.push(chunk);
      }
      const args = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
      if (!args || typeof args !== 'object' || Array.isArray(args)) throw new Error('Invalid arguments');
      const result = await core.call(match[1], match[2], args);
      reply(result.ok ? 200 : 400, result);
    } catch {
      reply(400, { ok: false, error: { code: 'REQUEST_FAILED', message: '请求无效或存储失败，请刷新后重试' } });
    }
  };
}
