"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextValue {
	theme: Theme
	resolvedTheme: "light" | "dark"
	setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
	undefined,
)

function getSystemTheme(): "light" | "dark" {
	if (typeof window === "undefined") return "light"
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light"
}

function getStoredTheme(): Theme {
	if (typeof window === "undefined") return "system"
	const stored = localStorage.getItem("theme") as Theme | null
	if (stored === "light" || stored === "dark" || stored === "system")
		return stored
	return "system"
}

function resolveTheme(theme: Theme): "light" | "dark" {
	if (theme === "system") return getSystemTheme()
	return theme
}

function applyTheme(resolved: "light" | "dark") {
	const root = document.documentElement
	root.classList.remove("light", "dark")
	root.classList.add(resolved)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = React.useState<Theme>(getStoredTheme)
	const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
		() => resolveTheme(getStoredTheme()),
	)

	const setTheme = React.useCallback((t: Theme) => {
		setThemeState(t)
		localStorage.setItem("theme", t)
	}, [])

	// Apply theme class on mount and when theme changes
	React.useEffect(() => {
		const resolved = resolveTheme(theme)
		setResolvedTheme(resolved)
		applyTheme(resolved)
	}, [theme])

	// Listen for system theme changes
	React.useEffect(() => {
		if (theme !== "system") return

		const mq = window.matchMedia("(prefers-color-scheme: dark)")
		const handler = () => {
			const resolved = getSystemTheme()
			setResolvedTheme(resolved)
			applyTheme(resolved)
		}
		mq.addEventListener("change", handler)
		return () => mq.removeEventListener("change", handler)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const ctx = React.useContext(ThemeContext)
	if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
	return ctx
}
