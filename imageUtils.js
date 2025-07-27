const ImageUtils = {
  validateImageUrl: (url) => {
    try {
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const urlLower = url.toLowerCase();
      
      // Verificar si es una URL válida
      new URL(url);
      
      // Verificar si tiene una extensión de imagen válida o es de un servicio conocido
      const hasValidExtension = validExtensions.some(ext => urlLower.includes(ext));
      const isKnownService = urlLower.includes('unsplash.com') || 
                           urlLower.includes('pexels.com') || 
                           urlLower.includes('pixabay.com') ||
                           urlLower.includes('imgur.com');
      
      return hasValidExtension || isKnownService;
    } catch {
      return false;
    }
  },

  getImageDimensions: (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      img.onerror = reject;
      img.src = url;
    });
  },

  generateThumbnail: (url, maxWidth = 300) => {
    // Para servicios como Unsplash, podemos agregar parámetros de redimensionamiento
    if (url.includes('unsplash.com')) {
      return `${url}&w=${maxWidth}&q=80`;
    }
    if (url.includes('pexels.com')) {
      return `${url}?w=${maxWidth}&h=${maxWidth}&fit=crop`;
    }
    return url;
  },

  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  extractColorsFromImage: async (imageUrl) => {
    try {
      // Esta función podría expandirse para extraer colores dominantes
      // Por ahora retorna colores por defecto
      return {
        dominant: '#3b82f6',
        secondary: '#1e40af',
        accent: '#f59e0b'
      };
    } catch (error) {
      return {
        dominant: '#3b82f6',
        secondary: '#1e40af', 
        accent: '#f59e0b'
      };
    }
  }
};

// Hacer disponible globalmente
window.ImageUtils = ImageUtils;
