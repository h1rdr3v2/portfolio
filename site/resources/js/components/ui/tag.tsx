import { cn } from "@/lib/cn"

/** A tool or a post tag: small, filled, quiet. */
export function Tag({ children, className }: { children: string; className?: string }) {
	return (
		<span
			className={cn(
				"rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground",
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
		<div className={cn("flex flex-wrap gap-1.5", className)}>
			{items.map((item) => (
				<Tag key={item}>{item}</Tag>
			))}
		</div>
	)
}
