import { useEffect, useState } from "react"
import type { ProjectImage } from "@/types"
import { Modal } from "@/components/ui/modal"
import { Icon } from "@/components/ui/icons"

interface LightboxProps {
	images: ProjectImage[]
	index: number | null
	onClose: () => void
	title: string
}

/** Full-size screenshots, one at a time, with arrow keys and buttons to move. */
export function Lightbox({ images, index, onClose, title }: LightboxProps) {
	const [current, setCurrent] = useState(0)
	const open = index !== null

	useEffect(() => {
		if (index !== null) setCurrent(index)
	}, [index])

	useEffect(() => {
		if (!open) return
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length)
			if (event.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length)
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [open, images.length])

	const image = images[current]

	return (
		<Modal
			open={open}
			onClose={onClose}
			title={`${title} screenshots`}
			className="w-[min(1100px,calc(100vw-2rem))] border-0 bg-transparent shadow-none"
		>
			<div className="relative flex h-[88vh] items-center justify-center">
				{image ? (
					<img
						src={image.url}
						alt={`${title} — screenshot ${current + 1} of ${images.length}`}
						width={image.width ?? undefined}
						height={image.height ?? undefined}
						className="max-h-full max-w-full rounded-lg object-contain"
					/>
				) : null}

				<button
					type="button"
					onClick={onClose}
					aria-label="Close"
					className="absolute top-2 right-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
				>
					<Icon name="close" className="size-4" />
				</button>

				{images.length > 1 ? (
					<>
						<button
							type="button"
							onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
							aria-label="Previous screenshot"
							className="absolute top-1/2 left-2 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
						>
							<Icon name="left" className="size-5" />
						</button>
						<button
							type="button"
							onClick={() => setCurrent((c) => (c + 1) % images.length)}
							aria-label="Next screenshot"
							className="absolute top-1/2 right-2 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
						>
							<Icon name="right" className="size-5" />
						</button>
						<p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white">
							{current + 1} / {images.length}
						</p>
					</>
				) : null}
			</div>
		</Modal>
	)
}
