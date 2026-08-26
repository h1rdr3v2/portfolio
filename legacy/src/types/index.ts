export interface ProjectLinksProps {
	appstore?: string
	playstore?: string
	website?: string
	github?: string
	telegram?: string
	whatsapp?: string
}

export type ProjectCategory = "mobile" | "bot" | "api" | "website"

export interface ProjectInterface {
	name: string
	description?: string
	images?: string[]
	links?: ProjectLinksProps
	tools?: string[]
	year: string
	story: string
	category: ProjectCategory
}

export interface Socials {
	name: string
	url: string
}

export interface Role {
	title?: string
	company?: string
	period?: string
	status?: string
	statusColor?: string
	description?: string[]
}
