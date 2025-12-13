"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPinned, Home, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/ModeToggle"
import { useEffect, useState } from "react"

const HeaderSection = () => {
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(false)
	const isHomePage = pathname === "/"
	const isBlogPage = pathname.startsWith("/blog")
	
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])
	
	return (
		<header
			className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
				isScrolled
					? "bg-background/80 backdrop-blur-lg shadow-lg border-b border-border/40"
					: "bg-transparent"
			}`}
		>
			<nav className="max-w-7xl mx-auto flex flex-row items-center justify-between px-4 md:px-6 py-4">
				<div className="flex flex-row gap-3 items-center">
					<Link
						className={`text-xl font-black duration-300 hover:scale-110 transition-all flex items-center gap-2 group ${
							isScrolled ? "text-foreground" : ""
						}`}
						href="/"
					>
						<span className="relative">
							DE.
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
						</span>
					</Link>
					{!isHomePage && (
						<div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
							<span>/</span>
							<span className="capitalize">{pathname.split("/")[1]}</span>
							{pathname.split("/")[2] && (
								<>
									<span>/</span>
									<span className="capitalize truncate max-w-[150px]">{pathname.split("/")[2]}</span>
								</>
							)}
						</div>
					)}
				</div>
				<div className="flex flex-row gap-3 items-center">
					{!isHomePage && (
						<Link
							href="/"
							className="text-sm font-medium hover:text-primary transition-all flex items-center gap-1.5 group"
						>
							<Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
							<span className="hidden sm:inline">Home</span>
						</Link>
					)}
					{!isBlogPage && (
						<Link
							href="/blog"
							className="text-sm font-medium hover:text-primary transition-all flex items-center gap-1.5 group relative"
						>
							<Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
							<span>Blog</span>
							<span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full animate-pulse"></span>
						</Link>
					)}
					<Badge className="text-xs bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-all">
						<MapPinned height={12} width={12} className="mr-1" />
						Nigeria
					</Badge>
					<ModeToggle />
				</div>
			</nav>
		</header>
	)
}

export default HeaderSection
