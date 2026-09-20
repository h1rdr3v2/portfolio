import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

export type Theme = "light" | "dark"

interface ThemeContextValue {
	theme: Theme
	/** Flips the theme on the document immediately and returns the new one. */
	toggle: () => Theme
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * The class on <html> is the source of truth — the inline script in the root
 * template sets it before first paint, and the light switch needs the flip to
 * land in the DOM synchronously so a view transition can snapshot it. React
 * state only mirrors it for anything that wants to render differently.
 */
export function readTheme(): Theme {
	if (typeof document === "undefined") return "light"
	return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function applyTheme(theme: Theme) {
	const root = document.documentElement
	root.classList.remove("light", "dark")
	root.classList.add(theme)
	try {
		localStorage.setItem("theme", theme)
	} catch {
		// Private mode or blocked storage: the theme still applies for this page.
	}
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light")

	useEffect(() => {
		setTheme(readTheme())
	}, [])

	const toggle = useCallback((): Theme => {
		const next: Theme = readTheme() === "dark" ? "light" : "dark"
		applyTheme(next)
		setTheme(next)
		return next
	}, [])

	return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext)
	if (!context) throw new Error("useTheme must be used inside <ThemeProvider>")
	return context
}
