export type ProjectCategory = "mobile" | "bot" | "api" | "website"

export type ProjectLinkKind =
	| "appstore"
	| "playstore"
	| "website"
	| "github"
	| "telegram"
	| "whatsapp"

export type ProjectLinks = Partial<Record<ProjectLinkKind, string>>

export interface Project {
	/** Stable identifier — used for keys, filters and featured lookups. */
	slug: string
	name: string
	/** One-line positioning, shown on cards. */
	description?: string
	/** First-person account of why it exists, shown in the detail view. */
	story: string
	images?: string[]
	links?: ProjectLinks
	tools?: string[]
	/** Free-form because real timelines are messy: "2023 — Present", "Jun 2026". */
	year: string
	category: ProjectCategory
}

export interface Metric {
	value: string
	label: string
}

/**
 * The editorial layer on top of a project for the scroll-driven showcase.
 * Everything here is optional except the slug: the showcase reads the project's
 * own copy first and only uses these when there is something extra to say.
 */
export interface FeaturedProject {
	/** Must match a {@link Project.slug}. */
	slug: string
	/** Screens shown in the phone frame; defaults to the project's images. */
	screens?: string[]
	/** Label under the phone. Defaults to `${name} — live screens`. */
	deviceLabel?: string
	/**
	 * Hard numbers worth leading with. Left empty until there are real ones —
	 * the layout drops the row rather than showing placeholders.
	 */
	metrics?: Metric[]
}
