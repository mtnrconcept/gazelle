import Link from 'next/link';

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
        <section className="experience-section panel">
            <div className="container experience-container">
                <div className="experience-grid">
                    {features.map((item) => (
                        <article key={item.title} className="experience-card">
                            {/* Title at top */}
                            <div className="experience-cardHeader">
                                <h3 className="experience-cardTitle">{item.title}</h3>
                                <span className="experience-diamond">◆</span>
                            </div>

                            {/* Circular image */}
                            <div className="experience-imageWrapper">
                                <img src={`${baseUrl}${encodeURI(item.image)}`} alt={item.title} loading="lazy" />
                            </div>

                            {/* Button at bottom */}
                            <Link href={item.href} className="experience-cardButton">
                                {item.button}
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
