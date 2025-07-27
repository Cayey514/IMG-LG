function ProfileModal({ user, onClose, onLogin }) {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      bio: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.name.trim()) {
        onLogin({
          id: Date.now().toString(),
          ...formData,
          joinDate: new Date().toISOString()
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="profile-modal" data-file="components/ProfileModal.js">
        <div className="card max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {user ? 'Mi Perfil' : 'Crear Perfil'}
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <div className="icon-x text-xl"></div>
            </button>
          </div>

          {user ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-user text-white text-2xl"></div>
                </div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-[var(--text-secondary)]">{user.email}</p>
              </div>
              
              {user.bio && (
                <div>
                  <h4 className="font-medium mb-2">Biografía</h4>
                  <p className="text-[var(--text-secondary)]">{user.bio}</p>
                </div>
              )}
              
              <div className="text-sm text-[var(--text-secondary)]">
                Miembro desde: {new Date(user.joinDate).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Biografía</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Crear Perfil
              </button>
            </form>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProfileModal component error:', error);
    return null;
  }
}
