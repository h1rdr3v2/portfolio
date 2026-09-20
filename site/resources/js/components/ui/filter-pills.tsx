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
	label: string
}

/** A single-select pill group, wired as a radio group for keyboard users. */
export function FilterPills<T extends string>({ options, value, onChange, label }: FilterPillsProps<T>) {
	return (
		<div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
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
							"cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
							selected
								? "border-accent bg-accent text-background"
								: "border-border text-muted-foreground hover:border-accent hover:text-accent",
						)}
					>
						{option.label}
						{option.count !== undefined ? (
							<span className={cn("ml-1.5 tabular-nums", selected ? "opacity-60" : "opacity-50")}>
								{option.count}
							</span>
						) : null}
					</button>
				)
			})}
		</div>
	)
}
