import { useEffect, useState } from "react"

/**
 * A hairline at the top of the viewport showing how far through the post you
 * are. Driven by scroll position rather than an observer because it needs a
 * continuous value, not a threshold.
 */
export function ReadingProgress() {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		let frame = 0

		const measure = () => {
			frame = 0
			const scrollable =
				document.documentElement.scrollHeight - window.innerHeight
			setProgress(scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100)
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
	}, [])

	return (
		<div
			aria-hidden="true"
			className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent transition-transform duration-75"
			style={{ transform: `scaleX(${progress / 100})` }}
		/>
	)
}
