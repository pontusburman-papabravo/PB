/**
 * Browser event hook. Nothing is sent from here.
 *
 * Page views are counted by the Cloudflare Web Analytics beacon in
 * BaseLayout.astro. That beacon is cookieless. Do not add a second tracker.
 */
export function track(_event: string, _props?: Record<string, string>): void {
  // Intentionally empty.
}
