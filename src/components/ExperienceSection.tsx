import Image from 'next/image';
import Link from 'next/link';

const baseUrl = 'https://lagazelledorgeneva.com';

const features = [
    {
        title: 'Cuisine Authentique',
        button: 'Voir le menu',
        image: '/images/5.webp',
        href: '/menu'
    },
    {
        title: 'Ambiance Africaine',
        button: 'Immersion Culturelle',
        image: '/images/2.webp',
        href: '/histoire'
    },
    {
        title: 'Soirees & Evenements',
        button: 'Galerie',
        image: '/images/7.webp',
        href: '/evenements'
    },
    {
        title: 'Service Traiteur',
        button: 'Sur devis',
        image: '/images/8.webp',
        href: '/evenements#traiteur'
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
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
                                    quality={70}
                                    loading="lazy"
                                />
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
