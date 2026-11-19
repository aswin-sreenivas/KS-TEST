/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Centralized SEO Metadata, JSON-LD Schema & Social Card Manager
 */

import { AppRoute, PageRoute, getRoutePath, isValidPageRoute } from '../types/app';
import { COMPANY_INFO } from '../data/company';
import { IS_STAGING, OFFICIAL_SITE_ORIGIN } from '../config/site';

export { IS_STAGING, OFFICIAL_SITE_ORIGIN };

export interface PageSeoConfig {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  breadcrumbName: string;
  type: string;
}

export const PAGE_SEO: Record<AppRoute, PageSeoConfig> = {
  home: {
    title: 'K S Associates | Construction Company in Feroke, Kozhikode – Survey & 3D Design',
    description:
      'K S Associates is a construction company in Feroke, Calicut offering building construction services, RCC structural works, land surveying, and 3D building design across Kerala.',
    image: '/og-image.jpg',
    imageAlt: 'K S Associates – Construction Company in Feroke, Calicut & Kerala',
    breadcrumbName: 'Home',
    type: 'website',
  },
  about: {
    title: 'About K S Associates | Building Contractors in Calicut & Feroke, Kerala',
    description:
      'About K S Associates, civil engineering and building contractors in Calicut and Feroke. Verified RCC subcontract experience at Govt. ITI Tuneri, land surveying, and 3D design.',
    image: '/og-image.jpg',
    imageAlt: 'About K S Associates – Engineering Construction & Surveying in Feroke',
    breadcrumbName: 'About',
    type: 'website',
  },
  services: {
    title: 'Building Construction, Land Surveying & 3D Design Services in Kerala | K S Associates',
    description:
      'Integrated building construction services, RCC structural contracting, precision land surveying services, and 3D building design in Feroke, Kozhikode, and Calicut.',
    image: '/og-construction.jpg',
    imageAlt: 'K S Associates – Construction, Land Surveying & 3D Design Services',
    breadcrumbName: 'Services',
    type: 'website',
  },
  projects: {
    title: 'Construction Projects & 3D Building Design Portfolio | K S Associates Kozhikode',
    description:
      'Explore residential, villa, apartment, and commercial building construction projects and architectural 3D visualizations by K S Associates in Feroke, Kozhikode, and Kerala.',
    image: '/og-projects.jpg',
    imageAlt: 'K S Associates – Architectural 3D Projects & CAD Plans Portfolio',
    breadcrumbName: 'Projects',
    type: 'website',
  },
  contact: {
    title: 'Contact K S Associates | Construction Contractors in Feroke, Calicut (+91 92074 46666)',
    description:
      'Contact K S Associates at Farook Hospital Complex, Feroke, Calicut – 673631, Kerala. Call +91 92074 46666 or email ksassociatesferoke@gmail.com for construction, survey & 3D design.',
    image: '/og-surveying.jpg',
    imageAlt: 'Contact K S Associates Engineering Office in Feroke, Calicut',
    breadcrumbName: 'Contact',
    type: 'website',
  },
  'not-found': {
    title: 'Page Not Found (404) | K S Associates',
    description:
      'The requested page could not be found on K S Associates – Engineering Construction, Land Surveying & 3D Design in Feroke, Calicut.',
    image: '/og-image.jpg',
    imageAlt: 'K S Associates – Engineering Construction & Surveying',
    breadcrumbName: 'Page Not Found',
    type: 'website',
  },
};

export function getRobotsDirective(route: AppRoute): string {
  if (IS_STAGING || route === 'not-found') {
    return 'noindex, nofollow';
  }
  return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
}

