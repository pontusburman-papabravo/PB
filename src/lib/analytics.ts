/**
 * Analytics hook. Nothing is sent.
 *
 * No provider is loaded, and setting an environment variable must not start
 * one. Adding analytics later means changing this module deliberately and
 * updating the privacy page and Content-Security-Policy in the same change.
 */
export function track(_event: string, _props?: Record<string, string>): void {
  // Intentionally empty.
}
