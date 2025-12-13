import Link from "next/link"
import { getPaginatedBlogPosts } from "@/lib/blog"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, User } from "lucide-react"

interface BlogPageProps {
	searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const resolvedParams = await searchParams
	const currentPage = Number(resolvedParams.page) || 1
	const { posts, totalPages, hasNextPage, hasPrevPage, totalPosts } =
		getPaginatedBlogPosts(currentPage, 6)

	return (
		<div className="min-h-screen w-full">
			<div className="container mx-auto px-4 py-8 md:py-16">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
						<p className="text-muted-foreground text-lg">
							Thoughts, tutorials, and insights about software development
						</p>
						<p className="text-sm text-muted-foreground mt-2">
							{totalPosts} {totalPosts === 1 ? "post" : "posts"} total
						</p>
					</div>

					{/* Blog Posts Grid */}
					{posts.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground text-lg">
								No blog posts yet. Check back soon!
							</p>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
								{posts.map((post) => (
									<Link key={post.slug} href={`/blog/${post.slug}`}>
										<Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
											<CardHeader>
												<CardTitle className="line-clamp-2">
													{post.title}
												</CardTitle>
												<CardDescription className="flex flex-col gap-2 mt-2">
													<div className="flex items-center gap-2 text-xs">
														<CalendarDays className="h-3 w-3" />
														<time dateTime={post.date}>
															{new Date(post.date).toLocaleDateString("en-US", {
																year: "numeric",
																month: "long",
																day: "numeric",
															})}
														</time>
													</div>
													{post.author && (
														<div className="flex items-center gap-2 text-xs">
															<User className="h-3 w-3" />
															<span>{post.author}</span>
														</div>
													)}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<p className="text-sm text-muted-foreground line-clamp-3">
													{post.excerpt}
												</p>
											</CardContent>
											{post.tags && post.tags.length > 0 && (
												<CardFooter>
													<div className="flex flex-wrap gap-2">
														{post.tags.slice(0, 3).map((tag) => (
															<Badge
																key={tag}
																variant="secondary"
																className="text-xs"
															>
																{tag}
															</Badge>
														))}
													</div>
												</CardFooter>
											)}
										</Card>
									</Link>
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="flex justify-center items-center gap-4">
									{hasPrevPage ? (
										<Link href={`/blog?page=${currentPage - 1}`}>
											<Button variant="outline">Previous</Button>
										</Link>
									) : (
										<Button variant="outline" disabled>
											Previous
										</Button>
									)}

									<span className="text-sm text-muted-foreground">
										Page {currentPage} of {totalPages}
									</span>

									{hasNextPage ? (
										<Link href={`/blog?page=${currentPage + 1}`}>
											<Button variant="outline">Next</Button>
										</Link>
									) : (
										<Button variant="outline" disabled>
											Next
										</Button>
									)}
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
