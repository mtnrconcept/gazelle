import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { ExperienceSection } from '@/components/ExperienceSection';
import { AboutSection } from '@/components/AboutSection';
import { SignatureSection } from '@/components/SignatureSection';
import { ReviewSection } from '@/components/ReviewSection';
import { GallerySection } from '@/components/GallerySection';
import { OrderBanner } from '@/components/OrderBanner';
import { ReserveSection } from '@/components/ReserveSection';
import { ParallaxLeaves } from './ParallaxLeaves';

export const metadata: Metadata = {
  title: "Meilleur Restaurant Éthiopien & Érythréen à Genève | La Gazelle d'Or",
  description: "Découvrez l'authenticité de la cuisine éthiopienne à Genève. Plats traditionnels, injera maison, options végétariennes et vegan. Réservez une table à la Gazelle d'Or.",
};

export default function Home() {
  return (
    <div className="home-main">
      <ParallaxLeaves />
      <Hero />
      <Marquee />
      <ExperienceSection />
      <AboutSection />
      <SignatureSection />
      <ReviewSection />
      <GallerySection />
      <OrderBanner />
      <ReserveSection />
    </div>
  );
}
