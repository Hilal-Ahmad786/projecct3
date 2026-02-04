export default function ProcessLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <section className="relative min-h-[80vh] pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
          <div className="max-w-3xl">
            <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
            <div className="space-y-4 mb-8">
              <div className="h-12 w-3/4 bg-gray-200 rounded" />
              <div className="h-12 w-1/2 bg-gray-200 rounded" />
            </div>
            <div className="space-y-3 mb-12">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-8 mb-12">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="h-6 w-48 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
