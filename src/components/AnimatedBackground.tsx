"use client"

import { useEffect, useState } from "react"

const AnimatedBackground = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}

		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [])

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
			{/* Gradient orbs */}
			<div
				className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse"
				style={{
					transform: `translate(${mousePosition.x * 0.02}px, ${
						mousePosition.y * 0.02
					}px)`,
					transition: "transform 0.3s ease-out",
				}}
			/>
			<div
				className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-pulse"
				style={{
					transform: `translate(${-mousePosition.x * 0.015}px, ${
						-mousePosition.y * 0.015
					}px)`,
					transition: "transform 0.3s ease-out",
					animationDelay: "1s",
				}}
			/>
			<div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl animate-pulse"
				style={{
					animationDelay: "2s",
				}}
			/>

			{/* Grid pattern */}
			<div
				className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
				style={{
					backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
									  linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
					backgroundSize: "60px 60px",
				}}
			/>
		</div>
	)
}

export default AnimatedBackground
