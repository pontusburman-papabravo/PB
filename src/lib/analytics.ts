/**
 * Browser analytics hook. Nothing is sent from the page.
 *
 * Measurement is the cookieless collector in deploy/stats.py. It does not
 * use a cookie, a third-party tag, or a visitor id. The public pages stay
 * on script-src 'self' and do not call out.
 */
export function track(_event: string, _props?: Record<string, string>): void {
  // Intentionally empty.
}
