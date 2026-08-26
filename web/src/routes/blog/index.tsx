import { createFileRoute, Link } from "@tanstack/react-router"
import { listPosts } from "@/lib/blog/server"
import { site } from "@/config/site"
import { PageShell } from "@/components/layout/page-shell"
import { PostList } from "@/components/blog/post-list"
import { pluralise } from "@/lib/format"

export const Route = createFileRoute("/blog/")({
	loader: () => listPosts(),
	head: () => ({
		meta: [
			{ title: `Writing — ${site.name}` },
			{
				name: "description",
				content: `Notes on offline-first mobile, sync and building for low-end Android, by ${site.name}.`,
			},
		],
	}),
	component: BlogIndex,
})

function BlogIndex() {
	const posts = Route.useLoaderData()

	return (
		<PageShell>
			<article className="px-5 pt-16 pb-24 md:px-12 lg:px-[72px] lg:pt-28">
				<Link
					to="/"
					hash="writing"
					className="font-mono text-xs text-faint transition-colors hover:text-ink"
				>
					← Back to the portfolio
				</Link>

				<header className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
					<h1 className="font-serif text-[2.75rem] leading-none font-normal tracking-tight md:text-display">
						Writing
					</h1>
					<p className="font-mono text-xs text-faint">
						{pluralise(posts.length, "post")}
					</p>
				</header>

				<p className="mt-5 max-w-[62ch] text-lg leading-relaxed font-light text-mute">
					Everything I've published, newest first. Mostly about the things that
					only show up once an app is in someone's hand.
				</p>

				<div className="mt-10">
					<PostList posts={posts} />
				</div>
			</article>
		</PageShell>
	)
}
