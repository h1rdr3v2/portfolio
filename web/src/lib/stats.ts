import { site } from "@/config/site"
import { projects } from "@/data/projects"
import type { Metric } from "@/types/project"

/**
 * Hero figures are derived from the project list rather than typed by hand, so
 * they cannot drift out of date the moment a project is added.
 */
export function getHeroStats(now = new Date()): Metric[] {
	const yearsShipping = now.getUTCFullYear() - site.sinceYear
	const mobileApps = projects.filter((p) => p.category === "mobile").length
	const shipped = projects.length

	return [
		{ value: `${yearsShipping}`, label: "years shipping" },
		{ value: `${mobileApps}`, label: "mobile apps built" },
		{ value: `${shipped}`, label: "projects shipped" },
	]
}
