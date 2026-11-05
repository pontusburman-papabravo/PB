/** Shared helpers for the papabravo contact API (no I/O). */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const BODY_LIMIT = 16_384;

export function trimField(value, max) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export function escapeText(value) {
  return String(value)
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim().slice(0, 64);
  }
  return req.socket?.remoteAddress || 'unknown';
}

export function createRateLimiter({ max, windowMs, now = () => Date.now() } = {}) {
  const hits = new Map();
  return function rateLimited(ip) {
    const t = now();
    if (hits.size > 5_000) {
      for (const [key, times] of hits) {
        const kept = times.filter((stamp) => t - stamp < windowMs);
        if (kept.length === 0) hits.delete(key);
        else hits.set(key, kept);
      }
    }
    const times = (hits.get(ip) || []).filter((stamp) => t - stamp < windowMs);
    if (times.length >= max) {
      hits.set(ip, times);
      return true;
    }
    times.push(t);
    hits.set(ip, times);
    return false;
  };
}

export function parseContactPayload(data) {
  const honeypot = trimField(data?.website, 200);
  if (honeypot) return { honeypot: true };

  const name = escapeText(trimField(data?.name, 120));
  const email = escapeText(trimField(data?.email, 200)).toLowerCase();
  const company = escapeText(trimField(data?.company, 160));
  const message = escapeText(trimField(data?.message, 5_000));
  const locale = data?.locale === 'sv' ? 'sv' : 'en';

  if (!name || !email || !message) return { error: 'missing_fields' };
  if (!EMAIL_RE.test(email)) return { error: 'invalid_email' };

  return { name, email, company, message, locale };
}

export function buildEmail({ name, email, company, message, locale }) {
  const subjectParts = ['Assignment enquiry from', name];
  if (company) subjectParts.push(`(${company})`);
  const subject = subjectParts.join(' ').slice(0, 200);

  const text = [
    `Name: ${name}`,
    `Company: ${company || '—'}`,
    `Email: ${email}`,
    `Locale: ${locale}`,
    '',
    message,
  ].join('\n');

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; color: #1a1a1a;">
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || '—')}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Locale:</strong> ${escapeHtml(locale)}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 1.2rem 0;" />
      <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${escapeHtml(message)}</pre>
    </div>
  `.trim();

  return { subject, text, html };
}
