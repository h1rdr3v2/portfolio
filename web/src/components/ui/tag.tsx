import { cn } from "@/lib/cn"

/** The bordered monospace chip used for tools and post tags. */
export function Tag({ children, className }: { children: string; className?: string }) {
	return (
		<span
			className={cn(
				"rounded-[5px] border border-rule px-2.5 py-1.5 font-mono text-xs text-faint",
				className,
			)}
		>
			{children}
		</span>
	)
}

export function TagList({ items, className }: { items: string[]; className?: string }) {
	if (items.length === 0) return null
	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{items.map((item) => (
				<Tag key={item}>{item}</Tag>
			))}
		</div>
	)
}
