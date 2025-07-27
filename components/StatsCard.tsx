import type { User, ImageData } from "@/types"

interface StatsCardProps {
  user: User
  images: ImageData[]
}

export default function StatsCard({ user, images }: StatsCardProps) {
  const userImages = images.filter((img) => img.userId === user.id)
  const totalLikes = userImages.reduce((sum, img) => sum + img.likes, 0)
  const totalViews = userImages.reduce((sum, img) => sum + img.views, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="card p-6 text-center">
        <div className="text-3xl font-bold gradient-text mb-2">{userImages.length}</div>
        <div className="text-[var(--text-secondary)] text-sm">Imágenes subidas</div>
      </div>

      <div className="card p-6 text-center">
        <div className="text-3xl font-bold gradient-text mb-2">{totalLikes}</div>
        <div className="text-[var(--text-secondary)] text-sm">Likes totales</div>
      </div>

      <div className="card p-6 text-center">
        <div className="text-3xl font-bold gradient-text mb-2">{totalViews}</div>
        <div className="text-[var(--text-secondary)] text-sm">Visualizaciones</div>
      </div>
    </div>
  )
}
