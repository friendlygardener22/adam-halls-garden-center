'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Home Gardener",
    image: "/images/plants/Bearded iris.jpeg",
    content: "The variety of plants and expert advice at Adam Hall's Garden Center is unmatched. My garden has never looked better!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Landscape Designer",
    image: "/images/plants/bouganvillia.jpeg",
    content: "As a professional landscaper, I rely on Adam Hall's for quality plants and reliable service. Their wholesale program is excellent.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Community Garden Coordinator",
    image: "/images/plants/Yellow barrel cactus.jpeg",
    content: "The workshops and community events are fantastic. I've learned so much about sustainable gardening practices.",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading testimonials from an API
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load testimonials. Please try again later.');
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 relative animate-pulse">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 relative">
            <div className="flex items-center mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/plants/Bearded iris.jpeg'; // Fallback image
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{testimonials[activeIndex].name}</h3>
                <p className="text-gray-600">{testimonials[activeIndex].role}</p>
              </div>
            </div>
            <div className="mb-4">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <p className="text-gray-700 text-lg italic mb-6">"{testimonials[activeIndex].content}"</p>
            <div className="flex justify-between items-center">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full hover:bg-green-100 transition"
                aria-label="Previous testimonial"
              >
                <i className="fas fa-chevron-left text-green-600"></i>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      index === activeIndex ? 'bg-green-600' : 'bg-green-200'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full hover:bg-green-100 transition"
                aria-label="Next testimonial"
              >
                <i className="fas fa-chevron-right text-green-600"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 