'use client'
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const [isDark, setIsDark] = React.useState(false)

    // On mount: sync with saved theme or system
    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme")

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark")
            setIsDark(true)
        } else if (savedTheme === "light") {
            document.documentElement.classList.remove("dark")
            setIsDark(false)
        } else {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            document.documentElement.classList.toggle("dark", systemDark)
            setIsDark(systemDark)
        }
    }, [])

    const toggleTheme = () => {
        const nextTheme = !isDark
        setIsDark(nextTheme)

        document.documentElement.classList.toggle("dark", nextTheme)
        localStorage.setItem("theme", nextTheme ? "dark" : "light")
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    )
}
