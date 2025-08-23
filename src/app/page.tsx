import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: "Adam Hall's Garden Center - Plants & Garden Supplies | Moreno Valley, CA",
  description: "Visit Adam Hall's Garden Center in Moreno Valley for quality plants, garden supplies, and expert advice. Serving Riverside County, Orange County, and Los Angeles area. Open daily 8am-6pm.",
  openGraph: {
    title: "Adam Hall's Garden Center - Plants & Garden Supplies | Moreno Valley, CA",
    description: "Visit Adam Hall's Garden Center in Moreno Valley for quality plants, garden supplies, and expert advice. Serving Riverside County, Orange County, and Los Angeles area. Open daily 8am-6pm.",
    url: 'https://adamhalls.com',
    siteName: "Adam Hall's Garden Center",
    images: [
      {
        url: '/images/logo.jpg',
        width: 1200,
        height: 630,
        alt: "Adam Hall's Garden Center - Moreno Valley Plant Nursery",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Image 
                src="/images/logo.jpg" 
                alt="Adam Hall&apos;s Garden Center Logo" 
                width={120} 
                height={120} 
                className="rounded-full shadow-lg border-4 border-green-200" 
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-6 drop-shadow-lg" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
              Welcome to Adam Hall&apos;s Garden Center
            </h1>
            <p className="text-2xl text-green-800 mb-10 font-medium">
              Your Premier Destination for Quality Plants & Expert Gardening Advice
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/shop" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Shop Plants
              </Link>
              <Link 
                href="/garden" 
                className="bg-white hover:bg-green-50 text-green-700 font-bold py-4 px-8 rounded-full text-lg border-2 border-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Visit Garden Center
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Why Choose Adam Hall&apos;s?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-leaf text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">Quality Plants</h3>
                <p className="text-gray-600">Carefully selected plants grown with sustainable practices</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-truck text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">Local Delivery</h3>
                <p className="text-gray-600">Fast delivery throughout Moreno Valley and surrounding areas</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-user-tie text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">Expert Advice</h3>
                <p className="text-gray-600">Professional gardening guidance from our experienced team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Featured Plants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Image 
                  src="/images/plants/Bearded iris.jpeg" 
                  alt="Bearded Iris" 
                  width={400} 
                  height={300} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Bearded Iris</h3>
                  <p className="text-gray-600 mb-4">Beautiful spring-blooming perennials perfect for borders</p>
                  <Link 
                    href="/shop/plants" 
                    className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Image 
                  src="/images/plants/bouganvillia.jpeg" 
                  alt="Bouganvillia" 
                  width={400} 
                  height={300} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Bouganvillia</h3>
                  <p className="text-gray-600 mb-4">Vibrant flowering vines for stunning garden displays</p>
                  <Link 
                    href="/shop/plants" 
                    className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Image 
                  src="/images/plants/Yellow barrel cactus.jpeg" 
                  alt="Yellow Barrel Cactus" 
                  width={400} 
                  height={300} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Yellow Barrel Cactus</h3>
                  <p className="text-gray-600 mb-4">Drought-resistant succulents for low-maintenance gardens</p>
                  <Link 
                    href="/shop/plants" 
                    className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/shop" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                View All Plants
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-6">
                  For nearly 100 years, Adam Hall&apos;s Garden Center has been dedicated to growing the healthiest, most beautiful plants for every garden. Our passion for plants and people is at the heart of everything we do.
                </p>
                <p className="text-gray-700 mb-6">
                  We blend art and science, using sustainable practices and a craftsman&apos;s touch to help you grow beautifully. Visit us at our beautiful location and discover why we&apos;re the trusted choice for gardeners throughout the Inland Empire.
                </p>
                <Link 
                  href="/about" 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  Learn More About Us
                </Link>
              </div>
              <div className="relative">
                <Image 
                  src="/images/logo.jpg" 
                  alt="Adam Hall&apos;s Garden Center" 
                  width={500} 
                  height={400} 
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-900 mb-6">Visit Us Today</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">Adam Hall&apos;s Garden Center</h3>
                  <p className="mb-2">28095 Alessandro Blvd</p>
                  <p className="mb-2">Moreno Valley, CA 92553</p>
                  <p className="mb-4">Phone: (951) 674-9422</p>
                  <p className="text-green-600 font-semibold">Open Daily: 8:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Get Expert Advice</h3>
                  <p className="text-gray-600 mb-4">Our knowledgeable staff is ready to help you create the garden of your dreams.</p>
                  <Link 
                    href="/contact" 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 