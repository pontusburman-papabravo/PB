import { experience } from '../data/experience';
import { products } from '../data/products';
import { site } from '../data/site';
import type { Copy } from '../i18n';

const homeSummary: Record<string, string> = {
  'Avanza|Engineering Manager': 'Ansvarig för två team.',
  'Getinge|Product and project manager':
    'Produkt- och projektledning för service och support av nya digitala tjänster i patientnära utrustning.',
  'Northfork|CTO': 'Även Scrum Master och Product Owner.',
  'Eniro Group|Interim Group CTO':
    'Befintliga system, vad som skulle komma sedan, och formen på IT-organisationen över länder.',
  'Trustly|Head of Platform': 'Infrastruktur- och automationsteamen som andra team bygger och driver på.',
  'Unilabs|IT Director, North':
    'Regional riktning, teknikorganisationen och samarbetet med verksamheten.',
  'MedHelp|CIO':
    'IT-strategi, den huvudsakliga produktplattformen, och hur verksamhet och IT arbetade ihop.',
  'Klarna|Manager, Cloud and Middleware':
    'Cloud och middleware, så att utvecklingsteam hade en plattform att bygga och släppa på.',
  'Klarna|Head of Infrastructure': 'Cloud, databaser, servrar och tillhörande drift.',
};

const experienceSummary: Record<string, string> = {
  'Avanza|Engineering Manager': 'Engineering Manager för två team, från december 2025.',
  'Getinge|Product and project manager':
    'Produkt- och projektledning för service och support av nya digitala tjänster i patientnära utrustning, inklusive förberedelse av processer, organisation, verktyg och utbildning.',
  'Northfork|CTO': 'CTO, även som Scrum Master och Product Owner.',
  'Eniro Group|Interim Group CTO':
    'Interim Group CTO för Eniro Group, ett noterat bolag, med ansvar för befintliga system och vad som skulle komma sedan, inklusive formen på IT-organisationen över länder.',
  'Trustly|Head of Platform':
    'Head of Platform, ansvarig för infrastruktur- och automationsteam — plattformen andra team bygger och driver på — inklusive hur de teamen arbetade och anställde.',
  'Unilabs|IT Director, North':
    'IT-direktör för den norra regionen under en bredare rörelse mot digitalisering, med ansvar för regional riktning, teknikorganisationen och samarbetet med verksamheten.',
  'MedHelp|CIO':
    'CIO, ansvarig för IT-strategi och för hur tekniken stödde bolaget. Införde agila arbetssätt mellan verksamhet och IT, och ledde arbetet med den huvudsakliga produktplattformen.',
  'Klarna|Manager, Cloud and Middleware':
    'Ledning för cloud och middleware, så att utvecklingsteam hade en plattform att bygga och släppa på.',
  'Klarna|Head of Infrastructure':
    'Head of Infrastructure. Området omfattade cloud, databaser, servrar och tillhörande drift.',
  'Unibet|Project manager':
    'Projektledning i spelbranschen, inklusive IT-projekt som kundsupportsystem.',
  'Unibet|Line manager': 'Linjechef i spelbranschen, inklusive internationella team.',
};

