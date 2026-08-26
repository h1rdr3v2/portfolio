import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

interface SectionProps {
	id: string
	children: ReactNode
	className?: string
	/** Drops the top hairline — used by the first section after the hero. */
	seamless?: boolean
}

/**
 * A page section. Owns the shared rhythm (gutters, vertical padding, the
 * hairline between sections) so individual sections only describe content.
 */
export function Section({ id, children, className, seamless }: SectionProps) {
	return (
		<section
			id={id}
			data-scroll-target
			className={cn(
				"px-5 py-20 md:px-12 lg:px-[72px] lg:py-26",
				!seamless && "border-t border-rule",
				className,
			)}
		>
			{children}
		</section>
	)
}
