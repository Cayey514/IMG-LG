"use client"

function Toast({ toasts, onRemove }) {
  if (!toasts || toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-${toast.type} animate-slide-up`} onClick={() => onRemove(toast.id)}>
          <div className="flex items-center space-x-2">
            <div
              className={`
              ${toast.type === "success" ? "icon-check-circle" : ""}
              ${toast.type === "error" ? "icon-x-circle" : ""}
              ${toast.type === "info" ? "icon-info" : ""}
              text-lg
            `}
            ></div>
            <span className="font-medium">{toast.message}</span>
            <button className="ml-auto">
              <div className="icon-x text-sm"></div>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
