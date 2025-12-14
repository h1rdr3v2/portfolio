"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CrossFadeImageProps {
    images: string[];
    className?: string;
    alt?: string;
}

export function CrossFadeImage({ images, className = "", alt = "Image" }: CrossFadeImageProps) {
    const [dimensions, setDimensions] = useState({ width: 500, height: 300 });

    useEffect(() => {
        const updateSize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) {
                setDimensions({ width: 320, height: 180 }); // Small screens
            } else if (screenWidth < 1024) {
                setDimensions({ width: 500, height: 300 }); // Medium screens
            } else {
                setDimensions({ width: 700, height: 400 }); // Large screens
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div className={`relative ${className} w-full`} style={{ height: dimensions.height }}>
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt={alt}
                    width={dimensions.width}
                    height={dimensions.height}
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 500px, 700px"
                    className="absolute top-0 left-0 rounded-t-lg fade-image"
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        animationDelay: `${-2 * (images.length - 1 - index)}s`
                    }}
                    priority
                />
            ))}
        </div>
    );
}
