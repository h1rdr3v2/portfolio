import type { ComponentType } from "react"

const pages = import.meta.glob<{ default: ComponentType }>("../pages/**/*.tsx")

/** `"blog/show"` → the default export of `resources/js/pages/blog/show.tsx`. */
export async function resolvePage(name: string) {
	const loader = pages[`../pages/${name}.tsx`]
	if (!loader) throw new Error(`Inertia page not found: ${name}`)
	return (await loader()).default
}
