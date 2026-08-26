/**
 * In-page scrolling.
 *
 * Everything goes through `scrollIntoView` so there is exactly one mechanism
 * moving the page — the router does the same thing for hash navigations, and
 * two competing implementations is how you end up with a jump instead of a
 * glide. The landing offset lives in CSS (`scroll-margin-top` via the
 * `data-scroll-target` attribute), not in measurements here, so pinned bars
 * are accounted for by the same rule that lays them out.
 *
 * Smoothness comes from `scroll-behavior: smooth` on the document, which the
 * reduced-motion block in the stylesheet turns off. Passing an explicit
 * `behavior` here would override that preference, so we don't.
 */

/** Longest a smooth scroll is assumed to take, for browsers without scrollend. */
const SCROLL_SETTLE_MS = 700

function prefersReducedMotion(): boolean {
	return (
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	)
}

/**
 * Moves keyboard focus to the section once the scroll has settled, so the next
 * Tab continues from there.
 *
 * Deferred rather than immediate: calling focus() mid-animation is the kind of
 * thing browsers treat as a competing scroll, and the cure would be worse than
 * the a11y gap it closes.
 */
function focusAfterScroll(target: HTMLElement) {
	const takeFocus = () => {
		target.setAttribute("tabindex", "-1")
		target.focus({ preventScroll: true })
	}

	if (prefersReducedMotion()) {
		takeFocus()
		return
	}

	const supportsScrollEnd = "onscrollend" in window

	if (supportsScrollEnd) {
		window.addEventListener("scrollend", takeFocus, { once: true })
	} else {
		window.setTimeout(takeFocus, SCROLL_SETTLE_MS)
	}
}

/** Scrolls a section into view. Returns false if there is no such section. */
export function scrollToSection(id: string): boolean {
	const target = document.getElementById(id)
	if (!target) return false

	target.scrollIntoView({ block: "start" })
	focusAfterScroll(target)
	return true
}

export function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: prefersReducedMotion() ? "auto" : "smooth",
	})
}
