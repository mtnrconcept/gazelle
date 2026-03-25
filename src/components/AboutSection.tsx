import Link from 'next/link';
import { PingPongVideo } from './PingPongVideo';

export function AboutSection() {
    return (
        <section className="about-section reveal" data-reveal="right">
            <div className="container about-container">
                <div className="about-content">
                    <span className="about-kicker">Notre héritage</span>
                    <h2 className="gold-sectionTitle about-title" data-text="Une Passion Familiale">Une Passion Familiale</h2>
                    <p className="about-text">
                        Notre maison est née de la passion pour la cuisine érythréenne et éthiopienne authentique.
                        Nous avons ramené à Genève les recettes traditionnelles de notre famille, transmises de génération en génération.
                    </p>
                    <p className="about-text">
                        Chaque plat raconte une histoire, chaque saveur évoque un souvenir d'enfance.
                        Nous utilisons des ingrédients importés directement d'Érythrée et d'Éthiopie.
                    </p>
                    <div className="about-stats">
                        <div className="about-stat">
                            <span className="about-statValue">34+</span>
                            <span className="about-statLabel">Années de savoir-faire</span>
                        </div>
                        <div className="about-stat">
                            <span className="about-statValue">40</span>
                            <span className="about-statLabel">Places intimes</span>
                        </div>
                        <div className="about-stat">
                            <span className="about-statValue">100%</span>
                            <span className="about-statLabel">Injera maison</span>
                        </div>
                    </div>
                    <Link href="/histoire" className="about-link">
                        Lire notre histoire →
                    </Link>
                </div>
                <div className="about-media">
                    <div className="about-imageWrapper">
                        <PingPongVideo
                            src="/images/caf%C3%A9.mp4"
                            poster="/images/caf%C3%A9.png"
                            className="about-image"
                        />
                    </div>
                    <div className="about-highlightCard">
                        <span className="about-highlightTitle">Cafe et The traditionnel</span>
                        <p>Découvrez la richesse des arômes du café et du thé traditionnels et laissez-vous transporter par leur goût authentique.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
