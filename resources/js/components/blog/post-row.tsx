import { Link } from "@inertiajs/react"
import type { PostSummary } from "@/types"
import { formatDate } from "@/lib/format"

/**
 * One post in a list. A whole-row link: a post is a page with a URL you can
 * share, so it behaves like one.
 */
export function PostRow({ post, showExcerpt = false }: { post: PostSummary; showExcerpt?: boolean }) {
	const signals = [
		post.topReactions.length > 0
			? post.topReactions.map((reaction) => `${reaction.emoji} ${reaction.count}`).join("  ")
			: null,
		post.commentsCount > 0 ? `${post.commentsCount} ${post.commentsCount === 1 ? "comment" : "comments"}` : null,
	].filter(Boolean)

	return (
		<Link
			href={`/blog/${post.slug}`}
			className="group flex flex-col gap-1 border-b border-border py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
		>
			<span className="min-w-0">
				<span className="block text-[15px] font-medium text-foreground transition-colors group-hover:text-accent">
					{post.title}
				</span>
				{showExcerpt && post.excerpt ? (
					<span className="mt-1 block text-sm leading-snug text-muted-foreground">{post.excerpt}</span>
				) : null}
			</span>
			<span className="flex shrink-0 gap-3 font-mono text-xs whitespace-nowrap text-muted-foreground">
				{signals.length > 0 ? <span>{signals.join(" · ")}</span> : null}
				<time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
			</span>
		</Link>
	)
}
