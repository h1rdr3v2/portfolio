import type { ReactNode } from "react"
import type { Role } from "@/types"
import { useSite } from "@/lib/use-site"
import { SectionHeading } from "@/components/ui/section-heading"

interface ExperienceSectionProps {
	current: Role[]
	former: Role[]
}

const MEETING = /(schedule a meeting)/i

/** "schedule a meeting" inside a role's copy becomes the booking link. */
function withMeetingLink(text: string, url: string): ReactNode {
	return text.split(MEETING).map((part, index) =>
		MEETING.test(part) ? (
			<a
				key={index}
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
			>
				{part}
			</a>
		) : (
			part
		),
	)
}

/**
 * Current roles get a card; former ones are rows underneath — always shown.
 * Five lines of history is not worth hiding behind a click.
 */
export function ExperienceSection({ current, former }: ExperienceSectionProps) {
	const site = useSite()

	if (current.length === 0 && former.length === 0) return null

	return (
		<section className="w-full">
			<SectionHeading>Roles</SectionHeading>

			{current.length > 0 ? (
				<div className="mt-4 flex flex-col gap-2.5">
					{current.map((role) => (
						<div key={role.company} className="rounded-lg bg-card p-4">
							<h3 className="text-lg font-semibold">
								{role.company}
								{role.title ? (
									<span className="ml-2 text-sm font-normal text-muted-foreground">{role.title}</span>
								) : null}
								<span className="ml-2 font-mono text-xs font-normal text-muted-foreground">{role.period}</span>
							</h3>
							{role.description.map((line) => (
								<p key={line} className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
									{withMeetingLink(line, site.calendar_url)}
								</p>
							))}
						</div>
					))}
				</div>
			) : null}

			{former.length > 0 ? (
				<div className="mt-5 border-t border-border">
					{former.map((role) => (
						<div
							key={`${role.company}-${role.period}`}
							className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-0.5 border-b border-border py-3"
						>
							<p className="text-sm font-semibold">
								{role.company}
								{role.title ? (
									<span className="ml-2 font-normal text-muted-foreground">{role.title}</span>
								) : null}
							</p>
							<p className="font-mono text-xs whitespace-nowrap text-muted-foreground">{role.period}</p>
							{role.description[0] ? (
								<p className="col-span-2 text-[13.5px] leading-snug text-muted-foreground/80">{role.description[0]}</p>
							) : null}
						</div>
					))}
				</div>
			) : null}
		</section>
	)
}
