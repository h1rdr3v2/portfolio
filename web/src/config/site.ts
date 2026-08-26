import type { Social } from "@/types/experience"

export const site = {
	name: "Destiny Ezenwata",
	/** Split for the two-line rail wordmark. */
	nameLines: ["Destiny", "Ezenwata"] as const,
	handle: "justdeveze",
	role: "Mobile & Software Developer",
	location: "Umuahia, NG · UTC+1",
	email: "destinyezenwata@bleon.net",
	url: "https://deveze.bleon.net",
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
