import { useState } from "react"
import type { ProjectImage } from "@/types"
import { cn } from "@/lib/cn"
import { Lightbox } from "./lightbox"

interface ProjectFrameProps {
	images: ProjectImage[]
	name: string
	/** The first image loads eagerly when the frame is above the fold. */
	eager?: boolean
}

const STRIP_COUNT = 3
const THUMB_COUNT = 4

function isPortrait(image: ProjectImage): boolean {
	return image.width !== null && image.height !== null && image.height > image.width
}

/**
 * The screenshots at the top of a featured project, in the first site's
 * bordered frame. Phone shots stand three abreast; a desktop shot fills the
 * frame with a thumbnail strip under it. Either way a click opens the lightbox.
 */
export function ProjectFrame({ images, name, eager = false }: ProjectFrameProps) {
	const [active, setActive] = useState(0)
	const [lightbox, setLightbox] = useState<number | null>(null)

	if (images.length === 0) {
		return (
			<div className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-frame bg-card">
				<span className="text-5xl font-bold text-muted-foreground/30 select-none">{name.charAt(0)}</span>
			</div>
		)
	}

	const strip = images[0] !== undefined && isPortrait(images[0]) && images.length >= 2
	const activeImage = images[active] ?? images[0]

	return (
		<div className="group/frame">
			{strip ? (
				<button
					type="button"
					onClick={() => setLightbox(0)}
					aria-label={`Open ${name} screenshots`}
					className="flex w-full cursor-pointer items-end justify-center gap-3 overflow-hidden rounded-lg border-2 border-frame bg-card px-5 pt-5"
				>
					{images.slice(0, STRIP_COUNT).map((image, index) => (
						<img
							key={image.url}
							src={image.url}
							alt={`${name} — screenshot ${index + 1}`}
							width={image.width ?? undefined}
							height={image.height ?? undefined}
							loading={eager && index === 0 ? "eager" : "lazy"}
							decoding="async"
							className="w-[31%] rounded-t-lg shadow-[0_-8px_30px_-10px_rgb(0_0_0/0.5)] transition-transform duration-500 group-hover/frame:-translate-y-1"
						/>
					))}
				</button>
			) : (
				<>
					<button
						type="button"
						onClick={() => setLightbox(active)}
						aria-label={`Open ${name} screenshots`}
						className="block w-full cursor-pointer overflow-hidden rounded-lg border-2 border-frame bg-card"
					>
						{activeImage ? (
							<img
								src={activeImage.url}
								alt={`${name} — screenshot ${active + 1}`}
								width={activeImage.width ?? undefined}
								height={activeImage.height ?? undefined}
								loading={eager ? "eager" : "lazy"}
								decoding="async"
								className="max-h-[420px] w-full object-cover object-top transition-transform duration-500 group-hover/frame:scale-[1.02]"
							/>
						) : null}
					</button>

					{images.length > 1 ? (
						<div className="mt-2 flex gap-2">
							{images.slice(0, THUMB_COUNT).map((image, index) => (
								<button
									key={image.url}
									type="button"
									onClick={() => setActive(index)}
									aria-label={`Show screenshot ${index + 1}`}
									aria-current={index === active}
									className={cn(
										"size-14 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-colors",
										index === active ? "border-frame" : "border-frame/20 hover:border-frame",
									)}
								>
									<img
										src={image.url}
										alt=""
										loading="lazy"
										decoding="async"
										className="size-full object-cover"
									/>
								</button>
							))}
							{images.length > THUMB_COUNT ? (
								<button
									type="button"
									onClick={() => setLightbox(THUMB_COUNT)}
									className="flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-frame/20 text-xs text-muted-foreground transition-colors hover:border-frame"
								>
									+{images.length - THUMB_COUNT}
								</button>
							) : null}
						</div>
					) : null}
				</>
			)}

			<Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} title={name} />
		</div>
	)
}
