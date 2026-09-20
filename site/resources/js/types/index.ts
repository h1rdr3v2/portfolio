export interface Social {
	name: string
	url: string
}

/** Mirrors `config/site.php`, shared on every page. */
export interface Site {
	name: string
	wordmark: string
	handle: string
	role: string
	location: string
	country: string
	email: string
	description: string
	og_image: string
	photo: string
	calendar_url: string
	resume_url: string
	domain: string
	socials: Social[]
}

export interface SharedProps {
	site: Site
	flash: { status: string | null }
	[key: string]: unknown
}

export type ProjectCategory = "mobile" | "website" | "bot" | "api"

export type ProjectLinkKind =
	| "appstore"
	| "playstore"
	| "website"
	| "github"
	| "telegram"
	| "whatsapp"

export interface ProjectImage {
	url: string
	width: number | null
	height: number | null
}

export interface Project {
	slug: string
	name: string
	category: ProjectCategory
	categoryLabel: string
	description: string | null
	story: string
	tools: string[]
	links: Partial<Record<ProjectLinkKind, string>>
	images: ProjectImage[]
	year: string
}

export interface PostSummary {
	slug: string
	title: string
	excerpt: string | null
	tags: string[]
	readingMinutes: number
	views: number
	publishedAt: string | null
	reactionsCount: number
	/** The most-used emojis with their counts, most first. */
	topReactions: { emoji: string; count: number }[]
	commentsCount: number
}

export interface Post extends PostSummary {
	html: string
	coverImage: string | null
}

export interface ReactionTally {
	emoji: string
	count: number
	mine: boolean
}

export interface Comment {
	id: number
	name: string
	body: string
	createdAt: string
}

export interface Role {
	company: string
	title: string | null
	period: string
	status: string | null
	description: string[]
	isCurrent: boolean
}
