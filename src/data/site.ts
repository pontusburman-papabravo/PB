export const site = {
  name: 'Papa Bravo',
  legalName: 'Papa Bravo AB',
  url: 'https://papabravo.se',
  locale: 'en',
  email: 'pontus.burman@papabravo.se',
  phoneDisplay: '+46 735 35 22 12',
  phoneTel: '+46735352212',
  linkedIn: 'https://www.linkedin.com/in/pontusburman/',
  linkedInLabel: 'LinkedIn',
  orgNumber: '559244-7576',
  location: 'Stockholm, Sweden',
  ctaLabel: 'Talk to Pontus',
  ctaHref: '/contact',
  defaultDescription:
    'Pontus Burman helps organisations lead technology, product and transformation — from strategy and organisation to actual delivery. Based in Stockholm.',
} as const;

export const nav = [
  { href: '/consulting', label: 'Consulting' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

/**
 * Reserved paths for later SEO pages. Do not generate them until each page
 * has its own substance. Thin duplicates of /consulting would hurt more than help.
 */
export const reservedPaths = [
  '/interim-cto',
  '/interim-cio',
  '/fractional-cto',
  '/technology-transformation',
  '/digital-transformation',
  '/product-technology',
  '/technology-advisor',
] as const;

export function canonicalUrl(path: string): string {
  if (path === '/' || path === '') return `${site.url}/`;
  const clean = path.replace(/\.html$/, '').replace(/\/$/, '');
  return `${site.url}${clean}`;
}

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const clean = pathname.replace(/\.html$/, '').replace(/\/$/, '');
  return clean || '/';
}
