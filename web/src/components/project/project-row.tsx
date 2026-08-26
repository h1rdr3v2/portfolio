import { useRevealRef } from "@/hooks/use-reveal"
import type { Project } from "@/types/project"

/** Enough to signal the stack without crowding the line. */
const TOOLS_SHOWN = 2

interface ProjectRowProps {
	project: Project
	onOpen: (project: Project) => void
}

/**
 * One project as a single line: name, the stack it was built on, and when.
 *
 * A row rather than a card because most of these have no screenshots — a grid
 * of cards would be a third placeholder texture pretending to be content, and
 * rows let every project look equally deliberate. The screenshots that do
 * exist carry their weight in the featured showcase and in the dialog.
 *
 * The hover glide matches the writing rows, so both dense lists on the page
 * behave the same way.
 */
export function ProjectRow({ project, onOpen }: ProjectRowProps) {
	const revealRef = useRevealRef<HTMLButtonElement>()
	const tools = project.tools?.slice(0, TOOLS_SHOWN).join(" · ")

	return (
		<button
			ref={revealRef}
			data-reveal="hidden"
			type="button"
			onClick={() => onOpen(project)}
			aria-label={`${project.name} — open details`}
			className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-rule py-3.5 pl-0 text-left transition-[padding-left] duration-200 ease-out hover:pl-2 focus-visible:pl-2"
		>
			{/* One line, always: the longest names ellipsize rather than wrap. */}
			<span className="block min-w-0 truncate">
				<span className="text-[15px] font-medium text-ink transition-colors duration-200 group-hover:text-accent">
					{project.name}
				</span>
				{tools ? (
					<span className="ml-2.5 font-mono text-[11px] whitespace-nowrap text-faint">
						{tools}
					</span>
				) : null}
			</span>

			<span className="font-mono text-[11px] whitespace-nowrap text-faint">
				{project.year}
			</span>
		</button>
	)
}
