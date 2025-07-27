"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@/types"

interface UploadModalProps {
  onClose: () => void
  onUpload: (imageData: any) => void
  user: User | null
}

export default function UploadModal({ onClose, onUpload, user }: UploadModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    tags: "",
  })
  const [previewUrl, setPreviewUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, imageUrl: url })
    setPreviewUrl(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.imageUrl.trim() || !formData.title.trim()) return

    setIsUploading(true)
    try {
      const imageData = {
        ...formData,
        tags: formData.tags
          ? formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
      }
      await onUpload(imageData)
    } catch (error) {
      console.error("Error al subir imagen:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const generateSampleImageUrl = () => {
    const sampleImages = [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500",
    ]
    const randomUrl = sampleImages[Math.floor(Math.random() * sampleImages.length)]
    handleImageUrlChange(randomUrl)
    setFormData((prev) => ({
      ...prev,
      title: "Imagen de Ejemplo",
      description: "Una hermosa imagen de la naturaleza",
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Subir Nueva Imagen</h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <div className="icon-x text-xl"></div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">URL de la Imagen *</label>
            <div className="flex space-x-2">
              <input
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                className="input-field flex-1"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <button type="button" onClick={generateSampleImageUrl} className="btn-secondary whitespace-nowrap">
                Ejemplo
              </button>
            </div>
          </div>

          {previewUrl && (
            <div>
              <label className="block text-sm font-medium mb-2">Vista Previa</label>
              <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={() => setPreviewUrl("")}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Título *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="Título de tu imagen"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              rows={3}
              placeholder="Describe tu imagen..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Etiquetas</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="input-field"
              placeholder="naturaleza, paisaje, fotografía (separadas por comas)"
            />
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1" disabled={isUploading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={isUploading}>
              {isUploading ? (
                <>
                  <div className="icon-loader-2 text-lg animate-spin"></div>
                  <span>Subiendo...</span>
                </>
              ) : (
                <>
                  <div className="icon-upload text-lg"></div>
                  <span>Subir Imagen</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
