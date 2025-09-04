import { useState, useEffect, useCallback } from 'react';
import { blogUpdateService } from '../services/blog-updates';
import { 
  BlogPost, 
  BlogSchedule, 
  BlogCategory, 
  BlogContentCalendar,
  BlogAnalytics,
  BlogFilters,
  ContentIdea
} from '../types/blog-updates';

export const useBlogUpdates = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [schedules, setSchedules] = useState<BlogSchedule[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all blog data
  const loadBlogData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allPosts = blogUpdateService.getBlogPosts();
      const allCategories = blogUpdateService.getBlogCategories();
      
      setPosts(allPosts);
      setCategories(allCategories);
      
      // Load schedules for current month
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      
      // Get schedules for current month
      const monthSchedules: BlogSchedule[] = [];
      for (let week = 1; week <= 5; week++) {
        const schedule = blogUpdateService.getWeeklySchedule(week, currentYear);
        if (schedule) {
          monthSchedules.push(schedule);
        }
      }
      setSchedules(monthSchedules);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new blog post
  const createPost = useCallback(async (postData: Partial<BlogPost>) => {
    setLoading(true);
    setError(null);
    
    try {
      const newPost = blogUpdateService.createBlogPost(postData);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog post');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update blog post
  const updatePost = useCallback(async (postId: string, updates: Partial<BlogPost>) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedPost = blogUpdateService.updateBlogPost(postId, updates);
      if (updatedPost) {
        setPosts(prev => prev.map(post => post.id === postId ? updatedPost : post));
      }
      return updatedPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update blog post');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete blog post
  const deletePost = useCallback(async (postId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const success = blogUpdateService.deleteBlogPost(postId);
      if (success) {
        setPosts(prev => prev.filter(post => post.id !== postId));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog post');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get filtered posts
  const getFilteredPosts = useCallback((filters?: BlogFilters) => {
    return blogUpdateService.getBlogPosts(filters);
  }, []);

  // Generate weekly schedule
  const generateWeeklySchedule = useCallback(async (weekStart: string, weekEnd: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const newSchedule = blogUpdateService.generateWeeklySchedule(weekStart, weekEnd);
      setSchedules(prev => [...prev, newSchedule]);
      return newSchedule;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate weekly schedule');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get content calendar
  const getContentCalendar = useCallback((month: number, year: number) => {
    return blogUpdateService.getContentCalendar(month, year);
  }, []);

  // Get blog analytics
  const getBlogAnalytics = useCallback((startDate: string, endDate: string) => {
    return blogUpdateService.getBlogAnalytics(startDate, endDate);
  }, []);

  // Generate sample data
  const generateSampleData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      blogUpdateService.generateSampleData();
      await loadBlogData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate sample data');
    } finally {
      setLoading(false);
    }
  }, [loadBlogData]);

  // Load data on mount
  useEffect(() => {
    loadBlogData();
  }, [loadBlogData]);

  return {
    posts,
    schedules,
    categories,
    loading,
    error,
    loadBlogData,
    createPost,
    updatePost,
    deletePost,
    getFilteredPosts,
    generateWeeklySchedule,
    getContentCalendar,
    getBlogAnalytics,
    generateSampleData
  };
};

// Hook for a specific blog post
export const useBlogPost = (postId: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = blogUpdateService.getBlogPost(postId);
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId, loadPost]);

  return {
    post,
    loading,
    error,
    reload: loadPost
  };
};

// Hook for blog post by slug
export const useBlogPostBySlug = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = blogUpdateService.getBlogPostBySlug(slug);
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug, loadPost]);

  return {
    post,
    loading,
    error,
    reload: loadPost
  };
};

// Hook for weekly blog schedule
export const useWeeklyBlogSchedule = (weekNumber: number, year: number) => {
  const [schedule, setSchedule] = useState<BlogSchedule | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSchedule = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = blogUpdateService.getWeeklySchedule(weekNumber, year);
      setSchedule(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weekly schedule');
    } finally {
      setLoading(false);
    }
  }, [weekNumber, year]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  return {
    schedule,
    loading,
    error,
    reload: loadSchedule
  };
};

// Hook for content calendar
export const useContentCalendar = (month: number, year: number) => {
  const [calendar, setCalendar] = useState<BlogContentCalendar | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCalendar = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = blogUpdateService.getContentCalendar(month, year);
      setCalendar(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content calendar');
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    loadCalendar();
  }, [loadCalendar]);

  return {
    calendar,
    loading,
    error,
    reload: loadCalendar
  };
};

// Hook for blog analytics
export const useBlogAnalytics = (startDate: string, endDate: string) => {
  const [analytics, setAnalytics] = useState<BlogAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = blogUpdateService.getBlogAnalytics(startDate, endDate);
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog analytics');
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return {
    analytics,
    loading,
    error,
    reload: loadAnalytics
  };
};

// Hook for blog categories
export const useBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = blogUpdateService.getBlogCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    reload: loadCategories
  };
};

// Hook for content ideas
export const useContentIdeas = (weekNumber?: number, year?: number) => {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadIdeas = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // For now, we'll get ideas from the current week's schedule
      // In a real implementation, you might want to fetch ideas separately
      const currentDate = new Date();
      const currentWeek = weekNumber || Math.ceil((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
      const currentYear = year || currentDate.getFullYear();
      
      const schedule = blogUpdateService.getWeeklySchedule(currentWeek, currentYear);
      if (schedule) {
        setIdeas(schedule.contentIdeas);
      } else {
        setIdeas([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content ideas');
    } finally {
      setLoading(false);
    }
  }, [weekNumber, year]);

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  return {
    ideas,
    loading,
    error,
    reload: loadIdeas
  };
};
