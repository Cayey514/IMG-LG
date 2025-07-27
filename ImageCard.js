function ImageCard({ image }) {
  try {
    const [showFullscreen, setShowFullscreen] = React.useState(false);
    const [likes, setLikes] = React.useState(Math.floor(Math.random() * 100));
    const [liked, setLiked] = React.useState(false);

    if (!image || !image.objectData) {
      return null;
    }

    const data = image.objectData;
    const uploadDate = data.uploadDate ? new Date(data.uploadDate).toLocaleDateString() : 'Fecha no disponible';

    const handleLike = () => {
      setLiked(!liked);
      setLikes(prev => liked ? prev - 1 : prev + 1);
    };

    // Normalizar etiquetas - pueden venir como string separado por comas o como array
    const normalizedTags = (() => {
      if (!data.tags) return [];
      if (Array.isArray(data.tags)) return data.tags;
      if (typeof data.tags === 'string') return data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      return [];
    })();

    return (
      <>
        <div className="card p-0 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" data-name="image-card" data-file="components/ImageCard.js">
          <div 
            className="relative aspect-square overflow-hidden"
            onClick={() => setShowFullscreen(true)}
          >
            <img
              src={data.imageUrl}
              alt={data.title || 'Imagen'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              <div className="icon-expand text-sm"></div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{data.title || 'Sin título'}</h3>
            
            {data.description && (
              <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">
                {data.description}
              </p>
            )}

            {normalizedTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {normalizedTags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[var(--primary-color)] bg-opacity-10 text-[var(--primary-color)] px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {normalizedTags.length > 3 && (
                  <span className="text-[var(--text-secondary)] text-xs px-2 py-1">
                    +{normalizedTags.length - 3}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-[var(--text-secondary)]'} hover:text-red-500 transition-colors`}
                >
                  <div className={`${liked ? 'icon-heart' : 'icon-heart'} text-lg`}></div>
                  <span className="text-sm">{likes}</span>
                </button>
                
                <div className="flex items-center space-x-1 text-[var(--text-secondary)]">
                  <div className="icon-user text-sm"></div>
                  <span className="text-sm">{data.userName || 'Usuario Anónimo'}</span>
                </div>
              </div>

              <span className="text-xs text-[var(--text-secondary)]">
                {uploadDate}
              </span>
            </div>
          </div>
        </div>

        {showFullscreen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFullscreen(false)}
          >
            <div className="max-w-4xl max-h-full">
              <img
                src={data.imageUrl}
                alt={data.title || 'Imagen'}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
            >
              <div className="icon-x text-xl"></div>
            </button>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('ImageCard component error:', error);
    return null;
  }
}
