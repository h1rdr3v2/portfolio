import type { PostMeta } from "@/types/blog"
import { PostRow } from "./post-row"

interface PostListProps {
	posts: PostMeta[]
	/** Shown in place of the list when there is nothing published yet. */
	emptyMessage?: string
}

export function PostList({ posts, emptyMessage = "Nothing published yet." }: PostListProps) {
	if (posts.length === 0) {
		return <p className="py-8 font-mono text-sm text-faint">{emptyMessage}</p>
	}

	return (
		<div className="border-t border-rule">
			{posts.map((post) => (
				<PostRow key={post.slug} post={post} />
			))}
		</div>
	)
}
