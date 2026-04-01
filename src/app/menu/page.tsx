import type { Metadata } from 'next';
import { menuData } from '@/data/menu';
import { MenuPageClient } from './MenuPageClient';
import type { MenuSectionData } from '@/types/menu';

export const metadata: Metadata = {
    title: "Menu érythréen & éthiopien à Genève",
    description: "Découvrez le menu érythréen et éthiopien de La Gazelle d'Or à Genève : injera maison, plats traditionnels et menus dégustation.",
};

export default function MenuPage() {
    return <MenuPageClient sections={menuData as MenuSectionData[]} />;
}
