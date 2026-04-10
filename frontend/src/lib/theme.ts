import { create } from "zustand"

const THEMES = ["light", "dark"] as const

type Theme = (typeof THEMES)[number]

type ThemeState = {
    theme: Theme | null
    toggleTheme: () => void
}

const applyTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
}

const localTheme = () => localStorage.getItem("theme") as Theme | "light"

const initTheme = () => {
    const theme: Theme = localTheme()
    applyTheme(theme)
    return theme
}

export const useTheme = create<ThemeState>((set) => ({
    theme: initTheme(),
    toggleTheme: () =>
        set((state) => {
            const oldTheme: Theme = state.theme || localTheme()
            const newTheme: Theme = oldTheme === "light" ? "dark" : "light"
            applyTheme(newTheme)
            return { theme: newTheme }
        })
}))
