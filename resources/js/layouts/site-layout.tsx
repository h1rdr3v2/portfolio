import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { SiteIdentity } from "@/components/layout/site-identity"
import { SiteFooter } from "@/components/layout/site-footer"

/**
 * The frame every page renders into: one narrow column, who-this-is at the
 * top, the signature at the bottom. Used as a persistent Inertia layout so
 * the identity block does not remount between pages.
 */
export function SiteLayout({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<main className="relative mx-auto flex min-h-screen w-full max-w-[640px] flex-col items-center gap-14 px-6 pt-10 pb-16 md:pt-14">
				<SiteIdentity />
				{children}
				<SiteFooter />
			</main>
		</ThemeProvider>
	)
}

export const withSiteLayout = (page: ReactNode) => <SiteLayout>{page}</SiteLayout>
