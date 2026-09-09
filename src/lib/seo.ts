import type { Metadata } from 'next';
import { siteConfig } from './site';

const DEFAULT_SOCIAL_IMAGE = '/images/_assets/logo-hero-B4ENhAYs.png';

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

type BreadcrumbInput = {
  name: string;
  path: string;
};

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return siteConfig.url;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl(DEFAULT_SOCIAL_IMAGE);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: image,
          alt: `${siteConfig.name} Genève - Restaurant érythréen & éthiopien`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function buildRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${siteConfig.url}/#restaurant`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(DEFAULT_SOCIAL_IMAGE),
    email: siteConfig.email,
    telephone: siteConfig.telephone,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    servesCuisine: [...siteConfig.cuisines],
    hasMenu: absoluteUrl('/menu'),
    acceptsReservations: true,
    sameAs: [...siteConfig.sameAs],
    openingHoursSpecification: siteConfig.openingHoursSpecification.map((hours) => ({
      ...hours,
      dayOfWeek: [...hours.dayOfWeek],
    })),
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
