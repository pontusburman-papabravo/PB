# Sources and facts

Checked 6 October 2026. Copy on the site should stay inside this list. If a number, date or title is not here, it does not go on the site.

## Used

### Identity and contact

From the HTML of `https://www.papabravo.se/`:

- Papa Bravo AB
- Pontus Burman
- Email: `pontus.burman@papabravo.se`
- Phone: `+46 735 35 22 12`
- LinkedIn: `https://www.linkedin.com/in/pontusburman/`
- Previous line on the site: “Adopt Evolve Transform” (not reused as the headline)
- “over two decades” / “over 20 years” of experience

No reusable logo file was published. The monogram in `public/favicon.svg` is a placeholder, not a new brand mark.

### Company register

Public company records (Bolagsfakta, Allabolag and Syna, all citing the same organisation number):

- Legal name: Papa Bravo AB
- Organisation number: 559244-7576
- Registered 2020
- Active limited company
- Board member: Pontus Burman
- Business: consulting in IT and management

The registered street address is a residential address. It is **not** published on the site. Stockholm is used because that is how Pontus presents his location, including on the public LinkedIn profile, and it is in Stockholm County.

Revenue, profit, employee count and similar figures from those registries are **not** used. They are not useful to a buyer here, and publishing “one employee” fights the tone the site is meant to hold without adding anything a client needs.

### Roles, as published on papabravo.se

| Organisation | Role on the old site | Years on the old site |
| --- | --- | --- |
| Getinge | Product/Project Manager, point-of-care devices | 2023 – present |
| Northfork | CTO, Scrum Master, Product Owner | 2022 |
| Eniro Group | Group CTO (described as interim) | 2021 – 2022 |
| Trustly | Head of Platform, Scrum Master, Product Owner | 2020 – 2021 |
| Unilabs | IT Director North | 2017 – 2020 |
| Medhelp | CIO | 2015 – 2017 |
| Klarna | Manager, Cloud and Middleware | 2014 – 2015 |
| Klarna | Head of Infrastructure | 2014 |
| Unibet | Project Manager | 2013 – 2014 |
| Unibet | Line Manager | 2012 – 2013 |

The old page also summarises systems administration and consulting from about 1999 to 2012. Individual employers from that period are not listed on the new site. A “SEK 50M” programme is mentioned in that mixed section and is **not** repeated: the bullet bundles several claims and is not a clean, attributable result.

Team sizes (“around 25 people”, “4 teams”) are on the old page. The new copy describes the scope (infrastructure, cloud, databases, servers) and does not repeat the headcount.

“Cost reduction” at Unilabs is not repeated as an outcome. No figure was published.

Getinge is written as `2023–` rather than “present”. The old site still says present. Pontus has not given an end date, so it stays open. It is not described as his current role.

### Confirmed by Pontus, 6 October 2026

- Avanza — Engineering Manager for two teams — December 2025, ongoing

Nothing beyond that sentence is added: no team names, no headcount, no scope.

Education kept, in one sentence: a one-year systems engineering education, and SAFe Product Owner / Product Manager in 2024. The older certificate list (ITIL, MCP, pilot licence and similar) is left off. It does not help a buyer in 2026 decide.

### Products

- My Star Day / Min Stjärndag: `https://mystarday.app`, `https://mystarday.se`
- App Store: `https://apps.apple.com/app/id6774493098`
- Google Play: `https://play.google.com/store/apps/details?id=se.mystarday.app`
- Körpasset: `https://korpasset.se`
- Körpasset on the App Store: `https://apps.apple.com/se/app/korpasset/id6814100094`
- Körpasset’s own site said, on the same date, that Android was still in Google’s review and that the beta was free. The new site says that, and does not link a Play Store page.

My Star Day uses one cropped screen from the public marketing image on mystarday.app (the activity steps: where, who, how long, what happens next). Körpasset is set with its own line, “Övning idag. Frihet imorgon.”, as published on korpasset.se. Family quotes from the product sites are not reused.

## Left off on purpose

- Anonymous recommendations on the old homepage. The new site does not invent or carry testimonials.
- “Trusted by”, user counts, ratings, savings, revenue, transformation KPIs.
- Words that shrink the company to its headcount, or inflate it into a large firm.
- Pilot licence and historical technical certificates, in the main story.
- The lab games.

## Open before go-live

1. **Later roles still unconfirmed.** Pontus has confirmed Engineering Manager at Avanza, two teams, from December 2025 and ongoing. That role is on the site. A public LinkedIn profile also lists Program Manager at Euroclear Sweden (2024–2025) and gives Getinge an end date in 2024. Those are **not** on this site. Do not add them from the scrape alone, and do not close Getinge until Pontus gives the end date.
2. **Portrait.** No verified photo was in the repository or recoverable as a clean asset from the old site. None is shown. Add a real photograph later if wanted; do not use a stock portrait.
3. **Logo.** Drop a real logo in and replace `public/favicon.svg` if one should be used. Do not commission a new symbol without asking.
4. **Privacy copy.** `src/pages/privacy.astro` matches how the site behaves. It is not a lawyer’s privacy notice. Confirm log retention with the host.
5. **Contact form.** It only opens the visitor’s email app. There is no submission store. Add a provider later if mail-client sending is not enough, and update the privacy page in the same change.
6. **Analytics.** Nothing is loaded. `src/lib/analytics.ts` is a no-op. Wiring a provider is a code change, not an environment variable, and it requires a privacy update and a CSP change.
