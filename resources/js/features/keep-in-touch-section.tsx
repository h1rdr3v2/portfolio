import { Fragment } from "react"
import { useSite } from "@/lib/use-site"

const DISPLAY: Record<string, string> = { x: "X/twitter" }

export function KeepInTouchSection() {
	const site = useSite()
	const links = [
		...site.socials.map((social) => ({ name: DISPLAY[social.name] ?? social.name, url: social.url, external: true })),
		{ name: "résumé", url: site.resume_url, external: false },
	]

	return (
		<section className="mt-6 flex w-full flex-col gap-6">
			<div className="flex flex-col gap-2.5 text-center">
				<h2 className="text-3xl font-bold">Let's Keep in Touch</h2>
				<p className="text-muted-foreground">
					Working on something and want another pair of hands?{" "}
					<a
						href={site.calendar_url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:decoration-accent"
					>
						Book a call
					</a>
					, or just say hi — either is fine.
				</p>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 md:gap-x-4">
				{links.map((link, index) => (
					<Fragment key={link.name}>
						<a
							href={link.url}
							{...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
							className="transition-colors hover:text-accent"
						>
							{link.name}
						</a>
						{index !== links.length - 1 ? <span className="h-6 w-px bg-border" aria-hidden="true" /> : null}
					</Fragment>
				))}
			</div>
		</section>
	)
}
