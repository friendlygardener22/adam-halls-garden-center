import Image from 'next/image'

export const metadata = {
  title: "Garden Advice & Inspiration | Adam Hall's Garden Center",
  description: "Get expert garden advice, seasonal tips, and plant care guides from Adam Hall's Garden Center. Be inspired to grow beautifully!",
  openGraph: {
    title: "Garden Advice & Inspiration | Adam Hall's Garden Center",
    description: "Get expert garden advice, seasonal tips, and plant care guides from Adam Hall's Garden Center. Be inspired to grow beautifully!",
    url: 'https://adamhalls.com/garden-advice',
    siteName: "Adam Hall's Garden Center",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Adam Hall's Garden Center",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function GardenAdvicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-5xl font-extrabold text-green-900 mb-8 text-center drop-shadow-lg" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
          Garden Advice & Inspiration
        </h1>
        {/* Featured Articles */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-6 items-center hover:shadow-2xl transition">
              <Image src="/images/plants/Bearded iris.jpeg" alt="Spring Garden Prep" width={140} height={100} className="rounded-xl object-cover shadow-md" />
              <div>
                <h3 className="font-semibold text-xl mb-2 text-green-900">Spring Garden Preparation Guide</h3>
                <p className="text-gray-700 mb-3">Get your garden ready for spring with soil prep, early planting, and essential maintenance tips.</p>
                <a href="#" className="text-green-700 hover:text-green-900 font-semibold underline underline-offset-2">Read More →</a>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-6 items-center hover:shadow-2xl transition">
              <Image src="/images/plants/bouganvillia.jpeg" alt="Composting 101" width={140} height={100} className="rounded-xl object-cover shadow-md" />
              <div>
                <h3 className="font-semibold text-xl mb-2 text-green-900">Composting 101</h3>
                <p className="text-gray-700 mb-3">Learn how to create nutrient-rich compost for your garden using kitchen scraps and yard waste.</p>
                <a href="#" className="text-green-700 hover:text-green-900 font-semibold underline underline-offset-2">Read More →</a>
              </div>
            </div>
          </div>
        </section>
        <div className="border-t border-green-200 my-12"></div>
        {/* Seasonal Tips */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Seasonal Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-green-100 to-white rounded-2xl shadow p-8 text-center flex flex-col items-center hover:shadow-lg transition">
              <h3 className="font-semibold text-2xl text-green-900 mb-2">Spring</h3>
              <p className="text-gray-700 mb-2">Start seeds indoors, prune shrubs, and prepare soil for planting.</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-white rounded-2xl shadow p-8 text-center flex flex-col items-center hover:shadow-lg transition">
              <h3 className="font-semibold text-2xl text-green-900 mb-2">Summer</h3>
              <p className="text-gray-700 mb-2">Water deeply, mulch beds, and watch for pests and diseases.</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-white rounded-2xl shadow p-8 text-center flex flex-col items-center hover:shadow-lg transition">
              <h3 className="font-semibold text-2xl text-green-900 mb-2">Fall & Winter</h3>
              <p className="text-gray-700 mb-2">Plant bulbs, clean up beds, and protect tender plants from frost.</p>
            </div>
          </div>
        </section>
        <div className="border-t border-green-200 my-12"></div>
        {/* Plant Care Guides */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Plant Care Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col items-center hover:shadow-2xl transition">
              <Image src="/images/plants/Yellow barrel cactus.jpeg" alt="Cactus Care" width={90} height={90} className="rounded-full object-cover mb-3 shadow" />
              <h3 className="font-semibold text-lg text-green-900 mb-2">Cactus & Succulent Care</h3>
              <p className="text-gray-700 mb-2">Tips for watering, light, and soil for healthy cacti and succulents.</p>
              <a href="#" className="text-green-700 hover:text-green-900 font-medium text-sm underline underline-offset-2">Learn More →</a>
                </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col items-center hover:shadow-2xl transition">
              <Image src="/images/plants/nursery-1.jpeg" alt="Houseplant Care" width={90} height={90} className="rounded-full object-cover mb-3 shadow" />
              <h3 className="font-semibold text-lg text-green-900 mb-2">Houseplant Care</h3>
              <p className="text-gray-700 mb-2">How to keep your indoor plants thriving all year long.</p>
              <a href="#" className="text-green-700 hover:text-green-900 font-medium text-sm underline underline-offset-2">Learn More →</a>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col items-center hover:shadow-2xl transition">
              <Image src="/images/plants/red japanes maple.jpeg" alt="Tree & Shrub Care" width={90} height={90} className="rounded-full object-cover mb-3 shadow" />
              <h3 className="font-semibold text-lg text-green-900 mb-2">Tree & Shrub Care</h3>
              <p className="text-gray-700 mb-2">Pruning, feeding, and protecting your landscape plants.</p>
              <a href="#" className="text-green-700 hover:text-green-900 font-medium text-sm underline underline-offset-2">Learn More →</a>
            </div>
          </div>
        </section>
        {/* Newsletter Call-to-Action */}
        <section className="bg-green-100 rounded-2xl shadow-lg p-10 mt-20 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-green-900 mb-2">Get Weekly Gardening Tips</h2>
          <p className="text-green-800 mb-4">Subscribe to our newsletter for seasonal gardening advice, plant care tips, and exclusive offers.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400" />
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-green-400 transition">Subscribe</button>
          </form>
        </section>
        </div>
    </main>
  );
} 