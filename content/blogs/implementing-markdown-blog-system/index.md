---
title: "Building a Markdown-Based Blog System in Next.js 15"
date: "2025-12-14"
excerpt: "A comprehensive guide to building a fully-featured blog system using markdown files, Next.js 15 App Router, and TypeScript. Learn how to implement file-based routing, metadata extraction, and beautiful typography."
author: "Destiny Ezenwata"
tags: ["Next.js", "TypeScript", "Markdown", "React", "Blog"]
---

# Building a Markdown-Based Blog System in Next.js 15

When building my portfolio website, I wanted a simple yet powerful blogging system that didn't require a database or complex CMS. The solution? A markdown-based blog system leveraging Next.js 15's App Router and static generation capabilities. Here's how I built it.

## Why Markdown?

Markdown offers several advantages for a blog system:

- **Simplicity**: Write content in plain text with minimal formatting
- **Version Control**: Track changes with Git
- **Portability**: Easy to migrate or backup
- **Developer-Friendly**: No need for a database or admin panel
- **Performance**: Static generation means lightning-fast load times

## Architecture Overview

The blog system consists of four main components:

1. **Content Storage**: Markdown files with frontmatter metadata
2. **Blog Utilities**: Functions to read and process markdown files
3. **Blog Listing Page**: Display all blog posts with pagination
4. **Individual Post Page**: Render individual blog posts with full content

## Project Structure

```
portfolio/
├── content/
│   └── blogs/
│       ├── building-scalable-react-apps/
│       │   └── index.md
│       ├── mastering-css-grid/
│       │   └── index.md
│       └── typescript-tips/
│           └── index.md
├── src/
│   ├── app/
│   │   └── blog/
│   │       ├── page.tsx          # Blog listing
│   │       └── [slug]/
│   │           └── page.tsx      # Individual post
│   └── lib/
│       └── blog.ts               # Blog utilities
└── public/
    └── blog-images/              # Blog images
```

## Implementation Details

### 1. Setting Up Dependencies

First, I installed the necessary packages for markdown processing:

```bash
npm install gray-matter remark remark-html
npm install --save-dev @tailwindcss/typography
```

**Key Dependencies:**

- `gray-matter`: Parse frontmatter metadata from markdown files
- `remark` & `remark-html`: Convert markdown to HTML
- `@tailwindcss/typography`: Beautiful typography styles for markdown content

### 2. Creating the Blog Utilities

The core of the system is the `blog.ts` utility file. Here's what it handles:

#### Type Definitions

```typescript
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
```

#### Reading All Blog Posts

```typescript
export function getAllBlogPosts(): BlogPost[] {
	const blogsDirectory = path.join(process.cwd(), "content/blogs")

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
			// Process each blog entry
			// Extract metadata using gray-matter
			// Return BlogPost object
		})

	// Sort posts by date in descending order
	return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}
```

**Key Features:**

- Supports both folder-based (`slug/index.md`) and flat file (`slug.md`) structures
- Extracts frontmatter metadata using `gray-matter`
- Automatically sorts posts by date
- Returns empty array if directory doesn't exist (graceful error handling)

#### Pagination Support

```typescript
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
```

This function makes pagination effortless by returning everything needed for navigation.

#### Processing Individual Posts

```typescript
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

		// Fix relative image paths
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
			content: contentHtml,
			...data,
		} as BlogPostWithContent
	} catch {
		return null
	}
}
```

**Key Features:**

- Flexible file structure support
- Automatic image path resolution for blog-specific images
- Markdown to HTML conversion using `remark`
- Graceful error handling with null return

### 3. Blog Listing Page

The blog listing page (`app/blog/page.tsx`) displays all posts with:

- **Featured Post**: The latest post gets special treatment with a larger card
- **Grid Layout**: Remaining posts displayed in a responsive grid
- **Pagination**: Navigate through multiple pages of posts
- **Metadata Display**: Date, author, reading time, and tags

```typescript
export default async function BlogPage({ searchParams }: BlogPageProps) {
	const resolvedParams = await searchParams
	const currentPage = Number(resolvedParams.page) || 1
	const { posts, totalPages, hasNextPage, hasPrevPage, totalPosts } =
		getPaginatedBlogPosts(currentPage, 6)

	const featuredPost = posts[0]
	const regularPosts = posts.slice(1)

	// Render featured post + grid of regular posts
}
```

**Design Features:**

- Staggered animations for visual appeal
- Hover effects with scale and translation transforms
- Icon integration using Lucide React
- Responsive design with Tailwind CSS

### 4. Individual Blog Post Page

The individual post page (`app/blog/[slug]/page.tsx`) provides:

- **Static Generation**: Pre-renders all blog posts at build time
- **Reading Progress**: Visual indicator of scroll progress
- **Reading Time**: Calculated based on word count
- **Typography Styles**: Beautiful prose styling with `@tailwindcss/typography`

