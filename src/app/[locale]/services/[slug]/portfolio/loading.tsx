export default function PortfolioLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <section className="relative min-h-[80vh] pt-[calc(var(--navbar-h,64px)+2.5rem)] pb-24">
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
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-6">
                  <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
