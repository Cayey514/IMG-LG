function SkeletonLoader({ type = "card", count = 8 }) {
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="card p-0 overflow-hidden">
            <div className="skeleton aspect-square"></div>
            <div className="p-4 space-y-3">
              <div className="skeleton h-6 w-3/4"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="skeleton h-4 w-16"></div>
                <div className="skeleton h-4 w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return null
}
