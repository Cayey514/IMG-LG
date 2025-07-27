import SkeletonLoader from "./SkeletonLoader"
import ImageCard from "./ImageCard"

function ImageGallery({ images, isLoading, viewMode, onImageClick }) {
  if (isLoading) {
    return <SkeletonLoader type="card" count={8} />
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-24 h-24 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="icon-image text-white text-4xl"></div>
        </div>
        <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">No hay imágenes aún</h3>
        <p className="text-[var(--text-secondary)] text-lg mb-6">¡Sé el primero en compartir una imagen increíble!</p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary">
            <div className="icon-plus text-lg"></div>
            <span>Subir primera imagen</span>
          </button>
          <button className="btn-secondary">
            <div className="icon-explore text-lg"></div>
            <span>Explorar ejemplos</span>
          </button>
        </div>
      </div>
    )
  }

  const gridClass =
    viewMode === "list" ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"

  return (
    <div className={`${gridClass} animate-fade-in`}>
      {images.map((image, index) => (
        <div key={image.objectId} style={{ animationDelay: `${index * 0.1}s` }} className="animate-slide-up">
          <ImageCard image={image} viewMode={viewMode} onImageClick={onImageClick} />
        </div>
      ))}
    </div>
  )
}
