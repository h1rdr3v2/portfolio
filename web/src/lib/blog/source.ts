import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { readingMinutes } from "@/lib/format"
import type { Post, PostMeta } from "@/types/blog"
import { renderMarkdown } from "./markdown"

/**
 * Filesystem access to `content/blog`. Server-only: never import this from a
 * component — go through `lib/blog/server.ts` instead.
 *
 * A post is either `content/blog/<slug>/index.md` (use this when the post has
 * co-located images) or `content/blog/<slug>.md` for a plain one.
 */
const BLOG_DIR = path.join(process.cwd(), "content", "blog")

interface SourceFile {
	slug: string
	filePath: string
}

function listSourceFiles(): SourceFile[] {
	if (!fs.existsSync(BLOG_DIR)) return []

	return fs
		.readdirSync(BLOG_DIR, { withFileTypes: true })
		.flatMap((entry) => {
			if (entry.isDirectory()) {
				const filePath = path.join(BLOG_DIR, entry.name, "index.md")
				return fs.existsSync(filePath)
					? [{ slug: entry.name, filePath }]
					: []
			}
			if (entry.isFile() && entry.name.endsWith(".md")) {
				return [
					{
						slug: entry.name.replace(/\.md$/, ""),
						filePath: path.join(BLOG_DIR, entry.name),
					},
				]
			}
			return []
		})
}

function parseMeta(slug: string, raw: string): PostMeta {
	const { data, content } = matter(raw)
	return {
		slug,
		title: typeof data.title === "string" ? data.title : "Untitled",
		date:
			typeof data.date === "string"
				? data.date
				: data.date instanceof Date
					? data.date.toISOString()
					: new Date().toISOString(),
		excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
		author: typeof data.author === "string" ? data.author : undefined,
		tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
		readingMinutes: readingMinutes(content),
	}
}

/** Newest first. */
export function getAllPostMeta(): PostMeta[] {
	return listSourceFiles()
		.map(({ slug, filePath }) =>
			parseMeta(slug, fs.readFileSync(filePath, "utf8")),
		)
		.sort((a, b) => b.date.localeCompare(a.date))
}

export function getAllSlugs(): string[] {
	return listSourceFiles().map((file) => file.slug)
}

export async function getPost(slug: string): Promise<Post | null> {
	// Resolve through the listing rather than joining user input into a path,
	// so a crafted slug cannot escape the content directory.
	const source = listSourceFiles().find((file) => file.slug === slug)
	if (!source) return null

	const raw = fs.readFileSync(source.filePath, "utf8")
	const meta = parseMeta(slug, raw)
	const { content } = matter(raw)

	return { ...meta, html: await renderMarkdown(content, slug) }
}

/** The post before and after this one in reverse-chronological order. */
export function getAdjacentPosts(slug: string): {
	previous: PostMeta | null
	next: PostMeta | null
} {
	const all = getAllPostMeta()
	const index = all.findIndex((post) => post.slug === slug)
	if (index === -1) return { previous: null, next: null }
	return {
		previous: all[index + 1] ?? null,
		next: all[index - 1] ?? null,
	}
}
