import { createFileRoute, Link } from "@tanstack/react-router"
import { readPost } from "@/lib/blog/server"
import { site } from "@/config/site"
import { formatDate, readingLabel } from "@/lib/format"
import { PageShell } from "@/components/layout/page-shell"
import { PostBody } from "@/components/blog/post-body"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { TagList } from "@/components/ui/tag"
import { ActionLink } from "@/components/ui/action"

export const Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => readPost({ data: params.slug }),
	head: ({ loaderData }) => {
		const post = loaderData?.post
		if (!post) return {}
		return {
			meta: [
				{ title: `${post.title} — ${site.name}` },
				{ name: "description", content: post.excerpt },
				{ property: "og:type", content: "article" },
				{ property: "og:title", content: post.title },
				{ property: "og:description", content: post.excerpt },
				{ property: "article:published_time", content: post.date },
			],
		}
	},
	component: PostPage,
})

function PostPage() {
	const { post, previous, next } = Route.useLoaderData()

	return (
		<PageShell>
			<ReadingProgress />

			<article className="px-5 pt-16 pb-24 md:px-12 lg:px-[72px] lg:pt-28">
				<Link
					to="/blog"
					className="font-mono text-xs text-faint transition-colors hover:text-ink"
				>
					← All posts
				</Link>

				<header className="mt-8 max-w-[68ch]">
					<p className="font-mono text-xs text-faint">
						{formatDate(post.date)} · {readingLabel(post.readingMinutes)}
						{post.author ? ` · ${post.author}` : ""}
					</p>

					<h1 className="mt-4 font-serif text-[2.5rem] leading-tight font-normal tracking-tight md:text-title">
						{post.title}
					</h1>

					{post.excerpt ? (
						<p className="mt-5 text-lg leading-relaxed font-light text-mute md:text-xl">
							{post.excerpt}
						</p>
					) : null}

					<TagList items={post.tags} className="mt-6" />
				</header>

				<PostBody html={post.html} />

				<nav
					aria-label="More posts"
					className="mt-16 grid max-w-[68ch] gap-4 border-t border-rule pt-8 sm:grid-cols-2"
				>
					{previous ? (
						<Link
							to="/blog/$slug"
							params={{ slug: previous.slug }}
							className="group rounded-xl border border-rule p-5 transition-colors hover:border-accent"
						>
							<span className="font-mono text-[11px] text-faint">← Previous</span>
							<span className="mt-1.5 block font-medium text-ink group-hover:text-accent">
								{previous.title}
							</span>
						</Link>
					) : (
						<span />
					)}

					{next ? (
						<Link
							to="/blog/$slug"
							params={{ slug: next.slug }}
							className="group rounded-xl border border-rule p-5 text-right transition-colors hover:border-accent sm:col-start-2"
						>
							<span className="font-mono text-[11px] text-faint">Next →</span>
							<span className="mt-1.5 block font-medium text-ink group-hover:text-accent">
								{next.title}
							</span>
						</Link>
					) : null}
				</nav>

				<aside className="mt-12 flex max-w-[68ch] flex-wrap items-center justify-between gap-4 rounded-xl bg-tint p-6">
					<p className="max-w-[42ch] font-light text-mute">
						Building something that has to work on a bad connection?
					</p>
					<ActionLink
						href={site.calendarUrl}
						target="_blank"
						rel="noreferrer noopener"
						className="px-5 py-3 text-sm"
					>
						Book a call
					</ActionLink>
				</aside>
			</article>
		</PageShell>
	)
}
