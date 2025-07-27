"use client"

import { useState } from "react"

interface FilterBarProps {
  sortBy: string
  onSortChange: (sort: string) => void
  filterBy: string
  onFilterChange: (filter: string) => void
  availableTags: string[]
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export default function FilterBar({
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  availableTags,
  viewMode,
  onViewModeChange,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="card p-4 mb-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => setShowFilters(!showFilters)} className="btn-ghost">
            <div className="icon-filter text-lg"></div>
            <span>Filtros</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--text-secondary)]">Ordenar:</span>
            <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className="input-field py-2 text-sm">
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguos</option>
              <option value="popular">Más populares</option>
              <option value="title">Por título</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-[var(--text-secondary)]">Vista:</span>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-white dark:bg-gray-600 shadow-sm" : ""}`}
            >
              <div className="icon-grid-3x3 text-sm"></div>
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-white dark:bg-gray-600 shadow-sm" : ""}`}
            >
              <div className="icon-list text-sm"></div>
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-[var(--border-color)] animate-slide-up">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFilterChange("all")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterBy === "all"
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-[var(--text-secondary)] hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Todas
            </button>
            {availableTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => onFilterChange(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterBy === tag
                    ? "bg-[var(--primary-color)] text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-[var(--text-secondary)] hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
