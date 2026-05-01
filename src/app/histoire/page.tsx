import { Metadata } from 'next';
import Image from 'next/image';
import { GallerySection } from '@/components/GallerySection';
import { ReserveSection } from '@/components/ReserveSection';
import { PresseSection } from '@/components/PresseSection';
import { Flame, Coffee, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
    title: "L'Histoire de La Gazelle d'Or | Tradition Érythréenne & Éthiopienne à Genève",
    description: "Découvrez l'histoire de notre restaurant familial à Genève. Plus de 15 ans de passion pour la cuisine érythréenne et éthiopienne authentique aux Grottes.",
};

export default function HistoirePage() {
    return (
        <div className="history-page">
            <div className="history-hero">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="history-heroVideo"
                    poster="/images/_assets/video_hero-poster.webp"
                >
                    <source src="/images/_assets/video_hero-1080p.webm" type="video/webm" />
                    <source src="/images/_assets/video_hero-1080p.mp4" type="video/mp4" />
                </video>
                <div className="history-heroContent">
                    <p className="history-heroEyebrow">Depuis plus de 15 ans à Genève</p>
                    <h1 className="heroPageTitle history-heroTitle" data-text="L'histoire de La Gazelle d'Or">{"L'histoire de La Gazelle d'Or"}</h1>
                    <p className="history-heroTagline">{"Un voyage culinaire au cœur de la Corne de l'Afrique"}</p>
                </div>
            </div>

            <div className="container history-content">
                {/* Story Section */}
                <section className="history-storySection reveal organic-decor" data-reveal="up">
                    {/* Decorative ornaments */}
                    <span className="organic-leaf organic-leaf-1" aria-hidden="true" />
                    <span className="organic-leaf organic-leaf-2" aria-hidden="true" />
                    
                    <div className="history-storyGrid">
                        <div className="history-storyText">
                            <span className="history-eyebrow">Des racines profondes</span>
                            <h2 className="gold-sectionTitle history-sectionTitle" data-text="Une passion transmise de generation en generation">Une passion transmise de generation en generation</h2>
                            
                            <div className="history-storyBody">
                                <p className="story-lead">
                                    {"La Gazelle d'Or est née d'un rêve simple : apporter à Genève les saveurs authentiques de l'Érythrée et de l'Éthiopie. Fondé avec passion et nostalgie des saveurs de la Corne de l'Afrique, notre restaurant est devenu bien plus qu'un simple lieu de restauration."}
                                </p>
                                <p>
                                    Niché au cœur du quartier des Grottes, au 55 rue de Lyon, notre établissement vous transporte instantanément dans un village africain. Des cases traditionnelles abritent des tables basses entourées de fauteuils en osier, flanquées de coussins colorés et de grandes corbeilles multicolores tissées à la main.
                                </p>
                                <p>
                                    {"Chaque plat raconte une histoire, chaque épice évoque un souvenir d'enfance. Nous perpétuons des recettes familiales transmises avec fierté, préparées avec des ingrédients importés directement pour garantir une authenticité totale."}
                                </p>
                            </div>
                        </div>
                        <div className="history-storyMedia">
                            <div className="history-photoFrame">
                                <div className="history-storyImageWrapper">
                                    <Image
                                        src="/images/1.jpg"
                                        alt="Intérieur authentique du restaurant La Gazelle d'Or Genève - Décoration Africaine"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                    <div className="photo-texture" />
                                </div>
                                <span className="photo-caption">Atmosphère authentique</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Cards */}
                <section className="history-valuesSection reveal" data-reveal="right">
                    <div className="history-valuesHeader">
                        <span className="history-eyebrow">Nos Valeurs</span>
                        <h2 className="gold-sectionTitle history-sectionTitle" data-text="Ce qui nous definit">Ce qui nous definit</h2>
                    </div>
                    <div className="history-grid">
                        <div className="history-card">
                            <div className="history-iconWrapper">
                                <Flame size={44} className="history-icon" strokeWidth={1.5} />
                            </div>
                            <h3>Authenticite</h3>
                            <p>{"Nos mélanges d'épices — Berbere, Mitmita, Niter Kibbeh — sont importés directement d'Érythrée et d'Éthiopie pour une expérience gustative sans compromis."}</p>
                        </div>
                        <div className="history-card">
                            <div className="history-iconWrapper">
                                <Coffee size={44} className="history-icon" strokeWidth={1.5} />
                            </div>
                            <h3>Cafe et The traditionnel</h3>
                            <p>Découvrez la richesse des arômes du café et du thé traditionnels et laissez-vous transporter par leur goût authentique.</p>
                        </div>
                        <div className="history-card">
                            <div className="history-iconWrapper">
                                <HeartHandshake size={44} className="history-icon" strokeWidth={1.5} />
                            </div>
                            <h3>Partage & Convivialite</h3>
                            <p>Le partage est au cœur de notre culture. Nos plats sont souvent servis dans un grand plat commun pour favoriser la convivialité et le lien entre convives.</p>
                        </div>
                    </div>
                </section>

                {/* Injera Section */}
                <section className="history-injeraSection reveal organic-decor" data-reveal="up">
                    <span className="organic-leaf organic-leaf-3" aria-hidden="true" />
                    
                    <div className="history-injeraGrid">
                        <div className="history-injeraMedia">
                            <div className="history-photoFrame photo-frame-reversed">
                                <div className="history-injeraImageWrapper">
                                    <Image
                                        src="/images/injera.png"
                                        alt="Injera fait maison - Galette traditionnelle érythréenne et éthiopienne"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                    <div className="photo-texture" />
                                </div>
                                <span className="photo-caption">Notre Teff authentique</span>
                            </div>
                        </div>
                        <div className="history-injeraText">
                            <span className="history-eyebrow">Le cœur de notre cuisine</span>
                            <h2 className="gold-sectionTitle history-sectionTitle" data-text="L&apos;Injera,notre galette signature">L&apos;Injera — notre galette signature</h2>
                            
                            <div className="history-storyBody">
                                <p>
                                    {"L'injera est bien plus qu'un simple pain. Cette galette fermentée à base de farine de teff est le fondement de toute la cuisine érythréenne et éthiopienne. Chez nous, elle est préparée chaque jour selon la méthode traditionnelle."}
                                </p>
                                <p>
                                    {"Sa texture légèrement spongieuse et son goût subtilement acidulé en font le support parfait pour recueillir les saveurs riches de nos ragoûts et sauces épicées. On ne mange pas "}<em>avec</em>{" l'injera — on mange "}<em>dedans</em>.
                                </p>
                                <p>
                                    {"C'est aussi un geste de partage : arracher un morceau d'injera et saisir les mets ensemble dans un plat commun est au cœur de la tradition d'hospitalité africaine."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="history-statsSection reveal" data-reveal="up">
                    <div className="history-statsGrid">
                        <div className="history-statCard">
                            <span className="history-statValue">34+</span>
                            <span className="history-statLabel">Années d&apos;expérience</span>
                        </div>
                        <div className="history-statCard">
                            <span className="history-statValue">4.5 / 5</span>
                            <span className="history-statLabel">Note Google</span>
                        </div>
                        <div className="history-statCard">
                            <span className="history-statValue">500+</span>
                            <span className="history-statLabel">Avis clients</span>
                        </div>
                        <div className="history-statCard">
                            <span className="history-statValue">100%</span>
                            <span className="history-statLabel">Injera fait maison</span>
                        </div>
                    </div>
                </section>

                {/* Ambiance Section */}
                <section className="history-ambianceSection reveal" data-reveal="right">
                    <span className="history-eyebrow">L&apos;expérience complète</span>
                    <h2 className="gold-sectionTitle history-sectionTitle" data-text="Un decor qui vous transporte">Un decor qui vous transporte</h2>
                    <p className="history-ambianceText">
                        En franchissant nos portes, vous pénétrez dans un véritable village africain. Des cases traditionnelles abritent des tables basses avec des fauteuils en osier agrémentés de coussins colorés. Les grandes corbeilles en osier multicolore tissées à la main illuminent l&apos;espace d&apos;une chaleur inimitable.
                    </p>
                    <p className="history-ambianceText">
                        {"Les sons doux de musiques érythréennes et éthiopiennes accompagnent votre repas, complétant une immersion culturelle totale. Chaque détail a été pensé pour vous faire voyager, l'espace d'un repas, jusqu'à la Corne de l'Afrique."}
                    </p>
                </section>

                {/* Presse Section */}
                <PresseSection />
            </div>

            <GallerySection />
            <ReserveSection />
        </div>
    );
}
