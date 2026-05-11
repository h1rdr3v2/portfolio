import { createFileRoute, Outlet } from "@tanstack/react-router"
import HeaderSection from "@/components/sections/HeaderSection"
import AnimatedBackground from "@/components/common/AnimatedBackground"

export const Route = createFileRoute("/blog")({
	component: BlogLayout,
})

function BlogLayout() {
	return (
		<>
			<AnimatedBackground />
			<HeaderSection />
			<div className="min-h-screen w-full pt-24 md:pt-28 relative">
				<Outlet />
			</div>
		</>
	)
}
