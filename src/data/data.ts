import {ProjectInterface, Role, Socials} from "@/types";

export const projects: ProjectInterface[] = [
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
export const socials: Socials[] = [
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
export const currentRoles: Role[] = [
	{
		company: "Bleon LTD Collabs",
		status: "Open for Collaboration",
		statusColor: "#8ABB4CFF",
		description: [
			"As the founder of Bleon, I guide a team that builds modern, scalable web and mobile solutions.",
			"Interested in working together? schedule a meeting, and let's build something impactful.",
		],
	},
	{
		company: "HafrikPlay LTD",
		description: [
			"HafrikPlay is reshaping the Afrobeat scene by giving emerging African artists a platform.",
			"We use modern technologies like Next.js, Expo, React Native, Python, and PHP to deliver a seamless streaming experience that connects artists to a global audience",
		],
	},
]
export const formerRoles: Role[] = [
	{
		title: "Lead Product Developer",
		company: "Crash Alerts",
		period: "2022 — 2024",
	},
	{ title: "Lead Developer", company: "Softmation", period: "2017 — 2021" },
]