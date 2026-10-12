# Papa Bravo

Website for [Papa Bravo AB](https://papabravo.se). It replaces the current Google Site. The purpose of the site is to create relevant consulting assignments for Pontus Burman: senior leadership across technology, product and transformation.

A push to `main` is published to the live site after CI succeeds. See Deployment.

## Stack

- [Astro](https://astro.build) 5, static HTML
- TypeScript
- One small client script for the mobile menu and the contact form
- Self-hosted fonts: Newsreader and Source Sans 3, via Fontsource (no Google Fonts request at runtime)

There is no React, no UI framework and no analytics script.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

The dev server prints a local URL. Pages:

- `/` home
- `/consulting`
- `/products`
- `/about`
- `/contact`
- `/privacy`

## Build

```bash
npm run build
```

Output is `dist/`. Astro emits one HTML file per page (`consulting.html` is served as `/consulting`). Stylesheets are external files so the Content-Security-Policy does not need `unsafe-inline`.

## Test

```bash
npm test
```

That runs ESLint, `astro check`, the production build, and `scripts/verify.mjs`. The verifier checks that each page has a title, description, canonical URL and Open Graph tags, that internal links resolve, that JSON-LD parses, that the sitemap and `robots.txt` exist, and that no analytics or advertising script is present.

```bash
npm run lint
npm run check
npm run preview
```

## Deployment

`deploy/publish.sh` runs once a minute on the VPS, as the site user, from cron. After the GitHub `test` check is green it builds `main` and publishes `dist/` to https://papabravo.se. The build stamps the commit into `<meta name="papa-deploy">`. Local builds leave that tag out. <!-- pragma: allowlist secret -->

The publisher’s only privileged command is `sudo -n /usr/local/sbin/papabravo-caddy-apply`. That helper copies `/var/www/papabravo` into the Caddy volume and renames `/data/sites/papabravo.new` over `/data/sites/papabravo` once `index.html` is present. That rename is the live swap. The helper then refuses to reload Caddy if the reload would change Körpasset’s certificate policy. The file swap still stands, and Körpasset’s config, certificates, containers and volumes are not edited. Do not publish with `/usr/local/sbin/papabravo-deploy`. That command treats the refusal as a failed deploy and restores the previous tree. <!-- pragma: allowlist secret -->

GitHub Actions does not SSH to the server. The site user is already limited to those two root helpers, and firewall rules block it from Körpasset’s ports. Polling `main` avoids storing a deploy key.

Each published commit is kept in `~/releases/<sha>` (the five newest). The tree that was live before the latest attempt is `~/releases/previous-web`. The log is `~/log/publish.log`. A failed smoke test (`/`, `/sv`, and the English CV PDF must return 200, the Swedish pages must link to that PDF, and both HTML pages must carry the commit) restores the previous tree. A failed publish is not retried until `~/state/publish-failed-<sha>` is removed or a new commit lands.

### Roll back

On the server, from the checkout:

```bash
deploy/rollback.sh <full git sha>
```

The sha must be a kept release. The command republishes that tree and pauses cron by writing `~/state/hold`.

To follow `main` again:

```bash
rm ~/state/hold
```

A revert on `main` is the durable rollback. Merge it, remove `~/state/hold` if a rollback created one, and the next green CI publishes that commit.

An example Caddy site block is in `deploy/Caddyfile` (HTTPS for `papabravo.se`, `www` redirected to the apex, old Google Sites paths, trailing slashes, compression, cache and security headers, `404.html` for unknown paths). The live server uses its own copy of that block. This repository does not reload it. <!-- pragma: allowlist secret -->

Recommended response headers, also set in the Caddyfile:

- `Content-Security-Policy` — `default-src 'self'`; scripts, styles, images and fonts from the same host; forms may use `mailto:`
- `Strict-Transport-Security` — one year, including subdomains. Preload is not enabled; add it only as a separate decision
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — camera, microphone, geolocation and payment disabled

If a later change inlines a style or script, or calls a third party, the policy has to change in the same commit.

## Content

Text lives next to the pages, in `src/data/`:

- `site.ts` — name, contact details, navigation, canonical host
- `experience.ts` — roles
- `assignments.ts` — offer and way of working
- `situations.ts` — problems a visitor should recognise
- `products.ts` — My Star Day and Körpasset

What is allowed to be stated, and what was deliberately left out, is in `docs/sources.md`. Do not add metrics, quotes or employers that are not in that file.

### Language

The site is English at the root and Swedish under `/sv`. Each page links to the other language, and both URLs are listed in the sitemap with `hreflang`. English stays the default: `/consulting` is not moved to `/en/consulting`.

### Future pages

These paths are reserved and **not** generated. Add one only when it has its own content, not a copy of `/consulting`:

- `/interim-cto`
- `/interim-cio`
- `/fractional-cto`
- `/technology-transformation`
- `/digital-transformation`
- `/product-technology`
- `/technology-advisor`

## SEO

- Unique title and meta description per page
- Canonical URLs on `https://papabravo.se` (no `www`, no trailing slash except the homepage)
- Open Graph and Twitter card metadata, shared image at `/og.png`
- `sitemap-index.xml` generated by `@astrojs/sitemap`
- `robots.txt` and `llms.txt`
- JSON-LD for Organization, Person and WebSite, plus BreadcrumbList on subpages
- Semantic headings, one `h1` per page, skip link, alt text

ProfessionalService schema is not used. Papa Bravo does not publish a public storefront address, and a home address should not be marked up as one.

## Environment variables

None are required. `.env.example` is only a note. Analytics must not be switched on with a variable. See `src/lib/analytics.ts`.

## Analytics

No analytics, tag manager or advertising pixel is loaded. The `track()` function does nothing. Adding a provider later means changing that module, the privacy page and the Content-Security-Policy together.

## Contact form

The form on `/contact` does not post to a backend. Submitting it opens the visitor’s email application with the message addressed to `pontus.burman@papabravo.se`. The address, phone number and LinkedIn profile are on the page either way.

A hosted form service can be added later if sending without a mail client becomes necessary. Do not add a half-connected endpoint.

## Migration

See `docs/migration.md` for the old Google Sites URLs and where they should land.

## Before go-live

- Past roles are listed without years. The years are in `docs/sources.md`. Only the current Avanza role shows a start year.
- Replace the favicon monogram if a real logo should be used.
- Add a portrait only if it is a real photograph of Pontus.
- Have the privacy page reviewed, and set how long server logs are kept.
- Decide whether the mailto form is enough.
- After a publish, check HTTPS, the `www` redirect and one old URL (`/startsida`).
- Production publishes from `main` after CI, as described under Deployment.
