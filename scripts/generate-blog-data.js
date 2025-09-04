const fs = require('fs');
const path = require('path');

// Sample blog categories
const categories = [
  {
    id: 'plant-care',
    name: 'Plant Care',
    description: 'Tips and guides for keeping your plants healthy',
    color: '#10B981',
    icon: '🌱'
  },
  {
    id: 'gardening-tips',
    name: 'Gardening Tips',
    description: 'General gardening advice and best practices',
    color: '#3B82F6',
    icon: '🌿'
  },
  {
    id: 'seasonal-guides',
    name: 'Seasonal Guides',
    description: 'What to plant and do in each season',
    color: '#F59E0B',
    icon: '🍂'
  },
  {
    id: 'indoor-plants',
    name: 'Indoor Plants',
    description: 'Care and styling for houseplants',
    color: '#8B5CF6',
    icon: '🏠'
  },
  {
    id: 'outdoor-gardens',
    name: 'Outdoor Gardens',
    description: 'Landscaping and outdoor garden design',
    color: '#06B6D4',
    icon: '🌺'
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    description: 'Eco-friendly gardening practices',
    color: '#84CC16',
    icon: '♻️'
  }
];

// Sample blog posts
const samplePosts = [
  {
    id: 'post-1',
    title: 'Essential Spring Planting Guide for Beginners',
    slug: 'essential-spring-planting-guide-beginners',
    excerpt: 'Get your garden off to a great start with our comprehensive spring planting guide. Learn when to plant, what to plant, and how to care for your new seedlings.',
    content: `Spring is the perfect time to start your gardening journey! As the weather warms up and the days get longer, your garden is ready for new life.

## When to Start Planting

The best time to start planting depends on your location and the specific plants you want to grow. Generally, you can begin planting:
- Hardy vegetables: 2-4 weeks before the last frost
- Tender vegetables: After the last frost
- Annual flowers: After the last frost
- Perennials: Early spring or fall

## What to Plant in Spring

### Vegetables
- **Early Spring**: Peas, spinach, lettuce, radishes
- **Mid Spring**: Carrots, beets, broccoli, cabbage
- **Late Spring**: Tomatoes, peppers, cucumbers, beans

### Flowers
- **Early Spring**: Pansies, violas, snapdragons
- **Mid Spring**: Marigolds, zinnias, cosmos
- **Late Spring**: Sunflowers, dahlias, gladiolus

## Essential Tools You'll Need

1. **Garden trowel** - For digging small holes
2. **Hand rake** - For leveling soil and removing debris
3. **Watering can** - For gentle watering of seedlings
4. **Garden gloves** - To protect your hands
5. **Plant markers** - To identify your plants

## Step-by-Step Planting Process

1. **Prepare the soil** - Remove weeds and loosen the soil
2. **Add compost** - Mix in organic matter for nutrients
3. **Create planting holes** - Make holes appropriate for your seeds/seedlings
4. **Plant carefully** - Place seeds or seedlings at the right depth
5. **Water gently** - Give your new plants a good drink
6. **Mulch** - Add a layer of mulch to retain moisture

## Common Mistakes to Avoid

- **Planting too early** - Wait for the right soil temperature
- **Overwatering** - Let the soil dry slightly between waterings
- **Planting too deep** - Follow the depth guidelines on seed packets
- **Ignoring spacing** - Give plants room to grow

## Caring for Your Spring Garden

- **Water regularly** - Keep soil consistently moist but not soggy
- **Fertilize appropriately** - Use balanced fertilizer for most plants
- **Monitor for pests** - Check plants regularly for signs of damage
- **Thin seedlings** - Remove extra plants to give others room to grow

Remember, gardening is a learning process. Don't be discouraged if some plants don't make it - every gardener has failures. The important thing is to keep trying and learning from your experiences.

Happy planting! 🌱`,
    categoryId: 'seasonal-guides',
    tags: ['spring', 'planting', 'beginners', 'vegetables', 'flowers'],
    author: 'Garden Expert',
    status: 'published',
    publishDate: '2024-03-15T09:00:00.000Z',
    featuredImage: '/images/blog/spring-planting.jpg',
    seo: {
      title: 'Essential Spring Planting Guide for Beginners - Adam Halls Garden Center',
      description: 'Learn when and what to plant in spring with our comprehensive guide. Perfect for beginner gardeners!',
      keywords: ['spring planting', 'gardening guide', 'beginner gardening', 'what to plant in spring']
    },
    readingTime: 8,
    wordCount: 1200,
    views: 245,
    likes: 18,
    comments: []
  },
  {
    id: 'post-2',
    title: '5 Easy Houseplants That Are Impossible to Kill',
    slug: 'easy-houseplants-impossible-kill',
    excerpt: 'Looking for low-maintenance indoor plants? These five houseplants are perfect for beginners and busy people who want greenery without the hassle.',
    content: `If you're new to indoor gardening or just don't have a lot of time to care for plants, you need some foolproof options. These five houseplants are known for their resilience and ability to thrive even with minimal care.

## 1. Snake Plant (Sansevieria trifasciata)

**Why it's impossible to kill:**
- Tolerates low light conditions
- Can go weeks without water
- Thrives on neglect
- Purifies indoor air

**Care requirements:**
- Water: Every 2-3 weeks (let soil dry completely)
- Light: Low to bright indirect light
- Temperature: 60-85°F (15-29°C)
- Fertilizer: Optional, every 6 months

**Perfect for:** Bedrooms, offices, low-light areas

## 2. ZZ Plant (Zamioculcas zamiifolia)

**Why it's impossible to kill:**
- Extremely drought-tolerant
- Grows in any light condition
- Resistant to pests and diseases
- Stores water in its rhizomes

**Care requirements:**
- Water: Every 3-4 weeks
- Light: Low to bright indirect light
- Temperature: 65-75°F (18-24°C)
- Fertilizer: Not necessary

**Perfect for:** Dark corners, busy households

## 3. Pothos (Epipremnum aureum)

**Why it's impossible to kill:**
- Adapts to any light level
- Forgiving of overwatering and underwatering
- Grows quickly and easily
- Can be propagated from cuttings

**Care requirements:**
- Water: When top inch of soil is dry
- Light: Low to bright indirect light
- Temperature: 65-85°F (18-29°C)
- Fertilizer: Monthly during growing season

**Perfect for:** Hanging baskets, shelves, climbing up walls

## 4. Spider Plant (Chlorophytum comosum)

**Why it's impossible to kill:**
- Produces plantlets (spiderettes) that can be propagated
- Tolerates a wide range of conditions
- Self-repairing if damaged
- Great air purifier

**Care requirements:**
- Water: When soil feels dry
- Light: Medium to bright indirect light
- Temperature: 60-75°F (15-24°C)
- Fertilizer: Monthly during spring and summer

**Perfect for:** Hanging baskets, tabletops, gift-giving

## 5. Chinese Evergreen (Aglaonema)

**Why it's impossible to kill:**
- Thrives in low light
- Tolerates irregular watering
- Beautiful variegated leaves
- Slow-growing, so it won't outgrow its space quickly

**Care requirements:**
- Water: When top soil is dry
- Light: Low to medium indirect light
- Temperature: 65-80°F (18-27°C)
- Fertilizer: Every 2-3 months

**Perfect for:** Offices, bedrooms, low-light areas

## General Tips for Success

Even with these hardy plants, following these basic principles will ensure they thrive:

1. **Don't overwater** - Most houseplants die from too much water, not too little
2. **Use well-draining soil** - Regular potting soil mixed with perlite works well
3. **Choose the right pot size** - Too big pots can lead to overwatering
4. **Observe your plants** - They'll tell you what they need through their appearance
5. **Be patient** - Plants grow slowly, so don't expect instant results

## When to Worry

Even these tough plants can have issues. Watch for:
- **Yellow leaves** - Usually means overwatering
- **Brown tips** - Often indicates underwatering or low humidity
- **Drooping** - Check soil moisture
- **No new growth** - May need more light or fertilizer

## The Bottom Line

These five houseplants are perfect for beginners because they're forgiving of common mistakes and can adapt to various growing conditions. Start with one or two, learn their care requirements, and gradually expand your collection.

Remember, the best plant for you is one that fits your lifestyle and growing conditions. Don't be afraid to experiment and find what works best in your home! 🌿`,
    categoryId: 'indoor-plants',
    tags: ['houseplants', 'indoor plants', 'low maintenance', 'beginner friendly'],
    author: 'Plant Specialist',
    status: 'published',
    publishDate: '2024-03-18T14:00:00.000Z',
    featuredImage: '/images/blog/easy-houseplants.jpg',
    seo: {
      title: '5 Easy Houseplants That Are Impossible to Kill - Adam Halls Garden Center',
      description: 'Discover five low-maintenance houseplants perfect for beginners. These plants are nearly impossible to kill!',
      keywords: ['easy houseplants', 'low maintenance plants', 'indoor plants', 'beginner houseplants']
    },
    readingTime: 6,
    wordCount: 900,
    views: 189,
    likes: 23,
    comments: []
  },
  {
    id: 'post-3',
    title: 'Sustainable Gardening: 10 Eco-Friendly Practices',
    slug: 'sustainable-gardening-eco-friendly-practices',
    excerpt: 'Make your garden more environmentally friendly with these sustainable gardening practices that benefit both your plants and the planet.',
    content: `Sustainable gardening isn't just a trend—it's a way to create a healthier garden while protecting our environment. By adopting eco-friendly practices, you can reduce your carbon footprint, conserve resources, and create a more resilient garden ecosystem.

## 1. Composting: Turn Waste into Gold

**Why it's sustainable:**
- Reduces landfill waste
- Creates nutrient-rich soil amendment
- Eliminates need for chemical fertilizers
- Improves soil structure and water retention

**How to start:**
- Use kitchen scraps, yard waste, and paper products
- Layer green (nitrogen-rich) and brown (carbon-rich) materials
- Turn regularly to speed decomposition
- Use finished compost in your garden beds

## 2. Water Conservation

**Why it's sustainable:**
- Reduces water waste
- Lowers utility bills
- Protects local water resources
- Creates drought-resistant gardens

**Methods:**
- Install rain barrels to collect rainwater
- Use drip irrigation systems
- Mulch to retain soil moisture
- Choose drought-tolerant plants
- Water early morning or evening to reduce evaporation

## 3. Native Plant Selection

**Why it's sustainable:**
- Requires less water and maintenance
- Supports local wildlife and pollinators
- Resistant to local pests and diseases
- Maintains biodiversity

**How to choose:**
- Research plants native to your region
- Visit local botanical gardens or nurseries
- Consider the plant's natural habitat requirements
- Avoid invasive species

## 4. Natural Pest Control

**Why it's sustainable:**
- Eliminates harmful chemical pesticides
- Protects beneficial insects
- Maintains ecological balance
- Safer for children and pets

**Methods:**
- Encourage beneficial insects (ladybugs, lacewings)
- Use companion planting (marigolds repel nematodes)
- Hand-pick larger pests
- Use neem oil or insecticidal soap as last resort
- Create habitat for pest predators

## 5. Organic Fertilizers

**Why it's sustainable:**
- No harmful chemical runoff
- Improves soil health over time
- Provides slow-release nutrients
- Supports soil microorganisms

**Options:**
- Compost tea
- Fish emulsion
- Bone meal
- Blood meal
- Seaweed extract
- Manure (properly aged)

## 6. Mulching

**Why it's sustainable:**
- Reduces water evaporation
- Suppresses weeds naturally
- Improves soil structure
- Regulates soil temperature

**Materials:**
- Shredded leaves
- Grass clippings
- Wood chips
- Straw
- Pine needles
- Compost

## 7. Seed Saving

**Why it's sustainable:**
- Preserves plant diversity
- Reduces dependence on commercial seeds
- Saves money
- Maintains locally adapted varieties

**How to start:**
- Choose open-pollinated varieties
- Allow some plants to go to seed
- Clean and dry seeds properly
- Store in cool, dry conditions
- Label everything clearly

## 8. Integrated Pest Management (IPM)

**Why it's sustainable:**
- Uses multiple strategies for pest control
- Minimizes chemical use
- Monitors pest populations
- Treats problems at appropriate levels

**Steps:**
1. Monitor and identify pests
2. Set action thresholds
3. Use cultural controls first
4. Apply biological controls
5. Use chemical controls only as last resort

## 9. Wildlife-Friendly Gardens

**Why it's sustainable:**
- Supports local ecosystems
- Reduces need for chemical pest control
- Creates beautiful, dynamic gardens
- Educates about local wildlife

**Features:**
- Bird feeders and baths
- Butterfly gardens
- Bee-friendly plants
- Water features
- Shelter areas (brush piles, rock walls)

## 10. Seasonal Planning

**Why it's sustainable:**
- Maximizes growing season
- Reduces resource waste
- Improves crop yields
- Maintains garden productivity

**Strategies:**
- Succession planting
- Crop rotation
- Season extension techniques
- Winter gardening in cold climates

## Getting Started

Don't feel overwhelmed! Start with one or two practices and gradually incorporate more:

1. **Week 1-2**: Start composting
2. **Week 3-4**: Install rain barrel
3. **Week 5-6**: Add native plants
4. **Week 7-8**: Implement natural pest control

## The Impact

By adopting these practices, you'll:
- Reduce your environmental footprint
- Create a healthier garden ecosystem
- Save money on water and fertilizers
- Enjoy more wildlife in your garden
- Feel good about your contribution to sustainability

## Resources for Learning More

- Local extension offices
- Master Gardener programs
- Sustainable gardening books
- Online gardening communities
- Local gardening clubs

Remember, sustainable gardening is a journey, not a destination. Every small change you make contributes to a healthier planet. Start where you are, use what you have, and do what you can. Your garden—and the Earth—will thank you! 🌱♻️`,
    categoryId: 'sustainability',
    tags: ['sustainable gardening', 'eco-friendly', 'organic gardening', 'environment'],
    author: 'Garden Designer',
    status: 'published',
    publishDate: '2024-03-20T11:00:00.000Z',
    featuredImage: '/images/blog/sustainable-gardening.jpg',
    seo: {
      title: 'Sustainable Gardening: 10 Eco-Friendly Practices - Adam Halls Garden Center',
      description: 'Learn 10 sustainable gardening practices to make your garden more eco-friendly and environmentally responsible.',
      keywords: ['sustainable gardening', 'eco-friendly gardening', 'organic gardening', 'environmental gardening']
    },
    readingTime: 10,
    wordCount: 1500,
    views: 312,
    likes: 45,
    comments: []
  }
];

