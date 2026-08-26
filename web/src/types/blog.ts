export interface PostMeta {
	slug: string
	title: string
	/** ISO date string. */
	date: string
	excerpt: string
	author?: string
	tags: string[]
	/** Whole minutes, derived from word count at read time. */
	readingMinutes: number
}

export interface Post extends PostMeta {
	/** Sanitised HTML produced by the markdown pipeline. */
	html: string
}
