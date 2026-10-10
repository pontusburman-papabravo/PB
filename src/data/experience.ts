export type ExperienceItem = {
  organisation: string;
  role: string;
  /** Shown only for the current role. Older assignments are listed without years. */
  period?: string;
  /** Longer note on the about page. */
  summary?: string;
  /**
   * One short line on the homepage. Only where the about page already states
   * a responsibility. Euroclear has no such line: the source is the title only.
   */
  homeSummary?: string;
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
    period: 'Dec 2025–',
    summary: 'Engineering Manager for two teams, from December 2025.',
    homeSummary: 'Responsible for two engineering teams.',
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
    homeSummary:
      'Product and project leadership for service and support of new digital services in point-of-care devices.',
    featured: true,
  },
  {
    organisation: 'Northfork',
    role: 'CTO',
    summary: 'CTO, also working as Scrum Master and Product Owner.',
    homeSummary: 'Also Scrum Master and Product Owner.',
    featured: true,
  },
  {
    organisation: 'Eniro Group',
    role: 'Interim Group CTO',
    summary:
      'Interim Group CTO for Eniro Group, a listed company, with responsibility for existing systems and what should come next, including the shape of the IT organisation across countries.',
    homeSummary:
      'Existing systems, what should come next, and the shape of the IT organisation across countries.',
    featured: true,
  },
  {
    organisation: 'Trustly',
    role: 'Head of Platform',
    summary:
      'Head of Platform, responsible for infrastructure and automation teams — the platform other teams build and operate on — including how those teams worked and hired.',
    homeSummary: 'The infrastructure and automation teams other teams build and operate on.',
    featured: true,
  },
  {
    organisation: 'Unilabs',
    role: 'IT Director, North',
    summary:
      'IT Director for the northern region during a wider move toward digitalisation, with responsibility for regional direction, the technology organisation and collaboration with the business.',
    homeSummary: 'Regional direction, the technology organisation and collaboration with the business.',
    featured: true,
  },
  {
    organisation: 'MedHelp',
    role: 'CIO',
    summary:
      'CIO, responsible for IT strategy and for how technology supported the company. Introduced agile ways of working between the business and IT, and led work on the main product platform.',
    homeSummary: 'IT strategy, the main product platform, and how the business and IT worked together.',
    featured: true,
  },
  {
    organisation: 'Klarna',
    role: 'Manager, Cloud and Middleware',
    summary:
      'Leadership for cloud and middleware, so development teams had a platform to build and release on.',
    homeSummary: 'Cloud and middleware, so development teams had a platform to build and release on.',
    featured: true,
  },
  {
    organisation: 'Klarna',
    role: 'Head of Infrastructure',
    summary:
      'Head of Infrastructure. The scope covered cloud, databases, servers and related operations.',
    homeSummary: 'Cloud, databases, servers and the operations around them.',
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
