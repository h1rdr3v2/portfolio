import { cn } from "@/lib/cn"

export interface ShowcaseSlide {
	src: string
	alt: string
}

interface ShowcasePaneProps {
	slides: ShowcaseSlide[]
	activeIndex: number
	label: string
	/** Jump straight to a slide from the indicator dots. */
	onSelect?: (index: number) => void
	className?: string
}

/**
 * The pinned companion to the featured copy: one screenshot at a time,
 * cross-fading as you scroll past each project.
 *
 * The shots are store-listing images that already include their own device
 * mockup, so this deliberately renders no bezel of its own — a frame around a
 * framed screenshot reads as a mistake. `object-contain` keeps portrait phone
 * shots and landscape marketing shots on the same shelf.
 */
export function ShowcasePane({
	slides,
	activeIndex,
	label,
	onSelect,
	className,
}: ShowcasePaneProps) {
	return (
		<div
			className={cn(
				"relative h-full bg-linear-to-b from-tint to-transparent",
				className,
			)}
		>
			<p className="absolute inset-x-0 top-5 z-10 px-4 text-center font-mono text-xs text-faint">
				{label}
			</p>

			<div className="absolute inset-0 flex items-center justify-center px-8 py-16">
				{slides.map((slide, index) => (
					<img
						key={slide.src}
						src={slide.src}
						alt={slide.alt}
						loading={index === 0 ? "eager" : "lazy"}
						decoding="async"
						aria-hidden={index !== activeIndex}
						className={cn(
							"absolute max-h-full max-w-full rounded-2xl object-contain shadow-[0_30px_60px_-22px_rgb(15_19_16/0.45)] transition-opacity duration-500 ease-out",
							index === activeIndex ? "opacity-100" : "opacity-0",
						)}
					/>
				))}
			</div>

			{slides.length > 1 ? (
				<div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
					{slides.map((slide, index) => (
						<button
							key={slide.src}
							type="button"
							onClick={() => onSelect?.(index)}
							aria-label={`Show ${slide.alt}`}
							aria-current={index === activeIndex}
							className={cn(
								"h-[3px] w-6.5 cursor-pointer rounded-sm transition-colors duration-300",
								index === activeIndex ? "bg-accent" : "bg-rule",
							)}
						/>
					))}
				</div>
			) : null}
		</div>
	)
}
