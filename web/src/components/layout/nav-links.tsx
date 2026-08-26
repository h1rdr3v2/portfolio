import { Link, useRouterState } from "@tanstack/react-router"
import { navItems } from "@/config/navigation"
import { SectionLink } from "@/components/ui/section-link"
import { cn } from "@/lib/cn"

interface NavLinksProps {
	/** Section id currently in view, from the scroll spy. */
	activeId?: string | null
	className?: string
	itemClassName?: string
	activeClassName?: string
	onNavigate?: () => void
	/** Use the compact labels, for the mobile bar. */
	short?: boolean
}

/**
 * The section list, shared by the rail and the mobile bar.
 *
 * On the homepage the entries scroll smoothly to their section. Anywhere else
 * they are router links back to the homepage with the matching hash, which the
 * router resolves after navigation.
 */
export function NavLinks({
	activeId,
	className,
	itemClassName,
	activeClassName = "text-ink",
	onNavigate,
	short = false,
}: NavLinksProps) {
	const isHome = useRouterState({
		select: (state) => state.location.pathname === "/",
	})

	return (
		<nav className={cn(className)}>
			{navItems.map((item) => {
				const label = short ? item.shortLabel : item.label
				const isActive = isHome && activeId === item.id
				const classes = cn(
					"text-mute hover:text-ink",
					itemClassName,
					isActive && activeClassName,
				)

				if (!isHome) {
					return (
						<Link
							key={item.id}
							to="/"
							hash={item.id}
							onClick={onNavigate}
							className={classes}
						>
							{label}
						</Link>
					)
				}

				return (
					<SectionLink
						key={item.id}
						to={item.id}
						onClick={onNavigate}
						aria-current={isActive ? "true" : undefined}
						className={classes}
					>
						{label}
					</SectionLink>
				)
			})}
		</nav>
	)
}
