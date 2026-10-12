"""Build Pontus Burman's two-page A4 CV in Swedish and English.

Facts are taken from the public LinkedIn profile (captured 2026-10-12) and from
roles already published on the company site. Do not add numbers, outcomes,
education, clients or dates that those sources do not state.

    python3 cv/make_cv.py

Requires WeasyPrint (and the Inter font, for the intended look). Writes:

    cv/build/cv_sv.html
    cv/build/cv_en.html
    public/cv/Pontus_Burman_CV_sv.pdf
    public/cv/Pontus_Burman_CV_en.pdf
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
        h_bring="What I bring",
        h_exp="Professional experience",
        h_earlier="Earlier experience",
        h_cert="Certification",
        h_courses="Courses",
        h_lang="Languages",
        profile=[
            "I take interim assignments as Engineering Manager, program and project manager, and technology leader, through Papa Bravo AB. I have held the same kind of role before, as CIO, CTO and IT Director, and I still sit with the teams that deliver.",
            "I am Engineering Manager for two development teams at Avanza Bank. Before that I led program and transformation work at Euroclear Sweden, and product and project work for service and support at Getinge. I have been interim Group CTO at the listed Eniro Group, a member of the management team, with strategy presented to the board. I have been IT Director for Unilabs in Sweden, Norway, Denmark, Finland and the UK, responsible for the regional IT budget, and CIO at MedHelp, reporting to the CEO.",
            "The brief is usually the same. The business and the engineers need one plan: a clear goal, an organisation that works across countries and suppliers, and something that actually gets delivered. It started with Unix operations in the late 1990s, and has since been banking, fintech, medtech and retail technology.",
        ],
        bring=[
            (
                "Engineering teams.",
                "Two development teams at Avanza. At Klarna, line manager for cloud, databases, Windows and middleware. At Northfork, people in China, Sri Lanka, Ukraine and Sweden.",
            ),
            (
                "Programs and projects.",
                "Program and transformation manager at Euroclear Sweden. At Getinge, service and support moving from point-of-care devices to hardware and software, with pre-studies, new processes, an organisation proposal, training and tools, inside SAFe.",
            ),
            (
                "A seat in management.",
                "Management team at Eniro, and strategy presented to the board. CIO at MedHelp, reporting to the CEO. IT Director for five countries at Unilabs, with the regional IT budget.",
            ),
            (
                "The organisation, not only the plan.",
                "One IT organisation for Unilabs Region North, and lower running costs. A new IT organisation at Eniro, with employees, external staff and outsourcing partners. Recruitment and new ways of working at Trustly. Agile methods for business and IT at MedHelp.",
            ),
            (
                "Suppliers, contracts and sourcing.",
                "Negotiated with contractors and suppliers at MedHelp, and supported the rest of the company in the same discussions. IT sourcing, outsourcing and strategic planning are part of the work at Papa Bravo.",
            ),
        ],
        base="In the work I use agile methods, Scrum, ITIL, AWS, Unix and Linux, and enterprise and solution architecture. I also use ChatGPT, Gemini, Copilot, Cursor and Claude.",
        roles=[
            (
                "Engineering Manager (consultant)",
                "Avanza Bank",
                "Dec 2025 – present",
                "Stockholm",
                ["Engineering Manager for two development teams."],
            ),
            (
                "Founder and consultant",
                "Papa Bravo AB (org. no. 559244-7576)",
                "Feb 2020 – present",
                "Stockholm",
                [
                    "Founded the company. I take interim assignments in engineering leadership, programs, projects and product management.",
                    "The work also covers IT and management consulting, IT sourcing and outsourcing, strategic planning, change management and team building.",
                ],
            ),
            (
                "Program Manager (consultant)",
                "Euroclear Sweden",
                "Aug 2024 – Dec 2025",
                "Stockholm",
                ["Program and transformation manager."],
            ),
            (
                "Product and Project Manager (consultant)",
                "Getinge",
                "Jan 2023 – Jun 2024",
                "Stockholm",
                [
                    "Led product and project work for Service and Support in Integrated Therapy Solutions, on a global level.",
                    "Adapted service and support as the organisation moved from point-of-care devices to combined hardware and software.",
                    "Ran pre-studies on processes, tools and collaboration, then implemented the processes, proposed an organisation, and produced training material and tools.",
                    "Worked in an organisation that uses SAFe.",
                ],
            ),
            (
                "CTO",
                "Northfork",
                "Feb 2022 – Oct 2022",
                "Stockholm",
                [
                    "Prepared the IT department to scale, for a product that offers grocery shopping by recipe to retailers and publishers, through widgets and APIs.",
                    "Put basic processes in place for the business and for IT, and worked with both to try new technologies and products.",
                    "Took part in every step of getting the product into production.",
                    "Led employees in China, Sri Lanka, Ukraine and Sweden. The rest of the business was in Sweden, the UK, France and the USA.",
                ],
            ),
            (
                "Interim Group CTO (consultant)",
                "Eniro",
                "Aug 2021 – Feb 2022",
                "",
                [
                    "Interim Group CTO for the listed Eniro Group, with the business in Sweden, Finland, Denmark and Norway, and customers in both B2B and B2C.",
                    "Member of the management team. Ran two tracks in parallel: the legacy systems and the solutions that were coming next.",
                    "Worked on the long-term and short-term strategy, which was presented to the board.",
                    "Put a new IT organisation in place, with employees and external staff in several countries, and strategic partners for outsourced services.",
                ],
            ),
            (
                "Head of Platform (interim)",
                "Trustly",
                "Sep 2020 – Aug 2021",
                "",
                [
                    "Led Platform: two teams, Infrastructure and Automation, building infrastructure on premises and in the cloud, plus tools and automation for developers and the rest of the organisation.",
                    "Kept day-to-day operations running, and worked to make the teams more effective and happier.",
                    "Recruitment and new ways of working were a large part of the role, in an organisation with a high pace of change and new business.",
                ],
            ),
            (
                "IT Director, Region North",
                "Unilabs",
                "Aug 2017 – Feb 2020",
                "Stockholm",
                [
                    "IT Director for Northern Europe (Sweden, Norway, Denmark, Finland and the UK), in a European company of about 12,000 employees across three regions.",
                    "With the team, set the digitalisation roadmap and strategy for each country and for the region, including the move from older processes and technology toward automation, AI and another way of working.",
                    "Formed one IT organisation for the region, improved cooperation between the countries, cut running costs, and was responsible for the regional IT budget.",
                    "Led internal and external engineering teams, coached managers and colleagues, sponsored and coached IT project managers, and was product owner for common IT systems.",
                ],
            ),
            (
                "CIO",
                "MedHelp AB",
                "Jul 2015 – Aug 2017",
                "Stockholm",
                [
                    "Led an IT department spread across the Nordic countries. Reported to the CEO and took part in the management team's strategic decisions.",
                    "Led and sponsored a new platform and user experience for the main product. Made the case to the CEO and the owners, and raised the funding from them.",
                    "Introduced agile methods for the business and for IT, so the two sides would work more closely.",
                    "Set and carried out the IT strategy. Negotiated with contractors and suppliers, and supported the rest of the organisation in similar negotiations.",
                ],
            ),
            (
                "Manager, Middleware and Cloud Services",
                "Klarna",
                "Jun 2014 – Apr 2015",
                "Stockholm",
                [
                    "Line manager for four teams: Cloud (an internal cloud with a self-service portal, plus how AWS was used and designed), database engineers (Oracle, Postgres and MS SQL), Windows administrators, and middleware (Nagios, Splunk, New Relic).",
                    "Joined Klarna as Head of Infrastructure (consultant), February to June 2014.",
                ],
            ),
        ],
        earlier=[
            (
                "2008 – 2014",
                "Diversify Consulting Group",
                "Consultant manager, key account manager, account manager, interim line manager and project manager",
            ),
            ("2013", "TUI Nordic", "Operations manager and team coach (consultant)"),
            (
                "2012 – 2013",
                "Unibet",
                "Project manager and Technical Development Manager (consultant)",
            ),
            (
                "2007 – 2010",
                "bwin",
                "Project manager, including disaster recovery for the gaming platform",
            ),
            ("2007 – 2008", "Init AB", "Consultant"),
            (
                "2006 – 2007",
                "Swedish Armed Forces",
                "Linux and Solaris system administrator (consultant)",
            ),
            ("2005 – 2007", "Qbranch Consulting AB", "Infrastructure consultant"),
            ("2001 – 2005", "TTL Consulting AB", "Consultant and owner"),
            ("2004 – 2005", "GE Money Bank", "Consultant, operations and infrastructure"),
            ("2001 – 2003", "Government Offices of Sweden", "Consultant"),
            ("1999 – 2001", "Boar Consulting AB / Framfab", "Infrastructure consultant"),
            (
                "1998 – 1999",
                "Vattenfall Data AB",
                "Unix server engineer and system administrator",
            ),
        ],
        cert=[
            (
                "Certified SAFe® 6 Product Owner/Product Manager",
                "Scaled Agile, Inc. · issued Apr 2024, valid until Apr 2027",
            )
        ],
        courses=[
            ("AWS Essentials", "Amazon Web Services, associated with Klarna"),
            ("PPL", "Private pilot licence"),
        ],
        langs=[
            ("Swedish", "Native"),
            ("English", "Full professional proficiency"),
        ],
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
        h_bring="Det jag bidrar med",
        h_exp="Yrkeserfarenhet",
        h_earlier="Tidigare erfarenhet",
        h_cert="Certifiering",
        h_courses="Kurser",
        h_lang="Språk",
        profile=[
            "Jag tar interimuppdrag som Engineering Manager, program- och projektledare och teknisk ledare, genom Papa Bravo AB. Samma sorts roll har jag haft tidigare, som CIO, CTO och IT-chef, och jag sitter fortfarande med de team som levererar.",
            "Jag är Engineering Manager för två utvecklingsteam på Avanza Bank. Dessförinnan ledde jag program och transformation på Euroclear Sweden, och produkt- och projektarbete för service och support på Getinge. Jag har varit interim koncern\u2011CTO på det börsnoterade Eniro, medlem i ledningsgruppen, med strategi som presenterades för styrelsen. Jag har varit IT\u2011chef för Unilabs i Sverige, Norge, Danmark, Finland och Storbritannien, med ansvar för regionens IT\u2011budget, och CIO på MedHelp med rapportering till vd.",
            "Uppdraget brukar vara detsamma. Verksamheten och utvecklarna behöver en gemensam plan: ett tydligt mål, en organisation som fungerar över länder och leverantörer, och något som faktiskt blir levererat. Det började med Unix-drift i slutet av 1990-talet, och har sedan dess varit bank, fintech, medicinteknik och handel.",
        ],
        bring=[
            (
                "Ingenjörsteam.",
                "Två utvecklingsteam på Avanza. På Klarna var jag linjechef för cloud, databaser, Windows och middleware. På Northfork hade jag medarbetare i Kina, Sri Lanka, Ukraina och Sverige.",
            ),
            (
                "Program och projekt.",
                "Program- och transformationsledare på Euroclear Sweden. På Getinge gick service och support från patientnära utrustning till hårdvara och mjukvara, med förstudier, nya processer, organisationsförslag, utbildning och verktyg, i SAFe.",
            ),
            (
                "En plats i ledningen.",
                "Ledningsgrupp på Eniro, och strategi som presenterades för styrelsen. CIO på MedHelp, med rapportering till vd. IT-chef för fem länder på Unilabs, med regionens IT-budget.",
            ),
            (
                "Organisationen, inte bara planen.",
                "En gemensam IT-organisation för Unilabs Region North, och lägre driftkostnader. En ny IT-organisation på Eniro, med anställda, externa medarbetare och outsourcingpartners. Rekrytering och nya arbetssätt på Trustly. Agila metoder för verksamhet och IT på MedHelp.",
            ),
            (
                "Leverantörer, avtal och sourcing.",
                "Förhandlade med konsulter och leverantörer på MedHelp, och stöttade resten av bolaget i samma diskussioner. IT-sourcing, outsourcing och strategisk planering ingår i arbetet på Papa Bravo.",
            ),
        ],
        base="I arbetet använder jag agila metoder, Scrum, ITIL, AWS, Unix och Linux samt företags- och lösningsarkitektur. Jag använder också ChatGPT, Gemini, Copilot, Cursor och Claude.",
        roles=[
            (
                "Engineering Manager (konsult)",
                "Avanza Bank",
                "dec 2025 – pågående",
                "Stockholm",
                ["Engineering Manager för två utvecklingsteam."],
            ),
            (
                "Grundare och konsult",
                "Papa Bravo AB (org.nr 559244-7576)",
                "feb 2020 – pågående",
                "Stockholm",
                [
                    "Grundade bolaget. Jag tar interimuppdrag inom teknikledning, program, projekt och produktledning.",
                    "Arbetet omfattar också IT- och managementkonsulting, IT-sourcing och outsourcing, strategisk planering, förändringsledning och att bygga team.",
                ],
            ),
            (
                "Programledare (konsult)",
                "Euroclear Sweden",
                "aug 2024 – dec 2025",
                "Stockholm",
                ["Program- och transformationsledare."],
            ),
            (
                "Produkt- och projektledare (konsult)",
                "Getinge",
                "jan 2023 – jun 2024",
                "Stockholm",
                [
                    "Ledde produkt- och projektarbete för service och support inom Integrated Therapy Solutions, på global nivå.",
                    "Anpassade service och support när organisationen gick från patientnära utrustning till lösningar med både hårdvara och mjukvara.",
                    "Gjorde förstudier om processer, verktyg och samarbete, införde sedan processerna, föreslog en organisation och tog fram utbildningsmaterial och verktyg.",
                    "Arbetade i en organisation som använder SAFe.",
                ],
            ),
            (
                "CTO",
                "Northfork",
                "feb 2022 – okt 2022",
                "Stockholm",
                [
                    "Förberedde IT-avdelningen för att kunna skala, i ett bolag som erbjuder receptbaserad matvaruhandel till återförsäljare och publicister via widgets och API:er.",
                    "Införde grundläggande processer i verksamheten och i IT, och arbetade nära båda för att prova ny teknik och nya produkter.",
                    "Var med i varje steg tills produkten var i produktion.",
                    "Ledde medarbetare i Kina, Sri Lanka, Ukraina och Sverige. Övriga verksamheten fanns i Sverige, Storbritannien, Frankrike och USA.",
                ],
            ),
            (
                "Interim koncern-CTO (konsult)",
                "Eniro",
                "aug 2021 – feb 2022",
                "",
                [
                    "Interim koncern-CTO för det börsnoterade Eniro, med verksamhet i Sverige, Finland, Danmark och Norge och kunder inom både B2B och B2C.",
                    "Medlem i ledningsgruppen. Drev två spår parallellt: de befintliga systemen och lösningarna som skulle komma.",
                    "Arbetade med strategin på lång och kort sikt. Den presenterades för styrelsen.",
                    "Satte en ny IT-organisation med anställda och externa medarbetare i flera länder, och strategiska partners för outsourcade tjänster.",
                ],
            ),
            (
                "Head of Platform (interim)",
                "Trustly",
                "sep 2020 – aug 2021",
                "",
                [
                    "Ledde Platform: två team, Infrastructure och Automation, som bygger infrastruktur on-prem och i molnet samt verktyg och automatisering för utvecklare och resten av organisationen.",
                    "Skötte den dagliga driften och arbetade för att teamen skulle bli effektivare och trivas bättre.",
                    "Rekrytering och nya arbetssätt var en stor del av rollen, i en organisation med högt tempo och nya affärsmöjligheter.",
                ],
            ),
            (
                "IT-chef, Region North",
                "Unilabs",
                "aug 2017 – feb 2020",
                "Stockholm",
                [
                    "IT-chef för Nordeuropa (Sverige, Norge, Danmark, Finland och Storbritannien), i ett europeiskt bolag med omkring 12\u00a0000 anställda i tre regioner.",
                    "Tog tillsammans med teamet fram roadmap och strategi för digitalisering för varje land och för regionen, inklusive steget från äldre processer och teknik mot automation, AI och ett annat arbetssätt.",
                    "Samlade regionen i en IT-organisation, förbättrade samarbetet mellan länderna, sänkte driftkostnaderna och ansvarade för regionens IT-budget.",
                    "Ledde interna och externa ingenjörsteam, coachade chefer och medarbetare, var sponsor och coach för IT-projektledare och produktägare för gemensamma IT-system.",
                ],
            ),
            (
                "CIO",
                "MedHelp AB",
                "jul 2015 – aug 2017",
                "Stockholm",
                [
                    "Ledde en IT-avdelning spridd över Norden. Rapporterade till vd och deltog i ledningsgruppens strategiska beslut.",
                    "Ledde och var sponsor för en ny plattform och användarupplevelse för huvudprodukten. Fick med vd och ägare på projektet och tog in finansieringen från dem.",
                    "Införde agila metoder för verksamhet och IT, så att de skulle arbeta tätare ihop.",
                    "Satte och genomförde IT-strategin. Förhandlade med konsulter och leverantörer, och stöttade resten av organisationen i samma typ av förhandlingar.",
                ],
            ),
            (
                "Manager, Middleware and Cloud Services",
                "Klarna",
                "jun 2014 – apr 2015",
                "Stockholm",
                [
                    "Linjechef för fyra team: Cloud (internt moln med självserviceportal, samt användning och design av AWS), databasingenjörer (Oracle, Postgres och MS SQL), Windows-administratörer och middleware (Nagios, Splunk, New Relic).",
                    "Började på Klarna som Head of Infrastructure (konsult), februari till juni 2014.",
                ],
            ),
        ],
        earlier=[
            (
                "2008 – 2014",
                "Diversify Consulting Group",
                "Konsultchef, key account manager, account manager, interim linjechef och projektledare",
            ),
            ("2013", "TUI Nordic", "Driftchef och teamcoach (konsult)"),
            (
                "2012 – 2013",
                "Unibet",
                "Projektledare och Technical Development Manager (konsult)",
            ),
            (
                "2007 – 2010",
                "bwin",
                "Projektledare, bland annat katastrofåterställning för spelplattformen",
            ),
            ("2007 – 2008", "Init AB", "Konsult"),
            (
                "2006 – 2007",
                "Försvarsmakten",
                "Systemadministratör Linux och Solaris (konsult)",
            ),
            ("2005 – 2007", "Qbranch Consulting AB", "Infrastrukturkonsult"),
            ("2001 – 2005", "TTL Consulting AB", "Konsult och ägare"),
            ("2004 – 2005", "GE Money Bank", "Konsult, drift och infrastruktur"),
            ("2001 – 2003", "Regeringskansliet", "Konsult"),
            ("1999 – 2001", "Boar Consulting AB / Framfab", "Infrastrukturkonsult"),
            (
                "1998 – 1999",
                "Vattenfall Data AB",
                "Unix-serveringenjör och systemadministratör",
            ),
        ],
        cert=[
            (
                "Certified SAFe® 6 Product Owner/Product Manager",
                "Scaled Agile, Inc. · utfärdad apr 2024, giltig till apr 2027",
            )
        ],
        courses=[
            ("AWS Essentials", "Amazon Web Services, hos Klarna"),
            ("PPL", "Privatflygcertifikat"),
        ],
        langs=[
            ("Svenska", "Modersmål"),
            ("Engelska", "Flytande i tal och skrift"),
        ],
    ),
}

CSS = """
@page { size: A4; margin: 12mm 14mm 11mm 14mm;
  @bottom-right { content: "Pontus Burman  ·  " counter(page) " / " counter(pages);
    font: 7.5pt 'Inter', sans-serif; color: #8a94a3; } }
* { box-sizing: border-box; }
body { font-family: 'Inter', 'Source Sans 3', sans-serif; font-size: 8.55pt;
  line-height: 1.32; color: #1f2933; margin: 0; hyphens: manual; }
header { border-bottom: 2.2pt solid #1d4e6b; padding-bottom: 6pt; margin-bottom: 7pt; }
h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.3pt; margin: 0; color: #12324a; }
.title { font-size: 10.2pt; color: #1d6d8c; font-weight: 600; margin: 1pt 0 5pt; }
.contact { font-size: 8.2pt; color: #3e4c59; }
.contact span { white-space: nowrap; display: inline-block; margin-right: 11pt; }
.contact b { color: #1d4e6b; font-weight: 600; }
h2 { font-size: 9.2pt; text-transform: uppercase; letter-spacing: 0.2pt; color: #1d4e6b;
  font-weight: 700; margin: 7.5pt 0 3pt; padding-bottom: 1.5pt; border-bottom: 0.6pt solid #c5d3dd; }
p.profile { margin: 0 0 3.5pt; font-size: 8.85pt; line-height: 1.34; }
p.profile:last-of-type { margin-bottom: 0; }
ul.bring { list-style: none; padding: 0; margin: 0; }
ul.bring li { position: relative; padding-left: 9pt; margin: 0 0 2pt; break-inside: avoid; }
ul.bring li::before { content: "▪"; color: #1d6d8c; position: absolute; left: 0; top: -0.4pt; }
ul.bring b { color: #12324a; font-weight: 600; }
p.base { margin: 3pt 0 0; color: #3e4c59; font-size: 8.3pt; }
.role { margin-bottom: 4.4pt; break-inside: avoid; }
.rh { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
.rt { font-weight: 700; font-size: 9.35pt; color: #12324a; }
.rc { font-weight: 600; color: #1d6d8c; }
.rd { font-size: 8.15pt; color: #52606d; white-space: nowrap; font-weight: 500; }
.role ul { margin: 1.5pt 0 0; padding-left: 12pt; }
.role li { margin-bottom: 0.6pt; }
.role li::marker { color: #1d6d8c; }
.earlier { margin: 0; }
.erow { display: flex; gap: 6pt; padding: 2.55pt 0; border-bottom: 0.4pt solid #e4ebf0;
  font-size: 8.25pt; break-inside: avoid; }
.erow .y { width: 22mm; flex: none; color: #52606d; }
.erow .c { width: 52mm; flex: none; font-weight: 600; color: #1d6d8c; }
.erow .t { flex: 1; }
.grid { display: flex; gap: 12pt; margin-top: 2pt; }
.grid > div { flex: 1; }
.grid h2 { margin-top: 8pt; }
.item { margin-bottom: 3.5pt; break-inside: avoid; }
.item b { color: #12324a; }
.item .sub { display: block; color: #52606d; font-size: 8.15pt; }
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
        "<title>Pontus Burman CV</title>",
        '<meta name="author" content="Pontus Burman">',
        f"<style>{CSS}</style>",
        "</head>",
        "<body>",
        "<header>",
        "<h1>Pontus Burman</h1>",
        f'<div class="title">{esc(data["title"])}</div>',
        '<div class="contact">',
        f'<span><b>{esc(data["tel"])}</b> {esc(contact["phone"])}</span>',
        f'<span><b>{esc(data["email_label"])}</b> {esc(contact["email"])}</span><!-- pragma: allowlist secret -->',
        f'<span><b>{esc(data["web_label"])}</b> {esc(contact["web"])}</span><!-- pragma: allowlist secret -->',
        f'<span><b>{esc(data["li_label"])}</b> {esc(contact["li"])}</span>',
        f'<span>{esc(data["location"])}</span>',
        "</div>",
        "</header>",
        f'<h2>{esc(data["h_profile"])}</h2>',
    ]
    for paragraph in data["profile"]:
        parts.append(f'<p class="profile">{esc(paragraph)}</p>')
    parts.append(f'<h2>{esc(data["h_bring"])}</h2>')
    parts.append('<ul class="bring">')
    for label, text in data["bring"]:
        parts.append(f"<li><b>{esc(label)}</b> {esc(text)}</li>")
    parts.append("</ul>")
    parts.append(f'<p class="base">{esc(data["base"])}</p>')
    parts.append(f'<h2>{esc(data["h_exp"])}</h2>')
    for title, company, dates, location, bullets in data["roles"]:
        when = dates + (f" · {location}" if location else "")
        items = "".join(f"<li>{esc(bullet)}</li>" for bullet in bullets)
        parts.append(
            '<div class="role">'
            '<div class="rh">'
            f'<div><span class="rt">{esc(title)}</span> · <span class="rc">{esc(company)}</span></div>'
            f'<div class="rd">{esc(when)}</div>'
            "</div>"
            f"<ul>{items}</ul>"
            "</div>"
        )
    parts.append(f'<h2>{esc(data["h_earlier"])}</h2>')
    parts.append('<div class="earlier">')
    for years, company, title in data["earlier"]:
        parts.append(
            '<div class="erow">'
            f'<span class="y">{esc(years)}</span>'
            f'<span class="c">{esc(company)}</span>'
            f'<span class="t">{esc(title)}</span>'
            "</div>"
        )
    parts.append("</div>")
    parts.append('<div class="grid">')
    for heading, items in (
        ("h_cert", "cert"),
        ("h_courses", "courses"),
        ("h_lang", "langs"),
    ):
        blocks = "".join(
            f'<div class="item"><b>{esc(name)}</b><span class="sub">{esc(detail)}</span></div>'
            for name, detail in data[items]
        )
        parts.append(f'<div><h2>{esc(data[heading])}</h2>{blocks}</div>')
    parts.append("</div></body></html>")
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
        if pages != 2:
            raise SystemExit(f"{code} CV is {pages} pages, expected 2")


if __name__ == "__main__":
    main()
