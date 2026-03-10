import Link from 'next/link';
import styles from './AboutSection.module.css';

export function AboutSection() {
    return (
        <section className={`${styles.section} reveal`} data-reveal="right">
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <span className={styles.kicker}>Notre héritage</span>
                    <h2 className={styles.title}>Une Passion Familiale</h2>
                    <p className={styles.text}>
                        Notre maison est née de la passion pour la cuisine érythréenne et éthiopienne authentique.
                        Nous avons ramené à Genève les recettes traditionnelles de notre famille, transmises de génération en génération.
                    </p>
                    <p className={styles.text}>
                        Chaque plat raconte une histoire, chaque saveur évoque un souvenir d'enfance.
                        Nous utilisons des ingrédients importés directement d'Érythrée et d'Éthiopie.
                    </p>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>15+</span>
                            <span className={styles.statLabel}>Années de savoir-faire</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>40</span>
                            <span className={styles.statLabel}>Places intimes</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>100%</span>
                            <span className={styles.statLabel}>Injera maison</span>
                        </div>
                    </div>
                    <Link href="/histoire" className={styles.link}>
                        Lire notre histoire →
                    </Link>
                </div>
                <div className={styles.media}>
                    <div className={styles.imageWrapper}>
                        <img
                            src="https://lagazelledorgeneva.com/assets/1.jpg"
                            alt="Cuisine traditionnelle"
                            className={styles.image}
                            loading="lazy"
                        />
                    </div>
                    <div className={styles.highlightCard}>
                        <span className={styles.highlightTitle}>Cérémonie du café</span>
                        <p>Un rituel sensoriel où les grains sont torréfiés sur place, accompagné d'encens traditionnel.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}


