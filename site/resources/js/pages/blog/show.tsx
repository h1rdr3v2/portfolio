import { Head, Link } from "@inertiajs/react"
import type { Comment, Post, ReactionTally } from "@/types"
import { formatDate, readingLabel } from "@/lib/format"
import { withSiteLayout } from "@/layouts/site-layout"
import { Icon } from "@/components/ui/icons"
import { TagList } from "@/components/ui/tag"
import { PostBody } from "@/components/blog/post-body"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { Reactions } from "@/components/blog/reactions"
import { Comments } from "@/components/blog/comments"

interface Neighbour {
	slug: string
	title: string
}

interface ShowProps {
	post: Post
	reactions: ReactionTally[]
	comments: Comment[]
	previous: Neighbour | null
	next: Neighbour | null
}

export default function BlogShow({ post, reactions, comments, previous, next }: ShowProps) {
	return (
		<>
			<Head title={post.title} />
			<ReadingProgress />

			<article className="w-full">
				<Link href="/blog" className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent">
					← All posts
				</Link>

				<header className="mt-6">
					<h1 className="text-3xl leading-tight font-bold">{post.title}</h1>
					{post.excerpt ? <p className="mt-2 text-muted-foreground">{post.excerpt}</p> : null}
					<p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
						<span>
							Published on{" "}
							<time dateTime={post.publishedAt ?? undefined} className="text-foreground">
								{formatDate(post.publishedAt)}
							</time>
						</span>
						<span aria-hidden="true">·</span>
						<span>{readingLabel(post.readingMinutes)}</span>
						<span aria-hidden="true">·</span>
						<span className="inline-flex items-center gap-1">
							<Icon name="eye" className="size-3.5" />
							{post.views} {post.views === 1 ? "view" : "views"}
						</span>
					</p>
					<TagList items={post.tags} className="mt-4" />
				</header>

				{post.coverImage ? (
					<img
						src={post.coverImage}
						alt=""
						className="mt-6 w-full rounded-lg border border-border object-cover"
					/>
				) : null}

				<PostBody html={post.html} />
			</article>

			<div className="w-full border-t border-border pt-10">
				<Reactions slug={post.slug} reactions={reactions} />
			</div>

			<div className="w-full border-t border-border pt-10">
				<Comments slug={post.slug} comments={comments} />
			</div>

			<nav aria-label="More posts" className="grid w-full gap-3 border-t border-border pt-8 sm:grid-cols-2">
				{previous ? (
					<Link href={`/blog/${previous.slug}`} className="group rounded-lg bg-card p-4 transition-colors hover:bg-muted">
						<span className="font-mono text-xs text-muted-foreground">← Previous</span>
						<span className="mt-1 block text-sm font-medium transition-colors group-hover:text-accent">{previous.title}</span>
					</Link>
				) : (
					<span />
				)}
				{next ? (
					<Link
						href={`/blog/${next.slug}`}
						className="group rounded-lg bg-card p-4 text-right transition-colors hover:bg-muted sm:col-start-2"
					>
						<span className="font-mono text-xs text-muted-foreground">Next →</span>
						<span className="mt-1 block text-sm font-medium transition-colors group-hover:text-accent">{next.title}</span>
					</Link>
				) : null}
			</nav>
		</>
	)
}

BlogShow.layout = withSiteLayout
