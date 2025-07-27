"use client"

import { useState, useEffect, useCallback } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("imageshare-theme") as "light" | "dark"
      if (saved) {
        setTheme(saved)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("imageshare-theme", theme)
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  return { theme, toggleTheme }
}