const swedishProducts = products.map((product) => {
  if (product.name === 'My Star Day') {
    return {
      ...product,
      line: 'En dag ett barn kan följa utan att bli påmint om varje steg.',
      summary:
        'Familjerutiner, ett steg i taget. Föräldrarna sätter dagen. Barnet ser vad, var, vem och vad som händer sedan.',
      problem:
        'Vardagen i många familjer hänger på att en vuxen upprepar samma steg. Barn som behöver en tydligare bild av nu, sedan och klart — inklusive familjer där neurodivergens är en del av vardagen — fastnar mellan påminnelser.',
      idea: 'Ett visuellt schema barnet kan följa, med en utveckling som syns. Föräldrarna bygger rutinen. Barnet ser ett steg i taget och samlar stjärnor mot belöningar familjen väljer. Missade steg behandlas inte som misslyckande.',
      audience:
        'Familjer som vill ha lugnare rutiner och mer självständighet i vardagen, inklusive familjer som använder visuellt stöd. Den svenska tjänsten är Min Stjärndag. En engelsk version är publicerad för andra marknader.',
      status:
        'En produkt i drift: webb, iPhone och Android, i App Store och Google Play, med onboarding och prenumerationer i butikerna. Den är i aktiv utveckling.',
      practice:
        'Att få ut den har inneburit det vanliga arbetet med en släppt produkt: gränssnittet, bygget, analys, appbutikerna, betalningar, onboarding och både en svensk och en engelsk version.',
      figure: product.figure
        ? {
            ...product.figure,
            alt: 'Aktivitetsvy i My Star Day som visar var uppgiften sker, vem som gör den, hur lång tid den tar och vad som händer sedan.',
            caption: 'Var, vem, hur länge och vad som händer sedan. Från appen i drift.',
          }
        : undefined,
    };
  }

  return {
    ...product,
    line: 'En gemensam logg för privat övningskörning.',
    summary:
      'För den som övningskör och handledaren som sitter bredvid. Vad som tränades, vad som var svårt, och vad nästa pass ska fokusera på.',
    specimenNote: 'Raden på korpasset.se',
    problem:
      'Privat övningskörning pågår ofta länge, med mer än en handledare. Det är lätt att tappa vad som har tränats, vad som fortfarande är svårt, och vad nästa pass ska fokusera på.',
    idea: 'Eleven och handledaren planerar passet, loggar hur det gick och behåller en gemensam bild av vägen mot körkortet. Flera handledare kan följa samma historik.',
    audience:
      'De som övningskör och de godkända handledare som övar med dem i Sverige — föräldrar, partner eller andra — vare sig de precis har börjat eller har kört i flera månader.',
    status:
      'En produkt i drift på webben och i App Store för iPhone. Android-distributionen ligger hos Google för granskning. Betan är gratis. Betalning tas inte på webbplatsen.',
    practice:
      'Bygget omfattar eleven och handledaren, släppet och analys. Det omfattar också gränsen: Körpasset stödjer övning. Det betygsätter inte ett prov, och det ersätter inte en trafikskola eller Transportstyrelsen.',
  };
});

