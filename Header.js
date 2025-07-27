function Header({ user, onProfileClick, onUploadClick, searchTerm, onSearchChange }) {
  try {
    return (
      <header className="bg-[var(--surface-color)] shadow-md border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gradient">ImageShare</h1>
              <div className="icon-image text-2xl text-[var(--primary-color)]"></div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar imágenes..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="input-field pl-10"
                />
                <div className="icon-search absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]"></div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onUploadClick}
                className="btn-primary flex items-center space-x-2"
              >
                <div className="icon-plus text-lg"></div>
                <span>Subir Imagen</span>
              </button>

              <button
                onClick={onProfileClick}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                  <div className="icon-user text-white text-sm"></div>
                </div>
                <span className="text-[var(--text-primary)]">
                  {user ? user.name : 'Iniciar Sesión'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}
