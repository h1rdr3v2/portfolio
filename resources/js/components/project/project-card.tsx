import type { Project } from "@/types"
import { Label } from "@/components/ui/label"
import { TagList } from "@/components/ui/tag"
import { ProjectFrame } from "./project-frame"
import { ProjectLinks } from "./project-links"

interface ProjectCardProps {
	project: Project
	eager?: boolean
}

/** A featured project the way the first site showed one: screens, then the story. */
export function ProjectCard({ project, eager = false }: ProjectCardProps) {
	return (
		<article className="w-full">
			<ProjectFrame images={project.images} name={project.name} eager={eager} />

			<div className="mt-5 flex flex-wrap items-center gap-3">
				<h3 className="text-2xl leading-tight font-bold">{project.name}</h3>
				<Label className="font-normal tracking-normal normal-case">{project.year}</Label>
			</div>

			{project.description ? (
				<p className="mt-2.5 text-[15px] leading-relaxed text-foreground/90">{project.description}</p>
			) : null}

			<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.story}</p>

			<TagList items={project.tools} className="mt-3" />

			<ProjectLinks links={project.links} className="mt-3.5" />
		</article>
	)
}
