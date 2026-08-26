/// <reference types="vite/client" />

interface ImportMetaEnv {
	/**
	 * Absolute origin this deploy is served from, e.g.
	 * `https://deveze.bleon.net`. Used for canonical and social-preview URLs.
	 *
	 * Baked in at build time by Vite, so it must be present during `npm run
	 * build` — in Docker that means a build arg, not a runtime variable.
	 * Falls back to the production domain when unset.
	 */
	readonly VITE_SITE_URL?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
