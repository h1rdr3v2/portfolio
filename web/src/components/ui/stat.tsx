import type { Metric } from "@/types/project"
import { cn } from "@/lib/cn"

interface StatListProps {
	metrics: Metric[]
	size?: "lg" | "md"
	className?: string
}

/** The serif-number / mono-label pair used in the hero and the showcase. */
export function StatList({ metrics, size = "md", className }: StatListProps) {
	if (metrics.length === 0) return null

	return (
		<dl className={cn("flex flex-wrap gap-x-10 gap-y-6", className)}>
			{metrics.map((metric) => (
				<div key={metric.label}>
					<dd
						className={cn(
							"font-serif leading-none font-normal text-accent",
							size === "lg" ? "text-[2.75rem]" : "text-[2.25rem]",
						)}
					>
						{metric.value}
					</dd>
					<dt className="mt-1.5 font-mono text-xs text-faint">{metric.label}</dt>
				</div>
			))}
		</dl>
	)
}
