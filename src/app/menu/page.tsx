import type { Metadata } from 'next';
import { MenuPageClient } from './MenuPageClient';

export const metadata: Metadata = {
    title: "Menu éthiopien & érythréen à Genève",
    description: "Découvrez le menu éthiopien et érythréen de La Gazelle d'Or à Genève : injera maison, plats traditionnels et menus dégustation.",
};

export default function MenuPage() {
    return <MenuPageClient />;
}
