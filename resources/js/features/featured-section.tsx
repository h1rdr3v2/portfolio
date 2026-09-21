import type { Project } from "@/types"
import { SectionHeading } from "@/components/ui/section-heading"
import { ProjectCard } from "@/components/project/project-card"

export function FeaturedSection({ projects }: { projects: Project[] }) {
	if (projects.length === 0) return null

	return (
		<section id="projects" className="mt-2 w-full scroll-mt-6">
			<SectionHeading>Featured</SectionHeading>
			<div className="mt-5 flex flex-col gap-14">
				{projects.map((project, index) => (
					<ProjectCard key={project.slug} project={project} eager={index === 0} />
				))}
			</div>
		</section>
	)
}
