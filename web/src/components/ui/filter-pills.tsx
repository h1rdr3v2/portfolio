import { cn } from "@/lib/cn"

export interface FilterOption<T extends string> {
	value: T
	label: string
	count?: number
}

interface FilterPillsProps<T extends string> {
	options: FilterOption<T>[]
	value: T
	onChange: (value: T) => void
	/** Announced to screen readers as the group's purpose. */
	label: string
}

/** A single-select pill group, wired as a radio group for keyboard users. */
export function FilterPills<T extends string>({
	options,
	value,
	onChange,
	label,
}: FilterPillsProps<T>) {
	return (
		<div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
			{options.map((option) => {
				const selected = option.value === value
				return (
					<button
						key={option.value}
						type="button"
						role="radio"
						aria-checked={selected}
						onClick={() => onChange(option.value)}
						className={cn(
							"cursor-pointer rounded-full border px-3.5 py-2 font-mono text-xs transition-colors duration-200",
							selected
								? "border-ink bg-ink text-bg"
								: "border-rule text-mute hover:border-ink/30 hover:text-ink",
						)}
					>
						{option.label}
						{option.count !== undefined ? (
							<span className={cn("ml-1.5", selected ? "opacity-60" : "opacity-50")}>
								{option.count}
							</span>
						) : null}
					</button>
				)
			})}
		</div>
	)
}
