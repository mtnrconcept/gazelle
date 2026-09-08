export const siteConfig = {
  name: "La Gazelle d'Or",
  url: 'https://lagazelledor.ch',
  locale: 'fr_CH',
  language: 'fr-CH',
  email: 'lagazelledorgeneva@gmail.com',
  telephone: '+41223403350',
  telephoneDisplay: '+41 22 340 33 50',
  address: {
    streetAddress: 'Rue de Lyon 55',
    postalCode: '1203',
    addressLocality: 'Genève',
    addressCountry: 'CH',
  },
  cuisines: ['Érythréenne', 'Éthiopienne', 'Africaine'],
  sameAs: [
    'https://www.facebook.com/lagazelledorgeneva',
    'https://www.instagram.com/lagazelledorgeneva',
    'https://www.tiktok.com/@la.gazelle.dor.ge',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:30',
      closes: '14:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '18:30',
      closes: '22:30',
    },
  ],
} as const;
