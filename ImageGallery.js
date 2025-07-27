function ImageGallery({ images }) {
  try {
    if (images.length === 0) {
      return (
        <div className="text-center py-16" data-name="empty-gallery" data-file="components/ImageGallery.js">
          <div className="icon-image text-6xl text-[var(--text-secondary)] mb-4"></div>
          <h3 className="text-xl font-medium text-[var(--text-secondary)] mb-2">
            No hay imágenes aún
          </h3>
          <p className="text-[var(--text-secondary)]">
            ¡Sé el primero en compartir una imagen!
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-name="image-gallery" data-file="components/ImageGallery.js">
        {images.map((image) => (
          <ImageCard key={image.objectId} image={image} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('ImageGallery component error:', error);
    return null;
  }
}
