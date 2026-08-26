import type { MouseEvent } from "react"
import { Link } from "@tanstack/react-router"
import { railSocials, site } from "@/config/site"
import { scrollToTop } from "@/hooks/use-smooth-scroll"
import { NavLinks } from "./nav-links"

/**
 * The fixed left rail: identity, section nav and the standing call to action.
 * Desktop only — below 900px the {@link MobileHeader} takes over.
 */
export function SideRail({ activeId }: { activeId: string | null }) {
	return (
		<aside className="fixed inset-y-0 left-0 z-20 hidden w-[262px] flex-col justify-between border-r border-rule bg-bg px-8.5 py-11 lg:flex">
			<div>
				<Link
					to="/"
					onClick={(event: MouseEvent<HTMLAnchorElement>) => {
						if (window.location.pathname === "/") {
							event.preventDefault()
							scrollToTop()
						}
					}}
					className="block font-serif text-[2.5rem] leading-[0.98] font-normal tracking-tight text-ink"
				>
					{site.nameLines[0]}
					<br />
					{site.nameLines[1]}
				</Link>

				<p className="mt-3 font-mono text-xs leading-relaxed text-faint">
					{site.role}
					<br />
					{site.location}
				</p>

				<NavLinks
					activeId={activeId}
					className="mt-9 flex flex-col gap-2.5 text-sm"
				/>
			</div>

			<div className="flex flex-col gap-4.5">
				<ul className="flex gap-4 font-mono text-xs text-faint">
					{railSocials.map((social) => (
						<li key={social.name}>
							<a
								href={social.url}
								target="_blank"
								rel="noreferrer noopener"
								className="transition-colors hover:text-ink"
							>
								{social.name}
							</a>
						</li>
					))}
				</ul>

				<a
					href={site.calendarUrl}
					target="_blank"
					rel="noreferrer noopener"
					className="rounded-lg bg-accent px-4 py-3.5 text-center text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03]"
				>
					Book a call
				</a>

				<a
					href={site.resumeUrl}
					download
					className="font-mono text-xs text-faint transition-colors hover:text-ink"
				>
					résumé ↓
				</a>
			</div>
		</aside>
	)
}
