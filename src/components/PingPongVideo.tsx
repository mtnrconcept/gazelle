'use client';

import { useRef, useEffect } from 'react';

type PingPongVideoProps = {
    src: string;
    className?: string;
    poster?: string;
};

export function PingPongVideo({ src, className, poster }: PingPongVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<ImageBitmap[]>([]);
    const capturedRef = useRef(false);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let cancelled = false;
        let pendingCaptures = 0;
        let captureId = 0;

        function captureFrame() {
            if (!video || !ctx || cancelled || video.paused || video.ended) return;

            if (canvas.width !== video.videoWidth) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            }

            ctx.drawImage(video, 0, 0);
            pendingCaptures++;
            createImageBitmap(canvas).then(bitmap => {
                if (!cancelled) {
                    framesRef.current.push(bitmap);
                }
                pendingCaptures--;
            });

            captureId = requestAnimationFrame(captureFrame);
        }

        function startReverse() {
            if (!video || !canvas || !ctx || cancelled) return;

            // Wait until all async bitmap captures have resolved
            if (pendingCaptures > 0) {
                setTimeout(startReverse, 30);
                return;
            }

            const frames = framesRef.current;
            if (frames.length === 0) {
                video.currentTime = 0;
                video.play();
                return;
            }

            // Match the original playback FPS
            const fps = frames.length / (video.duration || 1);
            const interval = 1000 / fps;
            let idx = frames.length - 1;

            // Swap: show canvas, hide video
            canvas.style.display = 'block';
            video.style.display = 'none';

            function drawNext() {
                if (cancelled || !ctx) return;
                if (idx < 0) {
                    // Reverse done → swap back to video, play forward
                    canvas.style.display = 'none';
                    video!.style.display = 'block';
                    video!.currentTime = 0;
                    video!.play();
                    return;
                }
                ctx.drawImage(frames[idx], 0, 0);
                idx--;
                setTimeout(drawNext, interval);
            }

            drawNext();
        }

        function onPlay() {
            if (!capturedRef.current) {
                captureFrame();
            }
        }

        function onEnded() {
            cancelAnimationFrame(captureId);
            capturedRef.current = true;
            startReverse();
        }

        video.addEventListener('play', onPlay);
        video.addEventListener('ended', onEnded);

        return () => {
            cancelled = true;
            cancelAnimationFrame(captureId);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('ended', onEnded);
            framesRef.current.forEach(b => b.close());
            framesRef.current = [];
        };
    }, []);

    const cropStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        scale: '1.08',
        objectPosition: 'top left',
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                poster={poster}
                className={className}
                style={cropStyle}
            >
                <source src={src} type="video/mp4" />
            </video>
            <canvas
                ref={canvasRef}
                className={className}
                style={{ ...cropStyle, display: 'none' }}
            />
        </div>
    );
}
