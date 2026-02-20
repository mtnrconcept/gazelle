import Link from 'next/link';
import Image from 'next/image';
import styles from './AboutSection.module.css';

export function AboutSection() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Une Passion Familiale</h2>
                    <p className={styles.text}>
                        Notre restaurant La Gazelle d'Or est né de la passion pour la cuisine érythréenne et éthiopienne authentique.
                        Nous avons ramené à Genève les recettes traditionnelles de notre famille, transmises de génération en génération.
                    </p>
                    <p className={styles.text}>
                        Chaque plat raconte une histoire, chaque saveur évoque un souvenir d'enfance.
                        Nous utilisons des ingrédients importés directement d'Érythrée et d'Éthiopie.
                    </p>
                    <Link href="/histoire" className={styles.link}>
                        Lire notre histoire &rarr;
                    </Link>
                </div>
                <div className={styles.imageWrapper}>
                    <img
                        src="https://lagazelledorgeneva.com/assets/plat-histoire-Cl69Tczt.jpg"
                        alt="Cuisine traditionnelle"
                        className={styles.image}
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
