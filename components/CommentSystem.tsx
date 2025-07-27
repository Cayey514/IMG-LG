"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { mockDataService } from "@/lib/mockData"
import type { Comment, User } from "@/types"

interface CommentSystemProps {
  imageId: string
  user: User | null
}

export default function CommentSystem({ imageId, user }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadComments()
  }, [imageId])

  const loadComments = () => {
    const imageComments = mockDataService.getComments(imageId)
    setComments(imageComments)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    setIsSubmitting(true)
    try {
      const comment = mockDataService.createComment({
        imageId,
        userId: user.id,
        userName: user.name,
        content: newComment.trim(),
      })
      setComments((prev) => [...prev, comment])
      setNewComment("")
    } catch (error) {
      console.error("Error creating comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <h3 className="font-semibold mb-4">Comentarios ({comments.length})</h3>

      {user && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center flex-shrink-0">
              <div className="icon-user text-white text-xs"></div>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="input-field resize-none"
                rows={3}
              />
              <button type="submit" disabled={!newComment.trim() || isSubmitting} className="btn-primary mt-2">
                {isSubmitting ? (
                  <>
                    <div className="icon-loader-2 text-sm animate-spin"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <div className="icon-send text-sm"></div>
                    <span>Comentar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="icon-message-circle text-4xl text-[var(--text-secondary)] mb-2"></div>
            <p className="text-[var(--text-secondary)]">
              {user ? "Sé el primero en comentar" : "Inicia sesión para comentar"}
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center flex-shrink-0">
                <div className="icon-user text-white text-xs"></div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{comment.userName}</span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
