"use client"

import React from "react"

function Header({ user, onProfileClick, onUploadClick, searchTerm, onSearchChange, theme, onThemeToggle }) {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`
      sticky top-0 z-40 transition-all duration-300
      ${isScrolled ? "glass-effect shadow-lg" : "bg-[var(--surface-color)] border-b border-[var(--border-color)]"}
    `}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl flex items-center justify-center">
                <div className="icon-image text-white text-xl"></div>
              </div>
              <h1 className="text-2xl font-bold gradient-text">ImageShare</h1>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar imágenes, usuarios, tags..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="input-field pl-12 pr-4"
              />
              <div className="icon-search absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]"></div>
              {searchTerm && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <div className="icon-x text-sm"></div>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onThemeToggle}
              className="btn-ghost"
              title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
            >
              <div className={`${theme === "light" ? "icon-moon" : "icon-sun"} text-lg`}></div>
            </button>

            <button onClick={onUploadClick} className="btn-primary">
              <div className="icon-plus text-lg"></div>
              <span className="hidden sm:inline">Subir</span>
            </button>

            <button
              onClick={onProfileClick}
              className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center">
                <div className="icon-user text-white text-sm"></div>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-[var(--text-primary)]">
                  {user ? user.name : "Iniciar Sesión"}
                </div>
                {user && <div className="text-xs text-[var(--text-secondary)]">Ver perfil</div>}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
