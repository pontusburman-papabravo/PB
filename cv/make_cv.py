"""Build Pontus Burman's one-page A4 CV in English.

Facts are taken from the public LinkedIn profile (captured 2026-10-12) and from
roles already published on the company site. Do not add numbers, outcomes,
education, clients or dates that those sources do not state.

    python3 cv/make_cv.py

Requires WeasyPrint. Writes:

    cv/build/cv_en.html
    public/cv/Pontus_Burman_CV_en.pdf

The PDF is one A4 page. Body text stays at 10.5pt or larger.
"""

from pathlib import Path

from weasyprint import HTML

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "cv" / "build"
PUBLIC = ROOT / "public" / "cv"
FONTS = ROOT / "node_modules" / "@fontsource"

CONTACT = dict(
    phone="+46 735 35 22 12",
    email="pontus.burman@papabravo.se",  # pragma: allowlist secret
    web="papabravo.se",  # pragma: allowlist secret
    li="linkedin.com/in/pontusburman",
)

# Recent roles: title, organisation, dates, one short line.
# Older employers are a single grouped line, not separate entries.
ROLES = {
    "en": [
        ("Engineering Manager", "Avanza Bank · consultant", "Dec 2025 – present", "Two development teams."),
        ("Program Manager", "Euroclear Sweden · consultant", "Aug 2024 – Dec 2025", "Program and transformation."),
        ("Product and Project Manager", "Getinge · consultant", "Jan 2023 – Jun 2024", "Service and support, from devices to software, in SAFe."),
        ("CTO", "Northfork", "Feb 2022 – Oct 2022", "Prepared IT to scale. Also Scrum Master and Product Owner."),
        ("Interim Group CTO", "Eniro · consultant", "Aug 2021 – Feb 2022", "Management team. Strategy presented to the board."),
        ("Head of Platform", "Trustly · interim", "Sep 2020 – Aug 2021", "Infrastructure and Automation, on premises and in the cloud."),
        ("IT Director, Region North", "Unilabs", "Aug 2017 – Feb 2020", "Five countries, one IT organisation, the regional budget."),
        ("CIO", "MedHelp", "Jul 2015 – Aug 2017", "Reported to the CEO. IT strategy and the product platform."),
        ("Manager, Cloud and Middleware", "Klarna", "Feb 2014 – Apr 2015", "Cloud, databases and middleware. Also Head of Infrastructure."),
    ],
}

T = {
    "en": dict(
        lang="en",
        kicker="Papa Bravo AB",
        strap="Engineering Manager\nProgram and project manager\nTechnology leader",
        h_contact="Contact",
        h_strengths="Strengths",
        h_lang="Languages",
        h_cert="Certification",
        h_profile="Profile",
        h_exp="Experience",
        h_earlier="Earlier",
        profile=(
            "I take interim assignments as Engineering Manager, program and project manager, and technology leader through Papa Bravo AB, which I founded in 2020. "
            "I have held the same kind of role as CIO, CTO and IT Director, with the teams that deliver."
        ),
        tags=["Engineering teams", "Programs", "Projects", "Management team", "Multi-country IT"],
        langs=[("Swedish", "Native"), ("English", "Full professional")],
        cert_name="SAFe 6 Product Owner / Product Manager",
        cert_meta="Scaled Agile · Apr 2024 – Apr 2027",
        earlier_when="1998 – 2014",
        earlier=(
            "Diversify, TUI Nordic, Unibet, bwin, Init, the Swedish Armed Forces, Qbranch, TTL Consulting, GE Money Bank, the Government Offices, Boar Consulting / Framfab, Vattenfall Data."
        ),
        location="Stockholm / Åkersberga",
    ),
}


def font_css() -> str:
    faces = [
        ("Newsreader", 500, FONTS / "newsreader/files/newsreader-latin-500-normal.woff"),
        ("Newsreader", 600, FONTS / "newsreader/files/newsreader-latin-600-normal.woff"),
        ("Source Sans 3", 400, FONTS / "source-sans-3/files/source-sans-3-latin-400-normal.woff"),
        ("Source Sans 3", 600, FONTS / "source-sans-3/files/source-sans-3-latin-600-normal.woff"),
    ]
    rules = []
    for family, weight, path in faces:
        rules.append(
            "@font-face {"
            f" font-family: '{family}';"
            f" src: url('{path.as_uri()}') format('woff');"
            f" font-weight: {weight}; font-style: normal; }}"
        )
    return "\n".join(rules)


