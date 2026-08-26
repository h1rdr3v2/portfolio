import type { AnchorHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/cn"

type Variant = "solid" | "outline"

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode
	variant?: Variant
}

const variants: Record<Variant, string> = {
	solid: "bg-accent text-white hover:bg-accent-deep",
	outline: "border border-current/25 text-current hover:border-current/50",
}

/** The call-to-action button. An anchor, because every use is a destination. */
export function ActionLink({
	children,
	variant = "solid",
	className,
	...props
}: ActionLinkProps) {
	return (
		<a
			{...props}
			className={cn(
				"inline-flex items-center justify-center rounded-lg px-6 py-4 text-base font-medium transition-transform duration-200 hover:scale-[1.02]",
				variants[variant],
				className,
			)}
		>
			{children}
		</a>
	)
}

interface ArrowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode
	/** Adds `target="_blank"` and the ↗ affordance. */
	external?: boolean
}

/** A text link. External ones carry the arrow and the safe rel attributes. */
export function ArrowLink({
	children,
	external = true,
	className,
	...props
}: ArrowLinkProps) {
	return (
		<a
			{...props}
			{...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
			className={cn(
				"inline-flex items-center gap-1 text-[15px] text-accent transition-colors hover:text-accent-deep",
				className,
			)}
		>
			{children}
			<span aria-hidden="true">{external ? "↗" : "→"}</span>
		</a>
	)
}
