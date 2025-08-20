'use client';

import Link from 'next/link';

// Mock blog post data
const blogPosts = [
  {
    slug: 'spring-garden-prep',
    title: 'Spring Garden Prep: What to Do Now',
    excerpt: 'Get your garden ready for spring with these essential tips for soil, planting, and maintenance.',
    date: '2024-03-10',
    author: 'Adam Hall',
  },
  {
    slug: 'watering-wisdom',
    title: 'Watering Wisdom: How Much is Enough?',
    excerpt: 'Learn how to water your plants the right way for healthy growth and fewer problems.',
    date: '2024-04-02',
    author: 'Garden Team',
  },
  {
    slug: 'indoor-plant-care',
    title: 'Indoor Plant Care for Beginners',
    excerpt: 'A simple guide to keeping your indoor plants happy, healthy, and thriving all year long.',
    date: '2024-04-15',
    author: 'Samantha Green',
  },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Garden Advice Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.slug} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  <Link href={`/garden-advice/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 