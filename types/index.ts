export interface User {
  id: string
  name: string
  email?: string
  bio?: string
  joinDate: string
}

export interface ImageData {
  id: string
  title: string
  description?: string
  imageUrl: string
  tags: string[]
  userId: string
  userName: string
  uploadDate: string
  likes: number
  views: number
}

export interface Comment {
  id: string
  imageId: string
  userId: string
  userName: string
  content: string
  createdAt: string
}

export interface Toast {
  id: number
  message: string
  type: "success" | "error" | "info"
  duration: number
}
