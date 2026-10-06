import type { Assignment } from './data/assignments';
import type { ExperienceItem } from './data/experience';
import type { Product } from './data/products';
import type { Situation } from './data/situations';
import { normalizePath } from './data/site';
import { en } from './i18n/en';
import { sv } from './i18n/sv';

export const locales = ['en', 'sv'] as const;
export type Locale = (typeof locales)[number];

export interface Copy {
  htmlLang: Locale;
  ogLocale: 'en_GB' | 'sv_SE';
  skip: string;
  menu: string;
  close: string;
  navLabel: string;
  footerNavLabel: string;
  breadcrumbLabel: string;
  newTab: string;
  orgLabel: string;
  location: string;
  privacyLabel: string;
  homeName: string;
  collaborate: string;
  ctaLabel: string;
  nav: { path: string; label: string }[];
  home: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    lede: string;
    meta: string;
    explore: string;
    railLabel: string;
    rail: string[];
    situationsEyebrow: string;
    situationsTitle: string;
    situationsIntro: string;
    situationsLink: string;
    experienceEyebrow: string;
    experienceTitle: string;
    experienceIntro: string;
    experienceLink: string;
    buildingTitle: string;
    buildingIntro: string;
    buildingLink: string;
    personal: string;
    aboutLink: string;
    ctaTitle: string;
    ctaText: string;
  };
  consulting: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    lede: string;
    body: string;
    rolesEyebrow: string;
    rolesTitle: string;
    situationsEyebrow: string;
    situationsTitle: string;
    situationsIntro: string;
    approachEyebrow: string;
    approachTitle: string;
    ctaTitle: string;
    ctaText: string;
  };
  productsPage: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    lede: string;
    body: string;
    ctaTitle: string;
    ctaText: string;
  };
  about: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    lede: string;
    intro: string;
    experienceEyebrow: string;
    experienceTitle: string;
    experienceParagraphs: string[];
    closeTitle: string;
    closeParagraphs: string[];
    careerEyebrow: string;
    careerTitle: string;
    careerNote: string;
    companyTitle: string;
    companyParagraphs: string[];
    linkedIn: string;
    collabEyebrow: string;
    collabTitle: string;
    collabParagraphs: string[];
    collabSubject: string;
  };
  contact: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    lede: string;
    email: string;
    phone: string;
    where: string;
    messageEyebrow: string;
    messageTitle: string;
  };
  privacy: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    lede: string;
    notHeading: string;
    notBody: string;
    contactHeading: string;
    contactBody: string;
    contactUse: string;
    logsHeading: string;
    logsBody: string;
    whoHeading: string;
    disclaimer: string;
  };
  notFound: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    lede: string;
    home: string;
    explore: string;
  };
  situations: Situation[];
  assignments: Assignment[];
  ways: Assignment[];
  experience: ExperienceItem[];
  products: Product[];
  productLabels: {
    live: string;
    also: string;
    alsoSentence: string;
    problem: string;
    product: string;
    audience: string;
    status: string;
  };
  form: {
    name: string;
    company: string;
    optional: string;
    email: string;
    message: string;
    submit: string;
    note: string;
    subjectLead: string;
    status: string;
    labelName: string;
    labelCompany: string;
    labelEmail: string;
  };
  schema: {
    jobTitle: string;
    knowsAbout: string[];
    ogImageAlt: string;
  };
}

const copies: Record<Locale, Copy> = { en, sv };

export function getCopy(locale: Locale): Copy {
  return copies[locale];
}

export function localeFromPath(pathname: string): Locale {
  const path = normalizePath(pathname);
  if (path === '/sv' || path.startsWith('/sv/')) return 'sv';
  return 'en';
}

export function barePath(pathname: string): string {
  const path = normalizePath(pathname);
  if (path === '/sv') return '/';
  if (path.startsWith('/sv/')) return path.slice(3) || '/';
  return path;
}

export function localizePath(locale: Locale, pathname: string): string {
  const bare = barePath(pathname);
  if (locale === 'en') return bare;
  if (bare === '/') return '/sv';
  return `/sv${bare}`;
}
