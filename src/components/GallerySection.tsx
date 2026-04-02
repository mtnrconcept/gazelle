"use client";

import { useEffect, useMemo, useState } from "react";

const gallery = Array.from({ length: 10 }, (_, index) => ({
    src: `/images/galerie/retouche/${index + 1}.png`,
    alt: `Décoration authentique et ambiance érythréenne & éthiopienne à La Gazelle d'Or Genève - Photo ${index + 1}`,
}));

type InfiniteSlide = {
    src: string;
    alt: string;
    originalIndex: number;
    key: string;
};

export function GallerySection() {
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(3);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth < 768) {
                setSlidesPerView(1);
                return;
            }

            if (window.innerWidth < 1100) {
                setSlidesPerView(2);
                return;
            }

            setSlidesPerView(3);
        };

        updateSlidesPerView();
        window.addEventListener("resize", updateSlidesPerView);

        return () => {
            window.removeEventListener("resize", updateSlidesPerView);
        };
    }, []);

    useEffect(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(slidesPerView);

        const frame = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsTransitionEnabled(true);
            });
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    }, [slidesPerView]);

    const infiniteSlides = useMemo<InfiniteSlide[]>(() => {
        const cloneCount = slidesPerView;

        const slidesBefore = gallery.slice(-cloneCount).map((item, index) => ({
            ...item,
            originalIndex: gallery.length - cloneCount + index,
            key: `before-${gallery.length - cloneCount + index}`,
        }));

        const slidesMain = gallery.map((item, index) => ({
            ...item,
            originalIndex: index,
            key: `main-${index}`,
        }));

        const slidesAfter = gallery.slice(0, cloneCount).map((item, index) => ({
            ...item,
            originalIndex: index,
            key: `after-${index}`,
        }));

        return [...slidesBefore, ...slidesMain, ...slidesAfter];
    }, [slidesPerView]);

    const selectedImage = selectedIndex !== null ? gallery[selectedIndex] : null;
    const currentImageNumber = selectedIndex !== null ? selectedIndex + 1 : 0;

    useEffect(() => {
        if (selectedIndex === null) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedIndex(null);
                return;
            }

            if (event.key === "ArrowRight") {
                setSelectedIndex((prev) => {
                    if (prev === null) return 0;
                    return (prev + 1) % gallery.length;
                });
                return;
            }

            if (event.key === "ArrowLeft") {
                setSelectedIndex((prev) => {
                    if (prev === null) return 0;
                    return (prev - 1 + gallery.length) % gallery.length;
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIndex]);

    const goToNextSlide = () => {
        setIsTransitionEnabled(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const goToPreviousSlide = () => {
        setIsTransitionEnabled(true);
        setCurrentIndex((prev) => prev - 1);
    };

    const handleTrackTransitionEnd = () => {
        const cloneCount = slidesPerView;

        if (currentIndex < cloneCount) {
            setIsTransitionEnabled(false);
            setCurrentIndex(currentIndex + gallery.length);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsTransitionEnabled(true);
                });
            });

            return;
        }

        if (currentIndex >= gallery.length + cloneCount) {
            setIsTransitionEnabled(false);
            setCurrentIndex(currentIndex - gallery.length);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsTransitionEnabled(true);
                });
            });
        }
    };

    const showPreviousImage = () => {
        setSelectedIndex((prev) => {
            if (prev === null) return 0;
            return (prev - 1 + gallery.length) % gallery.length;
        });
    };

    const showNextImage = () => {
        setSelectedIndex((prev) => {
            if (prev === null) return 0;
            return (prev + 1) % gallery.length;
        });
    };

    const closeLightbox = () => {
        setSelectedIndex(null);
    };

    return (
        <>
            <section className="gallery-section panel decoratedSection reveal" data-reveal="up">
                <div className="container gallery-container">
                    <div className="gallery-header">
                        <p className="gallery-eyebrow">Immersion culturelle</p>

                        <h2
                            className="gold-sectionTitle gallery-title gallery-titleDesktop"
                            data-text="L'ambiance a la Gazelle d'Or"
                        >
                            {"L'ambiance a la Gazelle d'Or"}
                        </h2>

                        <h2
                            className="gold-sectionTitle gallery-title gallery-titleMobile"
                            data-text={"L'ambiance a la\nGazelle d'Or"}
                        >
                            <span>{"L'ambiance a la"}</span>
                            <span className="gallery-titleLineSecond">{"Gazelle d'Or"}</span>
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
                            onClick={goToPreviousSlide}
                            aria-label="Voir les images précédentes"
                        >
                            <span aria-hidden="true">‹</span>
                        </button>

                        <div
                            className="gallery-carousel"
                            style={{
                                overflow: "hidden",
                                width: "100%",
                            }}
                        >
                            <div
                                onTransitionEnd={handleTrackTransitionEnd}
                                style={{
                                    display: "flex",
                                    transform: `translateX(-${(100 / slidesPerView) * currentIndex}%)`,
                                    transition: isTransitionEnabled ? "transform 0.5s ease" : "none",
                                }}
                            >
                                {infiniteSlides.map((item, idx) => (
                                    <div
                                        key={`${item.key}-${idx}`}
                                        className="gallery-slide"
                                        style={{
                                            flex: `0 0 ${100 / slidesPerView}%`,
                                            maxWidth: `${100 / slidesPerView}%`,
                                            boxSizing: "border-box",
                                            padding: "0 12px",
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
                                                onClick={() => setSelectedIndex(item.originalIndex)}
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
                                                        width: "100%",
                                                        aspectRatio: "4 / 3",
                                                        overflow: "hidden",
                                                        background: "#1a1a1a",
                                                    }}
                                                >
                                                    <img
                                                        src={item.src}
                                                        alt={item.alt}
                                                        loading="lazy"
                                                        style={{
                                                            display: "block",
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                            objectPosition: "center",
                                                        }}
                                                    />
                                                </div>

                                                <div
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
                        </div>

                        <button
                            type="button"
                            className="gallery-carouselArrow gallery-carouselArrowRight"
                            onClick={goToNextSlide}
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
                        style={{
                            maxWidth: "min(1100px, 92vw)",
                            maxHeight: "88vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "14px",
                        }}
                    >
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "78vh",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain",
                                borderRadius: "16px",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
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