"use client"

import Link from "next/link"
import * as React from "react"
import {
	Github,
	Globe,
	GlobeLock,
	MessageCircle,
	Smartphone,
	Bot,
	Server,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CrossFadeImage } from "@/components/common/CrossFadeImage"
import { ProjectInterface, ProjectLinksProps, ProjectCategory } from "@/types"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

const categories: {
	key: ProjectCategory
	label: string
	icon: React.ReactNode
}[] = [
	{
		key: "mobile",
		label: "Mobile Apps",
		icon: <Smartphone className="w-5 h-5" />,
	},
	{ key: "bot", label: "Bots", icon: <Bot className="w-5 h-5" /> },
	{
		key: "api",
		label: "APIs & Infrastructure",
		icon: <Server className="w-5 h-5" />,
	},
	{
		key: "website",
		label: "Websites",
		icon: <Globe className="w-5 h-5" />,
	},
]

export default function ShowcaseProjectsSection({
	projects,
}: {
	projects: ProjectInterface[]
}) {
	const [activeCategory, setActiveCategory] =
		React.useState<ProjectCategory>("mobile")
	const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])
	const navRef = React.useRef<HTMLDivElement>(null)
	const [indicatorStyle, setIndicatorStyle] = React.useState({
		left: 0,
		width: 0,
	})

	const updateIndicator = React.useCallback((index: number) => {
		const el = tabRefs.current[index]
		const container = navRef.current
		if (el && container) {
			const elRect = el.getBoundingClientRect()
			const containerRect = container.getBoundingClientRect()
			setIndicatorStyle({
				left: elRect.left - containerRect.left + container.scrollLeft,
				width: elRect.width,
			})
		}
	}, [])

	const activeIndex = categories.findIndex((c) => c.key === activeCategory)

	React.useEffect(() => {
		updateIndicator(activeIndex)
	}, [activeIndex, updateIndicator])

	React.useEffect(() => {
		const handleResize = () => updateIndicator(activeIndex)
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [activeIndex, updateIndicator])

	const handleSelect = (index: number) => {
		setActiveCategory(categories[index].key)
		tabRefs.current[index]?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		})
	}

	const activeProjects = projects.filter((p) => p.category === activeCategory)

	return (
		<section className="w-full">
			<Badge variant="default">Projects</Badge>

			{/* Category horizontal selector */}
			<div className="relative mt-6">
				<div
					ref={navRef}
					className="flex gap-1 overflow-x-auto pb-3 scrollbar-hide"
				>
					{categories.map((cat, index) => (
						<button
							key={cat.key}
							ref={(el) => {
								tabRefs.current[index] = el
							}}
							onClick={() => handleSelect(index)}
							className={`
								relative shrink-0 px-4 py-2 rounded-lg text-sm font-medium
								transition-colors duration-200 cursor-pointer flex items-center gap-2
								${
									activeCategory === cat.key
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground/70"
								}
							`}
						>
							{cat.icon}
							{cat.label}
						</button>
					))}
				</div>

				{/* Sliding indicator */}
				<div
					className="absolute bottom-0 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-out"
					style={{
						left: indicatorStyle.left,
						width: indicatorStyle.width,
					}}
				/>
			</div>

			{/* Projects list — full width, vertical */}
			<div className="mt-6 space-y-5">
				{activeProjects.map((project) => (
					<ProjectDetailCard key={project.name} project={project} />
				))}
			</div>
		</section>
	)
}

function ProjectDetailCard({ project }: { project: ProjectInterface }) {
	const [lightboxOpen, setLightboxOpen] = React.useState(false)

	const slides = project.images?.map((src) => ({ src })) ?? []

	return (
		<div className="rounded-2xl border bg-card overflow-hidden animate-fadeInCard">
			<div className="flex gap-5 p-5 sm:p-6">
				{/* Thumbnail on left */}
				{project.images && project.images.length > 0 ? (
					<div className="shrink-0">
						<CrossFadeImage
							images={project.images}
							thumbnail
							alt={project.name}
							onClick={() => setLightboxOpen(true)}
						/>
					</div>
				) : (
					<div className="shrink-0 w-[120px] h-[120px] rounded-xl bg-muted/60 flex items-center justify-center">
						<span className="text-3xl font-bold text-muted-foreground/20 select-none">
							{project.name.charAt(0)}
						</span>
					</div>
				)}

				{/* Content on right */}
				<div className="flex-1 min-w-0 space-y-3">
					{/* Title row */}
					<div className="flex flex-wrap items-center gap-3">
						<h4 className="text-lg font-bold leading-tight">{project.name}</h4>
						<Badge variant="outline" className="text-[11px] font-normal">
							{project.year}
						</Badge>
					</div>

					{/* Story */}
					<p className="text-sm leading-relaxed text-muted-foreground">
						&ldquo;{project.story}&rdquo;
					</p>

					{/* Tech stack */}
					{project.tools && project.tools.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{project.tools.map((tool, i) => (
								<Badge
									key={i}
									variant="secondary"
									className="text-[11px] font-normal"
								>
									{tool}
								</Badge>
							))}
						</div>
					)}

					{/* Links */}
					<ProjectLinks links={project.links} />
				</div>
			</div>

			{/* Lightbox */}
			{slides.length > 0 && (
				<Lightbox
					open={lightboxOpen}
					close={() => setLightboxOpen(false)}
					slides={slides}
				/>
			)}
		</div>
	)
}

