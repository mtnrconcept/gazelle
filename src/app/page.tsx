import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { ExperienceSection } from '@/components/ExperienceSection';
import { AboutSection } from '@/components/AboutSection';
import { ReviewSection } from '@/components/ReviewSection';
import { OrderBanner } from '@/components/OrderBanner';
import { ReserveSection } from '@/components/ReserveSection';
import { buildPageMetadata, buildRestaurantJsonLd } from '@/lib/seo';
import { ParallaxLeaves } from './ParallaxLeaves';

const GallerySection = dynamic(
  () => import('@/components/GallerySection').then((m) => m.GallerySection)
);

export const metadata = buildPageMetadata({
  title: "Restaurant érythréen & éthiopien à Genève | La Gazelle d'Or",
  description:
    "Découvrez La Gazelle d'Or à Genève : cuisine érythréenne et éthiopienne authentique, injera maison, plats végétariens et vegan, réservation et vente à emporter.",
  path: '/',
});

export default function Home() {
  const restaurantJsonLd = buildRestaurantJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantJsonLd).replace(/</g, '\\u003c'),
        }}
      />
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
    </>
  );
}
