import { useMemo, useState } from "react"
import type { Project, ProjectCategory } from "@/types"
import { SectionHeading } from "@/components/ui/section-heading"
import { FilterPills, type FilterOption } from "@/components/ui/filter-pills"
import { ProjectRow } from "@/components/project/project-row"
import { ProjectDialog } from "@/components/project/project-dialog"

const ORDER: ProjectCategory[] = ["mobile", "website", "bot", "api"]
const LABELS: Record<ProjectCategory, string> = {
	mobile: "Mobile apps",
	website: "Websites",
	bot: "Bots",
	api: "APIs",
}

/**
 * Everything that is not featured, as rows, one category at a time. No "all"
 * chip on purpose: sixteen rows at once made the page long, and a chip you
 * can flick through is quicker than a list you have to scroll.
 */
export function ProjectIndexSection({ projects }: { projects: Project[] }) {
	const options = useMemo<FilterOption<ProjectCategory>[]>(
		() =>
			ORDER.map((value) => ({
				value,
				label: LABELS[value],
				count: projects.filter((p) => p.category === value).length,
			})).filter((option) => option.count > 0),
		[projects],
	)

	const [filter, setFilter] = useState<ProjectCategory>(options[0]?.value ?? "mobile")
	const [open, setOpen] = useState<Project | null>(null)

	const shown = useMemo(() => projects.filter((p) => p.category === filter), [projects, filter])

	if (projects.length === 0) return null

	return (
		<section className="w-full">
			<SectionHeading
				aside={<FilterPills options={options} value={filter} onChange={setFilter} label="Filter projects" />}
			>
				Everything else
			</SectionHeading>

			<div className="mt-4 border-t border-border">
				{shown.map((project) => (
					<ProjectRow key={project.slug} project={project} onOpen={setOpen} />
				))}
			</div>

			<ProjectDialog project={open} onClose={() => setOpen(null)} />
		</section>
	)
}
