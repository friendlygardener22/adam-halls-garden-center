import { notFound } from 'next/navigation';

// Mock blog post data (should match the index page)
const blogPosts = [
  {
    slug: 'spring-garden-prep',
    title: 'Spring Garden Prep: What to Do Now',
    content: `
      <p>Spring is the perfect time to prepare your garden for a season of growth. Here are some essential steps:</p>
      <ul>
        <li><strong>Clean up:</strong> Remove debris, dead plants, and weeds from your beds.</li>
        <li><strong>Soil prep:</strong> Loosen soil and add compost or organic matter.</li>
        <li><strong>Plan your planting:</strong> Choose plants suited to your zone and sunlight.</li>
        <li><strong>Prune:</strong> Trim shrubs and trees as needed.</li>
        <li><strong>Mulch:</strong> Apply mulch to retain moisture and suppress weeds.</li>
      </ul>
      <p>Visit our shop for seeds, soil, and tools to get started!</p>
    `,
    date: '2024-03-10',
    author: 'Adam Hall',
  },
  {
    slug: 'watering-wisdom',
    title: 'Watering Wisdom: How Much is Enough?',
    content: `
      <p>Proper watering is key to healthy plants. Here are some tips:</p>
      <ul>
        <li>Check soil moisture before watering—overwatering is a common mistake.</li>
        <li>Water early in the morning or late in the afternoon.</li>
        <li>Use mulch to help retain soil moisture.</li>
        <li>Group plants with similar water needs together.</li>
      </ul>
      <p>Need help? Ask our staff for advice on your specific plants!</p>
    `,
    date: '2024-04-02',
    author: 'Garden Team',
  },
  {
    slug: 'indoor-plant-care',
    title: 'Indoor Plant Care for Beginners',
    content: `
      <p>Indoor plants brighten your home and purify the air. To keep them thriving:</p>
      <ul>
        <li>Place in bright, indirect light unless otherwise specified.</li>
        <li>Let the top inch of soil dry before watering.</li>
        <li>Wipe leaves to remove dust and allow for better photosynthesis.</li>
        <li>Fertilize monthly during the growing season.</li>
      </ul>
      <p>Explore our selection of easy-care indoor plants in the shop!</p>
    `,
    date: '2024-04-15',
    author: 'Samantha Green',
  },
];

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-400 mb-8">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <article className="prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-8">
          <a href="/garden-advice/blog" className="text-green-600 hover:text-green-700">← Back to Blog</a>
        </div>
      </div>
    </main>
  );
} 