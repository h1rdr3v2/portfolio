import { useRevealRef } from "@/hooks/use-reveal"

/**
 * Uli — the Igbo line-drawing tradition — used as the section rule in the Igbo
 * variant. It draws itself in once on reveal via the stroke-dash transition in
 * the stylesheet.
 */
export function UliRule({ caption }: { caption?: string }) {
	const revealRef = useRevealRef<SVGSVGElement>()

	return (
		<div className="px-5 pb-2 md:px-12 lg:px-[72px]">
			<svg
				ref={revealRef}
				data-uli="hidden"
				viewBox="0 0 1000 40"
				className="block h-10 w-full"
				fill="none"
				preserveAspectRatio="none"
				role="presentation"
			>
				<path
					d="M0 20 H210 M232 20 q24 -16 48 0 q24 16 48 0 q24 -16 48 0 M392 20 H600 M634 20 q28 -18 56 0 q28 18 56 0 M770 20 H1000"
					stroke="var(--accent)"
					strokeWidth="1.6"
				/>
			</svg>
			{caption ? (
				<p className="mt-2 font-mono text-[11px] text-faint">{caption}</p>
			) : null}
		</div>
	)
}
