export default function Loading() {
  return (
    <div
      className="mx-auto max-w-6xl animate-pulse space-y-8 px-6 py-12"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="glass h-10 w-64 rounded-md" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass flex h-96 flex-col justify-between rounded-3xl p-4">
            <div className="h-64 w-full rounded-2xl bg-white/40" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-3/4 rounded-md bg-white/40" />
              <div className="h-3 w-1/2 rounded-md bg-white/30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
