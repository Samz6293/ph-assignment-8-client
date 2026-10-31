"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex items-center justify-center size-10 bg-card text-ink border border-line rounded-full cursor-pointer
            hover:bg-muted">
            {/* CSS picks the icon, so it never flickers on page load */}
            <Moon className="size-4 dark:hidden" />
            <Sun className="hidden size-4 dark:block" />
        </button>
    )
}
