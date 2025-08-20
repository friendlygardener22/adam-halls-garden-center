'use client';

import React, { useState } from 'react';
import Image from 'next/image'
import Newsletter from '@/components/Newsletter'
import Testimonials from '@/components/Testimonials'
import { useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  images?: string[];
  category?: string;
};

const plantFallbackImages = [
  '/images/plants/Bearded iris.jpeg',
  '/images/plants/bouganvillia.jpeg',
  '/images/plants/nursery-1.jpeg',
  '/images/plants/Yellow barrel cactus.jpeg',
  '/images/plants/red japanes maple.jpeg',
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Featured categories
  const categories = [
    { key: 'plants', label: 'Plants', image: '/images/categories/plants.jpg' },
    { key: 'tools', label: 'Tools', image: '/images/categories/tools.jpg' },
    { key: 'supplies', label: 'Supplies', image: '/images/categories/supplies.jpg' },
  ];

  // Featured products (first 4 or those marked featured)
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-100 via-green-50 to-white py-24 overflow-hidden">
        {/* Decorative Leaf SVG */}
        <svg className="absolute left-0 top-0 w-48 h-48 opacity-20 -z-10" viewBox="0 0 200 200" fill="none">
          <path d="M100 180C140 160 180 120 180 60C180 20 140 20 100 20C60 20 20 20 20 60C20 120 60 160 100 180Z" fill="#A7F3D0" />
        </svg>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Image src="/images/logo.jpg" alt="Adam Hall's Garden Center Logo" width={120} height={120} className="rounded-full shadow-lg border-4 border-green-200" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-6 drop-shadow-lg" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
              Welcome to Adam Hall's Garden Center
            </h1>
            <p className="text-2xl text-green-800 mb-10 font-medium">
              Your one-stop shop for all your gardening needs.<br />From plants to tools, we've got everything to help your garden thrive.
            </p>
            <a
              href="/shop"
              className="inline-block bg-green-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-green-700 focus:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 text-xl font-semibold transition-all"
            >
              🌱 Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Plant of the Month Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Plant of the Month</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image 
                    src="/images/plants/Bearded iris.jpeg" 
                    alt="Plant of the Month" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Bearded Iris</h3>
                  <p className="text-gray-600 mb-4">
                    This stunning perennial brings elegance to any garden with its distinctive blooms and sword-like foliage. Perfect for borders and cutting gardens.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-sun text-yellow-500 mr-2"></i>
                      <span>Full sun to partial shade</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-tint text-blue-500 mr-2"></i>
                      <span>Moderate water needs</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-ruler-vertical text-green-500 mr-2"></i>
                      <span>Grows 2-3 feet tall</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a href="/shop/plants/bearded-iris" className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
                      Shop Now
                    </a>
                    <a href="/plant-care/bearded-iris" className="inline-block text-green-600 hover:text-green-700">
                      Care Guide →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map(cat => {
              const fallbackImage = plantFallbackImages[Math.floor(Math.random() * plantFallbackImages.length)];
              return (
                <div key={cat.key} className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-200 overflow-hidden border border-green-100">
                  <div className="relative h-48">
                    <Image src={cat.image || fallbackImage} alt={cat.label} fill className="object-cover" onError={e => { (e.currentTarget as HTMLImageElement).src = fallbackImage; }} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{cat.label}</h3>
                    <p className="text-gray-600 mb-4">Explore our {cat.label.toLowerCase()} selection.</p>
                    <a href={`/shop/${cat.key}`} className="text-green-600 hover:text-green-700 rounded-full shadow hover:bg-green-700 focus:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition">Browse {cat.label} →</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {featuredProducts.map(product => {
                const fallbackImage = plantFallbackImages[Math.floor(Math.random() * plantFallbackImages.length)];
                const productImage = product.images?.[0] || fallbackImage;
                return (
                  <div key={product.id} className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-200 overflow-hidden border border-green-100">
                    <div className="relative h-48">
                      <Image src={productImage} alt={product.name} fill className="object-cover" onError={e => { (e.currentTarget as HTMLImageElement).src = fallbackImage; }} />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 text-green-900 text-lg group-hover:underline">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.description || 'Beautiful plant for your garden.'}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-green-700">${product.price?.toFixed(2) || 'N/A'}</span>
                        <button className="btn btn-primary text-sm rounded-full shadow hover:bg-green-700 focus:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Garden Advice Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Garden Advice</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Article */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden md:col-span-2">
              <div className="relative h-64">
                <Image src="/images/garden-advice/featured.jpg" alt="Spring Garden Tips" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Spring Garden Preparation Guide</h3>
                <p className="text-gray-600 mb-4">Get your garden ready for spring with our comprehensive guide. Learn about soil preparation, early planting, and essential maintenance tasks to ensure a successful growing season.</p>
                <a href="/garden-advice" className="text-green-600 hover:text-green-700 rounded-full shadow hover:bg-green-700 focus:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition">Read Full Article →</a>
              </div>
            </div>
            {/* Quick Tips */}
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden p-4">
                <h4 className="font-semibold mb-2">Composting 101</h4>
                <p className="text-gray-600 text-sm mb-2">Learn how to create nutrient-rich compost for your garden using kitchen scraps and yard waste.</p>
                <a href="/garden-advice/composting" className="text-green-600 hover:text-green-700 rounded-full shadow hover:bg-green-700 focus:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition text-sm">Read Article →</a>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden p-4">
                <h4 className="font-semibold mb-2">Natural Pest Control</h4>
                <p className="text-gray-600 text-sm mb-2">Discover eco-friendly ways to protect your plants from common garden pests.</p>
                <a href="/garden-advice/pest-control" className="text-green-600 hover:text-green-700 rounded-full shadow hover:bg-green-700 focus:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition text-sm">Read Article →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garden Events Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Garden Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image 
                  src="/images/plants/Bearded iris.jpeg" 
                  alt="Garden Workshop" 
                  fill 
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/plants/Bearded iris.jpeg';
                  }}
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  Workshop
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <i className="far fa-calendar mr-2"></i>
                  <span>March 15, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Spring Pruning Workshop</h3>
                <p className="text-gray-600 mb-4">Learn essential pruning techniques for your spring garden. Perfect for beginners!</p>
                <a href="/events/spring-pruning" className="text-green-600 hover:text-green-700 font-medium">Register Now →</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image 
                  src="/images/plants/bouganvillia.jpeg" 
                  alt="Garden Tour" 
                  fill 
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/plants/Bearded iris.jpeg';
                  }}
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Tour
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <i className="far fa-calendar mr-2"></i>
                  <span>March 22, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Spring Garden Tour</h3>
                <p className="text-gray-600 mb-4">Join us for a guided tour of our spring gardens and learn about seasonal plants.</p>
                <a href="/events/garden-tour" className="text-green-600 hover:text-green-700 font-medium">Book Tour →</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image 
                  src="/images/plants/Yellow barrel cactus.jpeg" 
                  alt="Kids Workshop" 
                  fill 
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/plants/Bearded iris.jpeg';
                  }}
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  Kids
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <i className="far fa-calendar mr-2"></i>
                  <span>March 29, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Kids Planting Day</h3>
                <p className="text-gray-600 mb-4">A fun, hands-on workshop for children to learn about plants and gardening.</p>
                <a href="/events/kids-planting" className="text-green-600 hover:text-green-700 font-medium">Sign Up →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Newsletter
            title="Stay Updated with Gardening Tips"
            description="Subscribe to our newsletter for seasonal gardening advice, exclusive offers, and the latest arrivals."
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Be Inspired Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Be Inspired</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
              <Image src="/images/plants/Bearded iris.jpeg" alt="Garden Design" width={120} height={80} className="rounded-lg mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-2">Garden Design Ideas</h3>
              <p className="text-gray-600 mb-4">Get inspired with landscape plans, color palettes, and expert tips for every season.</p>
              <a href="/garden-advice" className="text-green-600 hover:text-green-700 font-medium">Explore Ideas →</a>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
              <Image src="/images/plants/bouganvillia.jpeg" alt="Plant Care" width={120} height={80} className="rounded-lg mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-2">Plant Care Guides</h3>
              <p className="text-gray-600 mb-4">Learn how to care for your favorite plants with our easy-to-follow guides.</p>
              <a href="/plant-care" className="text-green-600 hover:text-green-700 font-medium">Read Guides →</a>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
              <Image src="/images/plants/Yellow barrel cactus.jpeg" alt="Seasonal Tips" width={120} height={80} className="rounded-lg mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-2">Seasonal Tips</h3>
              <p className="text-gray-600 mb-4">Stay ahead with timely advice for planting, pruning, and garden care all year round.</p>
              <a href="/garden-advice" className="text-green-600 hover:text-green-700 font-medium">See Tips →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Colors Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Colors: Peach & Pink</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
              <Image src="/images/plants/red japanes maple.jpeg" alt="Peach Rose" width={120} height={80} className="rounded-lg mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-2">Peach Rose</h3>
              <p className="text-gray-600 mb-4">Soft peach blooms are trending in gardens everywhere. Try a peach rose for a romantic touch.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
              <Image src="/images/plants/Bearded iris.jpeg" alt="Pink Coneflower" width={120} height={80} className="rounded-lg mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-2">Pink Coneflower</h3>
              <p className="text-gray-600 mb-4">Pink blooms are in! Coneflowers add color and attract pollinators to your garden.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
              <Image src="/images/plants/bouganvillia.jpeg" alt="Apricot Ice Plant" width={120} height={80} className="rounded-lg mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-2">Apricot Ice Plant</h3>
              <p className="text-gray-600 mb-4">Try apricot and pastel tones for a fresh, modern look in your beds and borders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality & Passion</h3>
              <p className="text-gray-600">
                We are craftsmen, blending art and science to grow the healthiest, most beautiful plants for your garden. Our passion for plants and people is at the heart of everything we do.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Advice</h3>
              <p className="text-gray-600">
                Our team is always ready to help you grow confidently, with advice and support for every step of your gardening journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
              <p className="text-gray-600">
                We grow responsibly, using nature-friendly methods and supporting our local community with every plant we nurture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Info Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <iframe
                title="Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.123456789012!2d-117.2345678901234!3d33.91234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db8b1234567890%3A0x1234567890abcdef!2s28095%20Alessandro%20Blvd%2C%20Moreno%20Valley%2C%20CA%2092555!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded-lg shadow-md"
              ></iframe>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Adam Hall's Garden Center</h3>
              <p className="mb-2">28095 Alessandro Blvd, Moreno Valley, CA</p>
              <p className="mb-2">Phone: 951-674-9422</p>
              <p className="mb-2">Hours: Daily 8am-6pm (8am-5pm after time changes)</p>
              <a href="/contact" className="text-green-600 hover:text-green-700">Contact Us →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg italic mb-4">"The best garden center in town! The staff is knowledgeable and the plant selection is amazing."</p>
              <span className="font-semibold text-green-700">- Emily R.</span>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg italic mb-4">"I always find what I need for my garden projects. Highly recommend Adam Hall's!"</p>
              <span className="font-semibold text-green-700">- Mark T.</span>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-lg italic mb-4">"Great advice and healthy plants. My garden has never looked better!"</p>
              <span className="font-semibold text-green-700">- Lisa M.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 