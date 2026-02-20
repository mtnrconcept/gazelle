import Link from 'next/link';
import styles from './ExperienceSection.module.css';

const baseUrl = 'https://lagazelledorgeneva.com';

const features = [
    {
        title: 'Cuisine Authentique',
        button: 'Voir le menu',
        image: '/assets/SALADE DU CHEF-DwkqqRvX.jpg',
        href: '/menu'
    },
    {
        title: 'Ambiance Africaine',
        button: 'Immersion culturelle',
        image: '/assets/TIMATUM SALADE-B7XlvVoD.jpg',
        href: '/histoire'
    },
    {
        title: 'Soirées & Événements',
        button: 'Galerie',
        image: '/assets/SAMBUSA FAIT MAISON-D_wwG_sv.jpeg',
        href: '/histoire'
    }
];

export function ExperienceSection() {
    return (
        <section className={`${styles.section} panel`}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    {features.map((item) => (
                        <article key={item.title} className={styles.card}>
                            {/* Title at top */}
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <span className={styles.diamond}>◆</span>
                            </div>

                            {/* Circular image */}
                            <div className={styles.imageWrapper}>
                                <img src={`${baseUrl}${encodeURI(item.image)}`} alt={item.title} loading="lazy" />
                            </div>

                            {/* Button at bottom */}
                            <Link href={item.href} className={styles.cardButton}>
                                {item.button}
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
