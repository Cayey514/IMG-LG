"use client"

import React from "react"

function useToast() {
  const [toasts, setToasts] = React.useState([])

  const showToast = React.useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type, duration }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, showToast, removeToast }
}

window.useToast = useToast
