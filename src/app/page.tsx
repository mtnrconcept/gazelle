import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { ExperienceSection } from '@/components/ExperienceSection';
import { AboutSection } from '@/components/AboutSection';

import { ReviewSection } from '@/components/ReviewSection';
import { OrderBanner } from '@/components/OrderBanner';
import { ReserveSection } from '@/components/ReserveSection';
import { ParallaxLeaves } from './ParallaxLeaves';

const GallerySection = dynamic(
  () => import('@/components/GallerySection').then((m) => m.GallerySection)
);

export const metadata: Metadata = {
  title: "Meilleur Restaurant Érythréen & Éthiopien à Genève | La Gazelle d'Or",
  description: "Découvrez l'authenticité de la cuisine érythréenne et éthiopienne à Genève. Plats traditionnels, injera maison, options végétariennes et vegan. Réservez une table à la Gazelle d'Or.",
};

export default function Home() {
  return (
    <div className="home-main">
      <ParallaxLeaves />
      <Hero />
      <Marquee />
      <ExperienceSection />
      <AboutSection />
  
      <ReviewSection />
      <GallerySection />
      <OrderBanner />
      <ReserveSection />
    </div>
  );
}
