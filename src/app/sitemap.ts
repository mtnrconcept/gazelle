import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: 'https://lagazelledorgeneva.com',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://lagazelledorgeneva.com/menu',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}