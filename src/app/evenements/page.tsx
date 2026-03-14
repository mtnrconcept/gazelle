import { Metadata } from 'next';
import { ReserveSection } from '@/components/ReserveSection';

export const metadata: Metadata = {
    title: "Événements africains à Genève",
    description: "Soirées africaines, événements privés et privatisations à La Gazelle d'Or à Genève. Musique, cérémonie du café et expériences culturelles.",
};

const events = [
    {
        title: 'Soirees Culturelles',
        eyebrow: 'Chaque semaine',
        description: "Plongez dans la culture érythréenne et éthiopienne avec nos soirées musicales. Musiques traditionnelles, danses et cérémonie du café pour une immersion totale.",
        image: 'https://lagazelledorgeneva.com/assets/TIMATUM%20SALADE-B7XlvVoD.jpg',
    },
    {
        title: 'Ceremonies du Cafe',
        eyebrow: 'Sur réservation',
        description: "Le café est originaire d'Éthiopie. Vivez le rituel ancestral de torréfaction sur place, accompagné d'encens traditionnel. Une expérience sensorielle unique.",
        image: 'https://lagazelledorgeneva.com/assets/SALADE%20DU%20CHEF-DwkqqRvX.jpg',
    },
    {
        title: 'Privatisation',
        eyebrow: 'Événements privés',
        description: "Mariages, anniversaires, repas d'affaires… Privatisez notre espace aux décors africains authentiques pour un événement inoubliable. Menus personnalisés sur demande.",
        image: 'https://lagazelledorgeneva.com/assets/SAMBUSA%20FAIT%20MAISON-D_wwG_sv.jpeg',
    },
];

export default function EvenementsPage() {
    return (
        <div className="events-page">
            <div className="events-hero">
                <div className="events-heroContent">
                    <p className="events-heroEyebrow">Vivez l'Afrique à Genève</p>
                    <h1 className="heroPageTitle events-heroTitle" data-text="Evenements africains a Geneve">Evenements africains a Geneve</h1>
                    <p className="events-heroTagline">Des expériences culturelles uniques au cœur du restaurant</p>
                </div>
            </div>

            <div className="container events-content">
                <section className="events-eventsGrid">
                    {events.map((event) => (
                        <article key={event.title} className="events-eventCard">
                            <div className="events-eventBody">
                                <span className="events-eyebrow">{event.eyebrow}</span>
                                <h2 className="gold-sectionTitleMedium events-eventTitle" data-text={event.title}>{event.title}</h2>
                                <p className="events-eventDesc">{event.description}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="events-privatisationCta">
                    <div className="events-ctaInner">
                        <span className="events-eyebrow">Votre événement sur mesure</span>
                        <h2 className="gold-sectionTitle events-ctaTitle" data-text="Privatisez la Gazelle d'Or">Privatisez la Gazelle d&apos;Or</h2>
                        <p className="events-ctaText">
                            Pour tout événement privé — anniversaire, mariage, repas d'entreprise ou soirée à thème — notre équipe vous accompagne pour créer une expérience africaine mémorable.
                        </p>
                        <div className="events-ctaButtons">
                            <a href="tel:+41223403350" className="events-ctaButton">
                                « Nous appeler »
                            </a>
                            <a href="mailto:lagazelledorgeneva@gmail.com" className="events-ctaButtonOutline">
                                Envoyer un email
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <ReserveSection />
        </div>
    );
}
