import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { ReviewSection } from '@/components/ReviewSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <Hero />
      <AboutSection />
      <ReviewSection />
    </div>
  );
}
