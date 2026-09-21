import { Livewire, Alpine } from "../../vendor/livewire/livewire/dist/livewire.esm"

/**
 * The theme switch. The class on <html> is the source of truth — the inline
 * script in the layout sets it before first paint. Where the browser supports
 * view transitions, switching on spreads light across the page from the bulb
 * and switching off pulls it back in; elsewhere it simply flips.
 */
Alpine.data("lightSwitch", () => ({
	lit: !document.documentElement.classList.contains("dark"),

	flip() {
		const root = document.documentElement
		const next = root.classList.contains("dark") ? "light" : "dark"
		const apply = () => {
			root.classList.remove("light", "dark")
			root.classList.add(next)
			this.lit = next === "light"
			try {
				localStorage.setItem("theme", next)
			} catch {
				// Private mode or blocked storage: the theme still applies for this page.
			}
		}

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		if (!document.startViewTransition || reduced) {
			apply()
			return
		}

		// Where the light comes from, and how far it has to reach to cover the page.
		const rect = this.$el.getBoundingClientRect()
		const x = rect.left + rect.width / 2
		const y = rect.top + rect.height / 2
		const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
		root.style.setProperty("--light-x", `${x}px`)
		root.style.setProperty("--light-y", `${y}px`)
		root.style.setProperty("--light-r", `${radius}px`)

		const direction = next === "light" ? "theme-to-light" : "theme-to-dark"
		root.classList.add(direction, "theme-switching")
		document
			.startViewTransition(apply)
			.finished.finally(() => root.classList.remove(direction, "theme-switching"))
	},
}))

/**
 * A project's screenshots: which one the frame shows (`active`), and the
 * full-size viewer (`open`, `index`) with arrow keys to move between them.
 */
Alpine.data("lightbox", (images) => ({
	images,
	count: images.length,
	active: 0,
	open: false,
	index: 0,

	show(index) {
		this.index = index
		this.open = true
		this.$refs.dialog.showModal()
	},
	close() {
		this.open = false
		this.$refs.dialog.close()
	},
	next() {
		this.index = (this.index + 1) % this.count
	},
	previous() {
		this.index = (this.index - 1 + this.count) % this.count
	},
}))

/** The 👋 in the intro: waves when the pointer arrives, and again once it has finished. */
Alpine.data("wavingHand", () => ({
	waving: false,
	busyUntil: 0,
	timer: null,

	wave() {
		if (Date.now() < this.busyUntil) return
		clearTimeout(this.timer)
		this.waving = false
		requestAnimationFrame(() => (this.waving = true))
		this.busyUntil = Date.now() + 1800
		this.timer = setTimeout(() => (this.waving = false), 1800)
	},
}))

/** The hairline at the top of a post showing how far through it you are. */
Alpine.data("readingProgress", () => ({
	progress: 0,

	init() {
		const measure = () => {
			const scrollable = document.documentElement.scrollHeight - innerHeight
			this.progress = scrollable <= 0 ? 0 : (scrollY / scrollable) * 100
		}
		measure()
		addEventListener("scroll", measure, { passive: true })
		addEventListener("resize", measure)
	},
}))

Livewire.start()