export function getPageSeoConfig(pageKey: string): {
  route: AppRoute;
  config: PageSeoConfig;
  canonicalUrl: string;
  absoluteImageUrl: string;
  robotsContent: string;
} {
  const route: AppRoute =
    pageKey === 'not-found'
      ? 'not-found'
      : isValidPageRoute(pageKey)
        ? pageKey
        : 'home';

  const config = PAGE_SEO[route];
  const canonicalPath = route === 'not-found' ? '/' : getRoutePath(route as PageRoute);
  const canonicalUrl = `${OFFICIAL_SITE_ORIGIN}${canonicalPath}`;
  const absoluteImageUrl =
    config.image.startsWith('http') || config.image.startsWith('data:')
      ? config.image
      : `${OFFICIAL_SITE_ORIGIN}${config.image.startsWith('/') ? config.image : `/${config.image}`}`;

  return {
    route,
    config,
    canonicalUrl,
    absoluteImageUrl,
    robotsContent: getRobotsDirective(route),
  };
}

export function buildPageJsonLd(pageKey: AppRoute): Record<string, unknown> {
  const { config, canonicalUrl } = getPageSeoConfig(pageKey);
  const orgId = `${OFFICIAL_SITE_ORIGIN}/#organization`;
  const websiteId = `${OFFICIAL_SITE_ORIGIN}/#website`;

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${OFFICIAL_SITE_ORIGIN}/`,
    },
  ];

  if (pageKey !== 'home' && pageKey !== 'not-found') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: config.breadcrumbName,
      item: canonicalUrl,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['GeneralContractor', 'LocalBusiness', 'Organization'],
        '@id': orgId,
        name: COMPANY_INFO.name,
        legalName: COMPANY_INFO.fullName,
        alternateName: [
          'KS Associates',
          'K.S. Associates',
          'K S Associates Engineering Construction & Surveying',
        ],
        slogan: COMPANY_INFO.tagline,
        url: `${OFFICIAL_SITE_ORIGIN}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${OFFICIAL_SITE_ORIGIN}/assets/aistudio/Dark_Olive_Compass_Engineering_Logo_4658eaa5.png`,
        },
        image: [
          `${OFFICIAL_SITE_ORIGIN}/og-image.jpg`,
          `${OFFICIAL_SITE_ORIGIN}/og-construction.jpg`,
          `${OFFICIAL_SITE_ORIGIN}/og-surveying.jpg`,
          `${OFFICIAL_SITE_ORIGIN}/og-3ddesign.jpg`,
          `${OFFICIAL_SITE_ORIGIN}/og-projects.jpg`,
        ],
        description:
          'Civil engineering and construction company providing building construction services, RCC structural works, land surveying services, and 3D building design in Feroke, Calicut (Kozhikode), and across Kerala.',
        telephone: COMPANY_INFO.phone,
        email: COMPANY_INFO.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${COMPANY_INFO.address.line1}, ${COMPANY_INFO.address.landmark}, ${COMPANY_INFO.address.postOffice}`,
          addressLocality: 'Feroke, Calicut',
          addressRegion: COMPANY_INFO.address.state,
          postalCode: COMPANY_INFO.address.pincode,
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: COMPANY_INFO.coordinates.lat,
          longitude: COMPANY_INFO.coordinates.lng,
        },
        hasMap: COMPANY_INFO.mapUrl,
        taxID: COMPANY_INFO.gstin,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: COMPANY_INFO.phone,
          email: COMPANY_INFO.email,
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['en', 'ml'],
        },
        areaServed: [
          { '@type': 'City', name: 'Feroke' },
          { '@type': 'City', name: 'Kozhikode' },
          { '@type': 'City', name: 'Calicut' },
          { '@type': 'AdministrativeArea', name: 'Malappuram' },
          { '@type': 'State', name: 'Kerala' },
        ],
        knowsAbout: [
          'Building Construction Services & RCC Structural Works',
          'Land Surveying Services & Boundary Demarcation',
          '3D Building Design & Architectural Visualization',
          'Commercial & Residential Building Construction',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Engineering, Surveying & 3D Design Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                serviceType: 'Construction',
                name: 'Building Construction & RCC Structural Works',
                description:
                  'Planned building construction and structural civil subcontract works including RCC foundations, columns, beams, and suspended slabs.',
                provider: { '@id': orgId },
                areaServed: { '@type': 'State', name: 'Kerala' },
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                serviceType: 'Land Surveying',
                name: 'Land Surveying & Site Measurement Services',
                description:
                  'Plot boundary demarcation, topographic site measurements, building approval site plan verification, and structural grid baselines.',
                provider: { '@id': orgId },
                areaServed: { '@type': 'City', name: 'Kozhikode' },
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                serviceType: 'Architectural 3D Design',
                name: '3D Building Design & Exterior Visualization',
                description:
                  'Photorealistic architectural 3D exterior renders, volumetric elevation studies, and CAD plan visualizations for residential and commercial buildings.',
                provider: { '@id': orgId },
                areaServed: { '@type': 'State', name: 'Kerala' },
              },
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${OFFICIAL_SITE_ORIGIN}/`,
        name: COMPANY_INFO.name,
        alternateName: 'KS Associates',
        description:
          'Official corporate website of K S Associates – Construction, Land Surveying & 3D Design in Feroke, Calicut, Kerala.',
        publisher: { '@id': orgId },
        inLanguage: 'en-IN',
      },
      {
        '@type':
          pageKey === 'contact'
            ? 'ContactPage'
            : pageKey === 'about'
              ? 'AboutPage'
              : pageKey === 'projects'
                ? 'CollectionPage'
                : 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: config.title,
        description: config.description,
        isPartOf: { '@id': websiteId },
        about: { '@id': orgId },
        breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ],
  };
}

function setMetaTag(selector: string, attribute: 'content', value: string) {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    if (selector.startsWith('meta[name="')) {
      const name = selector.slice(11, -2);
      element.setAttribute('name', name);
    } else if (selector.startsWith('meta[property="')) {
      const property = selector.slice(15, -2);
      element.setAttribute('property', property);
    }
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setCanonicalTag(url: string) {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

export function updatePageSeo(pageKey: string, customConfig?: Partial<PageSeoConfig>) {
  const {
    route,
    config: baseConfig,
    canonicalUrl,
    absoluteImageUrl,
    robotsContent,
  } = getPageSeoConfig(pageKey);
  const config = { ...baseConfig, ...customConfig };

  document.title = config.title;
  setMetaTag('meta[name="description"]', 'content', config.description);
  setMetaTag('meta[name="robots"]', 'content', robotsContent);
  setMetaTag('meta[name="googlebot"]', 'content', robotsContent);
  setMetaTag('meta[name="bingbot"]', 'content', robotsContent);

  setMetaTag('meta[property="og:title"]', 'content', config.title);
  setMetaTag('meta[property="og:description"]', 'content', config.description);
  setMetaTag('meta[property="og:type"]', 'content', config.type || 'website');

  const resolvedImageUrl = customConfig?.image
    ? customConfig.image.startsWith('http') || customConfig.image.startsWith('data:')
      ? customConfig.image
      : `${OFFICIAL_SITE_ORIGIN}${customConfig.image.startsWith('/') ? customConfig.image : `/${customConfig.image}`}`
    : absoluteImageUrl;

  setMetaTag('meta[property="og:image"]', 'content', resolvedImageUrl);
  setMetaTag('meta[property="og:image:secure_url"]', 'content', resolvedImageUrl);
  setMetaTag('meta[property="og:image:alt"]', 'content', config.imageAlt);
  setMetaTag('meta[name="twitter:image"]', 'content', resolvedImageUrl);
  setMetaTag('meta[name="twitter:image:alt"]', 'content', config.imageAlt);

  setCanonicalTag(canonicalUrl);
  setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);

  setMetaTag('meta[name="twitter:title"]', 'content', config.title);
  setMetaTag('meta[name="twitter:description"]', 'content', config.description);

  const jsonLdScript = document.getElementById('structured-data-jsonld');
  if (jsonLdScript && !customConfig) {
    jsonLdScript.textContent = JSON.stringify(buildPageJsonLd(route));
  }
}
