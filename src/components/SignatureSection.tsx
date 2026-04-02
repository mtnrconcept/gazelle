import Image from 'next/image';

const dishes = [
    {
        name: 'La Gazelle Royale',
        description: 'Notre plat signature : Agneau, Zegni et Doro servis sur un grand injera partagé. Le symbole de notre restaurant.',
        price: 'dès 32 CHF',
        image: '/images/_assets/LA%20GAZELLE%20ROYALE-EI-niyer.png'
    },
    {
        name: 'Doro Wet',
        description: 'Poulet juteux mariné au citron, mijoté dans une sauce paprika aux épices ancestrales. Un classique incontournable.',
        price: '27 CHF',
        image: '/images/_assets/DORO%20WET-qlKOx6dc.png'
    },
    {
        name: 'Sambusa Maison',
        description: 'Feuilletés croustillants farcis à la viande ou aux légumes, faits chaque jour dans notre cuisine.',
        price: '3.50 CHF / pièce',
        image: '/images/_assets/SAMBUSA%20FAIT%20MAISON-D_wwG_sv.jpeg'
    },
    {
        name: 'Kitfo',
        description: "Steak tartare érythréen & éthiopien assaisonné d'un beurre aux herbes, de piments rouges et de gingembre frais.",
        price: '30 CHF',
        image: '/images/_assets/KITEFO-D2dNuOak.png'
    },
    {
        name: 'Degustation Vegetarienne',
        description: 'Un assortiment généreux de Shiro, épinards, lentilles rouges et jaunes, chou et laitue sur injera.',
        price: '25 CHF',
        image: '/images/_assets/D%C3%A9gustation%20de%20L%C3%A9gumes-BHGAtiLV.png'
    },
    {
        name: "Tibs d'Agneau",
        description: "Morceaux d'agneau maigre sautés au beurre avec oignons, piments verts et poivre vert exotique.",
        price: '32 CHF',
        image: "/images/_assets/Tibs%20d'agneau-CTyXF8Tl.png"
    }
];

export function SignatureSection() {
    return (
        <section className="signature-section panel decoratedSection reveal" data-reveal="right">
            <div className="container signature-container">
                <div className="signature-header">
                    <p className="signature-eyebrow">{"Escale au cœur de l'Afrique"}</p>
                    <div className="signature-titleRow">
                        <h2 className="gold-sectionTitleMedium signature-title" data-text="Nos plats signatures">Nos plats signatures</h2>
                    </div>
                </div>
                <div className="signature-grid">
                    {dishes.map((dish) => (
                        <article key={dish.name} className="signature-card">
                            <div className="signature-imageWrapper">
                                <Image
                                    src={dish.image}
                                    alt={`${dish.name} - Spécialité authentique érythréenne & éthiopienne à La Gazelle d'Or Genève`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="signature-cardInfo">
                                <h3>{dish.name}</h3>
                                <p>{dish.description}</p>
                                <span className="signature-price">{dish.price}</span>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="signature-ctaRow">
                    <a href="tel:+41223403350" className="signature-ctaButton">
                        Réserver une table
                    </a>
                </div>
            </div>
        </section>
    );
}
