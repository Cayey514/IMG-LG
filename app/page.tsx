"use client"

import { useState, useEffect, useMemo } from "react"
import Header from "@/components/Header"
import StatsCard from "@/components/StatsCard"
import FilterBar from "@/components/FilterBar"
import ImageGallery from "@/components/ImageGallery"
import ProfileModal from "@/components/ProfileModal"
import UploadModal from "@/components/UploadModal"
import ImageModal from "@/components/ImageModal"
import Toast from "@/components/Toast"
import { useTheme } from "@/hooks/useTheme"
import { useToast } from "@/hooks/useToast"
import { mockDataService } from "@/lib/mockData"
import type { User, ImageData } from "@/types"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { theme, toggleTheme } = useTheme()
  const { toasts, showToast, removeToast } = useToast()

  useEffect(() => {
    loadUserData()
    loadImages()
  }, [])

  const loadUserData = async () => {
    try {
      const userData = mockDataService.getCurrentUser()
      if (userData) {
        setUser(userData)
      }
    } catch (error) {
      console.log("No hay usuario logueado")
    }
  }

  const loadImages = async () => {
    try {
      setIsLoading(true)
      const response = await mockDataService.getImages()
      setImages(response)
    } catch (error) {
      console.log("Error cargando imágenes:", error)
      setImages([])
      showToast("Error al cargar las imágenes", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (userData: Omit<User, "id" | "joinDate">) => {
    try {
      const newUser = mockDataService.createUser(userData)
      setUser(newUser)
      setShowProfileModal(false)
      showToast(`¡Bienvenido, ${userData.name}!`, "success")
    } catch (error) {
      console.error("Error al crear usuario:", error)
      showToast("Error al iniciar sesión", "error")
    }
  }

  const handleImageUpload = async (
    imageData: Omit<ImageData, "id" | "userId" | "userName" | "uploadDate" | "likes" | "views">,
  ) => {
    try {
      const newImage = mockDataService.createImage({
        ...imageData,
        userId: user?.id || "anonymous",
        userName: user?.name || "Usuario Anónimo",
      })
      setImages((prev) => [newImage, ...prev])
      setShowUploadModal(false)
      showToast("¡Imagen subida exitosamente!", "success")
    } catch (error) {
      console.error("Error subiendo imagen:", error)
      showToast("Error al subir la imagen", "error")
    }
  }

  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    images.forEach((image) => {
      if (image.tags) {
        image.tags.forEach((tag) => tags.add(tag))
      }
    })
    return Array.from(tags).filter(Boolean)
  }, [images])

  const processedImages = useMemo(() => {
    const filtered = images.filter((image) => {
      const title = image.title || ""
      const description = image.description || ""
      const userName = image.userName || ""
      const searchLower = searchTerm.toLowerCase()

      const matchesSearch =
        title.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower) ||
        userName.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false

      if (filterBy === "all") return true

      return image.tags?.includes(filterBy) || false
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        case "oldest":
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        case "popular":
          return b.likes - a.likes
        case "title":
          return (a.title || "").localeCompare(b.title || "")
        default:
          return 0
      }
    })

    return filtered
  }, [images, searchTerm, sortBy, filterBy])

  return (
    <div className="min-h-screen bg-[var(--background-color)] transition-colors duration-300">
      <Header
        user={user}
        onProfileClick={() => setShowProfileModal(true)}
        onUploadClick={() => setShowUploadModal(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <main className="container mx-auto px-4 py-8">
        {user && <StatsCard user={user} images={images} />}

        <FilterBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterBy={filterBy}
          onFilterChange={setFilterBy}
          availableTags={availableTags}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <ImageGallery
          images={processedImages}
          isLoading={isLoading}
          viewMode={viewMode}
          onImageClick={setSelectedImage}
        />
      </main>

      {showProfileModal && (
        <ProfileModal user={user} onClose={() => setShowProfileModal(false)} onLogin={handleLogin} />
      )}

      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} onUpload={handleImageUpload} user={user} />
      )}

      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} user={user} />}

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
