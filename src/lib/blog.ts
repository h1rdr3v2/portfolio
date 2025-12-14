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

// Get all blog posts sorted by date
export function getAllBlogPosts(): BlogPost[] {
	// Check if directory exists
	if (!fs.existsSync(blogsDirectory)) {
		return []
	}

	const entries = fs.readdirSync(blogsDirectory, { withFileTypes: true })
	const allPostsData = entries
		.filter((entry) => {
			// Check if it's a directory or a .md file
			if (entry.isDirectory()) {
				// Check if directory contains index.md
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

	// Sort posts by date in descending order
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1
		} else {
			return -1
		}
	})
}

// Get paginated blog posts
export function getPaginatedBlogPosts(
	page: number = 1,
	postsPerPage: number = 6
) {
	const allPosts = getAllBlogPosts()
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
}

// Get a single blog post by slug
export async function getBlogPostBySlug(
	slug: string
): Promise<BlogPostWithContent | null> {
	try {
		// Try folder structure first (slug/index.md)
		let fullPath = path.join(blogsDirectory, slug, "index.md")

		// Fall back to flat file structure (slug.md)
		if (!fs.existsSync(fullPath)) {
			fullPath = path.join(blogsDirectory, `${slug}.md`)
		}

		const fileContents = fs.readFileSync(fullPath, "utf8")
		const { data, content } = matter(fileContents)

		// Replace relative image paths with absolute paths to public directory
		const contentWithFixedImages = content.replace(
			/!\[([^\]]*)\]\(\.\/images\/([^)]+)\)/g,
			`![$1](/blog-images/${slug}/$2)`
		)

		// Convert markdown to HTML
		const processedContent = await remark()
			.use(html)
			.process(contentWithFixedImages)
		const contentHtml = processedContent.toString()

		return {
			slug,
			title: data.title || "Untitled",
			date: data.date || new Date().toISOString(),
			excerpt: data.excerpt || "",
			author: data.author,
			tags: data.tags || [],
			content: contentHtml,
			...data,
		} as BlogPostWithContent
	} catch {
		return null
	}
}

// Get all blog slugs for static generation
export function getAllBlogSlugs() {
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
}