// Sample weekly schedules
const sampleSchedules = [
  {
    id: 'schedule-12-2024',
    weekStart: '2024-03-18T00:00:00.000Z',
    weekEnd: '2024-03-24T23:59:59.999Z',
    weekNumber: 12,
    year: 2024,
    monday: {
      date: '2024-03-18T09:00:00.000Z',
      time: '09:00',
      status: 'completed',
      topic: 'Essential Spring Planting Guide for Beginners',
      category: 'Seasonal Guides',
      author: 'Garden Expert',
      notes: 'Monday morning post to start the week'
    },
    wednesday: {
      date: '2024-03-20T14:00:00.000Z',
      time: '14:00',
      status: 'completed',
      topic: 'Sustainable Gardening: 10 Eco-Friendly Practices',
      category: 'Sustainability',
      author: 'Garden Designer',
      notes: 'Mid-week engagement post'
    },
    friday: {
      date: '2024-03-22T11:00:00.000Z',
      time: '11:00',
      status: 'completed',
      topic: '5 Easy Houseplants That Are Impossible to Kill',
      category: 'Indoor Plants',
      author: 'Plant Specialist',
      notes: 'Weekend inspiration post'
    },
    weeklyGoals: [
      'Increase engagement by 15%',
      'Focus on seasonal content',
      'Include plant care tips in each post'
    ],
    contentThemes: [
      'Spring planting preparation',
      'Indoor plant care',
      'Garden maintenance tips'
    ],
    targetAudience: [
      'Beginner gardeners',
      'Plant enthusiasts',
      'Homeowners with gardens'
    ],
    totalViews: 746,
    totalEngagement: 86,
    averageReadingTime: 8,
    contentIdeas: [
      {
        id: 'idea-1',
        title: 'Container Gardening for Small Spaces',
        description: 'How to create beautiful gardens in limited space',
        category: 'gardening-tips',
        difficulty: 'beginner',
        estimatedTime: '2 hours',
        materials: ['containers', 'potting soil', 'plants', 'fertilizer']
      },
      {
        id: 'idea-2',
        title: 'Herb Garden Maintenance',
        description: 'Keeping your herbs healthy and productive',
        category: 'plant-care',
        difficulty: 'beginner',
        estimatedTime: '1 hour',
        materials: ['pruning shears', 'fertilizer', 'water']
      }
    ],
    pendingTopics: [],
    completedTopics: [
      'Essential Spring Planting Guide for Beginners',
      'Sustainable Gardening: 10 Eco-Friendly Practices',
      '5 Easy Houseplants That Are Impossible to Kill'
    ],
    generatedBy: 'System',
    generatedAt: '2024-03-15T10:00:00.000Z',
    lastUpdated: '2024-03-22T15:00:00.000Z'
  }
];

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'src', 'data', 'blog');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Save categories
fs.writeFileSync(
  path.join(dataDir, 'categories.json'),
  JSON.stringify(categories, null, 2)
);

// Save sample posts
fs.writeFileSync(
  path.join(dataDir, 'posts.json'),
  JSON.stringify(samplePosts, null, 2)
);

// Save sample schedules
fs.writeFileSync(
  path.join(dataDir, 'schedules.json'),
  JSON.stringify(sampleSchedules, null, 2)
);

// Create a combined data file
const combinedData = {
  categories,
  posts: samplePosts,
  schedules: sampleSchedules,
  generatedAt: new Date().toISOString(),
  totalPosts: samplePosts.length,
  totalCategories: categories.length,
  totalSchedules: sampleSchedules.length
};

fs.writeFileSync(
  path.join(dataDir, 'blog-data.json'),
  JSON.stringify(combinedData, null, 2)
);

console.log('✅ Blog sample data generated successfully!');
console.log(`📁 Data saved to: ${dataDir}`);
console.log(`📊 Generated ${samplePosts.length} blog posts`);
console.log(`🏷️  Generated ${categories.length} categories`);
console.log(`📅 Generated ${sampleSchedules.length} weekly schedules`);
console.log('\nFiles created:');
console.log('- categories.json');
console.log('- posts.json');
console.log('- schedules.json');
console.log('- blog-data.json');
