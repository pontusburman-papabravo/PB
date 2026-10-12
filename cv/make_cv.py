"""Build Pontus Burman's one-page A4 CV in Swedish and English.

Facts are taken from the public LinkedIn profile (captured 2026-10-12) and from
roles already published on the company site. Do not add numbers, outcomes,
education, clients or dates that those sources do not state.

    python3 cv/make_cv.py

Requires WeasyPrint (and the Inter font). Writes:

    cv/build/cv_sv.html
    cv/build/cv_en.html
    public/cv/Pontus_Burman_CV_sv.pdf
    public/cv/Pontus_Burman_CV_en.pdf

Body text stays at 10.5pt. The script refuses a PDF that is not exactly one page.
"""

from pathlib import Path

from weasyprint import HTML

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "cv" / "build"
PUBLIC = ROOT / "public" / "cv"

CONTACT = dict(
    phone="+46 735 35 22 12",
    email="pontus.burman@papabravo.se",  # pragma: allowlist secret
    web="papabravo.se",  # pragma: allowlist secret
    li="linkedin.com/in/pontusburman",
)

T = {
    "en": dict(
        lang="en",
        title="Engineering Manager · Program and project manager · Technology leader",
        location="Stockholm / Åkersberga, Sweden",
        tel="Tel",
        email_label="E-mail",
        web_label="Web",
        li_label="LinkedIn",
        h_profile="Profile",
        h_strengths="Strengths",
        h_exp="Experience",
        h_earlier="Earlier",
        profile=(
            "I take interim assignments as Engineering Manager, program and project manager, and technology leader through Papa Bravo AB, which I founded in 2020. "
            "I am Engineering Manager for two development teams at Avanza Bank, and I have held the same kind of role as CIO, CTO and IT Director. "
            "The work has been in banking, fintech, medtech and retail technology, with the teams that deliver."
        ),
        strengths="Engineering teams, programs and projects, management-team work, and IT organisations across countries and suppliers.",
        roles=[
            (
                "Engineering Manager (consultant)",
                "Avanza Bank",
                "Dec 2025 – present",
                ["Engineering Manager for two development teams."],
            ),
            (
                "Program Manager (consultant)",
                "Euroclear Sweden",
                "Aug 2024 – Dec 2025",
                ["Program and transformation manager."],
            ),
            (
                "Product and Project Manager (consultant)",
                "Getinge",
                "Jan 2023 – Jun 2024",
                [
                    "Service and support in Integrated Therapy Solutions, globally.",
                    "From point-of-care devices to hardware and software: pre-studies, processes, an organisation proposal, training and tools. The organisation uses SAFe.",
                ],
            ),
            (
                "CTO",
                "Northfork",
                "Feb 2022 – Oct 2022",
                [
                    "Prepared the IT department to scale, and stayed with the product until it was in production.",
                    "People in China, Sri Lanka, Ukraine and Sweden. Also Scrum Master and Product Owner.",
                ],
            ),
            (
                "Interim Group CTO (consultant)",
                "Eniro",
                "Aug 2021 – Feb 2022",
                [
                    "Listed Eniro Group, Sweden, Finland, Denmark and Norway. Management team, and strategy presented to the board.",
                    "A new IT organisation across countries, with employees, external staff and outsourcing partners.",
                ],
            ),
            (
                "Head of Platform (interim)",
                "Trustly",
                "Sep 2020 – Aug 2021",
                [
                    "Infrastructure and Automation: infrastructure on premises and in the cloud, tools and automation, recruitment and new ways of working.",
                ],
            ),
        ],
        lines=[
            (
                "IT Director, Region North",
                "Unilabs",
                "Aug 2017 – Feb 2020",
                "Sweden, Norway, Denmark, Finland and the UK. One IT organisation for the region, and the regional IT budget.",
            ),
            (
                "CIO",
                "MedHelp",
                "Jul 2015 – Aug 2017",
                "Reported to the CEO. IT strategy, agile methods for the business and IT, and a new platform for the main product.",
            ),
            (
                "Manager, Cloud and Middleware",
                "Klarna",
                "Feb 2014 – Apr 2015",
                "Line manager for cloud, databases, Windows and middleware. Joined as Head of Infrastructure (consultant), February to June 2014.",
            ),
        ],
        earlier=(
            "1998–2014: Diversify, TUI Nordic, Unibet, bwin, Init, the Swedish Armed Forces, Qbranch, TTL Consulting, GE Money Bank, the Government Offices, Boar Consulting/Framfab and Vattenfall Data. Infrastructure, project management and line management."
        ),
        footer="Certified SAFe 6 Product Owner/Product Manager, Scaled Agile, Apr 2024 – Apr 2027. Swedish, native. English, full professional proficiency.",
    ),
    "sv": dict(
        lang="sv",
        title="Engineering Manager · Program- och projektledare · Teknisk ledare",
        location="Stockholm / Åkersberga",
        tel="Tel",
        email_label="E-post",
        web_label="Webb",
        li_label="LinkedIn",
        h_profile="Profil",
        h_strengths="Styrkor",
        h_exp="Erfarenhet",
        h_earlier="Tidigare",
        profile=(
            "Jag tar interimuppdrag som Engineering Manager, program- och projektledare och teknisk ledare genom Papa Bravo AB, som jag grundade 2020. "
            "Jag är Engineering Manager för två utvecklingsteam på Avanza Bank, och har haft samma sorts roll som CIO, CTO och IT-chef. "
            "Arbetet har varit inom bank, fintech, medicinteknik och handel, tillsammans med de team som levererar."
        ),
        strengths="Team, program och projekt, arbete i ledningsgrupp, och IT-organisationer över länder och leverantörer.",
        roles=[
            (
                "Engineering Manager (konsult)",
                "Avanza Bank",
                "dec 2025 – pågående",
                ["Engineering Manager för två utvecklingsteam."],
            ),
            (
                "Programledare (konsult)",
                "Euroclear Sweden",
                "aug 2024 – dec 2025",
                ["Program- och transformationsledare."],
            ),
            (
                "Produkt- och projektledare (konsult)",
                "Getinge",
                "jan 2023 – jun 2024",
                [
                    "Service och support inom Integrated Therapy Solutions, globalt.",
                    "Från patientnära utrustning till hårdvara och mjukvara: förstudier, processer, organisationsförslag, utbildning och verktyg. Organisationen använder SAFe.",
                ],
            ),
            (
                "CTO",
                "Northfork",
                "feb 2022 – okt 2022",
                [
                    "Förberedde IT-avdelningen för att skala, och följde produkten tills den var i produktion.",
                    "Medarbetare i Kina, Sri Lanka, Ukraina och Sverige. Även Scrum Master och Product Owner.",
                ],
            ),
            (
                "Interim koncern-CTO (konsult)",
                "Eniro",
                "aug 2021 – feb 2022",
                [
                    "Det börsnoterade Eniro, Sverige, Finland, Danmark och Norge. Ledningsgrupp, och strategi som presenterades för styrelsen.",
                    "En ny IT-organisation över länder, med anställda, externa medarbetare och outsourcingpartners.",
                ],
            ),
            (
                "Head of Platform (interim)",
                "Trustly",
                "sep 2020 – aug 2021",
                [
                    "Infrastructure och Automation: infrastruktur on-prem och i molnet, verktyg och automatisering, rekrytering och nya arbetssätt.",
                ],
            ),
        ],
        lines=[
            (
                "IT-chef, Region North",
                "Unilabs",
                "aug 2017 – feb 2020",
                "Sverige, Norge, Danmark, Finland och Storbritannien. En IT-organisation för regionen och regionens IT-budget.",
            ),
            (
                "CIO",
                "MedHelp",
                "jul 2015 – aug 2017",
                "Rapporterade till vd. IT-strategi, agila metoder för verksamhet och IT, och en ny plattform för huvudprodukten.",
            ),
            (
                "Chef, cloud och middleware",
                "Klarna",
                "feb 2014 – apr 2015",
                "Linjechef för cloud, databaser, Windows och middleware. Började som Head of Infrastructure (konsult), februari till juni 2014.",
            ),
        ],
        earlier=(
            "1998–2014: Diversify, TUI Nordic, Unibet, bwin, Init, Försvarsmakten, Qbranch, TTL Consulting, GE Money Bank, Regeringskansliet, Boar Consulting/Framfab och Vattenfall Data. Infrastruktur, projektledning och linjeledning."
        ),
        footer="Certified SAFe 6 Product Owner/Product Manager, Scaled Agile, apr 2024 – apr 2027. Svenska, modersmål. Engelska, flytande i tal och skrift.",
    ),
}

