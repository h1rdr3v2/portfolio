/// <reference types="vite/client" />
import type { ReactNode } from "react"
import {
	createRootRoute,
	HeadContent,
	Link,
	Outlet,
	Scripts,
} from "@tanstack/react-router"
import { site } from "@/config/site"
import appCss from "@/styles/app.css?url"

const title = `${site.name} — ${site.role}`
const ogImage = `${site.url}${site.ogImage}`

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title },
			{ name: "description", content: site.description },
			{ name: "author", content: site.name },
			{ name: "theme-color", content: "#faf9f4" },

			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: `${site.name} — Portfolio` },
			{ property: "og:title", content: title },
			{ property: "og:description", content: site.description },
			{ property: "og:url", content: site.url },
			{ property: "og:locale", content: "en_NG" },
			{ property: "og:image", content: ogImage },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:image:alt", content: `${site.name} portfolio` },

			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: site.description },
			{ name: "twitter:creator", content: `@${site.handle}` },
			{ name: "twitter:image", content: ogImage },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Public+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
			},
			{ rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32x32.png" },
			{ rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/favicon-16x16.png" },
			{ rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-icon-180x180.png" },
			{ rel: "manifest", href: "/manifest.json" },
		],
	}),
	component: RootComponent,
	notFoundComponent: NotFound,
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
			<p className="font-mono text-xs text-faint">404</p>
			<h1 className="font-serif text-5xl font-normal">This page doesn't exist.</h1>
			<Link to="/" className="text-accent hover:text-accent-deep">
				Back to the start →
			</Link>
		</div>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				<noscript>
					{/* Reveal animations start hidden; without JS they never fire. */}
					<style>{`[data-reveal]{opacity:1;transform:none}[data-uli] path{stroke-dashoffset:0}`}</style>
				</noscript>
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}
