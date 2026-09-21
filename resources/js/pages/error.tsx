import { Head, Link } from "@inertiajs/react"
import { withSiteLayout } from "@/layouts/site-layout"

const MESSAGES: Record<number, string> = {
	404: "This page doesn't exist.",
	403: "You can't go in there.",
	419: "The page expired — go back and try again.",
	429: "Too many requests. Give it a minute.",
	500: "Something broke on my end.",
	503: "Down for a moment. Back soon.",
}

export default function ErrorPage({ status }: { status: number }) {
	return (
		<>
			<Head title={`${status}`} />
			<section className="flex w-full flex-col items-center gap-4 py-24 text-center">
				<h1 className="text-6xl font-bold">{status}</h1>
				<p className="text-lg text-muted-foreground">{MESSAGES[status] ?? "Something went wrong."}</p>
				<Link href="/" className="text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:decoration-accent">
					Go home
				</Link>
			</section>
		</>
	)
}

ErrorPage.layout = withSiteLayout
