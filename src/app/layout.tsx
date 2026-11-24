import type { Metadata } from 'next';
import './self-hosted-fonts.css';
import './globals.css';
import './accent-font-fallback.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PromoPopup } from '@/components/PromoPopup';
import { AnniversaryIntro } from '@/components/AnniversaryIntro';
import { siteConfig } from '@/lib/site';

// Polices auto-hébergées (voir self-hosted-fonts.css) : préchargées comme le faisait next/font.
const preloadedFonts = [
  '/fonts/cinzel-latin-400-normal.woff2',
  '/fonts/cinzel-latin-600-normal.woff2',
  '/fonts/cinzel-latin-700-normal.woff2',
  '/fonts/cormorant-garamond-latin-400-normal.woff2',
  '/fonts/cormorant-garamond-latin-600-normal.woff2',
];

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève",
  description:
    "Cuisine érythréenne et éthiopienne authentique à Genève : injera maison, plats végétariens et vegan, service traiteur et réservation à La Gazelle d'Or.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève",
    description:
      "Cuisine érythréenne et éthiopienne authentique à Genève, injera maison et expérience chaleureuse au cœur des Grottes.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/_assets/logo-hero-B4ENhAYs.png',
        alt: "La Gazelle d'Or Genève - Restaurant érythréen & éthiopien",
      },
    ],
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "La Gazelle d'Or | Restaurant érythréen & éthiopien à Genève",
    description: "Injera maison et saveurs authentiques de la Corne de l'Afrique à Genève.",
    images: ['/images/_assets/logo-hero-B4ENhAYs.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.language}>
      <head>
        {preloadedFonts.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
        <link
          rel="preload"
          href="/african.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
        <PromoPopup />
        <AnniversaryIntro />
      </body>
    </html>
  );
}
