import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/cn"

interface ModalProps {
	open: boolean
	onClose: () => void
	title: string
	children: ReactNode
	className?: string
}

/**
 * Built on the native <dialog>, which brings the focus trap, the inert
 * background and Escape-to-close with it.
 */
export function Modal({ open, onClose, title, children, className }: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return
		if (open && !dialog.open) dialog.showModal()
		if (!open && dialog.open) dialog.close()
	}, [open])

	useEffect(() => {
		if (!open) return
		const { overflow } = document.documentElement.style
		document.documentElement.style.overflow = "hidden"
		return () => {
			document.documentElement.style.overflow = overflow
		}
	}, [open])

	return (
		<dialog
			ref={dialogRef}
			aria-label={title}
			onClose={onClose}
			onCancel={(event) => {
				event.preventDefault()
				onClose()
			}}
			onKeyDown={(event) => {
				// Belt and braces: some embedded browsers never fire the native
				// cancel for Escape, and a modal you cannot leave is a trap.
				if (event.key === "Escape") {
					event.preventDefault()
					onClose()
				}
			}}
			onClick={(event) => {
				// A click on the dialog element itself is the backdrop — content
				// lives in a child that stops the event.
				if (event.target === dialogRef.current) onClose()
			}}
			className={cn(
				"m-auto max-h-[90vh] w-[min(720px,calc(100vw-2rem))] rounded-xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-[2px]",
				className,
			)}
		>
			{open ? children : null}
		</dialog>
	)
}
