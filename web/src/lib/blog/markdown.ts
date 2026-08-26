import { unified, type Processor } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import rehypeShikiFromHighlighter from "@shikijs/rehype/core"
import type { Root } from "mdast"
import { createHighlighterCore } from "shiki/core"
import type { HighlighterGeneric } from "@shikijs/types"
import { createOnigurumaEngine } from "shiki/engine/oniguruma"

const THEME = "vitesse-dark"

/**
 * Languages the posts actually use, imported one grammar at a time.
 *
 * Shiki's convenience entry point bundles every grammar it ships with — ~8 MB
 * of server bundle for the handful of fences these posts contain. Going
 * through `shiki/core` with explicit imports keeps only what is used, which is
 * also why this uses `@shikijs/rehype/core` rather than a wrapper plugin that
 * pulls the full bundle back in.
 *
 * Add a language here when a post starts using it; unknown fences fall back to
 * plain text rather than failing the build.
 */
const LANGUAGES = [
	import("@shikijs/langs/bash"),
	import("@shikijs/langs/json"),
	import("@shikijs/langs/markdown"),
	import("@shikijs/langs/tsx"),
	import("@shikijs/langs/typescript"),
	import("@shikijs/langs/javascript"),
	import("@shikijs/langs/jsx"),
	import("@shikijs/langs/css"),
	import("@shikijs/langs/html"),
]

/**
 * Posts habitually open with an H1 repeating the frontmatter title, which the
 * page already renders. Dropping it here keeps one `<h1>` per document — and
 * keeps that rule from depending on every author remembering it.
 */
function remarkDropLeadingTitle() {
	return (tree: Root) => {
		const first = tree.children[0]
		if (first?.type === "heading" && first.depth === 1) {
			tree.children.shift()
		}
	}
}

/**
 * Built once and reused: Shiki compiles its grammars on first use, so
 * rebuilding the pipeline per request would re-pay that cost every time.
 */
let processorPromise: Promise<Processor> | null = null

async function buildProcessor(): Promise<Processor> {
	const highlighter = await createHighlighterCore({
		themes: [import("@shikijs/themes/vitesse-dark")],
		langs: LANGUAGES,
		engine: createOnigurumaEngine(import("shiki/wasm")),
	})

	return unified()
		.use(remarkParse)
		.use(remarkDropLeadingTitle)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeSlug)
		// A core highlighter is exactly what the plugin needs at runtime; the
		// signature just asks for the bundled generic, whose language union is
		// wider than the grammars loaded above.
		.use(rehypeShikiFromHighlighter, highlighter as unknown as HighlighterGeneric<string, string>, {
			theme: THEME,
			// Anything we did not load a grammar for renders as plain text
			// instead of throwing at request time.
			fallbackLanguage: "text",
		})
		.use(rehypeStringify) as unknown as Processor
}

function getProcessor(): Promise<Processor> {
	processorPromise ??= buildProcessor()
	return processorPromise
}

/**
 * Rewrites post-relative image paths to the public URL the browser can fetch.
 * Authors write `./images/foo.png` next to the markdown; it is served from
 * `/blog-images/<slug>/foo.png`.
 */
function resolveImagePaths(markdown: string, slug: string): string {
	return markdown.replace(
		/!\[([^\]]*)]\(\.\/images\/([^)]+)\)/g,
		`![$1](/blog-images/${slug}/$2)`,
	)
}

export async function renderMarkdown(
	markdown: string,
	slug: string,
): Promise<string> {
	const processor = await getProcessor()
	const file = await processor.process(resolveImagePaths(markdown, slug))
	return String(file)
}
