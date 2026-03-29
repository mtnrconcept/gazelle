"use client";

import { useEffect, useRef, useState } from "react";

const gallery = Array.from({ length: 10 }, (_, index) => ({
    src: `/images/galerie/retouche/${index + 1}.png`,
    alt: `Photo ${index + 1}`,
}));

const infiniteGallery = Array.from({ length: 3 }, (_, copyIndex) =>
    gallery.map((item, imageIndex) => ({
        ...item,
        originalIndex: imageIndex,
        key: `${copyIndex}-${imageIndex}`,
    }))
).flat();

export function GallerySection() {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const recenterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isRecenteringRef = useRef(false);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const selectedImage = selectedIndex !== null ? gallery[selectedIndex] : null;
    const currentImageNumber = selectedIndex !== null ? selectedIndex + 1 : 0;

    useEffect(() => {
        const node = carouselRef.current;
        if (!node) return;

        const setInitialPosition = () => {
            const singleSetWidth = node.scrollWidth / 3;
            if (singleSetWidth <= 0) return;

            const previousBehavior = node.style.scrollBehavior;
            node.style.scrollBehavior = "auto";
            node.scrollLeft = singleSetWidth;
            requestAnimationFrame(() => {
                node.style.scrollBehavior = previousBehavior || "smooth";
            });
        };

        requestAnimationFrame(setInitialPosition);

        const handleResize = () => {
            const singleSetWidth = node.scrollWidth / 3;
            if (singleSetWidth <= 0) return;

            const relativeOffset = node.scrollLeft % singleSetWidth;
            const previousBehavior = node.style.scrollBehavior;
            node.style.scrollBehavior = "auto";
            node.scrollLeft = singleSetWidth + relativeOffset;
            requestAnimationFrame(() => {
                node.style.scrollBehavior = previousBehavior || "smooth";
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

    useEffect(() => {
        return () => {
            if (recenterTimeoutRef.current) {
                clearTimeout(recenterTimeoutRef.current);
            }
        };
    }, []);

    const recenterCarouselIfNeeded = () => {
        const node = carouselRef.current;
        if (!node || isRecenteringRef.current) return;

        const singleSetWidth = node.scrollWidth / 3;
        if (singleSetWidth <= 0) return;

        let nextScrollLeft: number | null = null;

        if (node.scrollLeft < singleSetWidth * 0.5) {
            nextScrollLeft = node.scrollLeft + singleSetWidth;
        } else if (node.scrollLeft > singleSetWidth * 1.5) {
            nextScrollLeft = node.scrollLeft - singleSetWidth;
        }

        if (nextScrollLeft === null) return;

        isRecenteringRef.current = true;

        const previousBehavior = node.style.scrollBehavior;
        node.style.scrollBehavior = "auto";
        node.scrollLeft = nextScrollLeft;

        requestAnimationFrame(() => {
            node.style.scrollBehavior = previousBehavior || "smooth";
            isRecenteringRef.current = false;
        });
    };

    const handleCarouselScroll = () => {
        if (isRecenteringRef.current) return;

        if (recenterTimeoutRef.current) {
            clearTimeout(recenterTimeoutRef.current);
        }

        recenterTimeoutRef.current = setTimeout(() => {
            recenterCarouselIfNeeded();
        }, 140);
    };

    const scrollCarousel = (direction: 1 | -1) => {
        const node = carouselRef.current;
        if (!node) return;

        node.scrollBy({
            left: direction * Math.min(node.clientWidth * 0.9, 420),
            behavior: "smooth",
        });
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
                            L&apos;ambiance a la Gazelle d&apos;Or
                        </h2>

                        <h2
                            className="gold-sectionTitle gallery-title gallery-titleMobile"
                            data-text={"L'ambiance a la\nGazelle d'Or"}
                        >
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

                        <div
                            ref={carouselRef}
                            className="gallery-carousel"
                            onScroll={handleCarouselScroll}
                            style={{
                                display: "flex",
                                gap: "24px",
                                overflowX: "auto",
                                scrollBehavior: "smooth",
                                padding: "8px 4px",
                            }}
                        >
                            {infiniteGallery.map((item, idx) => (
                                <div
                                    key={`${item.key}-${idx}`}
                                    className="gallery-slide"
                                    style={{
                                        flex: "0 0 min(320px, 80vw)",
                                        width: "min(320px, 80vw)",
                                        background: "#efe3cf",
                                        border: "1px solid rgba(186, 140, 80, 0.35)",
                                        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.10)",
                                        overflow: "hidden",
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
                                    </button>
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