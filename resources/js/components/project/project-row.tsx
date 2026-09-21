import type { Project } from "@/types"
import { firstSentence } from "@/lib/format"

interface ProjectRowProps {
	project: Project
	onOpen: (project: Project) => void
}

/** One project as a line: name and when on the left, what it is on the right. Click for the story. */
export function ProjectRow({ project, onOpen }: ProjectRowProps) {
	return (
		<button
			type="button"
			onClick={() => onOpen(project)}
			className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-border py-3.5 text-left sm:grid-cols-[150px_1fr_auto]"
		>
			<span className="min-w-0">
				<span className="block text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
					{project.name}
				</span>
				<span className="block font-mono text-xs text-muted-foreground">{project.year}</span>
			</span>
			<span className="col-span-2 line-clamp-2 text-[13.5px] leading-snug text-muted-foreground sm:col-span-1">
				{project.description ?? firstSentence(project.story)}
			</span>
			<span
				aria-hidden="true"
				className="col-start-2 row-start-1 text-sm text-muted-foreground transition-[transform,color] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent sm:col-start-3"
			>
				↗
			</span>
		</button>
	)
}
