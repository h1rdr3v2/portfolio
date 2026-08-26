export interface CurrentRole {
	company: string
	/** e.g. "Open for Collaboration" — omitted when there is nothing to flag. */
	status?: string
	period: string
	description: string[]
}

export interface FormerRole {
	title: string
	company: string
	period: string
	summary?: string
}

export interface Social {
	/** Lowercase label as rendered in the rail. */
	name: string
	url: string
}
