export type ProductLink = {
  label: string;
  href: string;
};

export type Product = {
  name: string;
  aka?: string;
  line: string;
  summary: string;
  problem: string;
  idea: string;
  audience: string;
  status: string;
  practice: string;
  links: ProductLink[];
  specimen?: string;
  specimenNote?: string;
  figure?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
};

export const products: Product[] = [
  {
    name: 'My Star Day',
    aka: 'Min Stjärndag',
    line: 'A day a child can follow without being told each step.',
    summary:
      'Family routines, one step at a time. Parents set the day. The child sees what, where, who, and what happens next.',
    problem:
      'Daily life in many families depends on an adult repeating the same steps. Children who need a clearer picture of now, next and done — including families where neurodivergence is part of everyday life — get stuck between reminders.',
    idea: 'A visual schedule the child can follow, with progress that stays visible. Parents build the routine. The child sees one step at a time and collects stars toward rewards the family chooses. Missed steps are not treated as failure.',
    audience:
      'Families who want calmer routines and more independence in daily life, including families who use visual support. The Swedish service is Min Stjärndag. An English version is published for other markets.',
    status:
      'A live product: web, iPhone and Android, on the App Store and Google Play, with onboarding and subscriptions in the stores. It is in active development.',
    practice:
      'Getting it out has meant the ordinary work of a shipped product: the interface, the build, analytics, the app stores, payments, onboarding, and both a Swedish and an English version.',
    links: [
      { label: 'mystarday.app', href: 'https://mystarday.app' },
      { label: 'mystarday.se', href: 'https://mystarday.se' },
      { label: 'App Store', href: 'https://apps.apple.com/app/id6774493098' },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=se.mystarday.app',
      },
    ],
    figure: {
      src: '/products/mystarday-activity.webp',
      alt: 'My Star Day activity screen listing where the task happens, who does it, how long it takes, and what happens next.',
      width: 554,
      height: 650,
      caption: 'Where, who, how long, and what happens next. From the live app.',
    },
  },
  {
    name: 'Körpasset',
    line: 'A shared log of private driving practice.',
    summary:
      'For learner drivers and the supervisors who sit beside them. What was trained, what was hard, and what the next pass should focus on.',
    specimen: 'Övning idag.\nFrihet imorgon.',
    specimenNote: 'The line on korpasset.se',
    problem:
      'Private driving practice often runs for a long time, with more than one supervisor. It is easy to lose track of what has been trained, what is still difficult, and what the next session should focus on.',
    idea: 'The learner and the supervisor plan the session, log how it went and keep a shared picture of progress toward the licence. Several supervisors can follow the same history.',
    audience:
      'Learner drivers and the approved supervisors who practise with them in Sweden — parents, partners or others — whether they are just starting or have already been driving for months.',
    status:
      'A live product on the web and on the App Store for iPhone. Android distribution is with Google for review. The beta is free. Payments are not taken on the website.',
    practice:
      'The build covers the learner and the supervisor, the release, and analytics. It also covers the limit: Körpasset supports practice. It does not grade an exam, and it does not replace a driving school or Transportstyrelsen.',
    links: [
      { label: 'korpasset.se', href: 'https://korpasset.se' },
      { label: 'App Store', href: 'https://apps.apple.com/se/app/korpasset/id6814100094' },
    ],
  },
];
