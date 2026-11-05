import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildEmail,
  createRateLimiter,
  EMAIL_RE,
  escapeHtml,
  parseContactPayload,
} from './lib.mjs';

test('EMAIL_RE accepts ordinary addresses', () => {
  assert.equal(EMAIL_RE.test('pontus@example.com'), true);
  assert.equal(EMAIL_RE.test('not-an-email'), false);
});

test('parseContactPayload rejects missing fields', () => {
  assert.equal(parseContactPayload({}).error, 'missing_fields');
  assert.equal(
    parseContactPayload({ name: 'A', email: 'bad', message: 'hi' }).error,
    'invalid_email',
  );
});

test('parseContactPayload honeypot', () => {
  const parsed = parseContactPayload({
    name: 'Bot',
    email: 'bot@example.com',
    message: 'spam',
    website: 'http://spam',
  });
  assert.equal(parsed.honeypot, true);
});

test('parseContactPayload happy path', () => {
  const parsed = parseContactPayload({
    name: ' Pontus ',
    email: 'Pontus@Example.COM',
    company: 'Papa Bravo',
    message: 'Hello',
    locale: 'sv',
  });
  assert.equal(parsed.name, 'Pontus');
  assert.equal(parsed.email, 'pontus@example.com');
  assert.equal(parsed.company, 'Papa Bravo');
  assert.equal(parsed.locale, 'sv');
});

test('buildEmail includes reply fields', () => {
  const mail = buildEmail({
    name: 'Ada',
    email: 'ada@example.com',
    company: '',
    message: 'Need an interim EM',
    locale: 'en',
  });
  assert.match(mail.subject, /Ada/);
  assert.match(mail.text, /ada@example.com/);
  assert.match(mail.html, /Need an interim EM/);
});

test('escapeHtml escapes tags', () => {
  assert.equal(escapeHtml('<b>x</b>'), '&lt;b&gt;x&lt;/b&gt;');
});

test('rate limiter trips after max', () => {
  let now = 1_000;
  const limited = createRateLimiter({
    max: 2,
    windowMs: 60_000,
    now: () => now,
  });
  assert.equal(limited('1.1.1.1'), false);
  assert.equal(limited('1.1.1.1'), false);
  assert.equal(limited('1.1.1.1'), true);
  assert.equal(limited('2.2.2.2'), false);
  now += 61_000;
  assert.equal(limited('1.1.1.1'), false);
});