CSS = """
@page { size: A4; margin: 0; background: #f7f4ee; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 10.5pt;
  line-height: 1.35;
  color: #1a1814;
  hyphens: manual;
}
.sheet { display: flex; width: 210mm; min-height: 297mm; }
aside {
  width: 68mm;
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #1e3d34;
  color: #f7f4ee;
  padding: 13mm 8mm 12mm 8mm;
}
main {
  flex: 1;
  background: #f7f4ee;
  padding: 13mm 11mm 11mm 10mm;
}
.name {
  font-family: Newsreader, serif;
  font-weight: 500;
  font-size: 26pt;
  line-height: 0.98;
  letter-spacing: -0.4pt;
  margin: 0;
}
.strap {
  margin: 8pt 0 0;
  font-size: 10.5pt;
  line-height: 1.35;
  color: #d5e2db;
  white-space: pre-line;
}
.kicker {
  margin: 9pt 0 0;
  font-size: 10.5pt;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #f7f4ee;
}
.rule { width: 18mm; height: 2pt; background: #6f3a2c; margin: 11pt 0 2pt; border: 0; }
h2 {
  font-family: 'Source Sans 3', sans-serif;
  font-weight: 600;
  font-size: 9pt;
  line-height: 1.2;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 13pt 0 5pt;
}
aside h2 { color: #b7c9c0; }
aside div > h2:first-child { margin-top: 0; }
main h2 {
  color: #1e3d34;
  font-family: Newsreader, serif;
  font-weight: 600;
  font-size: 15pt;
  letter-spacing: 0;
  text-transform: none;
  margin: 0 0 6pt;
}
main h2.exp { margin-top: 12pt; }
.contact p { margin: 0 0 3pt; font-size: 10.5pt; line-height: 1.3; }
.contact .dim { color: #d5e2db; }
.tags { margin: 0; padding: 0; }
.tags span {
  display: inline-block;
  margin: 0 4pt 4pt 0;
  padding: 2pt 6pt 2.5pt;
  border: 0.7pt solid #8eaa9e;
  border-radius: 8pt;
  font-size: 10pt;
  line-height: 1.2;
  color: #f7f4ee;
}
.lang { margin: 0 0 2pt; font-size: 10.5pt; }
.lang b { font-weight: 600; }
.lang span { color: #d5e2db; }
.cert { margin: 0; font-size: 10.5pt; line-height: 1.35; }
.cert b { font-weight: 600; }
.cert span { display: block; color: #d5e2db; margin-top: 1pt; }
.lead {
  margin: 0;
  font-size: 11.5pt;
  line-height: 1.38;
  color: #1a1814;
}
.role { margin: 0 0 7.5pt; padding-left: 11pt; border-left: 1.4pt solid #ddd6c8; }
.when {
  margin: 0;
  font-size: 10pt;
  line-height: 1.2;
  color: #6f3a2c;
  font-weight: 600;
}
.title {
  margin: 0;
  font-family: Newsreader, serif;
  font-weight: 600;
  font-size: 12.5pt;
  line-height: 1.15;
  color: #1a1814;
}
.org { margin: 0; font-size: 10.5pt; font-weight: 600; color: #1e3d34; }
.note { margin: 0; font-size: 10.5pt; line-height: 1.3; color: #4a453c; }
.earlier {
  margin-top: 2pt;
  padding-top: 6pt;
  border-top: 0.6pt solid #ddd6c8;
}
.earlier .title { font-size: 12pt; }
.earlier .note { margin-top: 1pt; }
"""


def esc(value: str) -> str:
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build(code: str) -> int:
    data = T[code]
    contact = CONTACT
    tags = "".join(f"<span>{esc(tag)}</span>" for tag in data["tags"])
    langs = "".join(
        f'<p class="lang"><b>{esc(name)}</b> <span>{esc(level)}</span></p>'
        for name, level in data["langs"]
    )
    roles = []
    for title, org, dates, note in ROLES[code]:
        roles.append(
            '<div class="role">'
            f'<p class="when">{esc(dates)}</p>'
            f'<p class="title">{esc(title)}</p>'
            f'<p class="org">{esc(org)}</p>'
            f'<p class="note">{esc(note)}</p>'
            "</div>"
        )
    strap = esc(data["strap"]).replace("\n", "<br>")
    html = f"""<!doctype html>
<html lang="{data["lang"]}">
<head>
<meta charset="utf-8">
<title>Pontus Burman</title>
<meta name="author" content="Pontus Burman">
<style>
{font_css()}
{CSS}
</style>
</head>
<body>
<div class="sheet">
<aside>
  <div>
    <p class="name">Pontus<br>Burman</p>
    <p class="strap">{strap}</p>
    <div class="rule"></div>
    <p class="kicker">{esc(data["kicker"])}</p>
    <h2>{esc(data["h_contact"])}</h2>
    <div class="contact">
      <p>{esc(contact["phone"])}</p>
      <p>{esc(contact["email"])}</p><!-- pragma: allowlist secret -->
      <p>{esc(contact["web"])}</p><!-- pragma: allowlist secret -->
      <p>{esc(contact["li"])}</p>
      <p>{esc(data["location"])}</p>
    </div>
  </div>
  <div>
    <h2>{esc(data["h_strengths"])}</h2>
    <p class="tags">{tags}</p>
  </div>
  <div>
    <h2>{esc(data["h_lang"])}</h2>
    {langs}
    <h2>{esc(data["h_cert"])}</h2>
    <p class="cert"><b>{esc(data["cert_name"])}</b><span>{esc(data["cert_meta"])}</span></p>
  </div>
</aside>
<main>
  <h2>{esc(data["h_profile"])}</h2>
  <p class="lead">{esc(data["profile"])}</p>
  <h2 class="exp">{esc(data["h_exp"])}</h2>
  {"".join(roles)}
  <div class="earlier">
    <p class="when">{esc(data["earlier_when"])}</p>
    <p class="title">{esc(data["h_earlier"])}</p>
    <p class="note">{esc(data["earlier"])}</p>
  </div>
</main>
</div>
</body>
</html>
"""
    BUILD.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    (BUILD / f"cv_{code}.html").write_text(html, encoding="utf-8")
    document = HTML(string=html, base_url=str(BUILD)).render()
    document.write_pdf(PUBLIC / f"Pontus_Burman_CV_{code}.pdf")
    return len(document.pages)


def main() -> None:
    pages = build("en")
    print(f"en: {pages} page(s)")
    if pages != 1:
        raise SystemExit(f"en CV is {pages} pages, expected 1")
    for stale in (BUILD / "cv_sv.html", PUBLIC / "Pontus_Burman_CV_sv.pdf"):
        if stale.exists():
            stale.unlink()


if __name__ == "__main__":
    main()
