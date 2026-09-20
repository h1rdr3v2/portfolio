import type { ProjectLinkKind, Project } from "@/types"
import { cn } from "@/lib/cn"
import { ButtonLink } from "@/components/ui/button-link"
import type { IconName } from "@/components/ui/icons"

const LINKS: Record<ProjectLinkKind, { label: string; icon: IconName }> = {
	appstore: { label: "App Store", icon: "apple" },
	playstore: { label: "Play Store", icon: "play" },
	website: { label: "Website", icon: "globe" },
	telegram: { label: "Telegram", icon: "telegram" },
	whatsapp: { label: "WhatsApp", icon: "whatsapp" },
	github: { label: "GitHub", icon: "github" },
}

/** Stores first, source last. */
const ORDER: ProjectLinkKind[] = ["appstore", "playstore", "website", "telegram", "whatsapp", "github"]

interface ProjectLinksProps {
	links: Project["links"]
	className?: string
}

export function ProjectLinks({ links, className }: ProjectLinksProps) {
	const kinds = ORDER.filter((kind) => links[kind])
	if (kinds.length === 0) return null

	return (
		<div className={cn("flex flex-wrap items-center gap-2.5", className)}>
			{kinds.map((kind) => (
				<ButtonLink
					key={kind}
					href={links[kind]}
					icon={LINKS[kind].icon}
					target="_blank"
					rel="noopener noreferrer"
				>
					{LINKS[kind].label}
				</ButtonLink>
			))}
		</div>
	)
}
