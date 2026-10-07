import { canonicalUrl, site } from '../data/site';
import { getCopy, localizePath, type Locale } from '../i18n';
import './analytics';

export type Crumb = { name: string; path: string };

const organizationId = `${site.url}/#organization`;
const personId = `${site.url}/#pontus`;
const websiteId = `${site.url}/#website`;

export function structuredData(locale: Locale, crumbs?: Crumb[]) {
  const copy = getCopy(locale);
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
      jobTitle: copy.schema.jobTitle,
      url: canonicalUrl(localizePath(locale, '/about')),
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
      knowsAbout: copy.schema.knowsAbout,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: site.legalName,
      url: site.url,
      inLanguage: locale,
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
        item: canonicalUrl(crumb.path),
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
