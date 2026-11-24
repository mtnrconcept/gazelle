"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const gallery = Array.from({ length: 10 }, (_, index) => ({
    src: `/images/galerie/retouche/${index + 1}.png`,
    alt: `Décoration authentique et ambiance érythréenne & éthiopienne à La Gazelle d'Or Genève - Photo ${index + 1}`,
}));

export function GallerySection() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const lightboxTouchStartX = useRef(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const selectedImage = selectedIndex !== null ? gallery[selectedIndex] : null;
    const currentImageNumber = selectedIndex !== null ? selectedIndex + 1 : 0;

    const showPreviousImage = useCallback(() => {
        setSelectedIndex((previous) => {
            if (previous === null) return 0;
            return (previous - 1 + gallery.length) % gallery.length;
        });
    }, []);

    const showNextImage = useCallback(() => {
        setSelectedIndex((previous) => {
            if (previous === null) return 0;
            return (previous + 1) % gallery.length;
        });
    }, []);

    const closeLightbox = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    useEffect(() => {
        if (selectedIndex === null) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "ArrowRight") {
                showNextImage();
            } else if (event.key === "ArrowLeft") {
                showPreviousImage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeLightbox, selectedIndex, showNextImage, showPreviousImage]);

    const scrollCarousel = (direction: -1 | 1) => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        carousel.scrollBy({
            left: direction * Math.max(carousel.clientWidth * 0.82, 280),
            behavior: "smooth",
        });
    };

    const handleLightboxTouchStart = (event: React.TouchEvent) => {
        lightboxTouchStartX.current = event.touches[0]?.clientX ?? 0;
    };

    const handleLightboxTouchEnd = (event: React.TouchEvent) => {
        const endX = event.changedTouches[0]?.clientX ?? lightboxTouchStartX.current;
        const delta = endX - lightboxTouchStartX.current;

        if (delta < -50) showNextImage();
        if (delta > 50) showPreviousImage();
    };

    return (
        <>
            <section className="gallery-section panel decoratedSection reveal" data-reveal="up">
                <div className="container gallery-container">
                    <div className="gallery-header">
                        <p className="gallery-eyebrow">Immersion culturelle</p>
                        <h2
                            className="gold-sectionTitle gallery-title"
                            data-text="L'ambiance à la Gazelle d'Or"
                        >
                            L&apos;ambiance à la Gazelle d&apos;Or
                        </h2>
                    </div>

                    <div
                        className="gallery-carouselShell"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <button
                            type="button"
                            className="gallery-carouselArrow gallery-carouselArrowLeft"
                            onClick={() => scrollCarousel(-1)}
                            aria-label="Voir les images précédentes"
                        >
                            <span aria-hidden="true">‹</span>
                        </button>

                        <div
                            ref={carouselRef}
                            className="gallery-carousel"
                            style={{
                                display: "flex",
                                gap: "16px",
                                overflowX: "auto",
                                overflowY: "hidden",
                                width: "100%",
                                scrollSnapType: "x mandatory",
                                scrollBehavior: "smooth",
                                scrollbarWidth: "none",
                                overscrollBehaviorInline: "contain",
                                WebkitOverflowScrolling: "touch",
                            }}
                        >
                            {gallery.map((item, index) => (
                                <div
                                    key={item.src}
                                    className="gallery-slide"
                                    style={{
                                        flex: "0 0 min(86vw, 420px)",
                                        scrollSnapAlign: "center",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <div
                                        style={{
                                            background: "#efe3cf",
                                            border: "1px solid rgba(186, 140, 80, 0.35)",
                                            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.10)",
                                            overflow: "hidden",
                                            height: "100%",
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setSelectedIndex(index)}
                                            aria-label={`Agrandir ${item.alt}`}
                                            style={{
                                                display: "block",
                                                width: "100%",
                                                padding: 0,
                                                border: "none",
                                                background: "transparent",
                                                cursor: "zoom-in",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: "relative",
                                                    width: "100%",
                                                    aspectRatio: "4 / 3",
                                                    overflow: "hidden",
                                                    background: "#1a1a1a",
                                                }}
                                            >
                                                <Image
                                                    src={item.src}
                                                    alt={item.alt}
                                                    fill
                                                    sizes="(max-width: 768px) 86vw, 420px"
                                                    quality={70}
                                                    loading="lazy"
                                                    style={{
                                                        objectFit: "cover",
                                                        objectPosition: "center",
                                                    }}
                                                />
                                            </div>
                                            <div
                                                aria-hidden="true"
                                                style={{
                                                    height: "56px",
                                                    background: "#efe3cf",
                                                }}
                                            />
                                        </button>
                                    </div>
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

            {selectedImage && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Aperçu agrandi de ${selectedImage.alt}`}
                    onClick={closeLightbox}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        background: "rgba(0, 0, 0, 0.92)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px",
                    }}
                >
                    <button
                        type="button"
                        onClick={closeLightbox}
                        aria-label="Fermer l'image agrandie"
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            width: "48px",
                            height: "48px",
                            borderRadius: "999px",
                            border: "1px solid rgba(255,255,255,0.25)",
                            background: "rgba(255,255,255,0.1)",
                            color: "#fff",
                            fontSize: "28px",
                            lineHeight: 1,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(6px)",
                        }}
                    >
                        ×
                    </button>

                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            showPreviousImage();
                        }}
                        aria-label="Image précédente"
                        style={{
                            position: "absolute",
                            left: "20px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "52px",
                            height: "52px",
                            borderRadius: "999px",
                            border: "1px solid rgba(255,255,255,0.25)",
                            background: "rgba(255,255,255,0.1)",
                            color: "#fff",
                            fontSize: "32px",
                            lineHeight: 1,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(6px)",
                        }}
                    >
                        ‹
                    </button>

                    <div
                        onClick={(event) => event.stopPropagation()}
                        onTouchStart={handleLightboxTouchStart}
                        onTouchEnd={handleLightboxTouchEnd}
                        style={{
                            maxWidth: "min(1100px, 92vw)",
                            maxHeight: "88vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "14px",
                            touchAction: "pan-y",
                        }}
                    >
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            width={1600}
                            height={1200}
                            sizes="(max-width: 1100px) 92vw, 1100px"
                            quality={85}
                            draggable={false}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "78vh",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain",
                                borderRadius: "16px",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                                userSelect: "none",
                            }}
                        />

                        <p
                            style={{
                                margin: 0,
                                color: "#fff",
                                fontSize: "14px",
                                textAlign: "center",
                                opacity: 0.9,
                            }}
                        >
                            {selectedImage.alt} — {currentImageNumber} / {gallery.length}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            showNextImage();
                        }}
                        aria-label="Image suivante"
                        style={{
                            position: "absolute",
                            right: "20px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "52px",
                            height: "52px",
                            borderRadius: "999px",
                            border: "1px solid rgba(255,255,255,0.25)",
                            background: "rgba(255,255,255,0.1)",
                            color: "#fff",
                            fontSize: "32px",
                            lineHeight: 1,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(6px)",
                        }}
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
}
