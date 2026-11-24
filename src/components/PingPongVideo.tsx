'use client';

import Image from 'next/image';

type PingPongVideoProps = {
    src: string;
    className?: string;
    poster?: string;
};

export function PingPongVideo({ src, className, poster }: PingPongVideoProps) {
    const imageSrc = poster || '/images/_assets/resto-C2v7BN2e.jpg';
    const isPrimaryHero = !poster;

    return (
        <div
            data-replaced-video-source={src}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <Image
                src={imageSrc}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                priority={isPrimaryHero}
                quality={72}
                className={className}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />
        </div>
    );
}
