"use client"

import React from "react"
import ReactDOM from "react-dom/client"
import { useTheme } from "./useTheme" // Assuming useTheme is imported from a custom hook file
import { useToast } from "./useToast" // Assuming useToast is imported from a custom hook file
import { trickleGetObject, trickleListObjects, trickleUpdateObject, trickleCreateObject } from "./trickleAPI" // Assuming trickleAPI is imported from a custom API file
import Header from "./Header" // Assuming Header is imported from a custom component file
import StatsCard from "./StatsCard" // Assuming StatsCard is imported from a custom component file
import FilterBar from "./FilterBar" // Assuming FilterBar is imported from a custom component file
import ImageGallery from "./ImageGallery" // Assuming ImageGallery is imported from a custom component file
import ProfileModal from "./ProfileModal" // Assuming ProfileModal is imported from a custom component file
import UploadModal from "./UploadModal" // Assuming UploadModal is imported from a custom component file
import ImageModal from "./ImageModal" // Assuming ImageModal is imported from a custom component file
import Toast from "./Toast" // Assuming Toast is imported from a custom component file

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-color)]">
          <div className="text-center animate-bounce-in">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="icon-alert-triangle text-white text-2xl"></div>
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">¡Oops! Algo salió mal</h1>
            <p className="text-[var(--text-secondary)] mb-6">Lo sentimos, ocurrió un error inesperado.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              <div className="icon-refresh-cw text-lg"></div>
              <span>Recargar página</span>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  const [user, setUser] = React.useState(null)
  const [images, setImages] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [showProfileModal, setShowProfileModal] = React.useState(false)
  const [showUploadModal, setShowUploadModal] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortBy, setSortBy] = React.useState("newest")
  const [filterBy, setFilterBy] = React.useState("all")
  const [viewMode, setViewMode] = React.useState("grid")

  const { theme, toggleTheme } = useTheme()
  const { toasts, showToast, removeToast } = useToast()

  React.useEffect(() => {
    loadUserData()
    loadImages()
  }, [])

  const loadUserData = async () => {
    try {
      const userData = await trickleGetObject("user", "current_user")
      if (userData && userData.objectData) {
        setUser(userData.objectData)
      }
    } catch (error) {
      console.log("No hay usuario logueado")
    }
  }

  const loadImages = async () => {
    try {
      setIsLoading(true)
      const response = await trickleListObjects("image", 50, true)
      if (response && response.items && Array.isArray(response.items)) {
        setImages(response.items)
      }
    } catch (error) {
      console.log("Error cargando imágenes:", error)
      setImages([])
      showToast("Error al cargar las imágenes", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (userData) => {
    try {
      let userObject
      try {
        userObject = await trickleGetObject("user", "current_user")
        userObject = await trickleUpdateObject("user", "current_user", userData)
      } catch (error) {
        userObject = await trickleCreateObject("user", {
          ...userData,
          objectId: "current_user",
        })
      }

      setUser(userObject.objectData)
      setShowProfileModal(false)
      showToast(`¡Bienvenido, ${userData.name}!`, "success")
    } catch (error) {
      console.error("Error al crear/obtener usuario:", error)
      showToast("Error al iniciar sesión", "error")
    }
  }

  const handleImageUpload = async (imageData) => {
    try {
      const newImage = await trickleCreateObject("image", {
        ...imageData,
        userId: user?.id || "anonymous",
        userName: user?.name || "Usuario Anónimo",
        uploadDate: new Date().toISOString(),
        likes: 0,
        views: 0,
      })
      setImages((prev) => [newImage, ...prev])
      setShowUploadModal(false)
      showToast("¡Imagen subida exitosamente!", "success")
    } catch (error) {
      console.error("Error subiendo imagen:", error)
      showToast("Error al subir la imagen", "error")
    }
  }

  // Obtener todas las etiquetas disponibles
  const availableTags = React.useMemo(() => {
    const tags = new Set()
    images.forEach((image) => {
      if (image.objectData?.tags) {
        const imageTags = Array.isArray(image.objectData.tags)
          ? image.objectData.tags
          : image.objectData.tags.split(",").map((tag) => tag.trim())
        imageTags.forEach((tag) => tags.add(tag))
      }
    })
    return Array.from(tags).filter(Boolean)
  }, [images])

  // Filtrar y ordenar imágenes
  const processedImages = React.useMemo(() => {
    if (!Array.isArray(images)) return []

    const filtered = images.filter((image) => {
      if (!image || !image.objectData) return false

      const data = image.objectData
      const title = data.title || ""
      const description = data.description || ""
      const userName = data.userName || ""
      const searchLower = searchTerm.toLowerCase()

      const matchesSearch =
        title.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower) ||
        userName.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false

      if (filterBy === "all") return true

      const imageTags = data.tags
        ? Array.isArray(data.tags)
          ? data.tags
          : data.tags.split(",").map((tag) => tag.trim())
        : []

      return imageTags.includes(filterBy)
    })

    // Ordenar
    filtered.sort((a, b) => {
      const aData = a.objectData
      const bData = b.objectData

      switch (sortBy) {
        case "newest":
          return new Date(bData.uploadDate || 0) - new Date(aData.uploadDate || 0)
        case "oldest":
          return new Date(aData.uploadDate || 0) - new Date(bData.uploadDate || 0)
        case "popular":
          return (bData.likes || 0) - (aData.likes || 0)
        case "title":
          return (aData.title || "").localeCompare(bData.title || "")
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

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
