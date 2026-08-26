import type { ReactNode } from "react"
import { sectionIds } from "@/config/navigation"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useHideOnScrollDown } from "@/hooks/use-hide-on-scroll"
import { MobileHeader } from "./mobile-header"
import { SideRail } from "./side-rail"

/**
 * The frame every page renders into: rail on the left, content on the right.
 *
 * It owns the two things that need a whole-page view — which section the nav
 * should highlight, and whether the mobile bar is currently pinned — so no
 * section has to wire up its own listeners.
 *
 * The wrapper spans the document, which is what lets the mobile header stick
 * for the whole scroll rather than scrolling away with a short parent.
 */
export function PageShell({ children }: { children: ReactNode }) {
	const activeId = useScrollSpy(sectionIds)
	const { hidden, hold } = useHideOnScrollDown()

	return (
		<div>
			<SideRail activeId={activeId} />
			<MobileHeader activeId={activeId} hidden={hidden} onNavigate={() => hold()} />
			<main className="lg:ml-[262px]">{children}</main>
		</div>
	)
}
