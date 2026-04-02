import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://lagazelledorgeneva.com/sitemap.xml',
    host: 'https://lagazelledorgeneva.com',
  };
}