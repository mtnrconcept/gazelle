import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { ExperienceSection } from '@/components/ExperienceSection';
import { AboutSection } from '@/components/AboutSection';
import { SignatureSection } from '@/components/SignatureSection';
import { ReviewSection } from '@/components/ReviewSection';
import { GallerySection } from '@/components/GallerySection';
import { ReserveSection } from '@/components/ReserveSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
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
