# Migration from Google Sites

The current public site at [papabravo.se](https://papabravo.se) is a Google Site. This repository replaces it. DNS and the live site are left unchanged until a deliberate cutover.

Inventory checked on 6 October 2026 by reading `https://www.papabravo.se/`. The site is essentially one page, plus two small game pages under a lab section. Those games are not part of the new site.

## URL map

| Old URL | New URL | Why |
| --- | --- | --- |
| `https://papabravo.se/` | `https://papabravo.se/` | Homepage |
| `https://www.papabravo.se/` and any `www` path | `https://papabravo.se` + the same path | Permanent redirect to the apex domain |
| `https://papabravo.se/startsida` | `https://papabravo.se/` | Swedish slug for the same homepage |
| `https://papabravo.se/startsida/lab` | `https://papabravo.se/` | Lab index. Content is not carried over |
| `https://papabravo.se/startsida/lab/spel-tetsudo` | `https://papabravo.se/` | Old game page. Not migrated |
| `https://papabravo.se/startsida/lab/spel-m-tetsudo` | `https://papabravo.se/` | Old game page. Not migrated |

Trailing slashes on those old paths are included in `deploy/Caddyfile` and also redirect to the apex homepage.

The underlying Google Sites address seen in the page source was `https://sites.google.com/papabravo.se/start`. That host is Google's. It cannot be redirected from this project. After the custom domain is pointed at the new host, requests to `papabravo.se` no longer reach Google Sites.

## What moved, in substance

The old homepage was a consultant profile: a short introduction, three anonymous recommendations, a phone number, a long certificate list, and previous roles. The new site keeps the verifiable roles, the phone number, the email address and the LinkedIn profile. It drops the certificate wall, the games, and the recommendations from the main story. See `docs/sources.md`.

## What did not exist before

The old site had no separate URLs worth preserving for consulting, products, about, contact or privacy. Those are new:

- `/consulting`
- `/products`
- `/about`
- `/contact`
- `/privacy`

## Trailing slashes

The new site has no trailing slash, except the apex `https://papabravo.se/`. A request to `/consulting/` is redirected to `/consulting`.

## Not in this change

- DNS records
- The live Google Site
- Search Console or any analytics property
- A form backend (the contact form opens the visitor's email app)
