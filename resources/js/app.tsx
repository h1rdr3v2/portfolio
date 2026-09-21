import { createInertiaApp } from "@inertiajs/react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { resolvePage } from "@/lib/pages"
import { pageTitle } from "@/lib/title"

createInertiaApp({
	title: pageTitle,
	resolve: resolvePage,
	progress: { color: "hsl(217 91% 66%)" },
	setup({ el, App, props }) {
		// The SSR server, when it is running, has already put markup in the
		// root; hydrating keeps it instead of throwing it away and repainting.
		if (el.hasChildNodes()) {
			hydrateRoot(el, <App {...props} />)
		} else {
			createRoot(el).render(<App {...props} />)
		}
	},
})
