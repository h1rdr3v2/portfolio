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
                prose-headings:font-bold
                prose-h1:text-4xl prose-h1:mb-4
                prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-8
                prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-6
                prose-p:mb-4 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:font-semibold
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                prose-img:rounded-lg prose-img:shadow-lg"
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
