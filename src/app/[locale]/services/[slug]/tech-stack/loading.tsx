export default function TechStackLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <section className="relative min-h-[80vh] pt-[200px] pb-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4" />
                <div className="h-4 w-20 bg-gray-200 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
