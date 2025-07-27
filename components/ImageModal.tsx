"use client"

import { useState } from "react"
import CommentSystem from "./CommentSystem"
import type { ImageData, User } from "@/types"

interface ImageModalProps {
  image: ImageData
  onClose: () => void
  user: User | null
}

export default function ImageModal({ image, onClose, user }: ImageModalProps) {
  const [likes, setLikes] = useState(image.likes)
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikes((prev) => (liked ? prev - 1 : prev + 1))
  }

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: image.imageUrl,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(image.imageUrl)
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = image.imageUrl
    link.download = `${image.title || "image"}.jpg`
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="max-w-6xl max-h-full w-full bg-[var(--surface-color)] rounded-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center justify-center bg-black">
          <img
            src={image.imageUrl || "/placeholder.svg"}
            alt={image.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="w-full md:w-96 flex flex-col">
          <div className="p-6 border-b border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center">
                  <div className="icon-user text-white text-sm"></div>
                </div>
                <div>
                  <h3 className="font-semibold">{image.userName}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {new Date(image.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <div className="icon-x text-xl"></div>
              </button>
            </div>

            <h2 className="text-xl font-bold mb-2">{image.title}</h2>
            {image.description && <p className="text-[var(--text-secondary)] mb-4">{image.description}</p>}

            {image.tags && image.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {image.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 text-[var(--primary-color)] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${liked ? "text-red-500" : "text-[var(--text-secondary)]"} hover:text-red-500 transition-colors`}
                >
                  <div className="icon-heart text-lg"></div>
                  <span className="font-medium">{likes}</span>
                </button>

                <div className="flex items-center space-x-2 text-[var(--text-secondary)]">
                  <div className="icon-eye text-lg"></div>
                  <span>{image.views}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={handleShare} className="btn-ghost p-2" title="Compartir">
                  <div className="icon-share text-lg"></div>
                </button>
                <button onClick={handleDownload} className="btn-ghost p-2" title="Descargar">
                  <div className="icon-download text-lg"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <CommentSystem imageId={image.id} user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}
