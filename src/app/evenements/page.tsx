import styles from './page.module.css';
import { Metadata } from 'next';
import { ReserveSection } from '@/components/ReserveSection';

export const metadata: Metadata = {
    title: "Événements africains à Genève",
    description: "Soirées africaines, événements privés et privatisations à La Gazelle d'Or à Genève. Musique, cérémonie du café et expériences culturelles.",
};

const events = [
    {
        title: 'Soirées Culturelles',
        eyebrow: 'Chaque semaine',
        description: "Plongez dans la culture éthiopienne et érythréenne avec nos soirées musicales. Musiques traditionnelles, danses et cérémonie du café pour une immersion totale.",
        image: 'https://lagazelledorgeneva.com/assets/TIMATUM%20SALADE-B7XlvVoD.jpg',
    },
    {
        title: 'Cérémonies du Café',
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
        <div className={styles.page}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.heroEyebrow}>Vivez l'Afrique à Genève</p>
                    <h1 className={styles.heroTitle} data-text="Événements africains à Genève">Événements africains à Genève</h1>
                    <p className={styles.heroTagline}>Des expériences culturelles uniques au cœur du restaurant</p>
                </div>
            </div>

            <div className={`container ${styles.content}`}>
                <section className={styles.eventsGrid}>
                    {events.map((event) => (
                        <article key={event.title} className={styles.eventCard}>
                            <div className={styles.eventBody}>
                                <span className={styles.eyebrow}>{event.eyebrow}</span>
                                <h2 className={styles.eventTitle} data-text={event.title}>{event.title}</h2>
                                <p className={styles.eventDesc}>{event.description}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <section className={styles.privatisationCta}>
                    <div className={styles.ctaInner}>
                        <span className={styles.eyebrow}>Votre événement sur mesure</span>
                        <h2 className={styles.ctaTitle} data-text="Privatisez la Gazelle d'Or">Privatisez la Gazelle d&apos;Or</h2>
                        <p className={styles.ctaText}>
                            Pour tout événement privé — anniversaire, mariage, repas d'entreprise ou soirée à thème — notre équipe vous accompagne pour créer une expérience africaine mémorable.
                        </p>
                        <div className={styles.ctaButtons}>
                            <a href="tel:+41223403350" className={styles.ctaButton}>
                                « Nous appeler »
                            </a>
                            <a href="mailto:lagazelledorgeneva@gmail.com" className={styles.ctaButtonOutline}>
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
