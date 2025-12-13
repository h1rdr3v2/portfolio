"use client"

import { useEffect, useState } from "react"

const CustomCursor = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [isPointer, setIsPointer] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Only show on desktop
		const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
		if (isTouchDevice) return

		const handleMouseMove = (e: MouseEvent) => {
			setPosition({ x: e.clientX, y: e.clientY })
			setIsVisible(true)

			const target = e.target as HTMLElement
			const isClickable =
				target.tagName === "A" ||
				target.tagName === "BUTTON" ||
				target.onclick !== null ||
				target.closest("a") !== null ||
				target.closest("button") !== null ||
				window.getComputedStyle(target).cursor === "pointer"

			setIsPointer(isClickable)
		}

		const handleMouseLeave = () => {
			setIsVisible(false)
		}

		window.addEventListener("mousemove", handleMouseMove)
		document.addEventListener("mouseleave", handleMouseLeave)

		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseleave", handleMouseLeave)
		}
	}, [])

	if (!isVisible) return null

	return (
		<>
			{/* Main cursor dot */}
			<div
				className="fixed pointer-events-none z-[9999] mix-blend-difference"
				style={{
					left: `${position.x}px`,
					top: `${position.y}px`,
					transform: "translate(-50%, -50%)",
				}}
			>
				<div
					className={`bg-white rounded-full transition-all duration-150 ${
						isPointer ? "w-2 h-2" : "w-1.5 h-1.5"
					}`}
				/>
			</div>

			{/* Outer ring */}
			<div
				className="fixed pointer-events-none z-[9998] mix-blend-difference"
				style={{
					left: `${position.x}px`,
					top: `${position.y}px`,
					transform: "translate(-50%, -50%)",
					transition: "width 0.2s, height 0.2s, opacity 0.2s",
				}}
			>
				<div
					className={`border-2 border-white rounded-full ${
						isPointer ? "w-12 h-12 opacity-100" : "w-8 h-8 opacity-50"
					}`}
					style={{
						transition: "width 0.2s, height 0.2s, opacity 0.2s",
					}}
				/>
			</div>
		</>
	)
}

export default CustomCursor
