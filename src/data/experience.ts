export type ExperienceItem = {
  organisation: string;
  role: string;
  /** Shown only for the current role. Older assignments are listed without years. */
  period?: string;
  /** Longer note on the about page. */
  summary?: string;
  /**
   * One short line on the homepage. Only where the about page already states
   * a responsibility. Euroclear has no homepage line: the role title is the
   * public fact, and the longer note stays on the about page.
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
    summary: 'Engineering Manager for two development teams, from December 2025.',
    homeSummary: 'Responsible for two development teams.',
    featured: true,
  },
  {
    organisation: 'Euroclear',
    role: 'Program Manager',
    summary: 'Program and transformation manager.',
    featured: true,
  },
  {
    organisation: 'Getinge',
    role: 'Product and project manager',
    summary:
      'Product and project manager for service and support in Integrated Therapy Solutions, working globally. Adapted the services as the organisation moved from point-of-care devices to combined hardware and software: pre-studies, new processes, an organisation proposal, training and tools. Getinge works according to SAFe.',
    homeSummary: 'Service and support, from point-of-care devices to hardware and software.',
    featured: true,
  },
  {
    organisation: 'Northfork',
    role: 'CTO',
    summary:
      'CTO. Prepared the IT department to scale, put basic processes in place with the business and the developers, and stayed with the product until it was in production. Developers in China, Sri Lanka, Ukraine and Sweden. Also Scrum Master and Product Owner.',
    homeSummary: 'Prepared the IT department to scale. Also Scrum Master and Product Owner.',
    featured: true,
  },
  {
    organisation: 'Eniro Group',
    role: 'Interim Group CTO',
    summary:
      'Interim Group CTO for Eniro Group, a listed company, with the business in Sweden, Finland, Denmark and Norway, for both B2B and B2C. Member of the management team. Responsible for existing systems and what should come next, including strategy presented to the board, and a new IT organisation across countries with employees, external staff and outsourcing partners.',
    homeSummary:
      'Existing systems, what should come next, and the shape of the IT organisation across countries.',
    featured: true,
  },
  {
    organisation: 'Trustly',
    role: 'Head of Platform',
    summary:
      'Head of Platform for the Infrastructure and Automation teams. They build infrastructure on premises and in the cloud, and the tools and automation the rest of the organisation uses. The role covered day-to-day operations, recruitment and new ways of working.',
    homeSummary: 'The infrastructure and automation teams other teams build and operate on.',
    featured: true,
  },
  {
    organisation: 'Unilabs',
    role: 'IT Director, North',
    summary:
      'IT Director for Region North (Sweden, Norway, Denmark, Finland and the UK), in a European company of about 12,000 employees in three regions, during a wider move toward digitalisation. With the team, set the roadmap and strategy, formed one IT organisation for the region, and was responsible for the regional IT budget. Coached managers and project managers, and was product owner for common IT systems.',
    homeSummary: 'Regional direction, one IT organisation, and the regional IT budget.',
    featured: true,
  },
  {
    organisation: 'MedHelp',
    role: 'CIO',
    summary:
      'CIO, reporting to the CEO and part of the management team\'s strategic decisions. The department was spread across the Nordic countries. Owned the IT strategy, introduced agile methods for the business and IT, and led a new platform and user experience for the main product, with funding from the CEO and the owners.',
    homeSummary: 'IT strategy, the main product platform, and how the business and IT worked together.',
    featured: true,
  },
  {
    organisation: 'Klarna',
    role: 'Manager, Cloud and Middleware',
    summary:
      'Line manager for four teams: cloud (an internal cloud and AWS), database engineers, Windows and middleware, so development teams had a platform to build and release on.',
    homeSummary: 'Cloud, databases, Windows and middleware, so development teams had a platform to build on.',
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
