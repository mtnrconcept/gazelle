"use client";

import { useRef } from 'react';

const gallery = [
    { src: '/images/2.webp', alt: "Ambiance La Gazelle d'Or" },
    { src: 'https://lagazelledorgeneva.com/assets/SAMBUSA%20FAIT%20MAISON-D_wwG_sv.jpeg', alt: 'Sambusa fait maison' },
    { src: '/images/3.webp', alt: 'Intérieur du restaurant' },
    { src: 'https://lagazelledorgeneva.com/assets/SALADE%20DU%20CHEF-DwkqqRvX.jpg', alt: 'Salade du Chef' },
    { src: '/images/4.webp', alt: 'Décoration africaine' },
    { src: 'https://lagazelledorgeneva.com/assets/SPECIALITES%20DE%20LA%20MAISON-CNPs4Yvd.png', alt: 'Spécialités de la maison' },
    { src: '/images/5.webp', alt: 'Salle de restaurant' },
    { src: 'https://lagazelledorgeneva.com/assets/LA%20GAZELLE%20ROYALE-EI-niyer.png', alt: 'La Gazelle Royale' },
    { src: 'https://lagazelledorgeneva.com/assets/DORO%20WET-qlKOx6dc.png', alt: 'Doro Wet' },
    { src: '/images/6.webp', alt: 'Ambiance' },
    { src: 'https://lagazelledorgeneva.com/assets/TIMATUM%20SALADE-B7XlvVoD.jpg', alt: 'Timatum Salade' },
    { src: 'https://lagazelledorgeneva.com/assets/D%C3%A9gustation%20de%20L%C3%A9gumes-BHGAtiLV.png', alt: 'Dégustation de légumes' },
];

export function GallerySection() {
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const scrollCarousel = (direction: 1 | -1) => {
        const node = carouselRef.current;
        if (!node) return;

        node.scrollBy({
            left: direction * Math.min(node.clientWidth * 0.9, 420),
            behavior: 'smooth',
        });
    };

    return (
        <section className="gallery-section panel decoratedSection reveal" data-reveal="up">
            <div className="container gallery-container">
                <div className="gallery-header">
                    <p className="gallery-eyebrow">Immersion culturelle</p>
                    <h2 className="gold-sectionTitle gallery-title gallery-titleDesktop" data-text="L'ambiance a la Gazelle d'Or">
                        L&apos;ambiance a la Gazelle d&apos;Or
                    </h2>
                    <h2 className="gold-sectionTitle gallery-title gallery-titleMobile" data-text={"L'ambiance a la\nGazelle d'Or"}>
                        <span>L&apos;ambiance a la</span>
                        <span className="gallery-titleLineSecond">Gazelle d&apos;Or</span>
                    </h2>
                </div>

                <div className="gallery-carouselShell">
                    <button
                        type="button"
                        className="gallery-carouselArrow gallery-carouselArrowLeft"
                        onClick={() => scrollCarousel(-1)}
                        aria-label="Voir les images précédentes"
                    >
                        <span aria-hidden="true">‹</span>
                    </button>

                    <div ref={carouselRef} className="gallery-carousel">
                        {gallery.map((item, idx) => (
                            <div key={`${item.src}-${idx}`} className="gallery-slide">
                                <img src={item.src} alt={item.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="gallery-carouselArrow gallery-carouselArrowRight"
                        onClick={() => scrollCarousel(1)}
                        aria-label="Voir les images suivantes"
                    >
                        <span aria-hidden="true">›</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
