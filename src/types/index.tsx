export interface ProjectLinksProps {
	playstore?: string
	appstore?: string
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
	logo?: string
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
	company: string
	title?: string
	description?: string[]
	status?: string
	statusColor?: string
	period?: string
}
