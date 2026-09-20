import { useEffect, useRef, useState } from "react"

const WAVE_MS = 1800

/** The 👋 in the intro. Waves when the pointer arrives, and again once it has finished. */
export function WavingHand() {
	const [waving, setWaving] = useState(false)
	const timeout = useRef<number | null>(null)
	const busyUntil = useRef(0)

	const wave = () => {
		if (timeout.current) window.clearTimeout(timeout.current)
		setWaving(false)
		// Re-triggering the CSS animation needs a frame where the attribute is off.
		window.requestAnimationFrame(() => setWaving(true))
		busyUntil.current = Date.now() + WAVE_MS
		timeout.current = window.setTimeout(() => setWaving(false), WAVE_MS)
	}

	useEffect(() => {
		return () => {
			if (timeout.current) window.clearTimeout(timeout.current)
		}
	}, [])

	return (
		<span
			role="img"
			aria-label="waving hand"
			onMouseEnter={wave}
			onMouseMove={() => {
				if (Date.now() > busyUntil.current) wave()
			}}
		>
			<span className="waving-hand" data-waving={waving}>
				👋
			</span>
		</span>
	)
}
