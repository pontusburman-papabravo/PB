export type ExperienceItem = {
  organisation: string;
  role: string;
  /** Shown only for the current role. Older assignments are listed without years. */
  period?: string;
  summary?: string;
  /** Shown in the short list on the homepage. */
  featured: boolean;
};

/**
 * Roles follow the public Papa Bravo site (papabravo.se), checked October 2026,
 * plus what Pontus has confirmed since. Years for past roles are kept in
 * docs/sources.md and are not shown. See that file.
 */
export const experience: ExperienceItem[] = [
  {
    organisation: 'Avanza',
    role: 'Engineering Manager',
    period: '2025–',
    summary: 'Engineering Manager for two teams, from December 2025.',
    featured: true,
  },
  {
    organisation: 'Euroclear',
    role: 'Program Manager',
    featured: true,
  },
  {
    organisation: 'Getinge',
    role: 'Product and project manager',
    summary:
      'Product and project leadership for service and support of new digital services in point-of-care devices, including preparation of processes, organisation, tools and training.',
    featured: true,
  },
  {
    organisation: 'Northfork',
    role: 'CTO',
    summary: 'CTO, also working as Scrum Master and Product Owner.',
    featured: true,
  },
  {
    organisation: 'Eniro Group',
    role: 'Interim Group CTO',
    summary:
      'Interim Group CTO for Eniro Group, a listed company, with responsibility for existing systems and what should come next, including the shape of the IT organisation across countries.',
    featured: true,
  },
  {
    organisation: 'Trustly',
    role: 'Head of Platform',
    summary:
      'Head of Platform, responsible for infrastructure and automation teams — the platform other teams build and operate on — including how those teams worked and hired.',
    featured: true,
  },
  {
    organisation: 'Unilabs',
    role: 'IT Director, North',
    summary:
      'IT Director for the northern region during a wider move toward digitalisation, with responsibility for regional direction, the technology organisation and collaboration with the business.',
    featured: true,
  },
  {
    organisation: 'MedHelp',
    role: 'CIO',
    summary:
      'CIO, responsible for IT strategy and for how technology supported the company. Introduced agile ways of working between the business and IT, and led work on the main product platform.',
    featured: true,
  },
  {
    organisation: 'Klarna',
    role: 'Manager, Cloud and Middleware',
    summary:
      'Leadership for cloud and middleware, so development teams had a platform to build and release on.',
    featured: true,
  },
  {
    organisation: 'Klarna',
    role: 'Head of Infrastructure',
    summary:
      'Head of Infrastructure. The scope covered cloud, databases, servers and related operations.',
    featured: true,
  },
  {
    organisation: 'Unibet',
    role: 'Project manager',
    summary:
      'Project management in the gaming industry, including IT projects such as customer-support systems.',
    featured: false,
  },
  {
    organisation: 'Unibet',
    role: 'Line manager',
    summary: 'Line management in the gaming industry, including international teams.',
    featured: false,
  },
];

export const featuredExperience = experience.filter((item) => item.featured);
