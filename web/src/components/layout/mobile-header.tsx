import { Link } from "@tanstack/react-router"
import { site } from "@/config/site"
import { usePublishHeight } from "@/hooks/use-published-height"
import { NavLinks } from "./nav-links"
import { cn } from "@/lib/cn"

interface MobileHeaderProps {
	activeId: string | null
	hidden: boolean
	/** Keeps the bar on screen while a nav click's scroll is in flight. */
	onNavigate: () => void
}

/**
 * The stacked-layout counterpart to the rail: identity above, sections below.
 *
 * One sticky element, not two. Sticky positions against the nearest scrolling
 * ancestor but is still clipped by its own parent's box — two bars inside a
 * short wrapper stick to nothing and scroll away after 87px, which is not the
 * same as being pinned.
 *
 * It publishes its own height as `--header-height`, which is what the pinned
 * showcase pane offsets by and what scroll landings clear. Measured rather
 * than hardcoded because the nav wraps to a second row on narrow screens.
 */
export function MobileHeader({ activeId, hidden, onNavigate }: MobileHeaderProps) {
	const heightRef = usePublishHeight("--header-height")

	return (
		<header
			ref={heightRef}
			className={cn(
				"sticky top-0 z-40 bg-bg transition-transform duration-300 ease-out lg:hidden",
				hidden && "-translate-y-full",
			)}
		>
			<div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3">
				<Link
					to="/"
					className="font-serif text-xl leading-tight font-normal text-ink"
				>
					{site.name}
				</Link>
				<span className="font-mono text-[11px] text-faint">{site.location}</span>
			</div>

			{/* Wraps rather than scrolls: a nav you have to swipe is a nav whose
			 * last item nobody finds. */}
			<NavLinks
				short
				activeId={activeId}
				onNavigate={onNavigate}
				className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-b border-rule px-5 py-2.5 font-mono text-xs"
				itemClassName="text-faint"
				activeClassName="text-accent"
			/>
		</header>
	)
}
