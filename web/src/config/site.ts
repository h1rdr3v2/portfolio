import type { Social } from "@/types/experience"

/** Where the site lives when nothing says otherwise. */
const CANONICAL_URL = "https://deveze.bleon.net"

/**
 * The absolute origin used for canonical and social-preview URLs.
 *
 * Crawlers cannot resolve a relative `/images/og.jpg`, so these have to be
 * absolute — which means the origin is a deploy-time fact, not a runtime one.
 * `VITE_SITE_URL` lets a preview deploy advertise its own domain instead of
 * production's; unset, everything points at the canonical domain, so a link
 * shared from anywhere still resolves to the real site.
 *
 * `import.meta.env` rather than `process.env`: this module is imported by
 * client code too, and Vite only substitutes the former in the browser bundle.
 */
function resolveSiteUrl(): string {
	const configured = import.meta.env.VITE_SITE_URL
	if (!configured) return CANONICAL_URL
	// A trailing slash here would produce "…net//images/og.jpg".
	return configured.trim().replace(/\/+$/, "") || CANONICAL_URL
}


export const site = {
	name: "Destiny Ezenwata",
	/** Split for the two-line rail wordmark. */
	nameLines: ["Destiny", "Ezenwata"] as const,
	handle: "justdeveze",
	role: "Mobile & Software Developer",
	location: "Umuahia, NG · UTC+1",
	email: "destinyezenwata@bleon.net",
	url: resolveSiteUrl(),
	ogImage: "/images/og.jpg",
	/** Greyscale so it sits on the inverted contact ground. */
	photo: "/images/me.webp",
	description:
		"Portfolio of Destiny Ezenwata — mobile and software developer building React Native, Expo and TypeScript products from Nigeria.",
	/** First year of paid work; hero stats count from here. */
	sinceYear: 2017,
	calendarUrl: "https://cal.com/destiny-ezenwata/work-chat",
	resumeUrl: "/resume.pdf",
} as const

export const socials: Social[] = [
	{ name: "github", url: "https://github.com/h1rdr3v2" },
	{ name: "linkedin", url: "https://www.linkedin.com/in/destinyezenwata/" },
	{ name: "x", url: "https://www.x.com/justdeveze" },
	{ name: "upwork", url: "https://www.upwork.com/freelancers/~01699292f4f731ebce" },
	{ name: "mail", url: "mailto:destinyezenwata@bleon.net" },
]

/** Socials compact enough for the rail's bottom row. */
export const railSocials = socials.slice(0, 3)
