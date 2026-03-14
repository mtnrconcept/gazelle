import Link from 'next/link';

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
                        <img
                            src="/images/1.jpg"
                            alt="Cuisine traditionnelle"
                            className="about-image"
                            loading="lazy"
                        />
                    </div>
                    <div className="about-highlightCard">
                        <span className="about-highlightTitle">Ceremonie du cafe</span>
                        <p>Un rituel sensoriel où les grains sont torréfiés sur place, accompagné d'encens traditionnel.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
