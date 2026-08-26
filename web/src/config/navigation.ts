/**
 * Section ids double as URL fragments and as scroll-spy targets, so they are
 * declared once here and consumed by the rail, the mobile nav and the sections
 * themselves. Adding a section means adding one entry — nothing else.
 *
 * Labels are bilingual by design: English carries the meaning, Igbo carries
 * where this was built. `shortLabel` is for the mobile bar, where five
 * bilingual labels cannot fit on one line and meaning has to win.
 */
export interface NavItem {
	id: string
	label: string
	shortLabel: string
}

export const navItems: NavItem[] = [
	{ id: "work", label: "Featured work / ọrụ", shortLabel: "Work" },
	{ id: "projects", label: "Everything else / ndị ọzọ", shortLabel: "Projects" },
	{ id: "writing", label: "Writing / ederede", shortLabel: "Writing" },
	{ id: "experience", label: "Experience / ahụmahụ", shortLabel: "Experience" },
	{ id: "contact", label: "Contact / kpọọ m", shortLabel: "Contact" },
]

export const sectionIds = navItems.map((item) => item.id)
