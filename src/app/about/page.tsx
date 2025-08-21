import Image from 'next/image'

export const metadata = {
  title: "About Us | Adam Hall's Garden Center",
  description: "Learn about the story, mission, and team behind Adam Hall's Garden Center—your trusted source for quality plants and expert gardening advice in Moreno Valley.",
  openGraph: {
    title: "About Us | Adam Hall's Garden Center",
    description: "Learn about the story, mission, and team behind Adam Hall's Garden Center—your trusted source for quality plants and expert gardening advice in Moreno Valley.",
    url: 'https://adamhalls.com/about',
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-green-900 mb-6">Our Story</h1>
        <p className="text-lg text-gray-700 mb-8">
          For nearly 100 years, Adam Hall&apos;s Garden Center has been dedicated to
          growing the healthiest, most beautiful plants for every garden. Our
          passion for plants and people is at the heart of everything we do. We
          blend art and science, using sustainable practices and a craftsman&apos;s
          touch to help you grow beautifully.
        </p>
        <h2 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-8">
          At Adam Halls Garden Center, our mission is to help people create beautiful, sustainable outdoor spaces that bring joy and connection to nature. We believe in:
        </p>
        <ul className="text-gray-700 mb-8 list-disc list-inside space-y-2">
          <li>Providing high-quality plants and products</li>
          <li>Offering expert gardening advice and education</li>
          <li>Supporting sustainable gardening practices</li>
          <li>Building strong community relationships</li>
        </ul>
        <h2 className="text-2xl font-bold text-green-800 mb-4">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Image src="/images/logo.jpg" alt="Adam Hall" width={100} height={100} className="rounded-full mb-2 object-cover" />
            <h3 className="font-semibold text-green-900">Adam Hall</h3>
            <p className="text-green-700 text-sm">Founder & Head Grower</p>
            <p className="text-green-600 text-xs">(951) 538-2730</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src="/images/logo.jpg" alt="Taylor Hall" width={100} height={100} className="rounded-full mb-2 object-cover" />
            <h3 className="font-semibold text-green-900">Taylor Hall</h3>
            <p className="text-green-700 text-sm">Customer Service Manager & Design</p>
            <p className="text-green-600 text-xs">(951) 250-5117</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src="/images/logo1.jpeg" alt="Devon Dourseoua" width={100} height={100} className="rounded-full mb-2 object-cover" />
            <h3 className="font-semibold text-green-900">Devon Dourseoua</h3>
            <p className="text-green-700 text-sm">Sales Manager & Head Plant Specialist</p>
            <p className="text-green-600 text-xs">(951) 704-3370</p>
          </div>
        </div>
      </div>
    </main>
  )
} 