import { useRef } from "react"
import { readTheme, useTheme } from "./theme-provider"
import { cn } from "@/lib/cn"

/**
 * The theme switch is a light bulb beside the name. Switching on spreads
 * light across the page from the bulb; switching off pulls it back into the
 * bulb. Browsers without view transitions just flip.
 */
export function LightSwitch({ className }: { className?: string }) {
	const { theme, toggle } = useTheme()
	const button = useRef<HTMLButtonElement>(null)
	const lit = theme === "light"

	const flip = () => {
		const root = document.documentElement
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		const rect = button.current?.getBoundingClientRect()

		if (!document.startViewTransition || reduced || !rect) {
			toggle()
			return
		}

		// Where the light comes from, and how far it has to reach to cover the page.
		const x = rect.left + rect.width / 2
		const y = rect.top + rect.height / 2
		const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
		root.style.setProperty("--light-x", `${x}px`)
		root.style.setProperty("--light-y", `${y}px`)
		root.style.setProperty("--light-r", `${radius}px`)

		const direction = readTheme() === "dark" ? "theme-to-light" : "theme-to-dark"
		root.classList.add(direction, "theme-switching")

		document
			.startViewTransition(() => toggle())
			.finished.finally(() => root.classList.remove(direction, "theme-switching"))
	}

	return (
		<button
			ref={button}
			type="button"
			onClick={flip}
			aria-label={lit ? "Take the light" : "Bring the light"}
			title={lit ? "Take the light" : "Bring the light"}
			className={cn(
				"group inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-transform active:scale-90",
				className,
			)}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.75"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				className={cn(
					"size-6 transition-[color,filter] duration-300",
					lit
						? "text-amber-400 drop-shadow-[0_0_8px_rgb(251_191_36/0.9)]"
						: "text-muted-foreground group-hover:text-foreground",
				)}
			>
				{/* The glass: filled when lit. */}
				<path
					d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"
					fill={lit ? "currentColor" : "none"}
					fillOpacity={lit ? 0.35 : 0}
					className="transition-[fill-opacity] duration-300"
				/>
				<path d="M9 18h6" />
				<path d="M10 22h4" />
				{/* Rays, only when lit. */}
				<g className={cn("origin-center transition-opacity duration-300", lit ? "opacity-100" : "opacity-0")}>
					<path d="M12 1.5v1" />
					<path d="M4.6 4.6l.7.7" />
					<path d="M19.4 4.6l-.7.7" />
					<path d="M2 10.5h1" />
					<path d="M21 10.5h1" />
				</g>
			</svg>
		</button>
	)
}
