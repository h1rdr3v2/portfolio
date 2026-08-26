import { createServerFn } from "@tanstack/react-start"
import { notFound } from "@tanstack/react-router"
import type { Post, PostMeta } from "@/types/blog"

/**
 * The client-callable surface of the blog. Every handler pulls the filesystem
 * module in dynamically so `node:fs` and the markdown pipeline never reach the
 * browser bundle.
 */

/** Every post, newest first — used by /blog. */
export const listPosts = createServerFn({ method: "GET" }).handler(
	async (): Promise<PostMeta[]> => {
		const { getAllPostMeta } = await import("./source")
		return getAllPostMeta()
	},
)

/** The n most recent posts — used by the homepage teaser. */
export const listRecentPosts = createServerFn({ method: "GET" })
	.validator((limit: unknown): number => {
		const parsed = Number(limit)
		return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 3
	})
	.handler(async ({ data: limit }): Promise<{ posts: PostMeta[]; total: number }> => {
		const { getAllPostMeta } = await import("./source")
		const all = getAllPostMeta()
		return { posts: all.slice(0, limit), total: all.length }
	})

export interface PostPayload {
	post: Post
	previous: PostMeta | null
	next: PostMeta | null
}

/** One post plus its neighbours — used by /blog/$slug. */
export const readPost = createServerFn({ method: "GET" })
	.validator((slug: unknown): string => {
		if (typeof slug !== "string" || !/^[a-z0-9][a-z0-9-]*$/i.test(slug)) {
			throw notFound()
		}
		return slug
	})
	.handler(async ({ data: slug }): Promise<PostPayload> => {
		const { getPost, getAdjacentPosts } = await import("./source")
		const post = await getPost(slug)
		if (!post) throw notFound()
		return { post, ...getAdjacentPosts(slug) }
	})
