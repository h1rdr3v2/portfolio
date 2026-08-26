import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/cn"

interface ModalProps {
	open: boolean
	onClose: () => void
	/** Labels the dialog for assistive tech. */
	title: string
	children: ReactNode
	className?: string
}

/**
 * A modal built on the native `<dialog>` element, which brings the focus trap,
 * the inert background and Escape-to-close with it — none of which are worth
 * reimplementing in JS.
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
		// showModal() blocks interaction but not scroll on every browser.
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
			onCancel={onClose}
			onClick={(event) => {
				// A click that lands on the dialog itself is a backdrop click —
				// the content sits in a child element that stops it.
				if (event.target === dialogRef.current) onClose()
			}}
			className={cn(
				"m-auto max-h-[88vh] w-[min(920px,calc(100vw-2rem))] rounded-2xl bg-bg p-0 text-ink shadow-[0_30px_80px_-30px_rgb(15_19_16/0.6)] backdrop:bg-ink/50 backdrop:backdrop-blur-[3px]",
				className,
			)}
		>
			{open ? children : null}
		</dialog>
	)
}
