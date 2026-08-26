import { useCallback } from "react"

/**
 * Elements fade up once, the first time they scroll into view.
 *
 * One observer is shared by the whole page rather than one per element, and
 * elements register themselves through a ref callback — so a section that is
 * mounted later (a filtered grid, a newly revealed list) is picked up without
 * anything re-scanning the document.
 */

/** Delay between siblings revealing, and how many siblings still get one. */
const STAGGER_STEP = 60
const STAGGER_CAP = 6

let observer: IntersectionObserver | null = null

function markShown(element: Element) {
	const attribute = element.hasAttribute("data-uli") ? "data-uli" : "data-reveal"
	element.setAttribute(attribute, "shown")
}

function getObserver(): IntersectionObserver {
	if (observer) return observer

	observer = new IntersectionObserver(
		(entries, self) => {
			entries.forEach((entry, index) => {
				if (!entry.isIntersecting) return
				const element = entry.target
				// Stagger items that come into view together, but cap it: a dense
				// list of sixteen rows would otherwise cascade for a full second.
				window.setTimeout(() => markShown(element), Math.min(index, STAGGER_CAP) * STAGGER_STEP)
				self.unobserve(element)
			})
		},
		{ rootMargin: "0px 0px -10% 0px" },
	)

	return observer
}

/** Ref callback that opts an element into the reveal animation. */
export function useRevealRef<T extends Element>() {
	return useCallback((node: T | null) => {
		if (!node) return

		if (typeof IntersectionObserver === "undefined") {
			markShown(node)
			return
		}

		const active = getObserver()
		active.observe(node)
		return () => active.unobserve(node)
	}, [])
}
