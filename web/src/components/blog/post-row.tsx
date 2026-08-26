import { Link } from "@tanstack/react-router"
import type { PostMeta } from "@/types/blog"
import { formatStamp, readingLabel } from "@/lib/format"
import { useRevealRef } from "@/hooks/use-reveal"

/**
 * One post in a list. A whole-row link rather than a button-plus-modal: a post
 * is a page, so it gets a URL you can share, open in a tab and come back to.
 */
export function PostRow({ post }: { post: PostMeta }) {
	const revealRef = useRevealRef<HTMLAnchorElement>()

	return (
		<Link
			ref={revealRef}
			data-reveal="hidden"
			to="/blog/$slug"
			params={{ slug: post.slug }}
			className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-2 border-b border-rule py-6 pl-0 transition-[padding-left] duration-200 ease-out hover:pl-2 focus-visible:pl-2 md:grid-cols-[120px_1fr_150px]"
		>
			<span className="font-mono text-[13px] text-faint">
				{formatStamp(post.date)}
			</span>

			<span>
				<span className="block text-xl font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
					{post.title}
				</span>
				{post.excerpt ? (
					<span className="mt-1.5 block max-w-[64ch] text-[17px] leading-snug font-light text-mute">
						{post.excerpt}
					</span>
				) : null}
			</span>

			<span className="hidden text-right font-mono text-xs text-accent md:block">
				{readingLabel(post.readingMinutes)}
			</span>
		</Link>
	)
}
