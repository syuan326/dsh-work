import { ACTIONS } from './core.mjs';
// 100000 characters can occupy 600000 bytes when JSON-escaped as \\uXXXX.
// Additional room covers title, tags and protocol fields, including escapes.
export const MAX_BODY_BYTES = 1024 * 1024;
export function createUiHandler({ connection, core }) {
  return async (req, res) => {
    const reply = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      res.end(JSON.stringify(body));
    };
    const error = (status, code, message) => reply(status, { ok: false, error: { code, message } });
    try {
      const admission = connection.admit({ headers: req.headers });
      if (admission.rejection || admission.peer !== connection.browserPeer) return error(admission.rejection || 403, 'UNAUTHORIZED', '请从已登录的 DSH 页面访问');
      if (req.method !== 'POST' || req.headers['x-dsh-notes-ui'] !== '1' || !/^application\/json(?:\s*;|$)/i.test(String(req.headers['content-type']))) return error(403, 'INVALID_REQUEST', '请求格式无效');
      const match = new URL(req.url, 'http://local').pathname.match(/^\/api\/split-notes\/(personal|work)\/([a-z_]+)$/);
      if (!match || !ACTIONS.includes(match[2])) return error(404, 'NOT_FOUND', '操作不存在');
      const declared = req.headers['content-length'];
      if (declared !== undefined && (!/^\d+$/.test(String(declared)) || Number(declared) > MAX_BODY_BYTES)) return error(413, 'TOO_LARGE', '请求内容不能超过 1 MiB');
      const chunks = [];
      let bytes = 0;
      for await (const chunk of req) {
        bytes += Buffer.byteLength(chunk);
        if (bytes > MAX_BODY_BYTES) return error(413, 'TOO_LARGE', '请求内容不能超过 1 MiB');
        chunks.push(Buffer.from(chunk));
      }
      const args = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
      if (!args || typeof args !== 'object' || Array.isArray(args)) return error(400, 'VALIDATION', '参数必须为对象');
      const result = await core.call(match[1], match[2], args);
      reply(result.ok ? 200 : 400, result);
    } catch {
      error(400, 'REQUEST_FAILED', '请求无效或存储失败，请使用相同 request_id 和参数重试');
    }
  };
}
