import "./pagestyle.css"
import QuoteSection from "@/components/sections/QuoteSection"
import AboutSection from "@/components/sections/AboutSection"
import IntroSection from "@/components/sections/IntroSection"
import RolesSection from "@/components/sections/RolesSection"
import FooterSection from "@/components/sections/FooterSection"
import HeaderSection from "@/components/sections/HeaderSection"
import SocialsSection from "@/components/sections/SocialsSection"
import { currentRoles, formerRoles, projects, socials } from "@/data/data"
import ShowcaseProjectsSection from "@/components/sections/ShowcaseProjectsSection"

export default function Home() {
	return (
		<>
			<HeaderSection />
			<main className="min-h-screen max-w-xl mx-auto w-full flex flex-col justify-start gap-16 items-center pt-24 md:pt-28 pb-16 px-6 sm:px-0 font-[family-name:var(--font-geist-sans)] relative">
				<div className="animate-fadeInUp w-full">
					<IntroSection />
				</div>
				<div className="animate-fadeInUp animation-delay-200">
					<AboutSection />
				</div>
				<div className="animate-fadeInUp animation-delay-400 w-full">
					<ShowcaseProjectsSection projects={projects} />
				</div>
				<div className="animate-fadeInUp animation-delay-600">
					<QuoteSection />
				</div>
				<div className="animate-fadeInUp animation-delay-800 w-full">
					<RolesSection currentRoles={currentRoles} formerRoles={formerRoles} />
				</div>
				<div className="animate-fadeInUp animation-delay-1000 w-full">
					<SocialsSection socials={socials} />
				</div>
				<FooterSection />
			</main>
		</>
	)
}
