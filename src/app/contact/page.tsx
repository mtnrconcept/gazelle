import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';
import { ContactPageClient } from './ContactPageClient';

export const metadata = buildPageMetadata({
    title: "Réservation & contact | La Gazelle d'Or Genève",
    description: "Réservez votre table à La Gazelle d'Or, Rue de Lyon 55 à Genève. Retrouvez nos horaires, téléphone, adresse et formulaire de réservation en ligne.",
    path: '/contact',
});

export default function ContactPage() {
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: 'Accueil', path: '/' },
        { name: 'Réservation & contact', path: '/contact' },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <ContactPageClient />
        </>
    );
}
