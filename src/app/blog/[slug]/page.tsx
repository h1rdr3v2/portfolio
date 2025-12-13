import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, User } from "lucide-react"

interface BlogPostPageProps {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	const slugs = getAllBlogSlugs()
	return slugs.map((slug) => ({
		slug,
	}))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
	const resolvedParams = await params
	const post = await getBlogPostBySlug(resolvedParams.slug)

	if (!post) {
		return {
			title: "Post Not Found",
		}
	}

	return {
		title: post.title,
		description: post.excerpt,
	}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const resolvedParams = await params
	const post = await getBlogPostBySlug(resolvedParams.slug)

	if (!post) {
		notFound()
	}

	return (
		<div className="min-h-screen w-full">
			<div className="container mx-auto px-4 py-8 md:py-16">
				<div className="max-w-4xl mx-auto">
					{/* Back Button */}
					<Link href="/blog" className="inline-block mb-8">
						<Button variant="ghost" size="sm">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Blog
						</Button>
					</Link>

					{/* Article Header */}
					<article>
						<header className="mb-8">
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								{post.title}
							</h1>

							{/* Meta Information */}
							<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
								<div className="flex items-center gap-2">
									<CalendarDays className="h-4 w-4" />
									<time dateTime={post.date}>
										{new Date(post.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</time>
								</div>
								{post.author && (
									<div className="flex items-center gap-2">
										<User className="h-4 w-4" />
										<span>{post.author}</span>
									</div>
								)}
							</div>

							{/* Tags */}
							{post.tags && post.tags.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{post.tags.map((tag) => (
										<Badge key={tag} variant="secondary">
											{tag}
										</Badge>
									))}
								</div>
							)}
						</header>

						{/* Article Content */}
						<div
							className="prose prose-lg dark:prose-invert max-w-none
								prose-headings:font-bold prose-headings:tracking-tight
								prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8 first:prose-h1:mt-0
								prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:pb-2 prose-h2:border-b
								prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
								prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-6
								prose-p:mb-4 prose-p:leading-relaxed prose-p:text-foreground
								prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline prose-a:decoration-blue-400 prose-a:underline-offset-4
								hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300
								prose-strong:font-semibold prose-strong:text-foreground
								prose-code:text-pink-600 dark:prose-code:text-pink-400 
								prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 
								prose-code:rounded prose-code:font-mono prose-code:text-sm 
								prose-code:before:content-[''] prose-code:after:content-['']
								prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 
								prose-pre:text-slate-50 prose-pre:border prose-pre:border-slate-800
								prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:shadow-lg
								prose-pre:my-6
								prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ul:space-y-2
								prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-ol:space-y-2
								prose-li:text-foreground prose-li:leading-relaxed
								prose-blockquote:border-l-4 prose-blockquote:border-primary 
								prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
								prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
								prose-hr:border-border prose-hr:my-8
								prose-table:border-collapse prose-table:w-full
								prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2
								prose-td:border prose-td:border-border prose-td:p-2"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					</article>

					{/* Back Button at Bottom */}
					<div className="mt-12 pt-8 border-t">
						<Link href="/blog">
							<Button variant="outline">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Blog
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
