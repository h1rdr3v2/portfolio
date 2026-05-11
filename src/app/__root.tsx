/// <reference types="vite/client" />
import type { ReactNode } from "react"
import {
	Outlet,
	createRootRoute,
	HeadContent,
	Scripts,
	Link,
} from "@tanstack/react-router"
import { ThemeProvider } from "@/components/ThemeProvider"
import CustomCursor from "@/components/common/CustomCursor"
import appCss from "./globals.css?url"
import pageStyleCss from "./pagestyle.css?url"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				title: "Destiny Ezenwata - Software Developer <> Mobile App Developer",
			},
			{
				name: "description",
				content: "Portfolio of Destiny Ezenwata",
			},
			// Open Graph
			{
				property: "og:title",
				content:
					"Destiny Ezenwata - Software Developer <> Mobile App Developer",
			},
			{
				property: "og:description",
				content:
					"Portfolio of Destiny Ezenwata - Full-stack developer specializing in React, Next.js, and mobile development",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:locale", content: "en_US" },
			{
				property: "og:site_name",
				content: "Destiny Ezenwata Portfolio",
			},
			{
				property: "og:image",
				content: "https://deveze.bleon.net/images/portfolio-shot.png",
			},
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:image:alt",
				content: "Destiny Ezenwata Portfolio",
			},
			// Twitter
			{ name: "twitter:card", content: "summary_large_image" },
			{
				name: "twitter:title",
				content:
					"Destiny Ezenwata - Software Developer <> Mobile App Developer",
			},
			{
				name: "twitter:description",
				content:
					"Portfolio of Destiny Ezenwata - Full-stack developer specializing in React, Next.js, and Mobile development Using Expo and React Native",
			},
			{ name: "twitter:creator", content: "@JustDevEze" },
			{
				name: "twitter:image",
				content: "https://deveze.bleon.net/images/portfolio-shot.png",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "stylesheet", href: pageStyleCss },
			// Favicons
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/icons/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/icons/favicon-16x16.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "57x57",
				href: "/icons/apple-icon-57x57.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "60x60",
				href: "/icons/apple-icon-60x60.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "72x72",
				href: "/icons/apple-icon-72x72.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "76x76",
				href: "/icons/apple-icon-76x76.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "114x114",
				href: "/icons/apple-icon-114x114.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "120x120",
				href: "/icons/apple-icon-120x120.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "144x144",
				href: "/icons/apple-icon-144x144.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "152x152",
				href: "/icons/apple-icon-152x152.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/icons/apple-icon-180x180.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "192x192",
				href: "/icons/android-icon-192x192.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "96x96",
				href: "/icons/favicon-96x96.png",
			},
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
		<RootDocument>
			<div className="min-h-screen flex flex-col items-center justify-center gap-4">
				<h1 className="text-6xl font-bold text-foreground">404</h1>
				<p className="text-lg text-muted-foreground">
					This page doesn&apos;t exist.
				</p>
				<Link
					to="/"
					className="text-sm font-medium text-primary underline underline-offset-4 hover:opacity-70"
				>
					Go home
				</Link>
			</div>
		</RootDocument>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	const themeScript = `
		(function() {
			try {
				var stored = localStorage.getItem('theme');
				var theme = stored || 'system';
				if (theme === 'system') {
					theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
				}
				document.documentElement.classList.add(theme);
			} catch(e) {}
		})()
	`
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className="antialiased bg-background text-foreground">
				<ThemeProvider>
					<CustomCursor />
					{children}
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	)
}
