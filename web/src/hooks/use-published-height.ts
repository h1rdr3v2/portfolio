import { useCallback } from "react"

/**
 * Publishes an element's height as a CSS custom property on :root, so layout
 * that depends on it is expressed in CSS rather than recomputed in JS.
 *
 * The stylesheet carries a sensible default for the server render and for the
 * moment before hydration; this only ever corrects it. Worth the observer
 * because the value genuinely changes — the mobile nav wraps to a second row
 * on narrow screens, and a hardcoded height is wrong the moment it does.
 */
export function usePublishHeight(property: `--${string}`) {
	return useCallback(
		(node: HTMLElement | null) => {
			if (!node) return

			const publish = () => {
				document.documentElement.style.setProperty(
					property,
					`${node.offsetHeight}px`,
				)
			}

			publish()

			if (typeof ResizeObserver === "undefined") return

			const observer = new ResizeObserver(publish)
			observer.observe(node)

			return () => {
				observer.disconnect()
				document.documentElement.style.removeProperty(property)
			}
		},
		[property],
	)
}
