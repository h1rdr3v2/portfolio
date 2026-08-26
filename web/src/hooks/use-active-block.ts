import { useEffect, useState, type RefObject } from "react"

interface Options {
	/** Selector for the blocks, scoped to the container. */
	selector?: string
	/**
	 * Where the "reading line" sits, in px from the viewport top. Defaults to
	 * mid-screen. Passed as a function because on stacked layouts the line
	 * depends on the height of a pinned element that changes with the viewport.
	 */
	getLine?: () => number
}

const midScreen = () => window.innerHeight * 0.5

/**
 * Tracks which of a set of stacked blocks is currently being read, so a pinned
 * companion element can follow along.
 */
export function useActiveBlock(
	containerRef: RefObject<HTMLElement | null>,
	{ selector = "[data-block]", getLine = midScreen }: Options = {},
): number {
	const [active, setActive] = useState(0)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		let frame = 0

		const measure = () => {
			frame = 0
			const blocks = Array.from(container.querySelectorAll<HTMLElement>(selector))
			if (blocks.length === 0) return

			const line = getLine()
			let next = 0

			blocks.forEach((block, index) => {
				const box = block.getBoundingClientRect()
				if (box.top <= line && box.bottom > line) next = index
			})

			setActive((previous) => (previous === next ? previous : next))
		}

		const onScroll = () => {
			if (frame) return
			frame = window.requestAnimationFrame(measure)
		}

		measure()
		window.addEventListener("scroll", onScroll, { passive: true })
		window.addEventListener("resize", onScroll)

		return () => {
			if (frame) window.cancelAnimationFrame(frame)
			window.removeEventListener("scroll", onScroll)
			window.removeEventListener("resize", onScroll)
		}
	}, [containerRef, selector, getLine])

	return active
}
