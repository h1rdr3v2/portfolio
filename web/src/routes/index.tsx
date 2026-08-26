import { createFileRoute } from "@tanstack/react-router"
import { listRecentPosts } from "@/lib/blog/server"
import { PageShell } from "@/components/layout/page-shell"
import { HeroSection } from "@/features/hero/hero-section"
import { FeaturedSection } from "@/features/featured/featured-section"
import { ProjectIndexSection } from "@/features/projects/project-index-section"
import { WritingSection } from "@/features/writing/writing-section"
import { ExperienceSection } from "@/features/experience/experience-section"
import { ContactSection } from "@/features/contact/contact-section"

/** The homepage never lists more than this many posts — the rest live at /blog. */
const HOME_POST_LIMIT = 3

export const Route = createFileRoute("/")({
	loader: () => listRecentPosts({ data: HOME_POST_LIMIT }),
	component: Home,
})

function Home() {
	const { posts, total } = Route.useLoaderData()

	return (
		<PageShell>
			<HeroSection />
			<FeaturedSection />
			<ProjectIndexSection />
			<WritingSection posts={posts} total={total} />
			<ExperienceSection />
			<ContactSection />
		</PageShell>
	)
}
