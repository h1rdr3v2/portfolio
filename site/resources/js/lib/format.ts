/** "2025-12-05T00:00:00+00:00" → "Dec 5, 2025". Fixed locale and zone so server and client agree. */
export function formatDate(iso: string | null): string {
	if (!iso) return ""
	const date = new Date(iso)
	if (Number.isNaN(date.getTime())) return iso
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	}).format(date)
}

export function readingLabel(minutes: number): string {
	return `${minutes} min read`
}

export function pluralise(count: number, singular: string, plural = `${singular}s`) {
	return `${count} ${count === 1 ? singular : plural}`
}

/** The first sentence of a paragraph, for one-line summaries. */
export function firstSentence(text: string): string {
	const match = text.match(/^.*?[.!?](?=\s|$)/)
	return match ? match[0] : text
}
