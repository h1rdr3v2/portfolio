import { SectionHeading } from "@/components/ui/section-heading"

/**
 * "What I'm working on" — prose from the `now` snippet, edited in the admin.
 * Rendered HTML comes from the site's own markdown pipeline, not from readers.
 */
export function NowSection({ html }: { html: string | null }) {
	if (!html) return null

	return (
		<section className="w-full">
			<SectionHeading>What I'm working on</SectionHeading>
			<div
				className="prose prose-post mt-3 w-full max-w-none text-[15.5px] leading-relaxed"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</section>
	)
}
