import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Garden Center Service Areas - Moreno Valley, Riverside, Orange County | Adam Hall's Garden Center",
  description: "Adam Hall's Garden Center serves Moreno Valley, Riverside, Orange County, Los Angeles, Corona, Temecula, Murrieta, Lake Elsinore, and Perris. Local plant delivery and garden supplies.",
  keywords: "garden center Moreno Valley, plant nursery Riverside, garden supplies Orange County, plants Los Angeles, nursery Corona, garden center Temecula, plants Murrieta, garden supplies Lake Elsinore, nursery Perris, local plant delivery, garden center near me",
}

const serviceAreas = [
  {
    city: "Moreno Valley",
    description: "Our home base! Serving Moreno Valley with the best plants, garden supplies, and expert advice. Visit us at 28095 Alessandro Blvd.",
    services: ["Plant Sales", "Garden Supplies", "Local Delivery", "Plant Care Advice"],
    distance: "0 miles",
    delivery: "Free delivery within city limits"
  },
  {
    city: "Riverside",
    description: "Serving Riverside County with quality plants and garden supplies. Expert advice for your Riverside garden.",
    services: ["Plant Sales", "Garden Supplies", "Delivery", "Landscaping Consultation"],
    distance: "15 miles",
    delivery: "Delivery available"
  },
  {
    city: "Orange County",
    description: "Bringing the best plants and garden supplies to Orange County. From succulents to trees, we have everything for your OC garden.",
    services: ["Plant Sales", "Garden Supplies", "Special Orders", "Expert Advice"],
    distance: "25-45 miles",
    delivery: "Special delivery arrangements"
  },
  {
    city: "Los Angeles",
    description: "Serving the greater Los Angeles area with premium plants and garden supplies. Perfect for LA gardens and landscaping projects.",
    services: ["Plant Sales", "Garden Supplies", "Bulk Orders", "Landscaping Consultation"],
    distance: "50-70 miles",
    delivery: "Bulk delivery available"
  },
  {
    city: "Corona",
    description: "Your local garden center serving Corona with quality plants and garden supplies. Expert advice for Corona gardens.",
    services: ["Plant Sales", "Garden Supplies", "Local Delivery", "Plant Care"],
    distance: "20 miles",
    delivery: "Delivery available"
  },
  {
    city: "Temecula",
    description: "Serving Temecula with beautiful plants and garden supplies. Perfect for Temecula's unique climate and soil conditions.",
    services: ["Plant Sales", "Garden Supplies", "Climate-Specific Plants", "Expert Advice"],
    distance: "30 miles",
    delivery: "Delivery available"
  },
  {
    city: "Murrieta",
    description: "Quality plants and garden supplies for Murrieta gardens. Expert advice for your Murrieta landscaping needs.",
    services: ["Plant Sales", "Garden Supplies", "Local Delivery", "Landscaping Help"],
    distance: "25 miles",
    delivery: "Delivery available"
  },
  {
    city: "Lake Elsinore",
    description: "Serving Lake Elsinore with garden supplies and plants perfect for the local climate. Expert advice for Lake Elsinore gardens.",
    services: ["Plant Sales", "Garden Supplies", "Climate Advice", "Plant Care"],
    distance: "18 miles",
    delivery: "Delivery available"
  },
  {
    city: "Perris",
    description: "Your local garden center in Perris. Quality plants and garden supplies with expert advice for Perris gardens.",
    services: ["Plant Sales", "Garden Supplies", "Local Delivery", "Expert Advice"],
    distance: "12 miles",
    delivery: "Free delivery within city limits"
  }
]

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Service Areas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Adam Hall's Garden Center proudly serves Moreno Valley, Riverside County, Orange County, 
            Los Angeles, and surrounding areas with quality plants, garden supplies, and expert advice.
          </p>
        </div>

        {/* Service Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {serviceAreas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-green-800 mb-3">{area.city}</h3>
              <p className="text-gray-600 mb-4">{area.description}</p>
              
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  Distance: {area.distance}
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Services:</h4>
                <ul className="space-y-1">
                  {area.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="text-sm text-gray-600 flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-green-700 font-medium">{area.delivery}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-green-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">
            Whether you're in Moreno Valley, Riverside, Orange County, or anywhere in between, 
            we're here to help with all your gardening needs.
          </p>
          <div className="space-x-4">
            <a 
              href="/shop" 
              className="inline-block bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Plants
            </a>
            <a 
              href="/contact" 
              className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Local SEO Content */}
        <div className="mt-12 bg-white rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Adam Hall's Garden Center?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Local Expertise</h3>
              <p className="text-gray-600 mb-4">
                With over 90 years of experience serving Southern California, we understand the unique 
                climate and soil conditions of Moreno Valley, Riverside County, Orange County, and Los Angeles.
              </p>
              
              <h3 className="text-xl font-semibold text-green-800 mb-3">Quality Plants</h3>
              <p className="text-gray-600 mb-4">
                We grow and source only the highest quality plants, ensuring they thrive in your local 
                environment. From succulents to trees, every plant is carefully selected.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Expert Advice</h3>
              <p className="text-gray-600 mb-4">
                Our knowledgeable staff provides expert advice on plant care, landscaping, and garden 
                maintenance. We're here to help your garden succeed.
              </p>
              
              <h3 className="text-xl font-semibold text-green-800 mb-3">Local Delivery</h3>
              <p className="text-gray-600 mb-4">
                We offer local delivery services to make it easy to get the plants and supplies you need. 
                Contact us to arrange delivery to your area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
