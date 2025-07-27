"use client"

import type React from "react"
import { useState } from "react"
import { mockDataService } from "@/lib/mockData"
import type { ImageData } from "@/types"

interface ImageCardProps {
  image: ImageData
  onImageClick: (image: ImageData) => void
  viewMode?: "grid" | "list"
}

export default function ImageCard({ image, onImageClick, viewMode = "grid" }: ImageCardProps) {
  const [likes, setLikes] = useState(image.likes)
  const [liked, setLiked] = useState(false)
  const [views] = useState(image.views)
  const [isLoading, setIsLoading] = useState(true)

  const uploadDate = new Date(image.uploadDate).toLocaleDateString()

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
    const newLikes = liked ? likes - 1 : likes + 1
    setLikes(newLikes)

    try {
      mockDataService.updateImage(image.id, { likes: newLikes })
    } catch (error) {
      console.error("Error updating likes:", error)
    }
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
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

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    const link = document.createElement("a")
    link.href = image.imageUrl
    link.download = `${image.title || "image"}.jpg`
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (viewMode === "list") {
    return (
      <div
        className="card p-4 cursor-pointer hover:shadow-lg transition-all duration-300 animate-fade-in"
        onClick={() => onImageClick(image)}
      >
        <div className="flex space-x-4">
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              src={image.imageUrl || "/placeholder.svg"}
              alt={image.title}
              className="w-full h-full object-cover rounded-xl"
              onLoad={() => setIsLoading(false)}
            />
            {isLoading && <div className="absolute inset-0 skeleton rounded-xl"></div>}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{image.title}</h3>

            {image.description && (
              <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">{image.description}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 ${liked ? "text-red-500" : "text-[var(--text-secondary)]"} hover:text-red-500 transition-colors`}
                >
                  <div className="icon-heart text-lg"></div>
                  <span className="text-sm">{likes}</span>
                </button>

                <div className="flex items-center space-x-1 text-[var(--text-secondary)]">
                  <div className="icon-eye text-sm"></div>
                  <span className="text-sm">{views}</span>
                </div>

                <div className="flex items-center space-x-1 text-[var(--text-secondary)]">
                  <div className="icon-user text-sm"></div>
                  <span className="text-sm">{image.userName}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={handleShare} className="btn-ghost p-2">
                  <div className="icon-share text-sm"></div>
                </button>
                <button onClick={handleDownload} className="btn-ghost p-2">
                  <div className="icon-download text-sm"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-hover p-0 overflow-hidden cursor-pointer animate-fade-in group">
      <div className="relative aspect-square overflow-hidden" onClick={() => onImageClick(image)}>
        <img
          src={image.imageUrl || "/placeholder.svg"}
          alt={image.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && <div className="absolute inset-0 skeleton"></div>}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 ${liked ? "text-red-400" : "text-white"} hover:text-red-400 transition-colors`}
                >
                  <div className="icon-heart text-lg"></div>
                  <span className="text-sm font-medium">{likes}</span>
                </button>

                <div className="flex items-center space-x-1">
                  <div className="icon-eye text-sm"></div>
                  <span className="text-sm">{views}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <div className="icon-share text-sm"></div>
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <div className="icon-download text-sm"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="icon-expand text-sm"></div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{image.title}</h3>

        {image.description && (
          <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">{image.description}</p>
        )}

        {image.tags && image.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {image.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 text-[var(--primary-color)] px-2 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
            {image.tags.length > 3 && (
              <span className="text-[var(--text-secondary)] text-xs px-2 py-1">+{image.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center">
              <div className="icon-user text-white text-xs"></div>
            </div>
            <span className="text-[var(--text-secondary)] font-medium">{image.userName}</span>
          </div>

          <span className="text-[var(--text-secondary)]">{uploadDate}</span>
        </div>
      </div>
    </div>
  )
}
