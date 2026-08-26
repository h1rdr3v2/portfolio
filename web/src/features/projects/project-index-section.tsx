import { useMemo, useState } from "react"
import {
	categoryLabels,
	categoryOrder,
	featuredSlugs,
	projects,
} from "@/data/projects"
import type { Project, ProjectCategory } from "@/types/project"
import { Section } from "@/components/ui/section"
import { SectionHeading } from "@/components/ui/section-heading"
import { FilterPills, type FilterOption } from "@/components/ui/filter-pills"
import { ProjectRow } from "@/components/project/project-row"
import { ProjectDialog } from "@/components/project/project-dialog"
import { pluralise } from "@/lib/format"

type Filter = ProjectCategory | "all"

/**
 * Everything that is not one of the three featured projects. The three are
 * excluded rather than repeated — a reader who has just scrolled past them
 * does not need to meet them again two sections later.
 */
const rest = projects.filter((project) => !featuredSlugs.has(project.slug))

export function ProjectIndexSection() {
	const [filter, setFilter] = useState<Filter>("all")
	const [openProject, setOpenProject] = useState<Project | null>(null)

	const options = useMemo<FilterOption<Filter>[]>(
		() =>
			categoryOrder
				.map((value) => ({
					value,
					label: categoryLabels[value],
					count:
						value === "all"
							? rest.length
							: rest.filter((project) => project.category === value).length,
				}))
				// A filter that would show nothing is noise, not a choice.
				.filter((option) => option.count > 0),
		[],
	)

	const shown = useMemo(
		() =>
			filter === "all"
				? rest
				: rest.filter((project) => project.category === filter),
		[filter],
	)

	return (
		<Section id="projects">
			<SectionHeading
				title="Everything else / ndị ọzọ"
				aside={
					<FilterPills
						options={options}
						value={filter}
						onChange={setFilter}
						label="Filter projects by category"
					/>
				}
			/>

			{/* Two columns of rows, not a card grid — see ProjectRow for why.
			 * Splitting waits until xl: with the rail taking 262px, two columns
			 * any earlier are too narrow to keep a row on one line. */}
			<div className="mt-8 grid border-t border-rule xl:grid-cols-2 xl:gap-x-12">
				{shown.map((project) => (
					<ProjectRow
						key={project.slug}
						project={project}
						onOpen={setOpenProject}
					/>
				))}
			</div>

			<p className="mt-3.5 font-mono text-xs text-faint">
				{pluralise(shown.length, "project")} · click a row for the full story
			</p>

			<ProjectDialog project={openProject} onClose={() => setOpenProject(null)} />
		</Section>
	)
}
