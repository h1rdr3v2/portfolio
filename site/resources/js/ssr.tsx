import { createInertiaApp } from "@inertiajs/react"
import createServer from "@inertiajs/react/server"
import { renderToString } from "react-dom/server"
import { resolvePage } from "@/lib/pages"
import { pageTitle } from "@/lib/title"

createServer((page) =>
	createInertiaApp({
		page,
		render: renderToString,
		title: pageTitle,
		resolve: resolvePage,
		setup: ({ App, props }) => <App {...props} />,
	}),
)
