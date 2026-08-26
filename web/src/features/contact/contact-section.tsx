import { site, socials } from "@/config/site"
import { ActionLink } from "@/components/ui/action"

/**
 * The closing section. Inverted ground, so the page ends on a different note
 * from everything above it and the two calls to action are unmissable.
 */
export function ContactSection() {

	return (
		<section
			id="contact"
			data-scroll-target
			className="border-t border-rule bg-inverse-bg px-5 pt-24 pb-28 text-inverse-ink md:px-12 lg:px-[72px] lg:pt-28 lg:pb-32"
		>
			<p className="eyebrow mb-4 text-[#8FB89A]">Get in touch / kpọọ m</p>

			<h2 className="max-w-[24ch] font-serif text-[2.5rem] leading-tight font-normal md:text-title">
				Building for this market? Let's talk properly.
			</h2>

			<p className="mt-5 max-w-[56ch] text-lg leading-relaxed font-light opacity-70 md:text-xl">
				Tell me the constraint and the deadline. If I'm not the right fit I'll say
				so in the first reply — that saves us both a week.
			</p>

			<div className="mt-9 flex flex-wrap gap-3.5">
				<ActionLink
					href={site.calendarUrl}
					target="_blank"
					rel="noreferrer noopener"
				>
					Book a 20-min call
				</ActionLink>
				<ActionLink href={`mailto:${site.email}`} variant="outline">
					Email me
				</ActionLink>
			</div>

			<div className="mt-18 flex flex-wrap items-end justify-between gap-10 border-t border-current/15 pt-8">
				<ul className="flex flex-wrap gap-6 font-mono text-xs opacity-45">
					<li>{site.email}</li>
					{socials
						.filter((social) => social.name !== "mail")
						.map((social) => (
							<li key={social.name}>
								<a
									href={social.url}
									target="_blank"
									rel="noreferrer noopener"
									className="text-current transition-opacity hover:opacity-100"
								>
									{social.name}
								</a>
							</li>
						))}
					<li>{site.location}</li>
				</ul>

				{/*
				 * The sign-off. A face belongs here rather than in the hero:
				 * contract work is a trust purchase, and this is the moment
				 * someone decides whether to book the call — up top it would
				 * only compete with the screens the site is actually selling.
				 */}
				<div className="flex items-center gap-4">
					<img
						src={site.photo}
						alt=""
						width={72}
						height={72}
						loading="lazy"
						decoding="async"
						className="size-18 shrink-0 rounded-full object-cover ring-1 ring-current/20"
					/>
					<div>
						<p className="font-serif text-2xl leading-tight">{site.name}</p>
						<p className="mt-0.5 font-mono text-[11px] opacity-45">
							{site.role} · {site.location}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
