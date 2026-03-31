"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

interface CrossFadeImageProps {
	images: string[]
	className?: string
	alt?: string
	compact?: boolean
	thumbnail?: boolean
	onClick?: () => void
}

export function CrossFadeImage({
	images,
	className = "",
	alt = "Image",
	compact = false,
	thumbnail = false,
	onClick,
}: CrossFadeImageProps) {
	const [dimensions, setDimensions] = useState({ width: 500, height: 300 })

	useEffect(() => {
		const updateSize = () => {
			const screenWidth = window.innerWidth
			if (thumbnail) {
				setDimensions({ width: 120, height: 120 })
			} else if (compact) {
				if (screenWidth < 640) {
					setDimensions({ width: 320, height: 160 })
				} else {
					setDimensions({ width: 400, height: 200 })
				}
			} else {
				if (screenWidth < 640) {
					setDimensions({ width: 320, height: 180 })
				} else if (screenWidth < 1024) {
					setDimensions({ width: 500, height: 300 })
				} else {
					setDimensions({ width: 700, height: 400 })
				}
			}
		}

		updateSize()
		window.addEventListener("resize", updateSize)
		return () => window.removeEventListener("resize", updateSize)
	}, [compact, thumbnail])

	return (
		<div
			className={`relative ${className} ${thumbnail ? "cursor-pointer" : ""}`}
			style={{
				width: thumbnail ? dimensions.width : "100%",
				height: dimensions.height,
			}}
			onClick={onClick}
		>
			{images.map((image, index) => (
				<Image
					key={index}
					src={image}
					alt={alt}
					width={dimensions.width}
					height={dimensions.height}
					sizes={
						thumbnail
							? "120px"
							: "(max-width: 640px) 320px, (max-width: 1024px) 500px, 700px"
					}
					className={`absolute top-0 left-0 fade-image ${
						thumbnail ? "rounded-xl" : "rounded-t-lg"
					}`}
					style={{
						objectFit: "cover",
						width: "100%",
						height: "100%",
						animationDelay: `${-2 * (images.length - 1 - index)}s`,
					}}
					priority
				/>
			))}
		</div>
	)
}
