import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { ExperienceSection } from '@/components/ExperienceSection';
import { AboutSection } from '@/components/AboutSection';
import { SignatureSection } from '@/components/SignatureSection';
import { ReviewSection } from '@/components/ReviewSection';
import { GallerySection } from '@/components/GallerySection';
import { ReserveSection } from '@/components/ReserveSection';
import styles from './page.module.css';
import { ParallaxLeaves } from './ParallaxLeaves';

export const metadata: Metadata = {
  title: "Restaurant éthiopien & érythréen à Genève",
  description: "La Gazelle d'Or à Genève : cuisine éthiopienne et érythréenne, injera maison, ambiance africaine et réservation en ligne.",
};

export default function Home() {
  return (
    <div className={styles.main}>
      <ParallaxLeaves />
      <Hero />
      <Marquee />
      <ExperienceSection />
      <AboutSection />
      <SignatureSection />
      <ReviewSection />
      <GallerySection />
      <ReserveSection />
    </div>
  );
}
