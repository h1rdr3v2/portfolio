import { Head } from "@inertiajs/react"
import type { PostSummary, Project, Role } from "@/types"
import { withSiteLayout } from "@/layouts/site-layout"
import { AboutSection } from "@/features/about-section"
import { NowSection } from "@/features/now-section"
import { FeaturedSection } from "@/features/featured-section"
import { ProjectIndexSection } from "@/features/project-index-section"
import { WritingSection } from "@/features/writing-section"
import { ExperienceSection } from "@/features/experience-section"
import { KeepInTouchSection } from "@/features/keep-in-touch-section"

interface HomeProps {
	now: string | null
	featured: Project[]
	projects: Project[]
	posts: PostSummary[]
	postCount: number
	currentRoles: Role[]
	formerRoles: Role[]
}

/**
 * Who, then the work, then the words about the work. The featured screens
 * come before "What I'm working on" on purpose: for a mobile developer the
 * screens are the proof, and the paragraph reads as the story behind them.
 */
export default function Home({ now, featured, projects, posts, postCount, currentRoles, formerRoles }: HomeProps) {
	return (
		<>
			<Head title="" />
			<AboutSection />
			<FeaturedSection projects={featured} />
			<NowSection html={now} />
			<ProjectIndexSection projects={projects} />
			<WritingSection posts={posts} total={postCount} />
			<ExperienceSection current={currentRoles} former={formerRoles} />
			<KeepInTouchSection />
		</>
	)
}

Home.layout = withSiteLayout
