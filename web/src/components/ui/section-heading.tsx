import type { ReactNode } from "react"
import { cn } from "@/lib/cn"
import { Reveal } from "./reveal"

interface SectionHeadingProps {
	title: string
	/** Small monospace note aligned to the right of the title. */
	aside?: ReactNode
	/** Standfirst below the title. */
	lede?: string
	className?: string
}

export function SectionHeading({ title, aside, lede, className }: SectionHeadingProps) {
	return (
		<div className={cn(className)}>
			<Reveal className="flex flex-wrap items-baseline justify-between gap-4">
				<h2 className="font-serif text-[2.25rem] leading-none font-normal tracking-tight md:text-heading">
					{title}
				</h2>
				{aside ? (
					<div className="font-mono text-xs text-faint">{aside}</div>
				) : null}
			</Reveal>
			{lede ? (
				<Reveal>
					<p className="mt-4 max-w-[60ch] text-lg leading-relaxed font-light text-mute">
						{lede}
					</p>
				</Reveal>
			) : null}
		</div>
	)
}
