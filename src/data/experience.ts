export type ExperienceItem = {
  organisation: string;
  role: string;
  period: string;
  summary: string;
  /** Shown in the short list on the homepage. */
  featured: boolean;
};

/**
 * Roles and years follow the public Papa Bravo site (papabravo.se), checked
 * October 2026. Summaries stay inside what that page actually states.
 * Getinge is published there as 2023–present. The end is left open here
 * rather than marked as a current employment. See docs/sources.md.
 */
export const experience: ExperienceItem[] = [
  {
    organisation: 'Getinge',
    role: 'Product and project manager',
    period: '2023–',
    summary:
      'Product and project leadership for service and support of new digital services in point-of-care devices, including preparation of processes, organisation, tools and training.',
    featured: true,
  },
  {
    organisation: 'Northfork',
    role: 'CTO',
    period: '2022',
    summary: 'CTO, also working as Scrum Master and Product Owner.',
    featured: true,
  },
  {
    organisation: 'Eniro Group',
    role: 'Interim Group CTO',
    period: '2021–2022',
    summary:
      'Interim Group CTO for Eniro Group, a listed company, with responsibility for existing systems and what should come next, including the shape of the IT organisation across countries.',
    featured: true,
  },
  {
    organisation: 'Trustly',
    role: 'Head of Platform',
    period: '2020–2021',
    summary:
      'Head of Platform, responsible for infrastructure and automation teams — the platform other teams build and operate on — including how those teams worked and hired.',
    featured: true,
  },
  {
    organisation: 'Unilabs',
    role: 'IT Director, North',
    period: '2017–2020',
    summary:
      'IT Director for the northern region during a wider move toward digitalisation, with responsibility for regional direction, the technology organisation and collaboration with the business.',
    featured: true,
  },
  {
    organisation: 'MedHelp',
    role: 'CIO',
    period: '2015–2017',
    summary:
      'CIO, responsible for IT strategy and for how technology supported the company. Introduced agile ways of working between the business and IT, and led work on the main product platform.',
    featured: true,
  },
  {
    organisation: 'Klarna',
    role: 'Manager, Cloud and Middleware',
    period: '2014–2015',
    summary:
      'Leadership for cloud and middleware, so development teams had a platform to build and release on.',
    featured: true,
  },
  {
    organisation: 'Klarna',
    role: 'Head of Infrastructure',
    period: '2014',
    summary:
      'Head of Infrastructure. The scope covered cloud, databases, servers and related operations.',
    featured: true,
  },
  {
    organisation: 'Unibet',
    role: 'Project manager',
    period: '2013–2014',
    summary:
      'Project management in the gaming industry, including IT projects such as customer-support systems.',
    featured: false,
  },
  {
    organisation: 'Unibet',
    role: 'Line manager',
    period: '2012–2013',
    summary: 'Line management in the gaming industry, including international teams.',
    featured: false,
  },
];

export const featuredExperience = experience.filter((item) => item.featured);
