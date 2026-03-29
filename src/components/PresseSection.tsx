'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

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
    const [hasUsedLoupe, setHasUsedLoupe] = useState(false);
    const [showReactivateHint, setShowReactivateHint] = useState(false);

    const lastClientY = useRef(0);
    const frameRef = useRef<HTMLDivElement>(null);

    const loupeW = LOUPE_PX;
    const loupeH = LOUPE_PX * LOUPE_RATIO;
    const lensCX = LENS_CX * loupeW;
    const lensCY = LENS_CY * loupeH;
    const lensR = Math.min(LENS_RX * loupeW, LENS_RY * loupeH);

    const zoomPct = Math.round(((zoom - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN)) * 100);

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

    const onMove = useCallback((e: React.MouseEvent) => {
        if (!loupeActive || !frameRef.current || draggingWheel) return;
        const r = frameRef.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });

        if (isPanning) {
            const deltaY = e.clientY - lastClientY.current;
            window.scrollBy(0, -deltaY);
            lastClientY.current = e.clientY;
        }
    }, [loupeActive, draggingWheel, isPanning]);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (!loupeActive) return;
        e.preventDefault();
        setIsPanning(true);
        lastClientY.current = e.clientY;
    }, [loupeActive]);

    useEffect(() => {
        if (!isPanning) return;
        const onUp = () => setIsPanning(false);
        window.addEventListener('mouseup', onUp);
        return () => window.removeEventListener('mouseup', onUp);
    }, [isPanning]);

    const onClick = useCallback((e: React.MouseEvent) => {
        if (isPanning) return;
        if (!frameRef.current) return;

        const r = frameRef.current.getBoundingClientRect();

        if (loupeActive) {
            setLoupeActive(false);
            setZoom(ZOOM_DEFAULT);

            if (!hasUsedLoupe) {
                setHasUsedLoupe(true);
                setShowReactivateHint(true);
            }

            return;
        }

        const px = e.clientX - r.left;
        const py = e.clientY - r.top;

        if (hasUsedLoupe) {
            setLoupeActive(true);
            setShowReactivateHint(false);
            setPos({ x: px, y: py });
            return;
        }

        if (px <= 400 && py >= (r.height - 500)) {
            setLoupeActive(true);
            setHintVisible(false);
            setPos({ x: px, y: py });
        }
    }, [loupeActive, isPanning, hasUsedLoupe]);

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
            const delta = dragStartY - clientY;
            setZoom(Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, dragStartZoom + delta * 0.01)));
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

    const bgW = frameSize.w * zoom;
    const bgX = -(pos.x * zoom - lensR);
    const bgY = -(pos.y * zoom - lensR);

    const wheelX = lensCX - lensR - 50;
    const wheelY = lensCY - lensR - 30;

    return (
        <section className="history-presseSection">
            <div
                ref={frameRef}
                className={`history-presseFrame ${loupeActive ? 'loupe-active' : ''}`}
                onMouseMove={onMove}
                onMouseDown={onMouseDown}
                onClick={onClick}
            >
                <img src="/images/journaux2.png" className="history-presseImage" />

                {/* VIGNETTAGE INITIAL (loupe) */}
                {hintVisible && !loupeActive && !showReactivateHint && frameSize.w > 0 && (
                    <>
                        <div
                            className="presse-spotlightOverlay"
                            style={{
                                background: `radial-gradient(
                                    circle at 200px ${frameSize.h - 250}px,
                                    rgba(0,0,0,0) 0px,
                                    rgba(0,0,0,0.15) 140px,
                                    rgba(0,0,0,0.45) 260px,
                                    rgba(0,0,0,0.8) 420px,
                                    rgba(0,0,0,0.95) 100%
                                )`
                            }}
                        />

                        <div className="presse-loupeHint">
                            <span className="presse-loupeHintText">
                                Cliquez sur la loupe
                            </span>

                            <svg width="260" height="80" viewBox="0 0 60 80">
                                <path d="M30 0 C30 30, 15 50, 12 75"
                                      stroke="var(--color-secondary)"
                                      strokeWidth="2"
                                      fill="none"
                                      strokeDasharray="4 3" />
                                <polygon points="6,68 12,80 18,68"
                                         fill="var(--color-secondary)" />
                            </svg>
                        </div>
                    </>
                )}

                {/* MESSAGE CENTRAL */}
                {showReactivateHint && !loupeActive && (
                    <>
                        <div
                            className="presse-spotlightOverlay"
                            style={{
                                background: `radial-gradient(
                                    circle at 50% 50%,
                                    rgba(0,0,0,0.2) 0px,
                                    rgba(0,0,0,0.6) 200px,
                                    rgba(0,0,0,0.9) 100%
                                )`
                            }}
                        />

                        <div className="presse-reactivateCenter">
                            Cliquez n'importe où sur l'image pour réactiver la loupe!
                        </div>
                    </>
                )}

                {loupeActive && (
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

                        <img src="/images/loupe.png" className="presse-loupeImage" />

                        <div
                            className="presse-zoomWheel"
                            style={{ left: wheelX, top: wheelY }}
                            onMouseDown={onWheelGripDown}
                            onTouchStart={onWheelGripDown}
                        >
                            <span className="presse-zoomLabel">
                                {Math.round(zoom * 100)}%
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}