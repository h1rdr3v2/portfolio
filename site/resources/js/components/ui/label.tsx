import { cn } from "@/lib/cn"

/** The small uppercase outline pill that names a section. */
export function Label({ children, className }: { children: string; className?: string }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase",
				className,
			)}
		>
			{children}
		</span>
	)
}
