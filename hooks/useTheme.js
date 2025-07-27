"use client"

import React from "react"

function useTheme() {
  const [theme, setTheme] = React.useState(() => {
    const saved = localStorage.getItem("imageshare-theme")
    return saved || "light"
  })

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("imageshare-theme", theme)
  }, [theme])

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  return { theme, toggleTheme }
}

window.useTheme = useTheme
