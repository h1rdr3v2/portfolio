import { ArrowLink } from "@/components/ui/action"
import type { ProjectLinkKind, ProjectLinks as Links } from "@/types/project"
import { cn } from "@/lib/cn"

/** Human labels, and the order links appear in — stores first, source last. */
const LINK_LABELS: Record<ProjectLinkKind, string> = {
	appstore: "App Store",
	playstore: "Play Store",
	website: "Website",
	telegram: "Telegram",
	whatsapp: "WhatsApp",
	github: "Source",
}

const LINK_ORDER: ProjectLinkKind[] = [
	"appstore",
	"playstore",
	"website",
	"telegram",
	"whatsapp",
	"github",
]

interface ProjectLinksProps {
	links?: Links
	/** Announced context, since "Website ↗" alone is ambiguous in a list. */
	projectName: string
	className?: string
}

export function ProjectLinks({ links, projectName, className }: ProjectLinksProps) {
	if (!links) return null

	const entries = LINK_ORDER.filter((kind) => links[kind])
	if (entries.length === 0) return null

	return (
		<div className={cn("flex flex-wrap gap-5", className)}>
			{entries.map((kind) => (
				<ArrowLink
					key={kind}
					href={links[kind]}
					aria-label={`${projectName} — ${LINK_LABELS[kind]}`}
				>
					{LINK_LABELS[kind]}
				</ArrowLink>
			))}
		</div>
	)
}
