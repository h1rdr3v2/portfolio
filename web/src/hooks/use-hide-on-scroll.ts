import { useCallback, useEffect, useRef, useState } from "react"

interface Options {
	/** How far down the page before hiding is allowed at all. */
	threshold?: number
	/** Ignore per-frame jitter smaller than this. */
	tolerance?: number
}

/**
 * How far the reader has to travel in one direction before the bar reacts.
 *
 * Momentum scrolling on touch does not move in a straight line — a flick
 * oscillates by a few pixels as it decelerates, and reacting to a single
 * frame's direction makes the bar flicker. Reacting to accumulated travel
 * instead means only a deliberate gesture moves it. Revealing is the cheaper
 * mistake, so it needs less travel than hiding.
 */
const HIDE_AFTER_PX = 64
const SHOW_AFTER_PX = 28

/**
 * Longest a hold can last if `scrollend` never arrives — a safety net, not the
 * expected path.
 */
const MAX_HOLD_MS = 3000

/**
 * Hides a bar while the reader is moving down the page and brings it back the
 * moment they move up — the usual "I want it now" gesture, without giving up
 * the screen height for the whole scroll.
 */
export function useHideOnScrollDown({ threshold = 140, tolerance = 6 }: Options = {}) {
	const [hidden, setHidden] = useState(false)
	const lastY = useRef(0)
	/** Travel in the current direction; sign is the direction. */
	const travel = useRef(0)
	const holding = useRef(false)
	const releaseTimer = useRef(0)

	/**
	 * Pin the bar visible until the scroll it accompanies has finished.
	 *
	 * A nav tap starts a downward glide, which is exactly the gesture that
	 * hides the bar — without this it would retract mid-flight, in the middle
	 * of a movement the reader just asked for. Held until `scrollend` rather
	 * than for a fixed window, because a glide across several thousand pixels
	 * outlasts any duration worth hardcoding.
	 */
	const hold = useCallback(() => {
		holding.current = true
		setHidden(false)

		const release = () => {
			holding.current = false
			// Measure the next real gesture from where we landed, so the glide
			// itself isn't read as one giant downward scroll.
			lastY.current = window.scrollY
			travel.current = 0
			window.clearTimeout(releaseTimer.current)
		}

		window.clearTimeout(releaseTimer.current)
		releaseTimer.current = window.setTimeout(release, MAX_HOLD_MS)

		if ("onscrollend" in window) {
			window.addEventListener("scrollend", release, { once: true })
		}
	}, [])

	useEffect(() => {
		lastY.current = window.scrollY
		let frame = 0

		const measure = () => {
			frame = 0
			const y = window.scrollY

			if (holding.current) {
				lastY.current = y
				return
			}

			const delta = y - lastY.current
			if (Math.abs(delta) < tolerance) return
			lastY.current = y

			// A change of direction starts the count again.
			if (delta > 0 !== travel.current > 0) travel.current = 0
			travel.current += delta

			// Never hide near the top, where there is nothing to reclaim.
			if (y <= threshold) {
				travel.current = 0
				setHidden(false)
				return
			}

			if (travel.current > HIDE_AFTER_PX) setHidden(true)
			else if (travel.current < -SHOW_AFTER_PX) setHidden(false)
		}

		const onScroll = () => {
			if (frame) return
			frame = window.requestAnimationFrame(measure)
		}

		window.addEventListener("scroll", onScroll, { passive: true })
		return () => {
			if (frame) window.cancelAnimationFrame(frame)
			window.clearTimeout(releaseTimer.current)
			window.removeEventListener("scroll", onScroll)
		}
	}, [threshold, tolerance])

	return { hidden, hold }
}
