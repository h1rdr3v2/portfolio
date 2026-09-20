import { Head } from "@inertiajs/react"
import type { PostSummary } from "@/types"
import { pluralise } from "@/lib/format"
import { withSiteLayout } from "@/layouts/site-layout"
import { PostList } from "@/components/blog/post-list"

export default function BlogIndex({ posts }: { posts: PostSummary[] }) {
	return (
		<>
			<Head title="Blog" />
			<section className="w-full">
				<div className="flex flex-wrap items-baseline justify-between gap-3">
					<h1 className="text-3xl font-bold">Blog</h1>
					<p className="font-mono text-xs text-muted-foreground">{pluralise(posts.length, "post")}</p>
				</div>
			</section>

			<section className="w-full -mt-6">
				<PostList posts={posts} showExcerpts emptyMessage="Nothing published yet — first post is on its way." />
			</section>
		</>
	)
}

BlogIndex.layout = withSiteLayout
