import { cn } from "@/lib/cn"

interface ProjectGalleryProps {
	images: string[]
	projectName: string
	className?: string
}

/**
 * A swipeable strip of screenshots. Scroll-snap does the work, so there is no
 * carousel state to keep in sync and it degrades to a plain scroller wherever
 * snap is unsupported.
 */
export function ProjectGallery({ images, projectName, className }: ProjectGalleryProps) {
	if (images.length === 0) return null

	return (
		<div
			className={cn(
				"-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2",
				className,
			)}
		>
			{images.map((src, index) => (
				<img
					key={src}
					src={src}
					alt={`${projectName} — screenshot ${index + 1} of ${images.length}`}
					loading={index === 0 ? "eager" : "lazy"}
					decoding="async"
					className="h-64 w-auto shrink-0 snap-start rounded-xl border border-rule object-contain md:h-80"
				/>
			))}
		</div>
	)
}
