'use client';

export default function GardenPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">Garden Center</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-6">Visit Our Garden Center</h2>
            <p className="text-lg text-gray-700 mb-4">
              Experience the beauty of our garden center in person. Browse our extensive collection
              of plants, get expert advice, and find everything you need for your garden.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Our knowledgeable staff is always ready to help you create the garden of your dreams.
            </p>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4">Location & Hours</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="font-semibold text-green-800 mr-3">Address:</span>
                  <span className="text-gray-700">28095 Alessandro Blvd, Moreno Valley, CA 92555</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-green-800 mr-3">Phone:</span>
                  <a href="tel:951-674-9422" className="text-green-600 hover:text-green-800">951-674-9422</a>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-green-800 mb-2">Store Hours:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>Monday - Sunday: 8:00 AM - 6:00 PM</li>
                    <li className="text-green-600 text-sm">*After time changes: 8:00 AM - 5:00 PM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-4">Find Us</h3>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                             <iframe
                 title="Adam Hall's Garden Center Location"
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.123456789012!2d-117.2345678901234!3d33.91234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db8b1234567890%3A0x1234567890abcdef!2s28095%20Alessandro%20Blvd%2C%20Moreno%20Valley%2C%20CA%2092555!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus"
                 width="100%"
                 height="400"
                 style={{ border: 0 }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 className="w-full"
               ></iframe>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">What You'll Find at Our Garden Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-700 text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Plants & Flowers</h3>
              <p className="text-gray-700">From annuals to perennials, succulents to trees, we have a wide variety of plants for every garden.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-700 text-2xl">🛠️</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Garden Supplies</h3>
              <p className="text-gray-700">Tools, soil, fertilizers, pots, and everything else you need to maintain a beautiful garden.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-700 text-2xl">💡</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Expert Advice</h3>
              <p className="text-gray-700">Our knowledgeable staff is here to help with plant selection, care tips, and garden design.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 