const ProjectLinks: React.FC<{ links?: ProjectLinksProps }> = ({ links }) => {
	if (!links) return null

	const hasAny =
		links.playstore ||
		links.appstore ||
		links.website ||
		links.github ||
		links.telegram ||
		links.whatsapp
	if (!hasAny) return null

	return (
		<div className="flex flex-wrap items-center gap-3 pt-2">
			{links.github && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<Link href={links.github} target="_blank" rel="noopener noreferrer">
						<Github className="w-3.5 h-3.5" />
						GitHub
					</Link>
				</Button>
			)}
			{links.telegram && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<Link href={links.telegram} target="_blank" rel="noopener noreferrer">
						<TelegramIcon className="w-3.5 h-3.5" />
						Telegram
					</Link>
				</Button>
			)}
			{links.whatsapp && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<Link href={links.whatsapp} target="_blank" rel="noopener noreferrer">
						<MessageCircle className="w-3.5 h-3.5" />
						WhatsApp
					</Link>
				</Button>
			)}
			{links.appstore && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<Link href={links.appstore} target="_blank" rel="noopener noreferrer">
						<AppStoreIcon className="w-3.5 h-3.5" />
						App Store
					</Link>
				</Button>
			)}
			{links.playstore && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<Link
						href={links.playstore}
						target="_blank"
						rel="noopener noreferrer"
					>
						<PlayStoreIcon className="w-3.5 h-3.5" />
						Play Store
					</Link>
				</Button>
			)}
			{links.website && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<Link href={links.website} target="_blank" rel="noopener noreferrer">
						<GlobeLock className="w-3.5 h-3.5" />
						Website
					</Link>
				</Button>
			)}
		</div>
	)
}

const PlayStoreIcon = ({ className }: { className: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		id="google-play"
		className={className}
	>
		<path
			fill="#2196F3"
			d="M8.32 7.68.58 15.42c-.37-.35-.57-.83-.57-1.35V1.93C.01 1.4.22.92.6.56l7.72 7.12z"
		></path>
		<path
			fill="#FFC107"
			d="M15.01 8c0 .7-.38 1.32-1.01 1.67l-2.2 1.22-2.73-2.52-.75-.69 2.89-2.89L14 6.33c.63.35 1.01.97 1.01 1.67z"
		></path>
		<path
			fill="#4CAF50"
			d="M8.32 7.68.6.56C.7.46.83.37.96.29 1.59-.09 2.35-.1 3 .26l8.21 4.53-2.89 2.89z"
		></path>
		<path
			fill="#F44336"
			d="M11.8 10.89 3 15.74c-.31.18-.66.26-1 .26-.36 0-.72-.09-1.04-.29a1.82 1.82 0 0 1-.38-.29l7.74-7.74.75.69 2.73 2.52z"
		></path>
	</svg>
)
const TelegramIcon = ({ className }: { className: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		className={className}
	>
		<path
			fill="currentColor"
			d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
		/>
	</svg>
)

const AppStoreIcon = ({ className }: { className: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		className={className}
	>
		<path
			fill="#2196F3"
			d="M14.096 14.995c.43-.807-.126-1.974-1.118-1.974H9.915l4.234-7.331a.989.989 0 0 0-1.713-.987l-.44.758-.429-.757a.988.988 0 1 0-1.713.987l1.007 1.747-3.223 5.584H5.12a.986.986 0 1 0 0 1.974h8.976z"
		></path>
		<path
			fill="#2196F3"
			d="M12 24c6.629 0 12-5.371 12-12S18.629 0 12 0 0 5.371 0 12s5.371 12 12 12zm0-22.452c5.743 0 10.452 4.65 10.452 10.452 0 5.743-4.65 10.452-10.452 10.452-5.743 0-10.452-4.65-10.452-10.452C1.548 6.256 6.199 1.548 12 1.548z"
		></path>
		<path
			fill="#2196F3"
			d="m6.231 15.451-.706 1.219a.988.988 0 1 0 1.713.987l.949-1.645-.001.001c-.513-.62-1.162-.809-1.955-.562zm7.22-7.458c-.586.484-1.177 1.916-.349 3.343.807 1.404 2.027 3.509 3.648 6.319a.989.989 0 0 0 1.713-.987L17.501 15h1.428a.986.986 0 1 0 0-1.974H16.36v-.001c-1.292-2.24-2.26-3.919-2.909-5.032z"
		></path>
	</svg>
)
