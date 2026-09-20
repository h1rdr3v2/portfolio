import { Link, usePage } from "@inertiajs/react"
import { useSite } from "@/lib/use-site"
import { Icon, type IconName } from "@/components/ui/icons"
import { LightSwitch } from "@/components/theme/light-switch"

/** Socials that have an icon; the rest are listed by name at the bottom of the page. */
const ICONS: Partial<Record<string, IconName>> = {
	github: "github",
	linkedin: "linkedin",
	x: "x",
	mail: "mail",
}

/**
 * Who this is, at the top of every page — the site's only header. Photo,
 * name, role, where, the socials, one link to the other half of the site,
 * and the light switch beside the name.
 */
export function SiteIdentity() {
	const site = useSite()
	const { url } = usePage()
	const onHome = url === "/" || url.startsWith("/?") || url.startsWith("/#")

	return (
		<header className="flex w-full items-start justify-between gap-4">
			<div className="flex min-w-0 items-center gap-4">
				<Link href="/" aria-label="Home" className="shrink-0">
					<img
						src={site.photo}
						alt={site.name}
						width={70}
						height={70}
						className="size-[70px] rounded-full object-cover"
					/>
				</Link>
				<div className="min-w-0">
					<h1 className="text-lg font-medium">
						<Link href="/" className="transition-colors hover:text-accent">
							{site.name}
						</Link>
					</h1>
					<p className="-mt-0.5 text-sm font-medium text-muted-foreground">{site.role}</p>
					<div className="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
						<span className="inline-flex items-center gap-1 text-xs whitespace-nowrap text-muted-foreground">
							<Icon name="pin" className="size-3.5" />
							{site.location}
						</span>
						<span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
						<ul className="flex items-center gap-3">
							{site.socials
								.filter((social) => ICONS[social.name])
								.map((social) => (
									<li key={social.name}>
										<a
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={social.name}
											className="block text-muted-foreground transition-colors hover:text-accent"
										>
											<Icon name={ICONS[social.name]!} className="size-4" />
										</a>
									</li>
								))}
						</ul>
						<span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
						{onHome ? (
							<Link href="/blog" className="text-xs font-medium transition-colors hover:text-accent">
								Blog →
							</Link>
						) : (
							<Link href="/" className="text-xs font-medium transition-colors hover:text-accent">
								← Home
							</Link>
						)}
					</div>
				</div>
			</div>

			<LightSwitch className="-mt-1 -mr-2 shrink-0" />
		</header>
	)
}
