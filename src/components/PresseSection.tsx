'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

// Image loupe.png: 1011x892 — flip horizontal via CSS
// Cercle rouge original: centre (21.9%, 23.3%), rayon ~190px
// Après flip: centre X = 100% - 21.9% = 78.1%
const LOUPE_RATIO = 892 / 1011;
const LENS_CX = 0.781;
const LENS_CY = 0.233;
const LENS_RX = 0.188;
const LENS_RY = 0.213;
const LOUPE_PX = 420;
const ZOOM_MIN = 1.1;
const ZOOM_MAX = 4;
const ZOOM_DEFAULT = 1.25;
export function PresseSection() {
    const [loupeActive, setLoupeActive] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(ZOOM_DEFAULT);
    const [frameSize, setFrameSize] = useState({ w: 0, h: 0 });
    const [hintVisible, setHintVisible] = useState(true);
    const [draggingWheel, setDraggingWheel] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragStartZoom, setDragStartZoom] = useState(ZOOM_DEFAULT);
    const [isPanning, setIsPanning] = useState(false);
    const lastClientY = useRef(0);
    const frameRef = useRef<HTMLDivElement>(null);

    // Dimensions loupe
    const loupeW = LOUPE_PX;
    const loupeH = LOUPE_PX * LOUPE_RATIO;
    const lensCX = LENS_CX * loupeW;
    const lensCY = LENS_CY * loupeH;
    const lensR = Math.min(LENS_RX * loupeW, LENS_RY * loupeH);

    // Pourcentage de zoom pour l'affichage
    const zoomPct = Math.round(((zoom - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN)) * 100);

    // Sync frameSize from ref via effect
    useEffect(() => {
        if (!frameRef.current) return;
        const update = () => {
            const r = frameRef.current?.getBoundingClientRect();
            if (r) setFrameSize({ w: r.width, h: r.height });
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [loupeActive]);

    // ── Desktop: mouse move (loupe suit le curseur + scroll si panning) ──
    const onMove = useCallback((e: React.MouseEvent) => {
        if (!loupeActive || !frameRef.current || draggingWheel) return;
        const r = frameRef.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
        setFrameSize({ w: r.width, h: r.height });

        // Panning: maintenir clic enfoncé et bouger pour scroller la page
        if (isPanning) {
            const deltaY = e.clientY - lastClientY.current;
            window.scrollBy(0, -deltaY);
            lastClientY.current = e.clientY;
        }
    }, [loupeActive, draggingWheel, isPanning]);

    // ── Mousedown: démarrer le panning ──
    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (!loupeActive) return;
        e.preventDefault();
        setIsPanning(true);
        lastClientY.current = e.clientY;
    }, [loupeActive]);

    // ── Mouseup global: arrêter le panning ──
    useEffect(() => {
        if (!isPanning) return;
        const onUp = () => setIsPanning(false);
        window.addEventListener('mouseup', onUp);
        return () => window.removeEventListener('mouseup', onUp);
    }, [isPanning]);

    // ── Click pour activer/désactiver ──
    const onClick = useCallback((e: React.MouseEvent) => {
        // Si on vient de panner, ne pas désactiver
        if (isPanning) return;
        if (loupeActive) {
            setLoupeActive(false);
            setZoom(ZOOM_DEFAULT);
            return;
        }
        if (!frameRef.current) return;
        const r = frameRef.current.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        if (px <= 400 && py >= (r.height - 500)) {
            setLoupeActive(true);
            setHintVisible(false);
            setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
        }
    }, [loupeActive, isPanning]);

    // ── Desktop: molette de la souris pour zoomer ──
    useEffect(() => {
        if (!loupeActive || !frameRef.current) return;
        const el = frameRef.current;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            setZoom(z => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z - e.deltaY * 0.003)));
        };
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [loupeActive]);

    // ── Mobile: touch move pour déplacer la loupe ──
    useEffect(() => {
        if (!loupeActive || !frameRef.current) return;
        const el = frameRef.current;
        const onTouch = (e: TouchEvent) => {
            if (draggingWheel) return;
            e.preventDefault();
            const t = e.touches[0];
            const r = el.getBoundingClientRect();
            setPos({ x: t.clientX - r.left, y: t.clientY - r.top });
        };
        el.addEventListener('touchmove', onTouch, { passive: false });
        return () => el.removeEventListener('touchmove', onTouch);
    }, [loupeActive, draggingWheel]);

    // ── Mobile: tap pour activer ──
    useEffect(() => {
        if (loupeActive || !frameRef.current) return;
        const el = frameRef.current;
        const onTouch = (e: TouchEvent) => {
            const t = e.touches[0];
            const r = el.getBoundingClientRect();
            const px = t.clientX - r.left;
            const py = t.clientY - r.top;
            if (px <= 400 && py >= (r.height - 500)) {
                e.preventDefault();
                setLoupeActive(true);
                setHintVisible(false);
                setPos({ x: t.clientX - r.left, y: t.clientY - r.top });
            }
        };
        el.addEventListener('touchstart', onTouch, { passive: false });
        return () => el.removeEventListener('touchstart', onTouch);
    }, [loupeActive]);

    // ── Escape ──
    useEffect(() => {
        if (!loupeActive) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setLoupeActive(false); setZoom(ZOOM_DEFAULT); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [loupeActive]);

    // ── Drag de la molette graphique (mobile + desktop) ──
    const onWheelGripDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggingWheel(true);
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setDragStartY(clientY);
        setDragStartZoom(zoom);
    }, [zoom]);

    useEffect(() => {
        if (!draggingWheel) return;
        const onMoveGlobal = (e: MouseEvent | TouchEvent) => {
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            const delta = dragStartY - clientY; // monter = zoom+
            const newZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, dragStartZoom + delta * 0.01));
            setZoom(newZoom);
        };
        const onUp = () => setDraggingWheel(false);
        window.addEventListener('mousemove', onMoveGlobal);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchmove', onMoveGlobal);
        window.addEventListener('touchend', onUp);
        return () => {
            window.removeEventListener('mousemove', onMoveGlobal);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchmove', onMoveGlobal);
            window.removeEventListener('touchend', onUp);
        };
    }, [draggingWheel, dragStartY, dragStartZoom]);

    // Calcul du background zoom
    const bgW = frameSize.w * zoom;
    const bgX = -(pos.x * zoom - lensR);
    const bgY = -(pos.y * zoom - lensR);

    // Position de la molette: à gauche de la lentille, remontée
    const wheelX = lensCX - lensR - 50;
    const wheelY = lensCY - lensR - 30;

    return (
        <section className="history-presseSection reveal" data-reveal="up">
            <div className="history-presseHeader">
                <span className="history-eyebrow">Ils parlent de nous</span>
                <h2 className="gold-sectionTitle history-sectionTitle" data-text="La presse en parle">La presse en parle</h2>
            </div>
            <div
                ref={frameRef}
                className={`history-presseFrame ${loupeActive ? 'loupe-active' : ''}`}
                onMouseMove={onMove}
                onMouseDown={onMouseDown}
                onClick={onClick}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/journaux2.png"
                    alt="Coupures de presse sur La Gazelle d'Or"
                    className="history-presseImage"
                />
                <div className="history-presseOverlay" aria-hidden="true" />

                {/* Vignettage + hint */}
                {hintVisible && !loupeActive && (
                    <>
                        <div className="presse-spotlightOverlay" aria-hidden="true" />
                        <div className="presse-loupeHint">
                            <span className="presse-loupeHintText">Cliquez sur la loupe</span>
                            <svg className="presse-loupeHintArrow" width="60" height="80" viewBox="0 0 60 80">
                                <path d="M30 0 C30 30, 15 50, 12 75" stroke="var(--color-secondary)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
                                <polygon points="6,68 12,80 18,68" fill="var(--color-secondary)" />
                            </svg>
                        </div>
                    </>
                )}

                {/* Loupe interactive */}
                {loupeActive && frameSize.w > 0 && (
                    <div
                        className="presse-loupeLens"
                        style={{
                            left: pos.x - lensCX,
                            top: pos.y - lensCY,
                            width: loupeW,
                            height: loupeH,
                        }}
                    >
                        <div
                            className="presse-loupeLensZoom"
                            style={{
                                left: lensCX - lensR,
                                top: lensCY - lensR,
                                width: lensR * 2,
                                height: lensR * 2,
                                backgroundImage: 'url(/images/journaux2.png)',
                                backgroundSize: `${bgW}px auto`,
                                backgroundPosition: `${bgX}px ${bgY}px`,
                            }}
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/loupe.png" alt="" className="presse-loupeImage" draggable={false} />

                        {/* Molette de zoom */}
                        <div
                            className="presse-zoomWheel"
                            style={{ left: wheelX, top: wheelY }}
                            onMouseDown={onWheelGripDown}
                            onTouchStart={onWheelGripDown}
                        >
                            <span className="presse-zoomLabel">{Math.round(zoom * 100)}%</span>
                            <svg width="36" height={lensR * 2} viewBox={`0 0 36 ${lensR * 2}`} className="presse-zoomWheelSvg">
                                {/* Rail */}
                                <rect x="15" y="18" width="6" height={lensR * 2 - 36} rx="3" fill="rgba(60,40,20,0.5)" />
                                {/* Graduations */}
                                {Array.from({ length: 9 }, (_, i) => (
                                    <rect key={i} x="10" y={22 + i * ((lensR * 2 - 44) / 8)} width="16" height="1" fill="rgba(217,162,79,0.4)" rx="0.5" />
                                ))}
                                {/* Curseur */}
                                <rect
                                    x="4" y={lensR * 2 - 26 - zoomPct * ((lensR * 2 - 52) / 100)}
                                    width="28" height="12" rx="4"
                                    fill="var(--color-secondary)"
                                    stroke="rgba(60,40,20,0.6)" strokeWidth="1"
                                />
                                {/* +/- */}
                                <text x="18" y="14" textAnchor="middle" fontSize="13" fill="var(--color-secondary)" fontWeight="bold">+</text>
                                <text x="18" y={lensR * 2 - 4} textAnchor="middle" fontSize="13" fill="var(--color-secondary)" fontWeight="bold">&minus;</text>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
            {loupeActive && (
                <p className="presse-loupeExit">Cliquez pour d&eacute;sactiver &bull; Molette pour zoomer</p>
            )}
        </section>
    );
}
