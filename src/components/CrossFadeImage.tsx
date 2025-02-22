"use client";
import Image from "next/image";

interface CrossFadeImageProps {
    images: string[];
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
}

export function CrossFadeImage({
                                   images,
                                   width,
                                   height,
                                   className = "",
                                   alt = "Image",
                               }: CrossFadeImageProps) {
    return (
        <div
            className={`relative ${className} w-full`}
            style={{ height: `${height}px` }}
        >
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt={alt}
                    width={width}
                    height={height}
                    objectFit="cover"
                    className={`absolute top-0 left-0 w-full h-full rounded-t-lg fade-image`}
                    style={{
                        animationDelay: `${-2 * (images.length - 1 - index)}s`
                    }}
                />
            ))}
        </div>
    );
}
