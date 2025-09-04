import { 
  BlogPost, 
  BlogSchedule, 
  BlogCategory, 
  ContentIdea, 
  BlogContentCalendar,
  BlogAnalytics,
  BlogFilters,
  BlogSearchResult,
  Season,
  PlantCareTip
} from '../types/blog-updates';

export class BlogUpdateService {
  private static instance: BlogUpdateService;
  private posts: BlogPost[] = [];
  private schedules: BlogSchedule[] = [];
  private categories: BlogCategory[] = [];
  private contentIdeas: ContentIdea[] = [];

  private constructor() {
    this.loadData();
    this.initializeDefaultCategories();
  }

  public static getInstance(): BlogUpdateService {
    if (!BlogUpdateService.instance) {
      BlogUpdateService.instance = new BlogUpdateService();
    }
    return BlogUpdateService.instance;
  }

  // Initialize default blog categories for garden center
  private initializeDefaultCategories() {
    if (this.categories.length === 0) {
      this.categories = [
        {
          id: 'plant-care',
          name: 'Plant Care',
          slug: 'plant-care',
          description: 'Expert tips and guides for keeping your plants healthy and thriving',
          color: '#10B981',
          icon: '🌱',
          postCount: 0
        },
        {
          id: 'seasonal-gardening',
          name: 'Seasonal Gardening',
          slug: 'seasonal-gardening',
          description: 'What to plant and how to care for your garden throughout the year',
          color: '#F59E0B',
          icon: '🍂',
          postCount: 0
        },
        {
          id: 'garden-design',
          name: 'Garden Design',
          slug: 'garden-design',
          description: 'Creative ideas and inspiration for designing beautiful outdoor spaces',
          color: '#8B5CF6',
          icon: '🎨',
          postCount: 0
        },
        {
          id: 'diy-projects',
          name: 'DIY Projects',
          slug: 'diy-projects',
          description: 'Fun and practical projects you can do in your garden',
          color: '#EF4444',
          icon: '🔨',
          postCount: 0
        },
        {
          id: 'garden-tips',
          name: 'Garden Tips',
          slug: 'garden-tips',
          description: 'Quick tips and tricks for successful gardening',
          color: '#06B6D4',
          icon: '💡',
          postCount: 0
        },
        {
          id: 'plant-spotlight',
          name: 'Plant Spotlight',
          slug: 'plant-spotlight',
          description: 'Featured plants and their unique characteristics',
          color: '#84CC16',
          icon: '⭐',
          postCount: 0
        }
      ];
      this.saveData();
    }
  }

