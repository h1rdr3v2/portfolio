import type { PostSummary } from "@/types"
import { PostRow } from "./post-row"

interface PostListProps {
	posts: PostSummary[]
	showExcerpts?: boolean
	emptyMessage?: string
}

export function PostList({ posts, showExcerpts = false, emptyMessage = "Nothing here yet." }: PostListProps) {
	if (posts.length === 0) {
		return <p className="py-6 text-sm text-muted-foreground">{emptyMessage}</p>
	}

	return (
		<div className="border-t border-border">
			{posts.map((post) => (
				<PostRow key={post.slug} post={post} showExcerpt={showExcerpts} />
			))}
		</div>
	)
}
