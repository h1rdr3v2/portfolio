import { Link } from "@inertiajs/react"
import type { PostSummary } from "@/types"
import { SectionHeading } from "@/components/ui/section-heading"
import { PostList } from "@/components/blog/post-list"

interface WritingSectionProps {
	posts: PostSummary[]
	total: number
}

/** The three most recent posts; the rest live at /blog. */
export function WritingSection({ posts, total }: WritingSectionProps) {
	if (posts.length === 0) return null

	return (
		<section id="blog" className="w-full">
			<SectionHeading
				aside={
					<Link
						href="/blog"
						className="font-mono text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent"
					>
						All posts{total > posts.length ? ` (${total})` : ""} →
					</Link>
				}
			>
				Blog
			</SectionHeading>
			<div className="mt-4">
				<PostList posts={posts} />
			</div>
		</section>
	)
}
