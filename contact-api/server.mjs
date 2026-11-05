/**
 * Tiny contact endpoint for papabravo.se.
 * Listens on loopback only; Caddy reverse-proxies POST /api/contact.
 *
 * Env (on the VPS / systemd EnvironmentFile — never in the static tree or on a laptop):
 *   RESEND_API_KEY   — required for live sends
 *   CONTACT_TO       — default pontus.burman@papabravo.se
 *   CONTACT_FROM     — verified Resend From, e.g. Papa Bravo <noreply@papabravo.se>
 *   CONTACT_PORT     — default 8791
 *   RATE_LIMIT_MAX   — default 5
 *   RATE_LIMIT_WINDOW_MS — default 900000 (15 min)
 */

import http from 'node:http';
import {
  BODY_LIMIT,
  buildEmail,
  clientIp,
  createRateLimiter,
  parseContactPayload,
} from './lib.mjs';

const PORT = Number(process.env.CONTACT_PORT || 8791);
const HOST = process.env.CONTACT_HOST || '127.0.0.1';
const CONTACT_TO = process.env.CONTACT_TO || 'pontus.burman@papabravo.se';
const CONTACT_FROM =
  process.env.CONTACT_FROM || 'Papa Bravo <noreply@papabravo.se>';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 5);
const RATE_LIMIT_WINDOW_MS = Number(
  process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
);
const RESEND_URL = 'https://api.resend.com/emails';

const rateLimited = createRateLimiter({
  max: RATE_LIMIT_MAX,
  windowMs: RATE_LIMIT_WINDOW_MS,
});

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > BODY_LIMIT) {
        reject(Object.assign(new Error('payload_too_large'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function sendResend(fields) {
  if (!RESEND_API_KEY) {
    return { ok: false, error: 'missing_api_key' };
  }

  const { subject, text, html } = buildEmail(fields);

  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: fields.email,
      subject,
      text,
      html,
      tags: [{ name: 'category', value: 'papabravo_contact' }],
    }),
    signal: AbortSignal.timeout(12_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`[contact] Resend ${res.status}: ${detail.slice(0, 300)}`);
    return { ok: false, error: 'provider_error', status: res.status };
  }

  return { ok: true };
}

async function handleContact(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      Allow: 'POST, OPTIONS',
      'Cache-Control': 'no-store',
    });
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    json(res, 429, { ok: false, error: 'rate_limited' });
    return;
  }

  let raw;
  try {
    raw = await readBody(req);
  } catch (err) {
    json(res, err.status || 400, { ok: false, error: err.message || 'bad_request' });
    return;
  }

  let data;
  try {
    data = JSON.parse(raw || '{}');
  } catch {
    json(res, 400, { ok: false, error: 'invalid_json' });
    return;
  }

  const parsed = parseContactPayload(data);
  if (parsed.honeypot) {
    console.log('[contact] honeypot trip, suppressed');
    json(res, 200, { ok: true });
    return;
  }
  if (parsed.error) {
    json(res, 400, { ok: false, error: parsed.error });
    return;
  }

  try {
    const result = await sendResend(parsed);
    if (!result.ok) {
      json(res, 502, { ok: false, error: result.error || 'send_failed' });
      return;
    }
    json(res, 200, { ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err.message);
    json(res, 502, { ok: false, error: 'send_failed' });
  }
}

function handleHealth(_req, res) {
  json(res, 200, {
    ok: true,
    hasApiKey: Boolean(RESEND_API_KEY),
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);
  const path = url.pathname.replace(/\/+$/, '') || '/';

  if (path === '/health' || path === '/api/contact/health') {
    handleHealth(req, res);
    return;
  }

  if (path === '/api/contact' || path === '/') {
    await handleContact(req, res);
    return;
  }

  json(res, 404, { ok: false, error: 'not_found' });
});

server.listen(PORT, HOST, () => {
  console.log(
    `[contact] listening on http://${HOST}:${PORT} to=${CONTACT_TO} hasKey=${Boolean(RESEND_API_KEY)}`,
  );
});
