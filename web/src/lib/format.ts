const WORDS_PER_MINUTE = 225

/** "2025-12-05" → "05 Dec 2025". Stable across locales, no hydration drift. */
export function formatDate(iso: string): string {
	const date = new Date(iso)
	if (Number.isNaN(date.getTime())) return iso
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(date)
}

/** "2025-12-05" → "2025.12", the compact stamp used in list rows. */
export function formatStamp(iso: string): string {
	const date = new Date(iso)
	if (Number.isNaN(date.getTime())) return iso
	const month = `${date.getUTCMonth() + 1}`.padStart(2, "0")
	return `${date.getUTCFullYear()}.${month}`
}

export function readingMinutes(markdown: string): number {
	const words = markdown
		.replace(/```[\s\S]*?```/g, " ") // code blocks are skimmed, not read
		.replace(/[#>*_`~\-]/g, " ")
		.split(/\s+/)
		.filter(Boolean).length
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/** "9 min read" */
export function readingLabel(minutes: number): string {
	return `${minutes} min read`
}

export function pluralise(count: number, singular: string, plural = `${singular}s`) {
	return `${count} ${count === 1 ? singular : plural}`
}
