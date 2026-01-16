import "./globals.css"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import CustomCursor from "@/components/common/CustomCursor"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Destiny Ezenwata - Software Developer <> Mobile App Developer",
	description: "Portfolio of Destiny Ezenwata",
	openGraph: {
		title: "Destiny Ezenwata - Software Developer <> Mobile App Developer",
		description:
			"Portfolio of Destiny Ezenwata - Full-stack developer specializing in React, Next.js, and mobile development",
		type: "website",
		locale: "en_US",
		siteName: "Destiny Ezenwata Portfolio",
		images: [
			{
				url: "https://deveze.bleon.net/images/portfolio-shot.png",
				width: 1200,
				height: 630,
				alt: "Destiny Ezenwata Portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Destiny Ezenwata - Software Developer <> Mobile App Developer",
		description:
			"Portfolio of Destiny Ezenwata - Full-stack developer specializing in React, Next.js, and mobile development",
		creator: "@JustDevEze",
		images: ["https://deveze.bleon.net/images/portfolio-shot.png"],
	},
	icons: {
		icon: "/icons/favicon-32x32.png", // Default favicon
		apple: [
			{ sizes: "57x57", url: "/icons/apple-icon-57x57.png" },
			{ sizes: "60x60", url: "/icons/apple-icon-60x60.png" },
			{ sizes: "72x72", url: "/icons/apple-icon-72x72.png" },
			{ sizes: "76x76", url: "/icons/apple-icon-76x76.png" },
			{ sizes: "114x114", url: "/icons/apple-icon-114x114.png" },
			{ sizes: "120x120", url: "/icons/apple-icon-120x120.png" },
			{ sizes: "144x144", url: "/icons/apple-icon-144x144.png" },
			{ sizes: "152x152", url: "/icons/apple-icon-152x152.png" },
			{ sizes: "180x180", url: "/icons/apple-icon-180x180.png" },
		],
		other: [
			{
				rel: "icon",
				type: "image/png",
				sizes: "192x192",
				url: "/icons/android-icon-192x192.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "96x96",
				url: "/icons/favicon-96x96.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				url: "/icons/favicon-16x16.png",
			},
		],
	},
	manifest: "/manifest.json",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<CustomCursor />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
