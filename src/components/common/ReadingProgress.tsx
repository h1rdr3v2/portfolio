"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const ReadingProgress = () => {
	const [progress, setProgress] = useState(0)
	const [showScrollTop, setShowScrollTop] = useState(false)

	useEffect(() => {
		const updateProgress = () => {
			const scrollHeight =
				document.documentElement.scrollHeight - window.innerHeight
			const scrolled = window.scrollY
			const progress = (scrolled / scrollHeight) * 100
			setProgress(progress)
			setShowScrollTop(scrolled > 400)
		}

		window.addEventListener("scroll", updateProgress)
		updateProgress()

		return () => window.removeEventListener("scroll", updateProgress)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	return (
		<>
			{/* Reading Progress Bar */}
			<div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
				<div
					className="h-full bg-primary transition-all duration-150 ease-out"
					style={{ width: `${progress}%` }}
				/>
			</div>

			{/* Floating Action Buttons */}
			<div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
				{showScrollTop && (
					<Button
						onClick={scrollToTop}
						size="icon"
						className="rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-fadeInUp"
						aria-label="Scroll to top"
					>
						<ArrowUp className="h-5 w-5" />
					</Button>
				)}

				<Link href="/public" aria-label="Go to home">
					<Button
						size="icon"
						variant="outline"
						className="rounded-full shadow-lg hover:scale-110 transition-all duration-300 border-2"
					>
						<Home className="h-5 w-5" />
					</Button>
				</Link>
			</div>
		</>
	)
}

export default ReadingProgress
