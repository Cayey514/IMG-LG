import type { User, ImageData, Comment } from "@/types"

// Datos de ejemplo
const sampleImages: Omit<ImageData, "id">[] = [
  {
    title: "Paisaje Montañoso",
    description: "Hermosa vista de montañas al atardecer",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tags: ["naturaleza", "paisaje", "montañas"],
    userId: "user1",
    userName: "Ana García",
    uploadDate: "2024-01-15T10:30:00Z",
    likes: 45,
    views: 234,
  },
  {
    title: "Sendero en el Bosque",
    description: "Camino misterioso entre los árboles",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    tags: ["bosque", "naturaleza", "sendero"],
    userId: "user2",
    userName: "Carlos López",
    uploadDate: "2024-01-14T15:45:00Z",
    likes: 32,
    views: 189,
  },
  {
    title: "Campo Verde",
    description: "Extensos campos bajo el cielo azul",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
    tags: ["campo", "verde", "cielo"],
    userId: "user3",
    userName: "María Rodríguez",
    uploadDate: "2024-01-13T09:20:00Z",
    likes: 28,
    views: 156,
  },
  {
    title: "Lago Sereno",
    description: "Reflexiones perfectas en aguas tranquilas",
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    tags: ["lago", "agua", "reflexión"],
    userId: "user1",
    userName: "Ana García",
    uploadDate: "2024-01-12T14:15:00Z",
    likes: 67,
    views: 312,
  },
]

class MockDataService {
  private images: ImageData[] = []
  private users: User[] = []
  private comments: Comment[] = []
  private currentUser: User | null = null

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    // Inicializar con datos de ejemplo
    this.images = sampleImages.map((img, index) => ({
      ...img,
      id: `img_${index + 1}`,
    }))
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  createUser(userData: Omit<User, "id" | "joinDate">): User {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      joinDate: new Date().toISOString(),
    }
    this.users.push(newUser)
    this.currentUser = newUser
    return newUser
  }

  getImages(): Promise<ImageData[]> {
    return Promise.resolve([...this.images])
  }

  createImage(imageData: Omit<ImageData, "id" | "uploadDate" | "likes" | "views">): ImageData {
    const newImage: ImageData = {
      ...imageData,
      id: `img_${Date.now()}`,
      uploadDate: new Date().toISOString(),
      likes: 0,
      views: 0,
    }
    this.images.unshift(newImage)
    return newImage
  }

  updateImage(id: string, updates: Partial<ImageData>): ImageData | null {
    const index = this.images.findIndex((img) => img.id === id)
    if (index !== -1) {
      this.images[index] = { ...this.images[index], ...updates }
      return this.images[index]
    }
    return null
  }

  getComments(imageId: string): Comment[] {
    return this.comments.filter((comment) => comment.imageId === imageId)
  }

  createComment(commentData: Omit<Comment, "id" | "createdAt">): Comment {
    const newComment: Comment = {
      ...commentData,
      id: `comment_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.comments.push(newComment)
    return newComment
  }
}

export const mockDataService = new MockDataService()
