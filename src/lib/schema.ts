import { site } from '../data/site';
import './analytics';

export type Crumb = { name: string; path: string };

const organizationId = `${site.url}/#organization`;
const personId = `${site.url}/#pontus`;
const websiteId = `${site.url}/#website`;

export function structuredData(crumbs?: Crumb[]) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: site.legalName,
      legalName: site.legalName,
      url: site.url,
      taxID: site.orgNumber,
      founder: { '@id': personId },
      email: site.email,
      telephone: site.phoneTel,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Stockholm',
        addressCountry: 'SE',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Sweden',
      },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Pontus Burman',
      jobTitle: 'Founder',
      url: `${site.url}/about`,
      email: site.email,
      telephone: site.phoneTel,
      worksFor: { '@id': organizationId },
      sameAs: [site.linkedIn],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Stockholm',
        addressCountry: 'SE',
      },
      knowsLanguage: ['sv', 'en'],
      knowsAbout: [
        'Technology leadership',
        'Interim CTO',
        'Interim CIO',
        'Digital transformation',
        'Product development',
        'Engineering leadership',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: site.legalName,
      url: site.url,
      inLanguage: 'en',
      publisher: { '@id': organizationId },
    },
  ];

  if (crumbs && crumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.path === '/' ? `${site.url}/` : `${site.url}${crumb.path}`,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
