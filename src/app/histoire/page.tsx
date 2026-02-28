import styles from './page.module.css';
import { Metadata } from 'next';
import { GallerySection } from '@/components/GallerySection';
import { ReserveSection } from '@/components/ReserveSection';

export const metadata: Metadata = {
    title: "L'histoire de La Gazelle d'Or",
    description: "L'histoire de La Gazelle d'Or, restaurant éthiopien et érythréen à Genève.",
};

export default function HistoirePage() {
    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.heroVideo}
                    poster="/images/3.webp"
                >
                    <source src="https://lagazelledorgeneva.com/assets/video_hero-Ck-O8Wsn.mp4" type="video/mp4" />
                </video>
                <div className={styles.heroContent}>
                    <p className={styles.heroEyebrow}>Depuis plus de 15 ans à Genève</p>
                    <h1 className={styles.heroTitle}>L'histoire de La Gazelle d'Or</h1>
                    <p className={styles.heroTagline}>Un voyage culinaire au cœur de la Corne de l'Afrique</p>
                </div>
            </div>

            <div className={`container ${styles.content}`}>
                {/* Story Section */}
                <section className={`${styles.storySection} reveal`} data-reveal="up">
                    <div className={styles.storyGrid}>
                        <div className={styles.storyText}>
                            <span className={styles.eyebrow}>Des racines profondes</span>
                            <h2 className={styles.sectionTitle}>Une passion transmise de génération en génération</h2>
                            <p>
                                La Gazelle d'Or est née d'un rêve simple : apporter à Genève les saveurs authentiques de l'Éthiopie et de l'Érythrée. Fondé avec passion et nostalgie des saveurs de la Corne de l'Afrique, notre restaurant est devenu bien plus qu'un simple lieu de restauration.
                            </p>
                            <p>
                                Niché au cœur du quartier des Grottes, au 55 rue de Lyon, notre établissement vous transporte instantanément dans un village africain. Des cases traditionnelles abritent des tables basses entourées de fauteuils en osier, flanquées de coussins colorés et de grandes corbeilles multicolores tissées à la main.
                            </p>
                            <p>
                                Chaque plat raconte une histoire, chaque épice évoque un souvenir d'enfance. Nous perpétuons des recettes familiales transmises avec fierté, préparées avec des ingrédients importés directement pour garantir une authenticité totale.
                            </p>
                        </div>
                        <div className={styles.storyMedia}>
                            <div className={styles.storyImageWrapper}>
                                <img
                                    src="https://lagazelledorgeneva.com/assets/plat-histoire-Cl69Tczt.jpg"
                                    alt="Cuisine traditionnelle La Gazelle d'Or"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Cards */}
                <section className={`${styles.valuesSection} reveal`} data-reveal="right">
                    <div className={styles.valuesHeader}>
                        <span className={styles.eyebrow}>Nos Valeurs</span>
                        <h2 className={styles.sectionTitle}>Ce qui nous définit</h2>
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <span className={styles.icon}>🌶️</span>
                            <h3>Authenticité</h3>
                            <p>Nos mélanges d'épices — Berbere, Mitmita, Niter Kibbeh — sont importés directement d'Éthiopie et d'Érythrée pour une expérience gustative sans compromis.</p>
                        </div>
                        <div className={styles.card}>
                            <span className={styles.icon}>☕</span>
                            <h3>Cérémonie du Café</h3>
                            <p>Le café est originaire d'Éthiopie. Nous célébrons ce rituel ancestral avec une torréfaction sur place et de l'encens traditionnel, un moment sensoriel unique.</p>
                        </div>
                        <div className={styles.card}>
                            <span className={styles.icon}>🤝</span>
                            <h3>Partage & Convivialité</h3>
                            <p>Le partage est au cœur de notre culture. Nos plats sont souvent servis dans un grand plat commun pour favoriser la convivialité et le lien entre convives.</p>
                        </div>
                    </div>
                </section>

                {/* Injera Section */}
                <section className={`${styles.injeraSection} reveal`} data-reveal="up">
                    <div className={styles.injeraGrid}>
                        <div className={styles.injeraMedia}>
                            <div className={styles.injeraImageWrapper}>
                                <img
                                    src="https://lagazelledorgeneva.com/assets/SPECIALITES%20DE%20LA%20MAISON-CNPs4Yvd.png"
                                    alt="Injera et spécialités de la maison"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className={styles.injeraText}>
                            <span className={styles.eyebrow}>Le cœur de notre cuisine</span>
                            <h2 className={styles.sectionTitle}>L'Injera — notre galette signature</h2>
                            <p>
                                L'injera est bien plus qu'un simple pain. Cette galette fermentée à base de farine de teff est le fondement de toute la cuisine éthiopienne et érythréenne. Chez nous, elle est préparée chaque jour selon la méthode traditionnelle.
                            </p>
                            <p>
                                Sa texture légèrement spongieuse et son goût subtilement acidulé en font le support parfait pour recueillir les saveurs riches de nos ragoûts et sauces épicées. On ne mange pas <em>avec</em> l'injera — on mange <em>dedans</em>.
                            </p>
                            <p>
                                C'est aussi un geste de partage : arracher un morceau d'injera et saisir les mets ensemble dans un plat commun est au cœur de la tradition d'hospitalité africaine.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className={`${styles.statsSection} reveal`} data-reveal="up">
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>15+</span>
                            <span className={styles.statLabel}>Années d'expérience</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>4.3 / 5</span>
                            <span className={styles.statLabel}>Note Google</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>500+</span>
                            <span className={styles.statLabel}>Avis clients</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>100%</span>
                            <span className={styles.statLabel}>Injera fait maison</span>
                        </div>
                    </div>
                </section>

                {/* Ambiance Section */}
                <section className={`${styles.ambianceSection} reveal`} data-reveal="right">
                    <span className={styles.eyebrow}>L'expérience complète</span>
                    <h2 className={styles.sectionTitle}>Un décor qui vous transporte</h2>
                    <p className={styles.ambianceText}>
                        En franchissant nos portes, vous pénétrez dans un véritable village africain. Des cases traditionnelles abritent des tables basses avec des fauteuils en osier agrémentés de coussins colorés. Les grandes corbeilles en osier multicolore tissées à la main illuminent l'espace d'une chaleur inimitable.
                    </p>
                    <p className={styles.ambianceText}>
                        Les sons doux de musiques éthiopiennes et érythréennes accompagnent votre repas, complétant une immersion culturelle totale. Chaque détail a été pensé pour vous faire voyager, l'espace d'un repas, jusqu'à la Corne de l'Afrique.
                    </p>
                </section>
            </div>

            <GallerySection />
            <ReserveSection />
        </div>
    );
}