CSS = """
@page { size: A4; margin: 12mm 14mm; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: Inter, 'Source Sans 3', sans-serif;
  font-size: 10.5pt;
  line-height: 1.35;
  color: #1c2830;
  hyphens: manual;
}
header { border-bottom: 1.6pt solid #1d4e6b; padding-bottom: 7pt; margin-bottom: 8pt; }
h1 {
  font-size: 20pt;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.2pt;
  margin: 0;
  color: #12324a;
}
.title { font-size: 11pt; line-height: 1.3; color: #1d4e6b; font-weight: 600; margin: 2pt 0 4pt; }
.contact { font-size: 10.5pt; line-height: 1.35; color: #24303a; }
.contact span { white-space: nowrap; display: inline-block; margin-right: 11pt; }
h2 {
  font-size: 10.5pt;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.4pt;
  color: #1d4e6b;
  font-weight: 700;
  margin: 9pt 0 3pt;
  padding-bottom: 1pt;
  border-bottom: 0.6pt solid #c5d3dd;
}
p { margin: 0; }
.role, .oneline { margin: 0 0 4.5pt; }
.rh { font-weight: 650; color: #12324a; }
.rh .when { font-weight: 500; color: #3d4c59; }
ul { margin: 1pt 0 0; padding-left: 14pt; }
li { margin: 0; padding: 0; }
.foot {
  margin-top: 8pt;
  padding-top: 4pt;
  border-top: 0.6pt solid #c5d3dd;
}
"""


