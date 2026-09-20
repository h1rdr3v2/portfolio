import { useForm, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
import type { Comment, SharedProps } from "@/types"
import { formatDate } from "@/lib/format"
import { cn } from "@/lib/cn"

interface CommentsProps {
	slug: string
	comments: Comment[]
}

export function Comments({ slug, comments }: CommentsProps) {
	const { flash } = usePage<SharedProps>().props
	const [open, setOpen] = useState(false)
	const form = useForm({ name: "", body: "", website: "" })

	useEffect(() => {
		if (flash.status === "comment-posted") {
			form.reset()
			setOpen(false)
		}
		// `form` is stable for the component's lifetime; only the flash matters.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flash.status])

	const submit = (event: React.FormEvent) => {
		event.preventDefault()
		form.post(`/blog/${slug}/comments`, { preserveScroll: true })
	}

	return (
		<section aria-label="Comments">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-lg font-bold">Comments</h2>
				{!open ? (
					<button
						type="button"
						onClick={() => setOpen(true)}
						className="cursor-pointer rounded-md bg-accent px-3.5 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-85"
					>
						Leave a comment
					</button>
				) : null}
			</div>

			{open ? (
				<form onSubmit={submit} className="mt-4 flex flex-col gap-3 rounded-lg bg-card p-4">
					<label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
						Name
						<input
							type="text"
							value={form.data.name}
							onChange={(event) => form.setData("name", event.target.value)}
							maxLength={60}
							required
							autoComplete="name"
							className={cn(
								"rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent",
								form.errors.name && "border-red-500",
							)}
						/>
						{form.errors.name ? <span className="text-red-500">{form.errors.name}</span> : null}
					</label>

					<label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
						Comment
						<textarea
							value={form.data.body}
							onChange={(event) => form.setData("body", event.target.value)}
							maxLength={2000}
							rows={4}
							required
							className={cn(
								"rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent",
								form.errors.body && "border-red-500",
							)}
						/>
						{form.errors.body ? <span className="text-red-500">{form.errors.body}</span> : null}
					</label>

					{/* Honeypot: hidden from people, filled in by bots, rejected by the server. */}
					<input
						type="text"
						name="website"
						value={form.data.website}
						onChange={(event) => form.setData("website", event.target.value)}
						tabIndex={-1}
						autoComplete="off"
						aria-hidden="true"
						className="hidden"
					/>
					{form.errors.website ? <span className="text-xs text-red-500">{form.errors.website}</span> : null}

					<div className="flex items-center gap-3">
						<button
							type="submit"
							disabled={form.processing}
							className="cursor-pointer rounded-md bg-accent px-3.5 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-50"
						>
							{form.processing ? "Posting…" : "Post comment"}
						</button>
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-accent"
						>
							Cancel
						</button>
					</div>
				</form>
			) : null}

			{comments.length === 0 ? (
				<p className="mt-4 text-sm text-muted-foreground italic">No comments yet. Be the first to share your thoughts.</p>
			) : (
				<ul className="mt-4 flex flex-col gap-4">
					{comments.map((comment) => (
						<li key={comment.id} className="rounded-lg bg-card p-4">
							<div className="flex items-baseline justify-between gap-3">
								<span className="text-sm font-semibold">{comment.name}</span>
								<time dateTime={comment.createdAt} className="font-mono text-xs text-muted-foreground">
									{formatDate(comment.createdAt)}
								</time>
							</div>
							<p className="mt-1.5 text-sm leading-relaxed whitespace-pre-line text-foreground/85">{comment.body}</p>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
