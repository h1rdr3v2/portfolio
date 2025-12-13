import "./pagestyle.css"
import { ProjectInterface, Role, Socials } from "@/types"
import QuoteSection from "@/components/sections/QuoteSection"
import AboutSection from "@/components/sections/AboutSection"
import IntroSection from "@/components/sections/IntroSection"
import FooterSection from "@/components/sections/FooterSection"
import HeaderSection from "@/components/sections/HeaderSection"
import SocialsSection from "@/components/sections/SocialsSection"
import ShowcaseProjectsSection from "@/components/sections/ShowcaseProjectsSection"
import RolesSection from "@/components/sections/RolesSection"

const projects: ProjectInterface[] = [
	{
		name: "MyCGPA",
		description:
			"A user-friendly mobile app designed to help university students track and calculate their CGPA effortlessly.",
		images: [
			"/mycgpa-1.png",
			"/mycgpa-2.png",
			"/mycgpa-3.png",
			"/mycgpa-4.png",
		],
		links: {
			appstore: "https://apps.apple.com/us/app/mycgpa/id6450861410",
		},
		tools: ["React Native"],
		content: [
			{
				body: "MyCGPA simplifies GPA calculations, allowing students to efficiently manage their academic performance and make informed course decisions.",
			},
			{ image: "/mycgpa-5.png" },
			{
				body: "The screenshot above demonstrates how students can input their course details and instantly receive accurate GPA calculations.",
			},
		],
	},
	{
		name: "Watchman Hymns",
		description:
			"A digital hymn book app designed to enhance worship experiences in church services.",
		images: [
			"/watchman-hymns-4.png",
			"/watchman-hymns-1.png",
			"/watchman-hymns-2.png",
			"/watchman-hymns-3.png",
		],
		links: {
			appstore: "https://apps.apple.com/ng/app/watchmans-hymnal/id6740525384",
		},
		tools: ["React Native"],
		content: [
			{
				body: "Watchman Hymns is a voluntary project developed for the Watchman Catholic Charismatic Renewal Movement church, providing easy access to hymns for worship.",
			},
			{ image: "/watchman-hymns-5.png" },
			{
				body: "The app features a beautifully designed dark mode for an immersive reading experience.",
			},
			{ image: "/watchman-hymns-3.png" },
			{
				body: "It also supports iPads, ensuring a clear and optimized viewing experience on larger screens.",
			},
		],
	},
]
const socials: Socials[] = [
	{
		name: "linkedin",
		url: "https://www.linkedin.com/in/destinyezenwata/",
	},
	{
		name: "mail",
		url: "mailto:support@bleon.co",
	},
	{
		name: "upwork",
		url: "https://www.upwork.com/freelancers/~01699292f4f731ebce",
	},
	{
		name: "github",
		url: "https://github.com/h1rdr3v2",
	},
]
const currentRoles: Role[] = [
	{
		company: "Bleon LTD Collabs",
		status: "Open for Collaboration",
		statusColor: "#8ABB4CFF",
		description: [
			"As the founder of Bleon, I lead a dynamic team specializing in diverse fields. Each year, we collaborate with innovators and businesses to turn visionary ideas into reality. Our expertise spans modern web and mobile technologies, ensuring scalable and high-performance solutions.",
			"Interested in working together? schedule a meeting, and let's build something impactful.",
		],
	},
	{
		company: "HafrikPlay LTD",
		description: [
			"HafrikPlay is dedicated to redefining the Afrobeat music scene by providing a platform for emerging artists across Africa.",
			"We leverage cutting-edge technologies such as Next.js, Expo, React Native, Python, and PHP to create a seamless music streaming experience that empowers artists and connects them with a global audience.",
		],
	},
]
const formerRoles: Role[] = [
	{
		title: "Lead Product Developer",
		company: "Crash Alerts",
		period: "2022 — 2024",
	},
	{ title: "Lead Developer", company: "Softmation", period: "2017 — 2021" },
]

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
