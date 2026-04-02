import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
    title: "Réserver une table à Genève",
    description: "Réservez une table à La Gazelle d'Or à Genève. Réservation en ligne, contact direct et horaires d'ouverture.",
};

export default function ContactPage() {
    return <ContactPageClient />;
}
