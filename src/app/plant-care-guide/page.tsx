import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Plant Care Guide - Expert Gardening Tips & Advice | Adam Hall's Garden Center",
  description: "Expert plant care guide with tips for succulents, trees, shrubs, and garden maintenance. Serving Moreno Valley, Riverside County, and Orange County with professional gardening advice.",
  keywords: "plant care guide, gardening tips, succulent care, tree care, shrub maintenance, garden advice, plant watering, soil care, fertilizer tips, garden maintenance Moreno Valley, plant care Riverside County, gardening advice Orange County",
}

const plantCareCategories = [
  {
    title: "Succulents & Cacti",
    description: "Perfect for California's climate",
    tips: [
      "Water sparingly - only when soil is completely dry",
      "Provide bright, indirect sunlight",
      "Use well-draining soil mix",
      "Avoid overwatering to prevent root rot",
      "Protect from frost in winter months"
    ],
    image: "/images/succulents-care.jpg"
  },
  {
    title: "Trees & Shrubs",
    description: "Foundation plants for your landscape",
    tips: [
      "Plant in the right season (fall/spring)",
      "Water deeply but infrequently",
      "Mulch around base to retain moisture",
      "Prune during dormant season",
      "Fertilize in early spring"
    ],
    image: "/images/trees-care.jpg"
  },
  {
    title: "Flowering Plants",
    description: "Add color to your garden year-round",
    tips: [
      "Deadhead spent flowers regularly",
      "Provide adequate sunlight for blooming",
      "Water at soil level, not on leaves",
      "Fertilize during growing season",
      "Protect from extreme weather"
    ],
    image: "/images/flowers-care.jpg"
  },
  {
    title: "Herbs & Vegetables",
    description: "Fresh from your garden to your table",
    tips: [
      "Plant in rich, well-draining soil",
      "Provide 6-8 hours of sunlight daily",
      "Water consistently, avoid drought stress",
      "Harvest regularly to encourage growth",
      "Use organic fertilizers for edibles"
    ],
    image: "/images/herbs-care.jpg"
  }
]

const seasonalCare = [
  {
    season: "Spring",
    tasks: [
      "Plant new trees and shrubs",
      "Fertilize existing plants",
      "Prune dead or damaged branches",
      "Start vegetable and herb gardens",
      "Apply mulch to retain moisture"
    ]
  },
  {
    season: "Summer",
    tasks: [
      "Water deeply and regularly",
      "Monitor for pests and diseases",
      "Deadhead flowering plants",
      "Harvest vegetables and herbs",
      "Provide shade for sensitive plants"
    ]
  },
  {
    season: "Fall",
    tasks: [
      "Plant spring-blooming bulbs",
      "Divide and transplant perennials",
      "Rake and compost fallen leaves",
      "Prepare garden for winter",
      "Plant cool-season vegetables"
    ]
  },
  {
    season: "Winter",
    tasks: [
      "Protect plants from frost",
      "Water sparingly but don't let dry out",
      "Prune dormant trees and shrubs",
      "Plan next year's garden",
      "Maintain garden tools"
    ]
  }
]

export default function PlantCareGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Plant Care Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert gardening tips and advice from Adam Hall's Garden Center. Learn how to care for 
            succulents, trees, shrubs, and all your garden plants in Moreno Valley, Riverside County, and Orange County.
          </p>
        </div>

        {/* Plant Care Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Plant Care by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plantCareCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Care Guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Seasonal Garden Care
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalCare.map((season, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">{season.season}</h3>
                <ul className="space-y-2">
                  {season.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="text-sm text-gray-700 flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Tips Section */}
        <div className="bg-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Expert Gardening Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Watering Wisdom</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Water deeply but less frequently</li>
                <li>• Check soil moisture before watering</li>
                <li>• Water in the morning to prevent disease</li>
                <li>• Use drip irrigation for efficiency</li>
                <li>• Adjust watering for seasonal changes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Soil & Fertilizer</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Test your soil pH regularly</li>
                <li>• Use organic fertilizers when possible</li>
                <li>• Mulch to retain moisture and nutrients</li>
                <li>• Compost kitchen scraps for natural fertilizer</li>
                <li>• Rotate crops in vegetable gardens</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Pest Management</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Identify pests before treating</li>
                <li>• Use natural pest control methods</li>
                <li>• Encourage beneficial insects</li>
                <li>• Keep garden clean and tidy</li>
                <li>• Monitor plants regularly for issues</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Plant Health</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Choose plants suited to your climate</li>
                <li>• Provide adequate spacing between plants</li>
                <li>• Prune regularly for healthy growth</li>
                <li>• Remove diseased plants promptly</li>
                <li>• Keep garden tools clean and sharp</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Local Climate Considerations */}
        <div className="bg-green-800 text-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Gardening in Southern California
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Climate Considerations</h3>
              <ul className="space-y-2">
                <li>• Hot, dry summers require drought-tolerant plants</li>
                <li>• Mild winters allow year-round gardening</li>
                <li>• Mediterranean climate suits many plant varieties</li>
                <li>• Water conservation is essential</li>
                <li>• Fire-resistant landscaping recommended</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Local Recommendations</h3>
              <ul className="space-y-2">
                <li>• Native California plants thrive naturally</li>
                <li>• Succulents and cacti are perfect choices</li>
                <li>• Citrus trees grow well in the region</li>
                <li>• Lavender and rosemary are excellent herbs</li>
                <li>• Consider xeriscaping for water efficiency</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Need Expert Advice?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Visit Adam Hall's Garden Center for personalized plant care advice and quality garden supplies.
          </p>
          <div className="space-x-4">
            <a 
              href="/contact" 
              className="inline-block bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Get Expert Advice
            </a>
            <a 
              href="/shop" 
              className="inline-block border-2 border-green-800 text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors"
            >
              Shop Garden Supplies
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