export const sv: Copy = {
  htmlLang: 'sv',
  ogLocale: 'sv_SE',
  skip: 'Hoppa till innehållet',
  menu: 'Meny',
  close: 'Stäng',
  navLabel: 'Huvudmeny',
  footerNavLabel: 'Sidfot',
  breadcrumbLabel: 'Länkstig',
  newTab: 'öppnas i en ny flik',
  orgLabel: 'Org.nr',
  location: 'Stockholm, Sverige',
  privacyLabel: 'Integritet',
  homeName: 'Start',
  collaborate: 'Intresserad av att arbeta med Papa Bravo?',
  ctaLabel: 'Prata med Pontus',
  nav: [
    { path: '/consulting', label: 'Uppdrag' },
    { path: '/products', label: 'Produkter' },
    { path: '/about', label: 'Om' },
    { path: '/contact', label: 'Kontakt' },
  ],
  home: {
    title: 'Teknikledning som blir leverans | Papa Bravo',
    description:
      'Pontus Burman tar interim- och rådgivningsuppdrag inom teknik, produkt och transformation. Papa Bravo, Stockholm.',
    eyebrow: 'Interimledning · Teknik · Produkt · Transformation',
    h1: 'Teknikledning som blir leverans.',
    lede: 'Pontus Burman, grundare av Papa Bravo, tar interim- och rådgivningsuppdrag och stannar kvar genom leveransen.',
    meta: 'Baserad i Stockholm. Uppdrag i Sverige och internationellt.',
    explore: 'Se uppdragen',
    railLabel: 'Typiska uppdrag',
    rail: [
      'Interim CTO / CIO',
      'Tekniktransformation',
      'Produkt- och teknikledning',
      'Senior teknikrådgivning',
    ],
    situationsEyebrow: 'Situationer',
    situationsTitle: 'Anledningar att höra av sig',
    situationsIntro: 'Uppdraget är sällan en titel.',
    situationsLink: 'Se hur ett uppdrag går till',
    experienceEyebrow: 'Bakgrund',
    experienceTitle: 'Ett urval av erfarenheten',
    experienceIntro: 'Organisationer, och rollen då. Sammanhanget finns på om-sidan.',
    experienceLink: 'Läs om Pontus',
    buildingTitle: 'Bygger fortfarande',
    buildingIntro: 'My Star Day och Körpasset är i produktion. De är inte kundcase.',
    buildingLink: 'Se produkterna',
    personal:
      'Jag är Pontus Burman. Papa Bravo är bolaget. Jag tar interim- och rådgivningsuppdrag inom teknik, produkt och transformation, och jag bygger och driver fortfarande My Star Day och Körpasset.',
    aboutLink: 'Om Pontus',
    ctaTitle: 'Om det här stämmer, hör av dig.',
    ctaText: 'Några rader om läget och tidplanen räcker.',
  },
  consulting: {
    title: 'Interim CTO, CIO och transformationsledning | Papa Bravo',
    description:
      'Interim CTO, interim CIO, teknikchef som konsult och IT-transformation med Pontus Burman. Baserad i Stockholm.',
    eyebrow: 'Uppdrag',
    h1: 'Uppdrag med Pontus Burman.',
    lede: 'Papa Bravo är bolaget. Personen du arbetar med är Pontus. Formen är interim, en del av veckan, eller ett avgränsat rådgivningsuppdrag — det som passar problemet.',
    body: 'Baserad i Stockholm. Arbetet sker med team i Sverige och internationellt, på plats eller på distans. Det finns inget fast paket. Formen beror på problemet.',
    rolesEyebrow: 'Roller',
    rolesTitle: 'Typiska uppdrag',
    situationsEyebrow: 'Situationer',
    situationsTitle: 'Där en person utifrån är till nytta',
    situationsIntro:
      'Ofta har organisationen redan skickliga människor. Det som saknas är någon som kan sitta i både verksamhetssamtalet och leveranssamtalet, och säga vad som inte fungerar.',
    approachEyebrow: 'Arbetssätt',
    approachTitle: 'Så arbetar jag',
    ctaTitle: 'Beskriv läget',
    ctaText:
      'Vad som pågår, när det behöver röra sig, och vilken sorts ledning du söker. En kort notis räcker för att se om det passar.',
  },
  productsPage: {
    title: 'Produkter jag bygger | My Star Day och Körpasset | Papa Bravo',
    description:
      'My Star Day och Körpasset är produkter i drift, byggda och drivna av Papa Bravo. De är skälet till att uppdragen stannar nära leveransen.',
    eyebrow: 'Produkter',
    h1: 'Två produkter, båda i produktion.',
    lede: 'My Star Day och Körpasset är inte koncept, och de är inte kundarbete. Pontus ritar dem, släpper dem och håller dem igång.',
    body: 'Det är också därför ett uppdrag kan gå förbi en rekommendation. Samma person hanterar onboarding, appbutiker, betalningar och analys.',
    ctaTitle: 'De här produkterna tillhör Papa Bravo.',
    ctaText:
      'Konsultuppdragen är något annat. De är för din organisation. Om det är det du behöver, hör av dig till Pontus.',
  },
  about: {
    title: 'Pontus Burman, grundare av Papa Bravo',
    description:
      'Pontus Burman är grundare av Papa Bravo. Han är Engineering Manager på Avanza, och har lett teknik, produkt och transformation på organisationer som Getinge, Eniro Group, Unilabs, MedHelp, Trustly och Klarna. Stockholm.',
    eyebrow: 'Om',
    h1: 'Pontus Burman',
    lede: 'Grundare av Papa Bravo. Jag tar interim- och rådgivningsuppdrag inom teknik, produkt och transformation, och jag bygger fortfarande produkterna bolaget driver.',
    intro:
      'Baserad i Stockholm. Mer än tjugo år av det här, i bolag med mycket olika villkor — noterade koncerner och snabbare produktbolag.',
    experienceEyebrow: 'Erfarenhet',
    experienceTitle: 'Vad karriären har täckt',
    experienceParagraphs: [
      'Jag är Engineering Manager på Avanza, för två team, sedan december 2025. Dessförinnan ingår Program Manager på Euroclear, produkt- och projektledning på Getinge, CTO på Northfork, interim Group CTO på Eniro Group, Head of Platform på Trustly, IT Director, North på Unilabs, CIO på MedHelp och infrastrukturledning på Klarna. Tidigare uppdrag omfattar projekt- och linjeledning på Unibet.',
      'Före ledarrollerna var grunden teknisk: system, infrastruktur och konsultarbete från slutet av 1990-talet, sedan projekt- och personalledning. En ettårig utbildning i systemteknik ligger i början av det. Senare utbildning omfattar SAFe Product Owner / Product Manager, klar 2024.',
      'Titlarna ändras. Arbetet är att hålla teknikagendan och stanna nära leveransen.',
    ],
    closeTitle: 'Fortfarande nära arbetet',
    closeParagraphs: [
      'Råd som aldrig möter en backlog, en incident eller en användare stannar abstrakta. Jag bygger och driver fortfarande My Star Day och Körpasset, vid sidan av uppdragen. En rekommendation måste hålla mot arkitekturen, teamet, släppet och den kommersiella sidan av en produkt.',
      'Därför är uppdragen vidare än en tom CTO- eller CIO-stol. Transformation, produktriktning, hur en organisation levererar, och en AI-ambition som måste bli något någon kan driva.',
    ],
    careerEyebrow: 'Karriär',
    careerTitle: 'Utvald erfarenhet',
    careerNote:
      'Roller och år är hämtade från den tidigare publika Papa Bravo-sajten. Tidigare system- och konsultarbete, före Unibet, listas inte organisation för organisation.',
    companyTitle: 'Papa Bravo',
    companyParagraphs: [
      'Papa Bravo AB är bolaget. Arbetet är konsult- och rådgivningsuppdrag, och produkterna bolaget bygger och driver — My Star Day och Körpasset.',
      'Kunder arbetar med Pontus direkt.',
    ],
    linkedIn: 'Pontus Burman på LinkedIn',
    collabEyebrow: 'Samarbeten',
    collabTitle: 'Intresserad av att arbeta med Papa Bravo?',
    collabParagraphs: [
      'Papa Bravo har ingen rekrytering igång, och det finns ingen tjänst att söka. Det finns ett stående intresse av att träffa starka personer inom teknik, produkt och design — för en framtida roll, ett konsultsamarbete, eller för att bygga produkter tillsammans.',
    ],
    collabSubject: 'Arbeta med Papa Bravo',
  },
  contact: {
    title: 'Prata med Pontus | Papa Bravo',
    description:
      'Kontakta Pontus Burman på Papa Bravo om ett interim-, deltids- eller rådgivningsuppdrag inom teknik, produkt eller transformation. Stockholm.',
    eyebrow: 'Kontakt',
    h1: 'Prata med Pontus',
    lede: 'En kort notis räcker. Vad som pågår, när det behöver röra sig, och vilken sorts ledning du har i åtanke.',
    email: 'E-post',
    phone: 'Telefon',
    where: 'Var',
    messageEyebrow: 'Meddelande',
    messageTitle: 'Eller förbered ett mejl här',
  },
  privacy: {
    title: 'Integritet | Papa Bravo',
    description: `Hur Papa Bravo AB hanterar personuppgifter på ${site.url.replace('https://', '')}. Inga cookies för reklam eller analys används.`,
    eyebrow: 'Integritet',
    h1: 'Integritet',
    lede: `${site.legalName} ansvarar för den här webbplatsen. Sajten är byggd för att fungera utan spårning.`,
    notHeading: 'Vad sajten inte gör',
    notBody:
      'Det finns ingen reklam, ingen analysprodukt och ingen marknadsföringscookie. Meta Pixel, Google Analytics, Google Tag Manager och liknande verktyg laddas inte. Därför ber sajten dig inte att godkänna cookies.',
    contactHeading: 'Om du hör av dig',
    contactBody: `E-post, telefon och LinkedIn är vanliga kontaktvägar. Formuläret på kontaktsidan skickar inte ditt meddelande till en server som Papa Bravo driver. Det öppnar din egen e-postapp, adresserad till ${site.email}, så att du kan skicka det själv. Det du skriver hanteras sedan som e-post mellan dig och Papa Bravo.`,
    contactUse:
      'Den korrespondensen används för att svara och, om det blir ett uppdrag, för att utföra arbetet du frågade om. Den används inte till ett nyhetsbrev, och den säljs inte.',
    logsHeading: 'Serverloggar',
    logsBody:
      'När sajten är publicerad kan webbservern behålla vanliga tekniska loggar, som IP-adress, tid och begärd sida, för säkerhet och drift. Hur länge loggarna sparas beror på driftmiljön och bör bekräftas inför drift.',
    whoHeading: 'Vem du kontaktar',
    disclaimer: `Den här sidan beskriver hur webbplatsen beter sig. Den är inte en fullständig juridisk integritetspolicy och bör granskas innan sajten ersätter ${site.url.replace('https://', '')} i produktion.`,
  },
  notFound: {
    title: 'Sidan finns inte | Papa Bravo',
    description: 'Den här sidan finns inte på Papa Bravos webbplats.',
    eyebrow: '404',
    h1: 'Den här sidan finns inte på sajten.',
    lede: 'Adressen kan vara gammal, eller helt enkelt felskriven.',
    home: 'Tillbaka till starten',
    explore: 'Se uppdragen',
  },
  situations: [
    {
      title: 'Du behöver en interim CTO eller CIO.',
      text: 'Någon måste hålla teknikagendan genom ett skifte av personer, ägare eller riktning, medan en permanent tillsättning tar den tid den tar.',
    },
    {
      title: 'Tekniken och verksamheten har glidit isär.',
      text: 'Roadmap, budget och det organisationen behöver är inte längre samma samtal.',
    },
    {
      title: 'Leveransen är upptagen, och ändå sen.',
      text: 'Folk arbetar. Releaser, beroenden och beslut landar inte när verksamheten behöver dem.',
    },
    {
      title: 'Produkt och teknik bygger förbi varandra.',
      text: 'Arbete pågår. Det är mindre tydligt vem som avgör vad som är bra, eller vilket resultat teamen delar.',
    },
    {
      title: 'En transformation behöver en ägare.',
      text: 'Avsikten är överenskommen. Arbetet över teknik, organisation och genomförande håller inte ihop.',
    },
    {
      title: 'Bolaget har vuxit ur hur tekniken styrs.',
      text: 'Det gamla sättet att besluta, teamens form, leverantörerna, arkitekturen — en del av det passar inte längre.',
    },
    {
      title: 'Ett stort teknikbeslut behöver en andra blick.',
      text: 'Arkitektur, en plattform, sourcing eller en leverantör. Från någon som inte försvarar den nuvarande planen.',
    },
    {
      title: 'En AI-ambition behöver en praktisk plan.',
      text: 'Organisationen vill använda AI. Det är mindre tydligt vad som ska byggas, vad som ska lämnas, och vem som skulle driva det.',
    },
    {
      title: 'Ett program måste gå över verksamhet, produkt och teknik.',
      text: 'Verksamhet, produkt och teknik är fortfarande separata samtal, inte en plan.',
    },
    {
      title: 'Berättelsen till styrelsen och leveransplanen säger emot varandra.',
      text: 'Det som presenteras för styrelsen och det leveransplanen kan göra är inte samma sak.',
    },
  ],
  assignments: [
    {
      title: 'Interim CTO',
      text: 'Teknikledning under en avgränsad tid: förändring, tillväxt, ett glapp mellan ledare, eller en leveransfas som behöver en senior ägare.',
    },
    {
      title: 'Interim CIO',
      text: 'När uppdraget är vidare än produktutveckling: drift, leverantörer, teknikorganisationen och agendan med resten av bolaget.',
    },
    {
      title: 'Fractional CTO',
      text: 'Teknikchef som konsult under en del av veckan, när en heltidschef inte är rätt form för bolaget.',
    },
    {
      title: 'Teknikrådgivare',
      text: 'En andra blick på strategi, arkitektur, organisation, sourcing, AI och val som är dyra att göra ogjorda.',
    },
    {
      title: 'Transformationsledare',
      text: 'När en IT-transformation finns på papper, och teknik, organisation och genomförande ännu inte är samma arbete.',
    },
    {
      title: 'Produkt- och teknikledning',
      text: 'En gemensam riktning för produkt, teknik och verksamhet: vad som ska byggas, vad som ska stoppas, och hur leveransen ska fungera.',
    },
    {
      title: 'Program- och leveransledning',
      text: 'Hålla ihop ett kritiskt program över verksamhet, produkt och teknik tills det faktiskt rör sig.',
    },
  ],
  ways: [
    {
      title: 'De första veckorna är till för att ta reda på',
      text: 'Hur beslut fattas, var leveransen faktiskt fastnar, och vad människor är trötta på att förklara. En målbild för organisationen är inte öppningsdraget.',
    },
    {
      title: 'Ett teknikval måste svara på en verksamhetsfråga',
      text: 'Plattformar, team och kostnader ska gå att läsa mot det bolaget försöker göra i år, inte bara mot en arkitekturprincip.',
    },
    {
      title: 'Säg vad som inte ska göras',
      text: 'En full roadmap är en vanlig orsak till att leveransen känns slumpartad. Prioriteringar omfattar arbetet som upphör.',
    },
    {
      title: 'Använd dem som redan finns',
      text: 'Målet är en starkare organisation, inte en andra organisation vid sidan av. Befintliga team stannar i arbetet.',
    },
    {
      title: 'Fatta beslutet som håller arbetet uppe',
      text: 'Uppdrag stannar när det viktiga beslutet skjuts till nästa möte. En del av rollen är att fatta det.',
    },
    {
      title: 'Lämna något som fungerar utan dig',
      text: 'En riktning, ett sätt att besluta, och människor som kan bära båda.',
    },
  ],
  experience: experience.map((item) => ({
    ...item,
    period: item.period === 'Dec 2025–' ? 'dec 2025–' : item.period,
    summary: experienceSummary[`${item.organisation}|${item.role}`] ?? item.summary,
    homeSummary: homeSummary[`${item.organisation}|${item.role}`] ?? item.homeSummary,
  })),
  products: swedishProducts,
  productLabels: {
    live: 'Produkt i drift',
    also: 'även',
    alsoSentence: 'Även',
    problem: 'Problemet',
    product: 'Produkten',
    audience: 'Vem den är till för',
    status: 'Var den står',
  },
  form: {
    name: 'Namn',
    company: 'Företag',
    optional: '(valfritt)',
    email: 'E-post',
    message: 'Vad kan jag hjälpa till med?',
    submit: 'Skicka meddelande',
    note: 'När du skickar öppnas din e-postapp med meddelandet klart. Ingenting lagras på den här webbplatsen. Du kan också skriva direkt till',
    subjectLead: 'Uppdragsförfrågan från',
    status: `Din e-postapp bör öppnas med meddelandet klart att skicka. Om den inte gör det, skriv direkt till ${site.email}.`,
    labelName: 'Namn',
    labelCompany: 'Företag',
    labelEmail: 'E-post',
  },
  schema: {
    jobTitle: 'Grundare',
    knowsAbout: [
      'Teknikledning',
      'Interim CTO',
      'Interim CIO',
      'Digital transformation',
      'Produktutveckling',
      'Leveransledning',
    ],
    ogImageAlt: 'Papa Bravo — teknikledning som blir leverans.',
  },
};
