import { ProjectInterface, Role, Socials } from "@/types"

/*
 * SORTING CONVENTION ───────────────────────────────────────────
 * Within each category, order by:
 *   1. Projects with images float to the top (more visually pleasing)
 *   2. Within each group, newest → oldest by year
 * ───────────────────────────────────────────────────────────────
 */
export const projects: ProjectInterface[] = [
	// ── Mobile Apps ──────────────────────────────────────────────
	{
		name: "LedgerCopilot",
		description:
			"An AI-powered personal finance app that helps you track expenses, parse bank statements, and monitor your financial health — all from your pocket.",
		images: [
			"/images/projects/ledgercopilot/ledgercopilot-1.png",
			"/images/projects/ledgercopilot/ledgercopilot-2.png",
			"/images/projects/ledgercopilot/ledgercopilot-3.png",
			"/images/projects/ledgercopilot/ledgercopilot-4.png",
			"/images/projects/ledgercopilot/ledgercopilot-5.png",
			"/images/projects/ledgercopilot/ledgercopilot-6.png",
		],
		tools: ["React Native", "NestJS", "NativeWind"],
		year: "2026",
		story:
			"Felt like something else had my pocket — money would just disappear without a trace. So I built LedgerCopilot to take back control: AI-powered expense tracking, smart bank statement parsing, and a financial health dashboard that actually tells you where your money is going.",
		category: "mobile",
	},
	{
		name: "Watchman Hymns",
		description:
			"A digital hymn book app designed to enhance worship experiences in church services.",
		images: [
			"/images/projects/watchman-hymns/watchman-hymns-4.png",
			"/images/projects/watchman-hymns/watchman-hymns-1.png",
			"/images/projects/watchman-hymns/watchman-hymns-2.png",
			"/images/projects/watchman-hymns/watchman-hymns-3.png",
		],
		tools: ["React Native"],
		year: "2024 · Discontinued",
		story:
			"A voluntary project for the Watchman Catholic Charismatic Renewal Movement — built a digital hymn book from scratch with dark mode, iPad support, and offline access so worshippers could follow along seamlessly during services. Was on the App Store until the church requested it be taken down.",
		category: "mobile",
	},
	{
		name: "MyCGPA",
		description:
			"A user-friendly mobile app designed to help university students track and calculate their CGPA effortlessly.",
		images: [
			"/images/projects/mycgpa/mycgpa-1.png",
			"/images/projects/mycgpa/mycgpa-2.png",
			"/images/projects/mycgpa/mycgpa-3.png",
			"/images/projects/mycgpa/mycgpa-4.png",
		],
		links: {
			appstore: "https://apps.apple.com/us/app/mycgpa/id6450861410",
			playstore:
				"https://play.google.com/store/apps/details?id=com.mycgpa&hl=en-US&ah=SAs4KbjFiv7epoY8nfDpWy-61zk",
		},
		tools: ["React Native", "Expo", "NestJs", "TypeScript", "MySQL"],
		year: "2023 — Present",
		story:
			"Started as a bare React Native app in 2023 to help university students track their CGPA. Migrated the entire codebase to Expo in 2025 for better DX and OTA updates. Been solo maintaining and shipping updates ever since.",
		category: "mobile",
	},
	{
		name: "Hustle",
		links: {
			website: "https://usehustleapp.com",
		},
		tools: ["Expo", "React Native", "NestJS", "TypeScript", "Docker"],
		year: "2025 — 2026",
		story:
			"My second Abia State hackathon — me and my team placed 3rd and we've been building on the idea ever since. Hustle is growing into something real.",
		category: "mobile",
	},
	{
		name: "MOUAU eVoting System",
		description:
			"An open-source mobile voting system for hosting elections across different faculties in the university.",
		links: {
			github: "https://github.com/h1rdr3v2/mouau-evoting-system",
		},
		tools: ["Expo", "React Native"],
		year: "Aug 2025",
		story:
			"Built a complete mobile voting system during my final year project at university — designed to run real elections across different faculties. Open-sourced the entire codebase so others could learn from and build on it.",
		category: "mobile",
	},
	{
		name: "HafrikPlay",
		description:
			"A music streaming app for an Afrobeat platform connecting emerging African artists to a global audience.",
		tools: ["React Native", "Expo", "Next.js"],
		year: "2024 — Present",
		story:
			"Built the full music streaming experience for HafrikPlay — the mobile app, web dashboard, and artist portal. Reshaping the Afrobeat scene by giving emerging African artists a real platform to reach global listeners.",
		category: "mobile",
	},
	{
		name: "Minimalist Weather",
		links: {
			github: "https://github.com/h1rdr3v2/minimalist-weather-rn",
		},
		tools: ["React Native"],
		year: "2023",
		story:
			"My first official mobile app — built with React Native CLI before I ever touched Expo. Simple, clean, and the project that got me hooked on mobile development.",
		category: "mobile",
	},

	// ── Bots ─────────────────────────────────────────────────────
	{
		name: "Lanny WebPify",
		description:
			"A lightweight microservice for converting images to WebP stickers and vice versa — extracted from a larger WhatsApp chatbot.",
		links: {
			github: "https://github.com/h1rdr3v2/lanny-webpify",
		},
		tools: ["PHP", "Docker"],
		year: "Open-sourced Jan 2026",
		story:
			"Born from Lanny, my WhatsApp chatbot that converted images to stickers and stickers back to images. When WhatsApp shipped the feature natively, I extracted and open-sourced the core conversion microservice.",
		category: "bot",
	},
	{
		name: "CreditWithBleon",
		description:
			"An AI-powered Telegram & WhatsApp chatbot that vends mobile data and airtime with intelligent plan recommendations.",
		links: {
			telegram: "https://t.me/CreditWithBleonBot",
			whatsapp: "https://wa.me/message/QC2RPONS2LO2L1",
			website: "https://creditwithbleon.bleon.net",
		},
		tools: ["PHP", "TypeScript", "NestJS", "RabbitMQ", "MySQL"],
		year: "2023 — Present",
		story:
			"Powered by an actual LLM, this chatbot handles customer authentication, recommends the best data plans, and vends airtime across Telegram and WhatsApp — real fintech infrastructure running behind a chat interface.",
		category: "bot",
	},
	{
		name: "FauOnionBot",
		description:
			"An enterprise-grade Telegram referral chatbot built for YouTubers and promoters to grow their channels.",
		links: {
			telegram: "https://t.me/fauonionbot",
		},
		tools: [
			"NestJS",
			"TypeScript",
			"PHP",
			"Docker",
			"MySQL",
			"Redis",
			"RabbitMQ",
		],
		year: "2021 — Present",
		story:
			"Built an enterprise-grade referral chatbot for Telegram with Docker, Redis queues, and a MySQL backend — helping YouTubers and content promoters grow their channels through structured referral campaigns at scale.",
		category: "bot",
	},

	// ── APIs & Infrastructure ────────────────────────────────────
	{
		name: "Wallnuts",
		description:
			"A solo-built crypto payment gateway proving a single developer can run their own payment infrastructure.",
		links: {
			github: "https://github.com/h1rdr3v2/wallnuts",
		},
		tools: ["TypeScript", "Docker"],
		year: "2025",
		story:
			"Intrigued by the idea that a single developer could run their own crypto payment gateway — so I designed and built one from the ground up. Handles wallet generation, transaction monitoring, and webhook callbacks.",
		category: "api",
	},
	{
		name: "livescores-scrapper-api",
		description:
			"A small PHP library that exposes an endpoint for fetching live football score results.",
		links: {
			github: "https://github.com/h1rdr3v2/livescores-scrapper-api",
		},
		tools: ["PHP", "Symfony", "Redis", "Docker"],
		year: "2023 · Open-sourced 2025",
		story:
			"A lightweight PHP library that scrapes live football scores and exposes them through a clean REST API. Built for fun and educational purposes — with Redis caching and Docker for easy self-hosting.",
		category: "api",
	},

	// ── Websites ────────────────────────────────────────────────
	{
		name: "3D Food Menu",
		description:
			"An immersive 3D food menu experience that lets customers explore and visualize dishes in stunning detail before ordering.",
		images: [
			"/images/projects/3d-menu/3d-menu-1.png",
			"/images/projects/3d-menu/3d-menu-2.png",
			"/images/projects/3d-menu/3d-menu-3.png",
		],
		links: {
			website: "https://3d-menu.bleon.net",
		},
		tools: ["TypeScript", "TanStack Start", "Three.js"],
		year: "2026",
		story:
			"Wanted people to see the food and salivate before ordering — so I built an interactive 3D menu powered by Three.js. Diners can spin, zoom, and explore every dish from every angle, turning online ordering into an experience rather than a transaction.",
		category: "website",
	},
	{
		name: "GovWatch",
		images: [
			"/images/projects/govwatch/govwatch-1.png",
			"/images/projects/govwatch/govwatch-2.png",
			"/images/projects/govwatch/govwatch-3.png",
		],
		links: {
			website: "https://govwatch-civic-connect.onrender.com/",
			github: "https://github.com/h1rdr3v2/govwatch-civic-connect",
		},
		tools: ["Next.js", "TypeScript", "Python", "Docker"],
		year: "2025",
		story:
			"Built for the Civic Connect Hackathon 2025 — Abia State Government. A dual-channel citizen complaint platform with both web and USSD access so every demographic can reach the government. Didn't win, but the idea still stands.",
		category: "website",
	},
	{
		name: "bleon.net",
		links: {
			website: "https://bleon.net",
		},
		tools: ["Next.js", "TypeScript"],
		images: ["/images/projects/bleon/bleon-1.png"],
		year: "2023",
		story:
			"Needed a proper company landing page for Bleon — funny enough, I started the company because I needed a license to run CreditWithBleon, the AI chatbot that vends data. Built something clean and powerful that same year.",
		category: "website",
	},
	{
		name: "MyCGPA Web (Legacy)",
		images: [
			"/images/projects/mycgpa-legacy/mycgpa-legacy-1.png",
			"/images/projects/mycgpa-legacy/mycgpa-legacy-2.png",
		],
		links: {
			website: "https://sage-kelpie-f2ec55.netlify.app/",
			github: "https://github.com/h1rdr3v2/mycgpa-web-legacy",
		},
		tools: ["JavaScript", "Vite", "PWA"],
		year: "2023",
		story:
			"The original version of MyCGPA — a web app. My girlfriend was sad and crying about something, so I opened Figma to console her and we just started designing together. We built it out, showed it to our course advisor at uni, and it became real.",
		category: "website",
	},
	{
		name: "HappyMed AI",
		links: {
			github: "https://github.com/h1rdr3v2/happymed-ai-klusterthon2023",
		},
		tools: ["Next.js", "JavaScript", "HTML", "CSS", "Docker"],
		year: "2023",
		story:
			"An AI-powered healthcare assistant built for the Klusterthon 2023 Hackathon by Stutern. Helps users understand symptoms and get preliminary medical guidance. Didn't win this one either — but shipped it.",
		category: "website",
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
		name: "X/twitter",
		url: "https://www.x.com/justdeveze",
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
		title: "CEO & Mobile App Developer",
		company: "Hustle",
		period: "2025 — 2026",
	},
	{
		title: "Lead Product Developer",
		company: "Crash Alerts",
		period: "2022 — 2024",
	},
	{
		title: "Lead Developer",
		company: "Softmation",
		period: "2017 — 2021",
	},
]
