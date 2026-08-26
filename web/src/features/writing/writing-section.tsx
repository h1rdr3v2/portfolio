import { Link } from "@tanstack/react-router"
import type { PostMeta } from "@/types/blog"
import { Section } from "@/components/ui/section"
import { SectionHeading } from "@/components/ui/section-heading"
import { PostList } from "@/components/blog/post-list"
import { pluralise } from "@/lib/format"

interface WritingSectionProps {
	posts: PostMeta[]
	/** Total across the whole archive, not just what is shown here. */
	total: number
}

/**
 * The homepage teaser. Deliberately capped at the three most recent posts —
 * the archive lives at /blog, and a homepage that lists everything stops being
 * a homepage.
 */
export function WritingSection({ posts, total }: WritingSectionProps) {
	const hasMore = total > posts.length

	return (
		<Section id="writing" className="bg-tint">
			<SectionHeading
				title="Writing / ederede"
				aside={pluralise(total, "post")}
				lede="Notes on the things that only show up once an app is in someone's hand — offline sync, byte budgets, and building for the phones people actually own."
			/>

			<PostList
				posts={posts}
				emptyMessage="First post is still in drafts."
			/>

			<div className="mt-7 flex flex-wrap items-center justify-between gap-4">
				<p className="font-mono text-[13px] text-faint">
					{hasMore
						? `Showing the ${posts.length} most recent.`
						: "That's everything so far."}
				</p>

				<Link
					to="/blog"
					className="rounded-lg border border-rule px-5 py-3 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
				>
					All posts →
				</Link>
			</div>
		</Section>
	)
}
