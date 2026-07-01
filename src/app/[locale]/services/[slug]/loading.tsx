// Service detail page loading skeleton
export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[85vh] pt-[calc(var(--navbar-h,64px)+1.5rem)] pb-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          <div className="max-w-3xl">
            {/* Eyebrow skeleton */}
            <div className="h-4 w-24 bg-gray-200 rounded mb-6" />

            {/* Title skeleton */}
            <div className="space-y-4 mb-8">
              <div className="h-12 w-3/4 bg-gray-200 rounded" />
              <div className="h-12 w-1/2 bg-gray-200 rounded" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-3 mb-12">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>

            {/* Buttons skeleton */}
            <div className="flex gap-4">
              <div className="h-12 w-40 bg-gray-300 rounded" />
              <div className="h-12 w-36 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-5/6 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
