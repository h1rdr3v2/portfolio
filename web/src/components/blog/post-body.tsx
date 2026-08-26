/**
 * Renders the HTML produced by the markdown pipeline.
 *
 * `dangerouslySetInnerHTML` is safe here because the input is not user
 * content: it is markdown committed to this repo, compiled at request time by
 * `lib/blog/markdown.ts`. Nothing reaches this component from the network.
 */
export function PostBody({ html }: { html: string }) {
	return (
		<div
			className="prose prose-editorial mt-10 max-w-[68ch] prose-headings:font-serif"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