  // Generate weekly blog schedule (3 posts per week)
  public generateWeeklySchedule(weekStart: string, weekEnd: string): BlogSchedule {
    const weekNumber = this.getWeekNumber(new Date(weekStart));
    const year = new Date(weekStart).getFullYear();

    // Calculate Monday, Wednesday, Friday dates
    const monday = this.getNextMonday(new Date(weekStart));
    const wednesday = new Date(monday);
    wednesday.setDate(monday.getDate() + 2);
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    const schedule: BlogSchedule = {
      id: `schedule-${weekNumber}-${year}`,
      weekStart,
      weekEnd,
      weekNumber,
      year,
      
      monday: {
        date: monday.toISOString(),
        time: '09:00',
        status: 'empty',
        topic: this.generateTopicIdea('monday'),
        category: this.getRandomCategory(),
        author: 'Garden Expert',
        notes: 'Monday morning post to start the week'
      },
      
      wednesday: {
        date: wednesday.toISOString(),
        time: '14:00',
        status: 'empty',
        topic: this.generateTopicIdea('wednesday'),
        category: this.getRandomCategory(),
        author: 'Plant Specialist',
        notes: 'Mid-week engagement post'
      },
      
      friday: {
        date: friday.toISOString(),
        time: '11:00',
        status: 'empty',
        topic: this.generateTopicIdea('friday'),
        category: this.getRandomCategory(),
        author: 'Garden Designer',
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
      
      totalViews: 0,
      totalEngagement: 0,
      averageReadingTime: 0,
      
      contentIdeas: this.generateContentIdeas(weekNumber, year),
      pendingTopics: [],
      completedTopics: [],
      
      generatedBy: 'System',
      generatedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    this.schedules.push(schedule);
    this.saveData();
    return schedule;
  }

  // Generate content ideas for the week
  private generateContentIdeas(weekNumber: number, year: number): ContentIdea[] {
    const currentSeason = this.getCurrentSeason();
    const ideas: ContentIdea[] = [];

    // Seasonal content ideas
    const seasonalIdeas = this.getSeasonalContentIdeas(currentSeason);
    seasonalIdeas.forEach((idea, index) => {
      ideas.push({
        id: `idea-${weekNumber}-${year}-${index + 1}`,
        title: idea.title,
        description: idea.description,
        category: idea.category,
        targetAudience: idea.audience,
        seasonalRelevance: [currentSeason],
        estimatedReadingTime: idea.readingTime,
        difficulty: idea.difficulty,
        requiredResources: idea.resources,
        status: 'idea',
        priority: 'medium',
        tags: idea.tags,
        notes: idea.notes
      });
    });

    // Evergreen content ideas
    const evergreenIdeas = this.getEvergreenContentIdeas();
    evergreenIdeas.forEach((idea, index) => {
      ideas.push({
        id: `evergreen-${weekNumber}-${year}-${index + 1}`,
        title: idea.title,
        description: idea.description,
        category: idea.category,
        targetAudience: idea.audience,
        seasonalRelevance: [],
        estimatedReadingTime: idea.readingTime,
        difficulty: idea.difficulty,
        requiredResources: idea.resources,
        status: 'idea',
        priority: 'low',
        tags: idea.tags,
        notes: idea.notes
      });
    });

    return ideas;
  }

  // Get seasonal content ideas based on current season
  private getSeasonalContentIdeas(season: Season) {
    const seasonalIdeas = {
      Spring: [
        {
          title: 'Spring Planting Guide: What to Plant This Month',
          description: 'A comprehensive guide to spring planting, including vegetables, flowers, and herbs',
          category: 'seasonal-gardening',
          audience: ['beginner', 'intermediate'],
          readingTime: 8,
          difficulty: 'easy',
          resources: ['seed catalog', 'garden tools', 'soil amendments'],
          tags: ['spring', 'planting', 'guide'],
          notes: 'Perfect for early spring when gardeners are eager to start'
        },
        {
          title: 'Preparing Your Garden for Spring Growth',
          description: 'Essential steps to get your garden ready for the growing season',
          category: 'garden-tips',
          audience: ['beginner', 'intermediate', 'advanced'],
          readingTime: 6,
          difficulty: 'easy',
          resources: ['garden tools', 'compost', 'mulch'],
          tags: ['spring', 'preparation', 'maintenance'],
          notes: 'Focus on soil preparation and cleanup'
        }
      ],
      Summer: [
        {
          title: 'Summer Garden Maintenance: Keeping Plants Thriving',
          description: 'Tips for watering, fertilizing, and protecting plants during hot summer months',
          category: 'plant-care',
          audience: ['intermediate', 'advanced'],
          readingTime: 7,
          difficulty: 'medium',
          resources: ['watering system', 'fertilizer', 'shade cloth'],
          tags: ['summer', 'maintenance', 'care'],
          notes: 'Emphasize water conservation and heat protection'
        }
      ],
      Fall: [
        {
          title: 'Fall Garden Cleanup: Preparing for Winter',
          description: 'Essential tasks to prepare your garden for the cold months ahead',
          category: 'garden-tips',
          audience: ['beginner', 'intermediate'],
          readingTime: 5,
          difficulty: 'easy',
          resources: ['pruning tools', 'compost', 'mulch'],
          tags: ['fall', 'cleanup', 'winter-prep'],
          notes: 'Include what to leave for wildlife and what to remove'
        }
      ],
      Winter: [
        {
          title: 'Indoor Plant Care During Winter',
          description: 'How to keep your indoor plants healthy when outdoor gardening is limited',
          category: 'plant-care',
          audience: ['beginner', 'intermediate'],
          readingTime: 6,
          difficulty: 'easy',
          resources: ['grow lights', 'humidifier', 'plant food'],
          tags: ['winter', 'indoor', 'care'],
          notes: 'Focus on light, humidity, and temperature management'
        }
      ]
    };

    return seasonalIdeas[season.name] || seasonalIdeas.Spring;
  }

  // Get evergreen content ideas
  private getEvergreenContentIdeas() {
    return [
      {
        title: '10 Essential Garden Tools Every Gardener Needs',
        description: 'A comprehensive list of must-have tools for successful gardening',
        category: 'garden-tips',
        audience: ['beginner'],
        readingTime: 5,
        difficulty: 'easy',
        resources: ['garden tools', 'storage solutions'],
        tags: ['tools', 'essentials', 'beginner'],
        notes: 'Include budget-friendly options and maintenance tips'
      },
      {
        title: 'Understanding Soil pH: A Beginner\'s Guide',
        description: 'Learn how soil pH affects plant growth and how to test and adjust it',
        category: 'garden-tips',
        audience: ['beginner', 'intermediate'],
        readingTime: 7,
        difficulty: 'medium',
        resources: ['pH test kit', 'soil amendments'],
        tags: ['soil', 'pH', 'science'],
        notes: 'Include common plants and their preferred pH ranges'
      }
    ];
  }

  // Generate topic ideas based on day of week
  private generateTopicIdea(day: string): string {
    const topicIdeas = {
      monday: [
        'Weekly Garden Tasks',
        'New Plant Introductions',
        'Garden Planning Tips',
        'Monday Motivation for Gardeners'
      ],
      wednesday: [
        'Mid-Week Garden Check-in',
        'Plant Care Wednesday',
        'Garden Problem Solving',
        'Wednesday Wisdom'
      ],
      friday: [
        'Weekend Garden Projects',
        'Friday Plant Spotlight',
        'Garden Inspiration',
        'Weekend Reading List'
      ]
    };

    const ideas = topicIdeas[day] || topicIdeas.monday;
    return ideas[Math.floor(Math.random() * ideas.length)];
  }

  // Get random category for content planning
  private getRandomCategory(): string {
    const categories = this.categories.map(cat => cat.slug);
    return categories[Math.floor(Math.random() * categories.length)];
  }

  // Get current season
  private getCurrentSeason(): Season {
    const month = new Date().getMonth() + 1;
    
    if (month >= 3 && month <= 5) {
      return { name: 'Spring', months: [3, 4, 5], description: 'Spring planting and growth season' };
    } else if (month >= 6 && month <= 8) {
      return { name: 'Summer', months: [6, 7, 8], description: 'Summer maintenance and harvest season' };
    } else if (month >= 9 && month <= 11) {
      return { name: 'Fall', months: [9, 10, 11], description: 'Fall cleanup and preparation season' };
    } else {
      return { name: 'Winter', months: [12, 1, 2], description: 'Winter planning and indoor gardening season' };
    }
  }

  // Create a new blog post
  public createBlogPost(postData: Partial<BlogPost>): BlogPost {
    const post: BlogPost = {
      id: `post-${Date.now()}`,
      title: postData.title || 'Untitled Post',
      slug: this.generateSlug(postData.title || 'Untitled Post'),
      excerpt: postData.excerpt || '',
      content: postData.content || '',
      author: postData.author || 'Garden Expert',
      authorId: postData.authorId || 'expert-1',
      category: postData.category || this.categories[0],
      tags: postData.tags || [],
      featuredImage: postData.featuredImage || '/images/blog/default-featured.jpg',
      images: postData.images || [],
      
      status: postData.status || 'draft',
      publishDate: postData.publishDate || new Date().toISOString(),
      publishTime: postData.publishTime || '09:00',
      
      metaTitle: postData.metaTitle || postData.title || 'Untitled Post',
      metaDescription: postData.metaDescription || postData.excerpt || '',
      keywords: postData.keywords || [],
      
      views: 0,
      likes: 0,
      shares: 0,
      comments: [],
      
      readingTime: this.calculateReadingTime(postData.content || ''),
      wordCount: this.calculateWordCount(postData.content || ''),
      lastModified: new Date().toISOString(),
      created: new Date().toISOString(),
      
      seasonalRelevance: postData.seasonalRelevance || [this.getCurrentSeason()],
      plantCareTips: postData.plantCareTips || [],
      gardenAdvice: postData.gardenAdvice || [],
      
      socialMediaExcerpt: postData.socialMediaExcerpt || postData.excerpt || '',
      socialMediaImage: postData.socialMediaImage || postData.featuredImage || '/images/blog/default-featured.jpg',
      autoShare: postData.autoShare || false,
      
      engagementRate: 0,
      bounceRate: 0,
      timeOnPage: 0
    };

    this.posts.push(post);
    this.updateCategoryPostCount(post.category.id, 1);
    this.saveData();
    return post;
  }

  // Update blog post
  public updateBlogPost(postId: string, updates: Partial<BlogPost>): BlogPost | null {
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return null;

    const oldCategory = this.posts[postIndex].category.id;
    const newCategory = updates.category?.id || oldCategory;

    // Update post
    this.posts[postIndex] = { ...this.posts[postIndex], ...updates };
    this.posts[postIndex].lastModified = new Date().toISOString();

    // Update category post counts if category changed
    if (oldCategory !== newCategory) {
      this.updateCategoryPostCount(oldCategory, -1);
      this.updateCategoryPostCount(newCategory, 1);
    }

    this.saveData();
    return this.posts[postIndex];
  }

  // Delete blog post
  public deleteBlogPost(postId: string): boolean {
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return false;

    const post = this.posts[postIndex];
    this.updateCategoryPostCount(post.category.id, -1);
    
    this.posts.splice(postIndex, 1);
    this.saveData();
    return true;
  }

  // Get blog posts with filtering
  public getBlogPosts(filters?: BlogFilters): BlogPost[] {
    let filtered = [...this.posts];

    if (filters?.category) {
      filtered = filtered.filter(post => post.category.slug === filters.category);
    }

    if (filters?.author) {
      filtered = filtered.filter(post => post.author === filters.author);
    }

    if (filters?.status) {
      filtered = filtered.filter(post => post.status === filters.status);
    }

    if (filters?.dateRange) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.publishDate);
        const startDate = new Date(filters.dateRange!.start);
        const endDate = new Date(filters.dateRange!.end);
        return postDate >= startDate && postDate <= endDate;
      });
    }

    if (filters?.tags && filters.tags.length > 0) {
      filtered = filtered.filter(post => 
        filters.tags!.some(tag => post.tags.includes(tag))
      );
    }

    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  // Get blog post by ID
  public getBlogPost(postId: string): BlogPost | null {
    return this.posts.find(post => post.id === postId) || null;
  }

  // Get blog post by slug
  public getBlogPostBySlug(slug: string): BlogPost | null {
    return this.posts.find(post => post.slug === slug) || null;
  }

  // Get blog categories
  public getBlogCategories(): BlogCategory[] {
    return [...this.categories];
  }

  // Get weekly schedule
  public getWeeklySchedule(weekNumber: number, year: number): BlogSchedule | null {
    return this.schedules.find(schedule => 
      schedule.weekNumber === weekNumber && schedule.year === year
    ) || null;
  }

  // Get content calendar for a month
  public getContentCalendar(month: number, year: number): BlogContentCalendar {
    const weeks = this.schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.weekStart);
      return scheduleDate.getMonth() + 1 === month && scheduleDate.getFullYear() === year;
    });

    return {
      month,
      year,
      weeks,
      
      monthlyGoals: [
        'Publish 12-15 high-quality blog posts',
        'Increase average engagement rate to 8%',
        'Grow blog audience by 20%',
        'Focus on seasonal and evergreen content'
      ],
      
      contentThemes: [
        'Spring gardening preparation',
        'Plant care fundamentals',
        'Garden design inspiration',
        'Sustainable gardening practices'
      ],
      
      targetMetrics: {
        totalPosts: 15,
        totalViews: 5000,
        averageEngagement: 8,
        audienceGrowth: 20
      },
      
      seasonalContent: this.getSeasonalContent(month),
      promotionalContent: this.getPromotionalContent(month, year),
      evergreenContent: this.getEvergreenContent(),
      
      publishingSchedule: this.getPublishingSchedule(month, year),
      contentDeadlines: this.getContentDeadlines(month, year),
      
      assignedWriters: this.getAssignedWriters(),
      reviewSchedule: this.getReviewSchedule(month, year),
      publishingChecklist: this.getPublishingChecklist(month, year)
    };
  }

  // Get blog analytics
  public getBlogAnalytics(startDate: string, endDate: string): BlogAnalytics {
    const posts = this.posts.filter(post => {
      const postDate = new Date(post.publishDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return postDate >= start && postDate <= end;
    });

    const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
    const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
    const totalShares = posts.reduce((sum, post) => sum + post.shares, 0);
    const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);

    return {
      period: `${startDate} to ${endDate}`,
      startDate,
      endDate,
      
      totalPosts: posts.length,
      totalViews,
      totalLikes,
      totalShares,
      totalComments,
      
      averageViewsPerPost: posts.length > 0 ? Math.round(totalViews / posts.length) : 0,
      averageLikesPerPost: posts.length > 0 ? Math.round(totalLikes / posts.length) : 0,
      averageSharesPerPost: posts.length > 0 ? Math.round(totalShares / posts.length) : 0,
      averageCommentsPerPost: posts.length > 0 ? Math.round(totalComments / posts.length) : 0,
      averageReadingTime: posts.length > 0 ? Math.round(posts.reduce((sum, post) => sum + post.readingTime, 0) / posts.length) : 0,
      bounceRate: 0.65, // Placeholder
      
      topPosts: this.getTopPosts(posts),
      topCategories: this.getTopCategories(posts),
      topAuthors: this.getTopAuthors(posts),
      
      peakPublishingTimes: this.getPeakPublishingTimes(posts),
      mostEngagedAudience: this.getMostEngagedAudience(),
      contentPreferences: this.getContentPreferences(posts),
      
      viewsGrowth: 15, // Placeholder
      engagementGrowth: 8, // Placeholder
      audienceGrowth: 20 // Placeholder
    };
  }

  // Helper methods
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = this.calculateWordCount(content);
    return Math.ceil(wordCount / wordsPerMinute);
  }

  private calculateWordCount(content: string): number {
    return content.trim().split(/\s+/).length;
  }

  private updateCategoryPostCount(categoryId: string, change: number): void {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.postCount = Math.max(0, category.postCount + change);
    }
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  private getNextMonday(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  // Placeholder methods for analytics
  private getTopPosts(posts: BlogPost[]): any[] {
    return posts
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(post => ({
        postId: post.id,
        title: post.title,
        views: post.views,
        likes: post.likes,
        shares: post.shares,
        comments: post.comments.length,
        engagementRate: post.engagementRate
      }));
  }

  private getTopCategories(posts: BlogPost[]): any[] {
    const categoryStats = new Map();
    
    posts.forEach(post => {
      const category = post.category.name;
      if (!categoryStats.has(category)) {
        categoryStats.set(category, { category, postCount: 0, totalViews: 0, averageViews: 0, engagementRate: 0 });
      }
      
      const stats = categoryStats.get(category);
      stats.postCount++;
      stats.totalViews += post.views;
    });

    return Array.from(categoryStats.values())
      .map(stats => ({ ...stats, averageViews: Math.round(stats.totalViews / stats.postCount) }))
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 5);
  }

  private getTopAuthors(posts: BlogPost[]): any[] {
    const authorStats = new Map();
    
    posts.forEach(post => {
      const author = post.author;
      if (!authorStats.has(author)) {
        authorStats.set(author, { author, postCount: 0, totalViews: 0, averageViews: 0, engagementRate: 0 });
      }
      
      const stats = authorStats.get(author);
      stats.postCount++;
      stats.totalViews += post.views;
    });

    return Array.from(authorStats.values())
      .map(stats => ({ ...stats, averageViews: Math.round(stats.totalViews / stats.postCount) }))
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 5);
  }

  private getPeakPublishingTimes(posts: BlogPost[]): any[] {
    return [
      { dayOfWeek: 'Monday', timeSlot: '09:00', averageViews: 150, averageEngagement: 8.5 },
      { dayOfWeek: 'Wednesday', timeSlot: '14:00', averageViews: 120, averageEngagement: 7.2 },
      { dayOfWeek: 'Friday', timeSlot: '11:00', averageViews: 180, averageEngagement: 9.1 }
    ];
  }

  private getMostEngagedAudience(): any[] {
    return [
      { segment: 'Beginner Gardeners', size: 45, engagementRate: 8.2, preferredContent: ['Plant Care', 'Garden Tips'] },
      { segment: 'Plant Enthusiasts', size: 30, engagementRate: 9.5, preferredContent: ['Plant Spotlight', 'Advanced Care'] },
      { segment: 'Homeowners', size: 25, engagementRate: 7.8, preferredContent: ['Garden Design', 'DIY Projects'] }
    ];
  }

  private getContentPreferences(posts: BlogPost[]): any[] {
    return [
      { contentType: 'Plant Care Guides', views: 1200, engagementRate: 8.5, audienceRetention: 75 },
      { contentType: 'Seasonal Tips', views: 980, engagementRate: 7.8, audienceRetention: 68 },
      { contentType: 'Garden Design', views: 850, engagementRate: 8.2, audienceRetention: 72 }
    ];
  }

  private getSeasonalContent(month: number): any[] {
    const season = month >= 3 && month <= 5 ? 'Spring' : 
                   month >= 6 && month <= 8 ? 'Summer' : 
                   month >= 9 && month <= 11 ? 'Fall' : 'Winter';
    
    return [{
      season: { name: season, months: [], description: '' },
      contentThemes: [`${season} gardening tips`, `${season} plant care`, `${season} garden tasks`],
      postIdeas: [`What to plant in ${season}`, `${season} garden maintenance`, `${season} plant protection`],
      targetAudience: ['All gardeners'],
      promotionalOpportunities: [`${season} plant sales`, `${season} garden events`]
    }];
  }

  private getPromotionalContent(month: number, year: number): any[] {
    return [
      {
        type: 'seasonal-offer',
        title: 'Spring Planting Sale',
        description: 'Get 20% off all spring plants and seeds',
        publishDate: new Date(year, month - 1, 15).toISOString(),
        callToAction: 'Shop Now',
        relatedProducts: ['spring-plants', 'seeds', 'garden-tools']
      }
    ];
  }

  private getEvergreenContent(): any[] {
    return [
      {
        title: 'Essential Garden Tools Guide',
        category: 'Garden Tips',
        lastUpdated: new Date().toISOString(),
        nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        performanceScore: 8.5,
        updateNeeded: false
      }
    ];
  }

  private getPublishingSchedule(month: number, year: number): any[] {
    return [];
  }

  private getContentDeadlines(month: number, year: number): any[] {
    return [];
  }

  private getAssignedWriters(): any[] {
    return [
      {
        writerId: 'writer-1',
        name: 'Garden Expert',
        assignedPosts: 8,
        completedPosts: 6,
        averageQuality: 8.5,
        specialties: ['Plant Care', 'Seasonal Gardening'],
        availability: [
          { dayOfWeek: 'Monday', available: true, preferredTimeSlots: ['09:00', '14:00'], maxPostsPerDay: 2 },
          { dayOfWeek: 'Wednesday', available: true, preferredTimeSlots: ['10:00', '15:00'], maxPostsPerDay: 2 },
          { dayOfWeek: 'Friday', available: true, preferredTimeSlots: ['11:00', '16:00'], maxPostsPerDay: 2 }
        ]
      }
    ];
  }

  private getReviewSchedule(month: number, year: number): any[] {
    return [];
  }

  private getPublishingChecklist(month: number, year: number): any[] {
    return [];
  }

  // Data persistence
  private loadData(): void {
    try {
      const storedPosts = localStorage.getItem('blog-posts');
      const storedSchedules = localStorage.getItem('blog-schedules');
      const storedCategories = localStorage.getItem('blog-categories');
      const storedContentIdeas = localStorage.getItem('blog-content-ideas');

      if (storedPosts) this.posts = JSON.parse(storedPosts);
      if (storedSchedules) this.schedules = JSON.parse(storedSchedules);
      if (storedCategories) this.categories = JSON.parse(storedCategories);
      if (storedContentIdeas) this.contentIdeas = JSON.parse(storedContentIdeas);
    } catch (error) {
      console.error('Error loading blog data:', error);
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem('blog-posts', JSON.stringify(this.posts));
      localStorage.setItem('blog-schedules', JSON.stringify(this.schedules));
      localStorage.setItem('blog-categories', JSON.stringify(this.categories));
      localStorage.setItem('blog-content-ideas', JSON.stringify(this.contentIdeas));
    } catch (error) {
      console.error('Error saving blog data:', error);
    }
  }

  // Generate sample data
  public generateSampleData(): void {
    // Generate sample blog posts
    const samplePosts = [
      {
        title: 'Spring Planting Guide: What to Plant This Month',
        excerpt: 'Discover the best plants to grow in spring and how to get your garden off to a great start.',
        content: 'Spring is the perfect time to start your garden...',
        category: this.categories[0],
        tags: ['spring', 'planting', 'guide', 'beginner'],
        seasonalRelevance: [{ name: 'Spring', months: [3, 4, 5], description: 'Spring planting season' }]
      },
      {
        title: 'Essential Plant Care Tips for Beginners',
        excerpt: 'Learn the fundamental principles of plant care that every gardener should know.',
        content: 'Taking care of plants doesn\'t have to be complicated...',
        category: this.categories[0],
        tags: ['plant care', 'beginner', 'tips', 'fundamentals'],
        seasonalRelevance: []
      },
      {
        title: 'Designing a Beautiful Garden: Layout and Planning',
        excerpt: 'Transform your outdoor space with these garden design principles and planning tips.',
        content: 'A well-designed garden starts with careful planning...',
        category: this.categories[2],
        tags: ['garden design', 'planning', 'layout', 'beauty'],
        seasonalRelevance: []
      }
    ];

    samplePosts.forEach(postData => {
      this.createBlogPost({
        ...postData,
        author: 'Garden Expert',
        authorId: 'expert-1',
        status: 'published',
        publishDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        publishTime: '09:00'
      });
    });

    // Generate sample schedules for the next 4 weeks
    const today = new Date();
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      this.generateWeeklySchedule(weekStart.toISOString(), weekEnd.toISOString());
    }
  }
}

export const blogUpdateService = BlogUpdateService.getInstance();
