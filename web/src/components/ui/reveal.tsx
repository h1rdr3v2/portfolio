import type { ElementType, ReactNode } from "react"
import { useRevealRef } from "@/hooks/use-reveal"

interface RevealProps {
	children: ReactNode
	className?: string
	as?: ElementType
}

/**
 * Fades its children up as they enter the viewport.
 *
 * The hidden state ships in the server HTML so there is no flash of visible
 * content before hydration; the `<noscript>` rule in the document head undoes
 * it for readers without JS.
 */
export function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
	const revealRef = useRevealRef<Element>()

	return (
		<Tag ref={revealRef} data-reveal="hidden" className={className}>
			{children}
		</Tag>
	)
}
