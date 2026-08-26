import { categoryLabels } from "@/data/projects"
import type { Project } from "@/types/project"
import { Modal } from "@/components/ui/modal"
import { TagList } from "@/components/ui/tag"
import { ProjectGallery } from "./project-gallery"
import { ProjectLinks } from "./project-links"

interface ProjectDialogProps {
	project: Project | null
	onClose: () => void
}

/** The full story behind a project: screenshots, why it exists, where it lives. */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
	return (
		<Modal open={project !== null} onClose={onClose} title={project?.name ?? "Project"}>
			{project ? (
				<div className="max-h-[88vh] overflow-y-auto px-6 py-7 md:px-10 md:py-9">
					<div className="flex items-start justify-between gap-5">
						<p className="font-mono text-xs text-faint">
							{categoryLabels[project.category]} · {project.year}
						</p>
						<button
							type="button"
							onClick={onClose}
							className="shrink-0 cursor-pointer rounded-full border border-rule px-3.5 py-2 font-mono text-xs font-medium text-ink transition-colors hover:bg-tint"
						>
							close ✕
						</button>
					</div>

					<h2 className="mt-4 font-serif text-4xl leading-tight font-normal tracking-tight md:text-[2.875rem]">
						{project.name}
					</h2>

					{project.description ? (
						<p className="mt-4 max-w-[62ch] text-lg leading-relaxed font-light text-mute">
							{project.description}
						</p>
					) : null}

					<ProjectGallery
						images={project.images ?? []}
						projectName={project.name}
						className="mt-7"
					/>

					<p className="mt-7 max-w-[66ch] leading-relaxed font-light text-mute md:text-[19px]">
						{project.story}
					</p>

					<TagList items={project.tools ?? []} className="mt-7" />

					<ProjectLinks
						links={project.links}
						projectName={project.name}
						className="mt-7 border-t border-rule pt-6"
					/>
				</div>
			) : null}
		</Modal>
	)
}
