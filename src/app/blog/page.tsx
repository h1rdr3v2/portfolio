import {
	Card,
	CardTitle,
	CardHeader,
	CardFooter,
	CardContent,
	CardDescription,
} from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getPaginatedBlogPosts } from "@/lib/blog"
import HeaderSection from "@/components/sections/HeaderSection"
import { CalendarDays, User, Sparkles, TrendingUp } from "lucide-react"
import AnimatedBackground from "@/components/common/AnimatedBackground"

interface BlogPageProps {
	searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const resolvedParams = await searchParams
	const currentPage = Number(resolvedParams.page) || 1
	const { posts, totalPages, hasNextPage, hasPrevPage, totalPosts } =
		getPaginatedBlogPosts(currentPage, 6)

	const featuredPost = posts[0]
	const regularPosts = posts.slice(1)

	return (
		<>
			<AnimatedBackground />
			<HeaderSection />
			<div className="min-h-screen w-full pt-24 md:pt-28 relative">
				<div className="container mx-auto px-4 py-8 md:py-12">
					<div className="max-w-6xl mx-auto">
						{/* Header */}
						<div className="mb-12 animate-fadeInUp">
							<div className="flex items-center gap-3 mb-4">
								<Sparkles className="h-8 w-8 text-primary animate-pulse" />
								<h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
							</div>
							<p className="text-muted-foreground text-lg max-w-2xl">
								Thoughts, tutorials, and insights about software development, mobile apps, and modern tech.
							</p>
							<div className="flex items-center gap-2 mt-3">
								<Badge variant="secondary" className="text-xs">
									<TrendingUp className="h-3 w-3 mr-1" />
									{totalPosts} {totalPosts === 1 ? "post" : "posts"}
								</Badge>
							</div>
						</div>

					{/* Blog Posts Grid */}
					{posts.length === 0 ? (
						<div className="text-center py-12 animate-fadeInUp animation-delay-200">
							<Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
							<p className="text-muted-foreground text-lg">
								No blog posts yet. Check back soon!
							</p>
						</div>
					) : (
						<>
							{/* Featured Post */}
							{currentPage === 1 && featuredPost && (
								<Link href={`/blog/${featuredPost.slug}`} className="block mb-12 animate-fadeInUp animation-delay-200">
									<Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-2 hover:border-primary/50">
										<div className="grid md:grid-cols-2 gap-6">
											<div className="p-8 flex flex-col justify-between">
												<div>
													<Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
														<Sparkles className="h-3 w-3 mr-1" />
														Featured
													</Badge>
													<CardTitle className="text-3xl mb-4 group-hover:text-primary transition-colors">
														{featuredPost.title}
													</CardTitle>
													<CardDescription className="flex flex-col gap-2 mb-4">
														<div className="flex items-center gap-2 text-xs">
															<CalendarDays className="h-3 w-3" />
															<time dateTime={featuredPost.date}>
																{new Date(featuredPost.date).toLocaleDateString("en-US", {
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																})}
															</time>
														</div>
														{featuredPost.author && (
															<div className="flex items-center gap-2 text-xs">
																<User className="h-3 w-3" />
																<span>{featuredPost.author}</span>
															</div>
														)}
													</CardDescription>
													<p className="text-base text-muted-foreground line-clamp-4">
														{featuredPost.excerpt}
													</p>
												</div>
												{featuredPost.tags && featuredPost.tags.length > 0 && (
													<div className="flex flex-wrap gap-2 mt-6">
														{featuredPost.tags.map((tag) => (
															<Badge key={tag} variant="secondary" className="text-xs">
																{tag}
															</Badge>
														))}
													</div>
												)}
											</div>
											<div className="relative min-h-[300px] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
												<Sparkles className="h-24 w-24 text-primary/20" />
											</div>
										</div>
									</Card>
								</Link>
							)}

							{/* Regular Posts Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
								{(currentPage === 1 ? regularPosts : posts).map((post, index) => (
									<Link 
										key={post.slug} 
										href={`/blog/${post.slug}`}
										className="animate-fadeInUp"
										style={{ animationDelay: `${(index + 3) * 0.1}s` }}
									>
										<Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-1 border hover:border-primary/50">
											<CardHeader>
												<CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
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
		</>
	)
}