```typescript
export async function generateStaticParams() {
	const slugs = getAllBlogSlugs()
	return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const resolvedParams = await params
	const post = await getBlogPostBySlug(resolvedParams.slug)

	if (!post) {
		notFound()
	}

	const readingTime = calculateReadingTime(post.content)

	// Render post with full content
}
```

**Reading Time Calculator:**

```typescript
const calculateReadingTime = (content: string): number => {
	const wordsPerMinute = 200
	const textContent = content.replace(/<[^>]*>/g, "")
	const wordCount = textContent.split(/\s+/).length
	return Math.ceil(wordCount / wordsPerMinute)
}
```

### 5. Prose Styling

One of the most important aspects is making the content readable. I used Tailwind's typography plugin with extensive customization:

```tsx
<div
	className="prose prose-lg dark:prose-invert max-w-none
  prose-headings:font-bold
  prose-h2:text-3xl prose-h2:border-b
  prose-p:leading-relaxed
  prose-a:text-blue-600 dark:prose-a:text-blue-400
  prose-code:text-pink-600 dark:prose-code:text-pink-400
  prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5
  prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950
  prose-blockquote:border-l-4 prose-blockquote:border-primary
  prose-img:rounded-lg prose-img:shadow-lg"
	dangerouslySetInnerHTML={{ __html: post.content }}
/>
```

This creates a beautiful reading experience with:

- Proper heading hierarchy
- Styled code blocks
- Highlighted inline code
- Beautiful blockquotes
- Rounded images with shadows

## Content Structure

Each blog post uses YAML frontmatter for metadata:

```markdown
---
title: "Your Blog Post Title"
date: "2025-12-14"
excerpt: "A brief description of your post"
author: "Your Name"
tags: ["Next.js", "TypeScript", "React"]
---

# Your Content Here

Write your markdown content...
```

## Advanced Features

### Image Handling

Blog-specific images are stored in `public/blog-images/{slug}/` and automatically resolved:

```typescript
const contentWithFixedImages = content.replace(
	/!\[([^\]]*)\]\(\.\/images\/([^)]+)\)/g,
	`![$1](/blog-images/${slug}/$2)`
)
```

This allows you to use relative paths in your markdown:

```markdown
![My Image](./images/screenshot.png)
```

Which gets converted to:

```markdown
![My Image](/blog-images/my-post-slug/screenshot.png)
```

### Reading Progress Indicator

I created a `ReadingProgress` component that tracks scroll position:

```typescript
// Shows a progress bar at the top of the page
// Fills from 0% to 100% as user scrolls
```

### SEO Optimization

Dynamic metadata generation for each post:

```typescript
export async function generateMetadata({ params }: BlogPostPageProps) {
	const post = await getBlogPostBySlug(params.slug)

	return {
		title: post.title,
		description: post.excerpt,
	}
}
```

## Performance Benefits

The markdown-based approach offers significant performance advantages:

1. **Static Generation**: All pages are pre-rendered at build time
2. **No Database Queries**: Everything is read from the filesystem
3. **Edge-Ready**: Can be deployed to edge networks easily
4. **Instant Navigation**: No loading states for content
5. **SEO-Friendly**: Fully indexable by search engines

## Deployment Considerations

When deploying, ensure your build process includes:

1. All markdown files are included in the build
2. Static params are generated for all blog posts
3. Images are properly optimized
4. Typography plugin is configured in Tailwind

```json
// package.json
{
	"scripts": {
		"build": "next build",
		"start": "next start"
	},
	"dependencies": {
		"gray-matter": "^4.0.3",
		"remark": "^15.0.1",
		"remark-html": "^16.0.1"
	},
	"devDependencies": {
		"@tailwindcss/typography": "^0.5.19"
	}
}
```

## Future Enhancements

Potential improvements to consider:

- **Search Functionality**: Add full-text search across all posts
- **Tag Filtering**: Filter posts by tags
- **RSS Feed**: Generate an RSS feed for subscribers
- **Table of Contents**: Auto-generate TOC from headings
- **Related Posts**: Show related content based on tags
- **Code Syntax Highlighting**: Integrate `rehype-highlight` or `prism`
- **MDX Support**: Enable React components in markdown files

## Conclusion

Building a markdown-based blog system in Next.js 15 is straightforward and provides excellent performance. The file-based approach keeps things simple while offering all the features you need for a professional blog.

The key benefits are:

✅ **Simple content management** - just write markdown files  
✅ **Version control friendly** - track changes with Git  
✅ **Lightning fast** - static generation means optimal performance  
✅ **SEO optimized** - pre-rendered pages with proper metadata  
✅ **Developer friendly** - no database or CMS to manage

Whether you're building a personal blog, documentation site, or content-heavy application, this approach offers a perfect balance of simplicity and functionality.

---

**Source Code**: The complete implementation is available in my [portfolio repository](https://github.com/h1rdr3v2/portfolio).

**Have questions?** Feel free to reach out or open an issue on GitHub!
