import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const pages = [
  { file: 'index.html', path: '/', lang: 'en', index: true, cta: 'Talk to Pontus' },
  { file: 'consulting.html', path: '/consulting', lang: 'en', index: true },
  { file: 'products.html', path: '/products', lang: 'en', index: true },
  { file: 'about.html', path: '/about', lang: 'en', index: true },
  { file: 'contact.html', path: '/contact', lang: 'en', index: true },
  { file: 'privacy.html', path: '/privacy', lang: 'en', index: true },
  { file: '404.html', path: '/404', lang: 'en', index: false },
  { file: 'sv.html', path: '/sv', lang: 'sv', index: true, cta: 'Prata med Pontus' },
  { file: 'sv/consulting.html', path: '/sv/consulting', lang: 'sv', index: true },
  { file: 'sv/products.html', path: '/sv/products', lang: 'sv', index: true },
  { file: 'sv/about.html', path: '/sv/about', lang: 'sv', index: true },
  { file: 'sv/contact.html', path: '/sv/contact', lang: 'sv', index: true },
  { file: 'sv/privacy.html', path: '/sv/privacy', lang: 'sv', index: true },
  { file: 'sv/404.html', path: '/sv/404', lang: 'sv', index: false },
];

const reserved = [
  'interim-cto.html',
  'interim-cio.html',
  'fractional-cto.html',
  'technology-transformation.html',
  'digital-transformation.html',
  'product-technology.html',
  'technology-advisor.html',
];

const tracking = [
  'googletagmanager',
  'google-analytics',
  'gtag(',
  'hotjar',
  'facebook.net',
  'fbevents',
  'doubleclick',
  'connect.facebook',
];

const banned = [
  'one-man',
  'one man consultancy',
  'small consultancy',
  'solo consultant',
  'cutting-edge',
  'digital excellence',
  'passionate about',
  'Sprängarvägen',
];

const failures = [];

function fail(message) {
  failures.push(message);
}

function read(file) {
  return readFileSync(join(dist, file), 'utf8');
}

function canonicalFor(path) {
  return path === '/' ? 'https://papabravo.se/' : `https://papabravo.se${path}`;
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1] : '';
}

if (!existsSync(dist)) {
  console.error('dist/ is missing. Run the production build first.');
  process.exit(1);
}

const htmlFiles = readdirSync(dist).filter((name) => name.endsWith('.html'));

for (const name of reserved) {
  if (htmlFiles.includes(name)) {
    fail(`Reserved thin SEO page was generated: ${name}`);
  }
}

