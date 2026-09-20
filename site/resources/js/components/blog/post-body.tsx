/**
 * Renders the HTML the server produced from the post's markdown. The input is
 * the author's own writing, rendered by `App\Services\Markdown` with raw HTML
 * disallowed — nothing here came from a reader.
 */
export function PostBody({ html }: { html: string }) {
	return (
		<div
			className="prose prose-post mt-8 w-full max-w-none prose-headings:font-bold prose-headings:tracking-tight"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
