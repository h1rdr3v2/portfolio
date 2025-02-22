import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ExpandableImage({ src, alt }: { src: string | StaticImport; alt: string }) {
    return (
        <div className="w-full overflow-hidden relative rounded-xl" style={{ height: "200px"}} >
            <Image
                src={src}
                alt={alt}
                layout="fill"
                objectFit="cover"
                priority
            />
        </div>
    );
}
