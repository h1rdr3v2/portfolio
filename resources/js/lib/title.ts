import type { Page } from "@inertiajs/core"
import type { SharedProps } from "@/types"

/** "Post title — Destiny Ezenwata", or the site's own title on the homepage. */
export function pageTitle(title: string, page: Page): string {
	const site = (page.props as unknown as SharedProps).site
	return title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`
}
