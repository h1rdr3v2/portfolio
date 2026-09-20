import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

interface SectionHeadingProps {
	children: string
	/** Sits on the right of the heading — the filter chips, a count. */
	aside?: ReactNode
	className?: string
}

/** Every section is introduced the same way: one line, bold, nothing else. */
export function SectionHeading({ children, aside, className }: SectionHeadingProps) {
	return (
		<div className={cn("flex flex-wrap items-center justify-between gap-x-4 gap-y-3", className)}>
			<h2 className="text-xl font-bold">{children}</h2>
			{aside}
		</div>
	)
}
