import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"
import { useNavigate } from "@tanstack/react-router"
import { scrollToSection } from "@/hooks/use-smooth-scroll"
import { cn } from "@/lib/cn"

interface SectionLinkProps
	extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	/** Target section id, without the `#`. */
	to: string
	children: ReactNode
}

/**
 * An in-page link that glides instead of jumping.
 *
 * It stays a real `<a href="#id">`, so middle-click, "open in new tab" and a
 * JS-less browser all still work — the handler only takes over the plain click.
 *
 * The fragment is updated through the router so the URL stays shareable, with
 * both of the router's scroll behaviours switched off: `resetScroll` would send
 * us to the top, and `hashScrollIntoView` would scroll a second time on top of
 * the scroll already in flight.
 */
export function SectionLink({
	to,
	children,
	className,
	onClick,
	...props
}: SectionLinkProps) {
	const navigate = useNavigate()

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		onClick?.(event)
		if (event.defaultPrevented) return

		// Let the browser handle modified clicks (new tab, download, ...).
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
		if (!scrollToSection(to)) return

		event.preventDefault()
		void navigate({
			to: ".",
			hash: to,
			replace: true,
			resetScroll: false,
			hashScrollIntoView: false,
		})
	}

	return (
		<a
			{...props}
			href={`#${to}`}
			onClick={handleClick}
			className={cn("transition-colors", className)}
		>
			{children}
		</a>
	)
}
