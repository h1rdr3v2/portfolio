import type { AnchorHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/cn"
import { Icon, type IconName } from "./icons"

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	icon?: IconName
	children: ReactNode
}

/** A small outlined button that is really a link — every use goes somewhere. */
export function ButtonLink({ icon, children, className, ...props }: ButtonLinkProps) {
	return (
		<a
			{...props}
			className={cn(
				"inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent",
				className,
			)}
		>
			{icon ? <Icon name={icon} className="size-3.5" /> : null}
			{children}
		</a>
	)
}
