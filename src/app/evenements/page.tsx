import { Metadata } from 'next';
import { ReserveSection } from '@/components/ReserveSection';

export const metadata: Metadata = {
    title: "Événements africains à Genève",
    description: "Soirées africaines, événements privés et privatisations à La Gazelle d'Or à Genève. Musique, café et thé traditionnel et expériences culturelles.",
};

const events = [
    {
        title: 'Soirees Culturelles',
        eyebrow: 'Tradition',
        description: 'Plongez au cœur de la culture érythréenne et éthiopienne avec nos soirées thématiques. Musique traditionnelle, démonstrations culinaires et moments de partage inoubliables.',
        image: '/images/0.webp'
    },
    {
        title: 'Cafe et The traditionnel',
        eyebrow: 'Authenticité',
        description: 'Découvrez la richesse des arômes du café et du thé traditionnels et laissez-vous transporter par leur goût authentique. Une expérience sensorielle unique qui honore nos racines.',
        image: '/images/café.png'
    },
    {
        title: 'Privatisation',
        eyebrow: 'Exclusivité',
        description: 'Pour vos anniversaires, mariages ou événements privés, privatisez notre espace. Nous créons pour vous une ambiance sur mesure et un menu adapté à vos envies.',
        image: '/images/3.webp'
    },
    {
        title: 'Service traiteur',
        eyebrow: 'Entreprise & Privé',
        description: 'La Gazelle d\'Or s\'invite à vos événements. Buffets traditionnels, plateaux de samboussas ou repas complets, nous assurons un service traiteur d\'exception pour vos réceptions.',
        image: '/images/4.webp'
    }
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
                        <article 
                            key={event.title} 
                            className="events-eventCard"
                            id={event.title === 'Service traiteur' ? 'traiteur' : undefined}
                        >
                            <div className="events-eventImage">
                                <img src={event.image} alt={event.title} />
                            </div>
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
