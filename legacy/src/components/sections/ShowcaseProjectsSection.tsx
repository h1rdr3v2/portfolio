"use client"

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
		label: "Mobile App",
		icon: <Smartphone className="w-5 h-5" />,
	},
	{
		key: "website",
		label: "Websites",
		icon: <Globe className="w-5 h-5" />,
	},
	{ key: "bot", label: "Bots", icon: <Bot className="w-5 h-5" /> },
	{
		key: "api",
		label: "API",
		icon: <Server className="w-5 h-5" />,
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

	const [isSticky, setIsSticky] = React.useState(false)
	const sectionRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		const handleScroll = () => {
			if (sectionRef.current) {
				const rect = sectionRef.current.getBoundingClientRect()
				// Stick when the tabs reach the header (header is ~64px)
				setIsSticky(rect.top <= 64)
			}
		}
		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const activeProjects = projects.filter((p) => p.category === activeCategory)

	return (
		<section className="w-full">
			<Badge variant="default">Projects</Badge>

			{/* Category horizontal selector */}
			<div
				ref={sectionRef}
				className={`relative mt-4 z-40 transition-all duration-200 pt-2 ${
					isSticky
						? "sticky top-[62px] sm:-mx-0 sm:px-0 bg-background/90 backdrop-blur-lg shadow-sm"
						: ""
				}`}
			>
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

				{/* Sliding indicator — hidden on mobile */}
				<div
					className="absolute bottom-0 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-out hidden sm:block"
					style={{
						left: indicatorStyle.left,
						width: indicatorStyle.width,
					}}
				/>
			</div>

			{/* Projects list — image then text, no card */}
			<div className="mt-8 space-y-16">
				{activeProjects.map((project) => (
					<ProjectItem key={project.name} project={project} />
				))}
			</div>
		</section>
	)
}

function ProjectItem({ project }: { project: ProjectInterface }) {
	const [lightboxOpen, setLightboxOpen] = React.useState(false)
	const [lightboxIndex, setLightboxIndex] = React.useState(0)
	const [activeImageIndex, setActiveImageIndex] = React.useState(0)

	const slides = project.images?.map((src) => ({ src })) ?? []
	const images = project.images ?? []

	return (
		<div className="group">
			{/* Image on top — theme-dependent border */}
			{images.length > 0 ? (
				<div className="relative mb-5">
					{/* Main preview image */}
					<div
						className="relative overflow-hidden rounded-lg border-2 border-black dark:border-white cursor-pointer"
						onClick={() => {
							setLightboxIndex(activeImageIndex)
							setLightboxOpen(true)
						}}
					>
						<img
							src={images[activeImageIndex]}
							alt={project.name}
							className="w-full h-auto max-h-[572px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
						/>
					</div>

					{/* Thumbnail strip — max 4 + overflow */}
					{images.length > 1 && (
						<div className="flex gap-2 mt-2 overflow-x-auto">
							{images.slice(0, 4).map((img, i) => (
								<button
									key={img}
									onClick={(e) => {
										e.stopPropagation()
										setActiveImageIndex(i)
									}}
									className={`shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
										i === activeImageIndex
											? "border-black dark:border-white"
											: "border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white"
									}`}
								>
									<img
										src={img}
										alt={`${project.name} screenshot ${i + 1}`}
										className="w-16 h-16 object-cover"
									/>
								</button>
							))}
							{images.length > 4 && (
								<button
									onClick={(e) => {
										e.stopPropagation()
										setLightboxIndex(0)
										setLightboxOpen(true)
									}}
									className="shrink-0 w-16 h-16 rounded-md border-2 border-black/20 dark:border-white/20 flex items-center justify-center text-xs text-muted-foreground hover:border-black dark:hover:border-white transition-colors"
								>
									+{images.length - 4}
								</button>
							)}
						</div>
					)}
				</div>
			) : (
				<div className="mb-5 w-full h-48 rounded-lg border-2 border-black dark:border-white bg-muted/30 flex items-center justify-center">
					<span className="text-5xl font-bold text-muted-foreground/20 select-none">
						{project.name.charAt(0)}
					</span>
				</div>
			)}

			{/* Text below image */}
			<div className="space-y-3">
				{/* Title + Year */}
				<div className="flex flex-wrap items-center gap-3">
					<h3 className="text-2xl font-bold leading-tight">{project.name}</h3>
					<Badge variant="outline" className="text-[11px] font-normal">
						{project.year}
					</Badge>
				</div>

				{/* Description */}
				{project.description && (
					<p className="text-sm text-muted-foreground leading-relaxed">
						{project.description}
					</p>
				)}

				{/* Story */}
				<p className="text-sm leading-relaxed text-foreground/80 italic">
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

			{/* Lightbox */}
			{slides.length > 0 && (
				<Lightbox
					open={lightboxOpen}
					close={() => setLightboxOpen(false)}
					slides={slides}
					index={lightboxIndex}
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
		<div className="flex flex-wrap items-center gap-3 pt-1">
			{links.github && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<a href={links.github} target="_blank" rel="noopener noreferrer">
						<Github className="w-3.5 h-3.5" />
						GitHub
					</a>
				</Button>
			)}
			{links.website && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<a href={links.website} target="_blank" rel="noopener noreferrer">
						<GlobeLock className="w-3.5 h-3.5" />
						Website
					</a>
				</Button>
			)}
			{links.appstore && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<a href={links.appstore} target="_blank" rel="noopener noreferrer">
						<AppStoreIcon className="w-3.5 h-3.5" />
						App Store
					</a>
				</Button>
			)}
			{links.playstore && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<a href={links.playstore} target="_blank" rel="noopener noreferrer">
						<PlayStoreIcon className="w-3.5 h-3.5" />
						Play Store
					</a>
				</Button>
			)}
			{links.telegram && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<a href={links.telegram} target="_blank" rel="noopener noreferrer">
						<TelegramIcon className="w-3.5 h-3.5" />
						Telegram
					</a>
				</Button>
			)}
			{links.whatsapp && (
				<Button
					variant="outline"
					size="sm"
					className="h-8 text-xs gap-1.5"
					asChild
				>
					<a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
						<MessageCircle className="w-3.5 h-3.5" />
						WhatsApp
					</a>
				</Button>
			)}
		</div>
	)
}

// Simple SVG icons
const TelegramIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.938z" />
	</svg>
)

const AppStoreIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.12 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
	</svg>
)

const PlayStoreIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
	</svg>
)
