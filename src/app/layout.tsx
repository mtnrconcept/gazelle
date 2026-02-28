import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BodySnapManager } from '@/components/BodySnapManager';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lagazelledorgeneva.com'),
  title: {
    default: "La Gazelle d'Or | Restaurant éthiopien & érythréen à Genève",
    template: "%s | La Gazelle d'Or",
  },
  description: "Restaurant éthiopien & érythréen à Genève. Injera maison, plats traditionnels et ambiance africaine chaleureuse.",
  keywords: [
    "restaurant éthiopien",
    "restaurant érythréen",
    "Genève",
    "injera",
    "cuisine africaine",
    "La Gazelle d'Or",
  ],
  openGraph: {
    title: "La Gazelle d'Or | Restaurant éthiopien & érythréen à Genève",
    description: "Restaurant éthiopien & érythréen à Genève. Injera maison, plats traditionnels et ambiance africaine chaleureuse.",
    url: "https://lagazelledorgeneva.com",
    siteName: "La Gazelle d'Or",
    locale: "fr_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Gazelle d'Or | Restaurant éthiopien & érythréen à Genève",
    description: "Restaurant éthiopien & érythréen à Genève. Injera maison, plats traditionnels et ambiance africaine chaleureuse.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
        <BodySnapManager />
      </body>
    </html>
  );
}
