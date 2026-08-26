import { useMemo, useRef } from "react"
import { featuredProjects, getProject } from "@/data/projects"
import { scrollToSection } from "@/hooks/use-smooth-scroll"
import { useActiveBlock } from "@/hooks/use-active-block"
import { ShowcasePane, type ShowcaseSlide } from "@/components/device/showcase-pane"
import { FeaturedEntry } from "./featured-entry"

const entryId = (index: number) => `featured-${index + 1}`

/**
 * The opening act: three projects, each with the screen that goes with it.
 *
 * Two different readings of the same content. Wide layouts pin the screen
 * beside the copy and swap it as you scroll, so the phone stays put while the
 * story moves. Stacked layouts interleave instead — screen, story, screen,
 * story — because pinning half a phone viewport for the length of a section
 * costs more than it shows.
 */
export function FeaturedSection() {
	const copyRef = useRef<HTMLDivElement>(null)

	const entries = useMemo(
		() =>
			featuredProjects.flatMap((featured) => {
				const project = getProject(featured.slug)
				if (!project) return []

				const screens = featured.screens ?? project.images ?? []
				const cover = screens[0]
				// A screen is half of what this section is, so a project without
				// one is skipped rather than rendered as an empty frame.
				if (!cover) return []

				return [
					{
						featured,
						project,
						cover,
						slide: {
							src: cover,
							alt: `${project.name} — app screen`,
						} satisfies ShowcaseSlide,
					},
				]
			}),
		[],
	)

	// Only read on wide layouts, where the pane is the thing that follows along.
	const activeIndex = useActiveBlock(copyRef)
	const active = entries[activeIndex] ?? entries[0]

	if (!active) return null

	return (
		<section
			id="work"
			data-scroll-target
			className="border-t border-rule xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,480px)]"
		>
			<div className="sticky top-0 z-10 hidden h-screen border-l border-rule bg-bg xl:order-2 xl:block">
				<ShowcasePane
					slides={entries.map((entry) => entry.slide)}
					activeIndex={activeIndex}
					label={`${active.project.name} — in your hand`}
					onSelect={(index) => scrollToSection(entryId(index))}
				/>
			</div>

			<div ref={copyRef} className="px-5 md:px-12 xl:order-1 xl:px-[72px]">
				{entries.map((entry, index) => (
					<FeaturedEntry
						key={entry.project.slug}
						id={entryId(index)}
						project={entry.project}
						position={index + 1}
						metrics={entry.featured.metrics ?? []}
						screen={entry.cover}
						isFirst={index === 0}
					/>
				))}
			</div>
		</section>
	)
}