def esc(value: str) -> str:
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build(code: str) -> int:
    data = T[code]
    contact = CONTACT
    parts = [
        "<!doctype html>",
        f'<html lang="{data["lang"]}">',
        "<head>",
        '<meta charset="utf-8">',
        "<title>Pontus Burman</title>",
        '<meta name="author" content="Pontus Burman">',
        f"<style>{CSS}</style>",
        "</head>",
        "<body>",
        "<header>",
        "<h1>Pontus Burman</h1>",
        f'<p class="title">{esc(data["title"])}</p>',
        '<p class="contact">',
        f'<span>{esc(data["tel"])} {esc(contact["phone"])}</span>',
        f'<span>{esc(data["email_label"])} {esc(contact["email"])}</span><!-- pragma: allowlist secret -->',
        f'<span>{esc(data["web_label"])} {esc(contact["web"])}</span><!-- pragma: allowlist secret -->',
        f'<span>{esc(data["li_label"])} {esc(contact["li"])}</span>',
        f'<span>{esc(data["location"])}</span>',
        "</p>",
        "</header>",
        f'<h2>{esc(data["h_profile"])}</h2>',
        f'<p>{esc(data["profile"])}</p>',
        f'<h2>{esc(data["h_strengths"])}</h2>',
        f'<p>{esc(data["strengths"])}</p>',
        f'<h2>{esc(data["h_exp"])}</h2>',
    ]
    for title, company, dates, bullets in data["roles"]:
        items = "".join(f"<li>{esc(bullet)}</li>" for bullet in bullets)
        parts.append(
            '<div class="role">'
            f'<p class="rh">{esc(title)}, {esc(company)}'
            f' <span class="when">{esc(dates)}</span></p>'
            f"<ul>{items}</ul>"
            "</div>"
        )
    for title, company, dates, line in data["lines"]:
        parts.append(
            f'<p class="oneline"><span class="rh">{esc(title)}, {esc(company)}'
            f' <span class="when">{esc(dates)}</span></span> {esc(line)}</p>'
        )
    parts.append(f'<h2>{esc(data["h_earlier"])}</h2>')
    parts.append(f'<p>{esc(data["earlier"])}</p>')
    parts.append(f'<p class="foot">{esc(data["footer"])}</p>')
    parts.append("</body></html>")
    html = "\n".join(parts)

    BUILD.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    (BUILD / f"cv_{code}.html").write_text(html, encoding="utf-8")
    document = HTML(string=html, base_url=str(BUILD)).render()
    document.write_pdf(PUBLIC / f"Pontus_Burman_CV_{code}.pdf")
    return len(document.pages)


def main() -> None:
    for code in ("sv", "en"):
        pages = build(code)
        print(f"{code}: {pages} page(s)")
        if pages != 1:
            raise SystemExit(f"{code} CV is {pages} pages, expected 1")


if __name__ == "__main__":
    main()
