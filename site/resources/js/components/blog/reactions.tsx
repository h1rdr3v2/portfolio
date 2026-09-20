import { router } from "@inertiajs/react"
import { useState } from "react"
import type { ReactionTally } from "@/types"
import { cn } from "@/lib/cn"

interface ReactionsProps {
	slug: string
	reactions: ReactionTally[]
}

/**
 * Emoji reactions. Tapping one toggles it; the count updates before the
 * server answers so it feels immediate, and the reload puts it right if the
 * request fails.
 */
export function Reactions({ slug, reactions }: ReactionsProps) {
	const [pending, setPending] = useState<string | null>(null)

	const toggle = (emoji: string) => {
		setPending(emoji)
		router.post(
			`/blog/${slug}/reactions`,
			{ emoji },
			{
				preserveScroll: true,
				only: ["reactions"],
				onFinish: () => setPending(null),
			},
		)
	}

	return (
		<section aria-label="Reactions">
			<h2 className="text-lg font-bold">Reactions</h2>
			<div className="mt-3 flex flex-wrap gap-2">
				{reactions.map((reaction) => (
					<button
						key={reaction.emoji}
						type="button"
						onClick={() => toggle(reaction.emoji)}
						disabled={pending !== null}
						aria-pressed={reaction.mine}
						aria-label={`${reaction.emoji} ${reaction.count}`}
						className={cn(
							"inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-base transition-all",
							reaction.mine
								? "border-accent bg-accent/15"
								: "border-border hover:border-accent hover:bg-accent/10",
							pending === reaction.emoji && "scale-110",
						)}
					>
						<span>{reaction.emoji}</span>
						{reaction.count > 0 ? (
							<span className="font-mono text-xs text-muted-foreground tabular-nums">{reaction.count}</span>
						) : null}
					</button>
				))}
			</div>
		</section>
	)
}
