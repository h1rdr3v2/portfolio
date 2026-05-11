import { createServerFn } from "@tanstack/react-start"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const blogsDirectory = path.join(process.cwd(), "content/blogs")

export interface BlogPost {
	slug: string
	title: string
	date: string
	excerpt: string
	author?: string
	tags?: string[]
	[key: string]: unknown
}

export interface BlogPostWithContent extends BlogPost {
	content: string
}

export const getPaginatedBlogPosts = createServerFn({ method: "GET" }).handler(
	async () => {
		const page = 1
		const postsPerPage = 6

		const allPosts = getAllBlogPostsInternal()
		const totalPosts = allPosts.length
		const totalPages = Math.ceil(totalPosts / postsPerPage)
		const startIndex = (page - 1) * postsPerPage
		const endIndex = startIndex + postsPerPage
		const posts = allPosts.slice(startIndex, endIndex)

		return {
			posts,
			currentPage: page,
			totalPages,
			totalPosts,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
		}
	},
)

export const getBlogPostBySlug = createServerFn({ method: "GET" })
	.inputValidator((d: { slug: string }) => d)
	.handler(async ({ data }) => {
		const slug = data.slug
		try {
			let fullPath = path.join(blogsDirectory, slug, "index.md")
			if (!fs.existsSync(fullPath)) {
				fullPath = path.join(blogsDirectory, `${slug}.md`)
			}

			const fileContents = fs.readFileSync(fullPath, "utf8")
			const { data: frontmatter, content } = matter(fileContents)

			const contentWithFixedImages = content.replace(
				/!\[([^\]]*)]\(\.\/images\/([^)]+)\)/g,
				`![$1](/blog-images/${slug}/$2)`,
			)

			const processedContent = await remark()
				.use(html)
				.process(contentWithFixedImages)
			const contentHtml = processedContent.toString()

			return {
				slug,
				title: frontmatter.title || "Untitled",
				date: frontmatter.date || new Date().toISOString(),
				excerpt: frontmatter.excerpt || "",
				author: frontmatter.author,
				tags: frontmatter.tags || [],
				content: contentHtml,
				...frontmatter,
			} as BlogPostWithContent
		} catch {
			return null
		}
	})

export const getAllBlogSlugs = createServerFn({ method: "GET" }).handler(
	async () => {
		if (!fs.existsSync(blogsDirectory)) {
			return []
		}

		const entries = fs.readdirSync(blogsDirectory, { withFileTypes: true })
		return entries
			.filter((entry) => {
				if (entry.isDirectory()) {
					const indexPath = path.join(blogsDirectory, entry.name, "index.md")
					return fs.existsSync(indexPath)
				}
				return entry.isFile() && entry.name.endsWith(".md")
			})
			.map((entry) => {
				if (entry.isDirectory()) {
					return entry.name
				}
				return entry.name.replace(/\.md$/, "")
			})
	},
)

function getAllBlogPostsInternal(): BlogPost[] {
	if (!fs.existsSync(blogsDirectory)) {
		return []
	}

	const entries = fs.readdirSync(blogsDirectory, { withFileTypes: true })
	const allPostsData = entries
		.filter((entry) => {
			if (entry.isDirectory()) {
				const indexPath = path.join(blogsDirectory, entry.name, "index.md")
				return fs.existsSync(indexPath)
			}
			return entry.isFile() && entry.name.endsWith(".md")
		})
		.map((entry) => {
			let slug: string
			let fullPath: string

			if (entry.isDirectory()) {
				slug = entry.name
				fullPath = path.join(blogsDirectory, entry.name, "index.md")
			} else {
				slug = entry.name.replace(/\.md$/, "")
				fullPath = path.join(blogsDirectory, entry.name)
			}

			const fileContents = fs.readFileSync(fullPath, "utf8")
			const { data } = matter(fileContents)

			return {
				slug,
				title: data.title || "Untitled",
				date: data.date || new Date().toISOString(),
				excerpt: data.excerpt || "",
				author: data.author,
				tags: data.tags || [],
				...data,
			} as BlogPost
		})

	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1
		} else {
			return -1
		}
	})
}
