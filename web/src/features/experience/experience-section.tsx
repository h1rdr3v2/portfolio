import { useState } from "react"
import { currentRoles, formerRoles } from "@/data/experience"
import { Section } from "@/components/ui/section"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"

const ROW = "grid gap-3 border-t border-rule py-6 md:grid-cols-[180px_1fr] md:gap-7"

export function ExperienceSection() {
	const [showFormer, setShowFormer] = useState(false)

	return (
		<Section id="experience">
			<SectionHeading title="Experience / ahụmahụ" />

			<div className="mt-9 max-w-[940px]">
				{currentRoles.map((role) => (
					<Reveal key={role.company} className={ROW}>
						<p className="font-mono text-[13px] text-faint">{role.period}</p>
						<div>
							<div className="flex flex-wrap items-baseline gap-3">
								<h3 className="text-xl font-semibold">{role.company}</h3>
								{role.status ? (
									<span className="inline-flex items-center gap-1.5 rounded-full bg-tint px-2.5 py-1 font-mono text-[11px] text-accent-deep">
										<span
											aria-hidden="true"
											className="size-1.5 rounded-full bg-accent"
										/>
										{role.status}
									</span>
								) : null}
							</div>
							{role.description.map((line) => (
								<p
									key={line}
									className="mt-2 max-w-[60ch] text-[17px] leading-relaxed font-light text-mute"
								>
									{line}
								</p>
							))}
						</div>
					</Reveal>
				))}

				<div className="border-t border-rule">
					<button
						type="button"
						onClick={() => setShowFormer((open) => !open)}
						aria-expanded={showFormer}
						aria-controls="former-roles"
						className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
					>
						<span className="text-xl font-semibold text-ink">
							Former roles · 2017 — 2024
						</span>
						<span className="shrink-0 font-mono text-xs text-accent">
							{showFormer ? "CLOSE −" : "OPEN +"}
						</span>
					</button>

					{showFormer ? (
						<div id="former-roles" className="pb-3">
							{formerRoles.map((role) => (
								<div key={`${role.company}-${role.period}`} className={ROW}>
									<p className="font-mono text-[13px] text-faint">{role.period}</p>
									<div>
										<h4 className="text-lg font-semibold">
											{role.title} · {role.company}
										</h4>
										{role.summary ? (
											<p className="mt-1.5 max-w-[60ch] leading-relaxed font-light text-mute">
												{role.summary}
											</p>
										) : null}
									</div>
								</div>
							))}
						</div>
					) : null}
				</div>
			</div>
		</Section>
	)
}
