import { StatList } from "@/components/ui/stat"
import { TagList } from "@/components/ui/tag"
import { ProjectLinks } from "@/components/project/project-links"
import type { Metric, Project } from "@/types/project"

interface FeaturedEntryProps {
	/** Anchor target, so the pane's dots can scroll to this entry. */
	id: string
	project: Project
	/** 1-based, for the "FEATURED 01" eyebrow. */
	position: number
	metrics: Metric[]
	/** Shown inline above the copy on stacked layouts only. */
	screen: string
	isFirst: boolean
}

/**
 * One project in the showcase.
 *
 * Stacked layouts get the screen inline, directly above its own copy, so the
 * page reads image-then-story down the phone. Wide layouts leave the image out
 * — the pinned pane beside the copy is showing it instead, and rendering it
 * twice would be a duplicate, not a fallback.
 */
export function FeaturedEntry({
	id,
	project,
	position,
	metrics,
	screen,
	isFirst,
}: FeaturedEntryProps) {
	return (
		<article
			id={id}
			data-block
			data-scroll-target
			className={
				"flex flex-col py-11 xl:min-h-[88vh] xl:justify-center xl:py-20" +
				(isFirst ? "" : " border-t border-rule")
			}
		>
			{/*
			 * Fixed height, not intrinsic: these screens are marketing shots with
			 * wildly different aspect ratios, and a box that sizes to its image
			 * would reserve nothing until the image lands — every entry below the
			 * fold would jump as you reached it. Same reasoning as the pane.
			 */}
			<div className="mb-8 flex h-[46vh] items-center justify-center rounded-2xl bg-linear-to-b from-tint to-transparent px-5 py-6 xl:hidden">
				<img
					src={screen}
					alt={`${project.name} — app screen`}
					loading={isFirst ? "eager" : "lazy"}
					decoding="async"
					className="max-h-full max-w-full rounded-xl object-contain shadow-[0_20px_44px_-20px_rgb(15_19_16/0.4)]"
				/>
			</div>

			<p className="eyebrow text-accent">
				Featured {String(position).padStart(2, "0")}
			</p>

			<h3 className="mt-4 font-serif text-[2.25rem] leading-tight font-normal tracking-tight md:text-title">
				{project.name}
			</h3>

			{project.description ? (
				<p className="mt-5 max-w-[46ch] text-lg leading-relaxed font-light text-mute md:text-xl">
					{project.description}
				</p>
			) : null}

			<p className="mt-4 max-w-[46ch] leading-relaxed font-light text-faint md:text-lg">
				{project.story}
			</p>

			<StatList metrics={metrics} className="mt-7" />

			<TagList items={project.tools ?? []} className="mt-7" />

			<ProjectLinks
				links={project.links}
				projectName={project.name}
				className="mt-8"
			/>

			<p className="mt-6 font-mono text-xs text-faint">{project.year}</p>
		</article>
	)
}
