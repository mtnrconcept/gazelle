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
  title: "Restaurant érythréen & éthiopien à Genève",
  description: "La Gazelle d'Or à Genève : cuisine érythréenne et éthiopienne, injera maison, ambiance africaine et réservation en ligne.",
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
