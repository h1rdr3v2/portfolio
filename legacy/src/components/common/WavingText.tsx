"use client"
import { useState, useRef, useEffect } from "react"

export default function WavingText({
	text,
	className,
}: {
	text: string
	className?: string
}) {
	const [isWaving, setIsWaving] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const animationEndRef = useRef<number>(0)
	const cooldown = 1800

	const startWaving = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}

		setIsWaving(false)
		setTimeout(() => setIsWaving(true), 10)

		timeoutRef.current = setTimeout(() => {
			setIsWaving(false)
		}, cooldown)

		animationEndRef.current = Date.now() + cooldown
	}

	const handleMouseEnter = () => {
		startWaving()
	}

	const handleMouseMove = () => {
		if (Date.now() > animationEndRef.current) {
			startWaving()
		}
	}

	const handleMouseLeave = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}
		setIsWaving(false)
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	return (
		<span
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={className || ""}
			role="img"
			aria-label="waving hand"
		>
			<span className={`waving-hand ${isWaving ? "waving" : ""}`}>{text}</span>
		</span>
	)
}
