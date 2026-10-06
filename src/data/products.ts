export type ProductLink = {
  label: string;
  href: string;
};

export type Product = {
  name: string;
  aka?: string;
  summary: string;
  problem: string;
  idea: string;
  audience: string;
  status: string;
  practice: string;
  links: ProductLink[];
  image?: {
    src: string;
    alt: string;
    kind: 'screenshot' | 'mark';
  };
};

export const products: Product[] = [
  {
    name: 'My Star Day',
    aka: 'Min Stjärndag',
    summary: 'Family routines, structure and motivation.',
    problem:
      'Daily life in many families depends on an adult repeating the same steps. Children who need a clearer picture of now, next and done — including families where neurodivergence is part of everyday life — get stuck between reminders.',
    idea: 'A visual schedule the child can follow, with progress that stays visible. Parents build the routine. The child sees one step at a time and collects stars toward rewards the family chooses. Missed steps are not treated as failure.',
    audience:
      'Families who want calmer routines and more independence in daily life, including families who use visual support. The Swedish service is Min Stjärndag. An English version is published for other markets.',
    status:
      'A live product: web, iPhone and Android, on the App Store and Google Play, with onboarding and subscriptions in the stores. It is in active development.',
    practice:
      'Taking it to market has meant product discovery, interface design, development, analytics, app-store distribution, payments, onboarding and publishing in more than one language and market.',
    links: [
      { label: 'mystarday.app', href: 'https://mystarday.app' },
      { label: 'mystarday.se', href: 'https://mystarday.se' },
      { label: 'App Store', href: 'https://apps.apple.com/app/id6774493098' },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=se.mystarday.app',
      },
    ],
  },
  {
    name: 'Körpasset',
    summary: 'A digital product for structured private driving practice.',
    problem:
      'Private driving practice often runs for a long time, with more than one supervisor. It is easy to lose track of what has been trained, what is still difficult, and what the next session should focus on.',
    idea: 'The learner and the supervisor plan the session, log how it went and keep a shared picture of progress toward the licence. Several supervisors can follow the same history. It supports practice. It does not grade an exam or replace a driving school or the Swedish Transport Agency.',
    audience:
      'Learner drivers and the approved supervisors who practise with them in Sweden — parents, partners or others — whether they are just starting or have already been driving for months.',
    status:
      'A live product on the web and on the App Store for iPhone. Android distribution is with Google for review. The beta is free. Payments are not taken on the website.',
    practice:
      'The work spans the same chain as any shipped product: the problem, the flows for learner and supervisor, development, release, analytics and the operations of a real service — including the limits of what the product should not claim.',
    links: [
      { label: 'korpasset.se', href: 'https://korpasset.se' },
      { label: 'App Store', href: 'https://apps.apple.com/se/app/korpasset/id6814100094' },
    ],
  },
];
