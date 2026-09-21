import type { Project } from "@/types"
import { Modal } from "@/components/ui/modal"
import { Icon } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"
import { TagList } from "@/components/ui/tag"
import { ProjectFrame } from "./project-frame"
import { ProjectLinks } from "./project-links"

interface ProjectDialogProps {
	project: Project | null
	onClose: () => void
}

/** The full story behind a project in the list: screens, why it exists, where it lives. */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
	return (
		<Modal open={project !== null} onClose={onClose} title={project?.name ?? "Project"}>
			{project ? (
				<div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
					<div className="flex items-start justify-between gap-4">
						<p className="font-mono text-xs text-muted-foreground">
							{project.categoryLabel} · {project.year}
						</p>
						<button
							type="button"
							onClick={onClose}
							aria-label="Close"
							className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border transition-colors hover:border-accent hover:text-accent"
						>
							<Icon name="close" className="size-4" />
						</button>
					</div>

					<div className="mt-3 flex flex-wrap items-center gap-3">
						<h2 className="text-2xl leading-tight font-bold">{project.name}</h2>
						<Label className="font-normal tracking-normal normal-case">{project.year}</Label>
					</div>

					{project.images.length > 0 ? (
						<div className="mt-5">
							<ProjectFrame images={project.images} name={project.name} eager />
						</div>
					) : null}

					{project.description ? (
						<p className="mt-4 text-[15px] leading-relaxed text-foreground/90">{project.description}</p>
					) : null}

					<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.story}</p>

					<TagList items={project.tools} className="mt-4" />

					<ProjectLinks links={project.links} className="mt-4" />
				</div>
			) : null}
		</Modal>
	)
}
