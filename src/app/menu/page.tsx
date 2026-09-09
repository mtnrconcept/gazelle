import { menuData } from '@/data/menu';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';
import { MenuPageClient } from './MenuPageClient';

export const metadata = buildPageMetadata({
  title: "Menu érythréen & éthiopien à Genève | La Gazelle d'Or",
  description:
    "Découvrez notre carte à Genève : injera maison, spécialités érythréennes et éthiopiennes, plats végétariens et vegan, menus dégustation et street food africaine.",
  path: '/menu',
});

export default function MenuPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Menu', path: '/menu' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <MenuPageClient sections={menuData} />
    </>
  );
}
