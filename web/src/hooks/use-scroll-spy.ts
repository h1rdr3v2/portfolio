import { useEffect, useState } from "react"

/**
 * Returns the id of the section currently occupying the reading position.
 *
 * Uses scroll position rather than IntersectionObserver ratios: sections here
 * differ wildly in height, and "the last heading you scrolled past" is what a
 * reader expects a nav to highlight — ratio-based spies pick the tallest
 * section instead.
 */
export function useScrollSpy(ids: string[], offset = 140): string | null {
	const [activeId, setActiveId] = useState<string | null>(null)

	useEffect(() => {
		if (ids.length === 0) return

		let frame = 0

		const measure = () => {
			frame = 0
			const line = window.scrollY + offset
			let current: string | null = null

			for (const id of ids) {
				const element = document.getElementById(id)
				if (!element) continue
				if (element.offsetTop <= line) current = id
			}

			// At the very bottom the last section may never reach the line.
			const atBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 2
			if (atBottom) current = ids[ids.length - 1] ?? current

			setActiveId((previous) => (previous === current ? previous : current))
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
	}, [ids, offset])

	return activeId
}