for (const page of pages) {
  if (!existsSync(join(dist, page.file))) {
    fail(`Missing page ${page.file}`);
    continue;
  }
  const html = read(page.file);
  const title = attr(html, /<title>([^<]+)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]+)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  const ogTitle = attr(html, /<meta property="og:title" content="([^"]+)"/);
  const ogDescription = attr(html, /<meta property="og:description" content="([^"]+)"/);
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]+)"/);
  const robots = attr(html, /<meta name="robots" content="([^"]+)"/);
  const h1s = html.match(/<h1[\s>]/g) ?? [];

  if (!title) fail(`${page.file} is missing a title`);
  if (!description || description.length < 40) fail(`${page.file} is missing a useful meta description`);
  if (canonical !== canonicalFor(page.path)) {
    fail(`${page.file} canonical is ${canonical || 'missing'}, expected ${canonicalFor(page.path)}`);
  }
  if (ogTitle !== title) fail(`${page.file} og:title does not match title`);
  if (!ogDescription) fail(`${page.file} is missing og:description`);
  if (ogUrl !== canonicalFor(page.path)) fail(`${page.file} og:url does not match canonical`);
  if (!html.includes('property="og:image"')) fail(`${page.file} is missing og:image`);
  if (!html.includes(`<html lang="${page.lang}">`)) fail(`${page.file} is missing lang="${page.lang}"`);
  const bare = page.path === '/sv' ? '/' : page.path.replace(/^\/sv/, '') || '/';
  const enHref = canonicalFor(bare);
  const svHref = canonicalFor(bare === '/' ? '/sv' : `/sv${bare}`);
  if (!html.includes(`hreflang="en" href="${enHref}"`)) fail(`${page.file} is missing the English hreflang`);
  if (!html.includes(`hreflang="sv" href="${svHref}"`)) fail(`${page.file} is missing the Swedish hreflang`);
  if (!html.includes(`hreflang="x-default" href="${enHref}"`)) {
    fail(`${page.file} is missing the x-default hreflang`);
  }
  if (!html.includes('<main')) fail(`${page.file} is missing <main>`);
  if (h1s.length !== 1) fail(`${page.file} has ${h1s.length} h1 elements`);
  if (!html.includes('application/ld+json')) fail(`${page.file} is missing JSON-LD`);
  if (!html.includes('href="#content"')) fail(`${page.file} is missing a skip link`);
  if (!html.includes('class="lang-switch"')) fail(`${page.file} is missing the language switcher`);
  if (!html.includes('aria-label="English"') || !html.includes('aria-label="Svenska"')) {
    fail(`${page.file} language switcher does not offer both languages`);
  }

  if (page.index && robots.includes('noindex')) fail(`${page.file} should be indexable`);
  if (!page.index && !robots.includes('noindex')) fail(`${page.file} should be noindex`);

  const lowered = html.toLowerCase();
  for (const needle of tracking) {
    if (lowered.includes(needle)) fail(`${page.file} contains tracking marker ${needle}`);
  }
  for (const needle of banned) {
    if (lowered.includes(needle.toLowerCase())) fail(`${page.file} contains banned phrase “${needle}”`);
  }

  const jsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!jsonMatch) {
    fail(`${page.file} JSON-LD block could not be read`);
  } else {
    try {
      const data = JSON.parse(jsonMatch[1]);
      const types = (data['@graph'] ?? []).map((node) => node['@type']);
      for (const type of ['Organization', 'Person', 'WebSite']) {
        if (!types.includes(type)) fail(`${page.file} JSON-LD is missing ${type}`);
      }
      const isHome = page.path === '/' || page.path === '/sv';
      const isMissing = page.path === '/404' || page.path === '/sv/404';
      if (!isHome && !isMissing && !types.includes('BreadcrumbList')) {
        fail(`${page.file} JSON-LD is missing BreadcrumbList`);
      }
      const person = (data['@graph'] ?? []).find((node) => node['@type'] === 'Person');
      if (!person?.sameAs?.includes('https://www.linkedin.com/in/pontusburman/')) {
        fail(`${page.file} Person schema is missing the verified LinkedIn URL`);
      }
    } catch (error) {
      fail(`${page.file} JSON-LD is not valid JSON (${error.message})`);
    }
  }

  if (!html.includes('src="/site.js"')) fail(`${page.file} is missing the site script`);
  const scriptTags = [...html.matchAll(/<script\b([^>]*)>/g)];
  for (const match of scriptTags) {
    const attrs = match[1];
    const allowed =
      attrs.includes('application/ld+json') || attrs.includes('src="/site.js"');
    if (!allowed) fail(`${page.file} has an unexpected script tag: ${attrs.trim()}`);
  }

  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (
      ref.startsWith('http://') ||
      ref.startsWith('https://') ||
      ref.startsWith('mailto:') ||
      ref.startsWith('tel:') ||
      ref.startsWith('#') ||
      ref.startsWith('data:')
    ) {
      continue;
    }
    const [pathPart] = ref.split('#');
    const relative = pathPart.replace(/^\//, '');
    const candidates =
      relative === ''
        ? ['index.html']
        : [relative, `${relative}.html`, join(relative, 'index.html')];
    const ok = candidates.some((candidate) => existsSync(join(dist, candidate)));
    if (!ok) fail(`${page.file} has a broken internal reference: ${ref}`);
  }
}

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap: https://papabravo.se/sitemap-index.xml')) {
  fail('robots.txt is missing the sitemap URL');
}
if (!existsSync(join(dist, 'llms.txt'))) fail('llms.txt was not copied to dist');
if (!existsSync(join(dist, 'og.png'))) fail('og.png is missing');
if (!existsSync(join(dist, 'favicon.svg'))) fail('favicon.svg is missing');

const sitemapIndex = readFileSync(join(dist, 'sitemap-index.xml'), 'utf8');
if (!sitemapIndex.includes('https://papabravo.se/')) {
  fail('sitemap index does not reference the canonical host');
}

const sitemapFiles = readdirSync(dist).filter((name) => /^sitemap-\d+\.xml$/.test(name));
if (sitemapFiles.length === 0) fail('No sitemap-N.xml was generated');
const sitemap = sitemapFiles.map((name) => readFileSync(join(dist, name), 'utf8')).join('\n');
for (const page of pages.filter((item) => item.index)) {
  if (!sitemap.includes(canonicalFor(page.path))) {
    fail(`Sitemap is missing ${canonicalFor(page.path)}`);
  }
}
if (sitemap.includes('/404')) fail('Sitemap includes the 404 page');

const homeHtml = read('index.html');
const emailMatch = homeHtml.match(/[a-z0-9.]+@[a-z0-9.]+\.[a-z]{2,}/);
if (!emailMatch) fail('Homepage is missing a contact email');
for (const page of pages.filter((item) => item.cta)) {
  const html = read(page.file);
  if (!html.includes(page.cta)) fail(`${page.file} is missing the primary CTA`);
  if (!html.includes(emailMatch[0])) fail(`${page.file} does not expose the verified email`);
}

const styles = readdirSync(join(dist, '_astro')).filter((name) => name.endsWith('.css'));
if (styles.length === 0) fail('No stylesheet was emitted');
const siteScript = join(dist, 'site.js');
if (!existsSync(siteScript)) fail('site.js was not copied to dist');
const siteScriptSize = statSync(siteScript).size;
if (siteScriptSize > 20_000) {
  fail(`site.js is ${siteScriptSize} bytes, which is more than this site should need`);
}
const siteScriptText = readFileSync(siteScript, 'utf8').toLowerCase();
for (const needle of tracking) {
  if (siteScriptText.includes(needle)) fail(`site.js contains tracking marker ${needle}`);
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed:\n`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`Verified ${pages.length} pages, sitemap, robots.txt, metadata, links and the absence of tracking.`);
