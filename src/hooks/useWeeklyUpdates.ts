import { useState, useEffect, useCallback } from 'react';
import { weeklyUpdateService } from '../services/weekly-updates';
import { 
  WeeklyMetrics, 
  WeeklyUpdateSummary, 
  WeeklyComparison, 
  WeeklyUpdateFilters 
} from '../types/weekly-updates';

export const useWeeklyUpdates = () => {
  const [updates, setUpdates] = useState<WeeklyMetrics[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all weekly updates
  const loadUpdates = useCallback(async (filters?: WeeklyUpdateFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = weeklyUpdateService.getWeeklyUpdates(filters);
      setUpdates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weekly updates');
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate a new weekly update
  const generateUpdate = useCallback(async (weekStart: string, weekEnd: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const newUpdate = weeklyUpdateService.generateWeeklyUpdate(weekStart, weekEnd);
      setUpdates(prev => [newUpdate, ...prev]);
      return newUpdate;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate weekly update');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get specific weekly update
  const getUpdate = useCallback((weekNumber: number, year: number) => {
    return weeklyUpdateService.getWeeklyUpdate(weekNumber, year);
  }, []);

  // Get weekly summary
  const getSummary = useCallback((weekNumber: number, year: number) => {
    return weeklyUpdateService.getWeeklySummary(weekNumber, year);
  }, []);

  // Compare two weeks
  const compareWeeks = useCallback((
    currentWeek: number, 
    currentYear: number, 
    previousWeek: number, 
    previousYear: number
  ) => {
    return weeklyUpdateService.compareWeeks(currentWeek, currentYear, previousWeek, previousYear);
  }, []);

  // Generate sample data
  const generateSampleData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      weeklyUpdateService.generateSampleData();
      await loadUpdates();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate sample data');
    } finally {
      setLoading(false);
    }
  }, [loadUpdates]);

  // Get current week info
  const getCurrentWeekInfo = useCallback(() => {
    const today = new Date();
    const weekStart = new Date(today);
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    weekStart.setDate(diff);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const weekNumber = Math.ceil((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    
    return {
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
      weekNumber,
      year: today.getFullYear()
    };
  }, []);

  // Auto-generate current week update if it doesn't exist
  const ensureCurrentWeekUpdate = useCallback(async () => {
    const currentWeek = getCurrentWeekInfo();
    const existingUpdate = getUpdate(currentWeek.weekNumber, currentWeek.year);
    
    if (!existingUpdate) {
      await generateUpdate(currentWeek.weekStart, currentWeek.weekEnd);
    }
  }, [getCurrentWeekInfo, getUpdate, generateUpdate]);

  // Load updates on mount
  useEffect(() => {
    loadUpdates();
  }, [loadUpdates]);

  // Ensure current week update exists
  useEffect(() => {
    ensureCurrentWeekUpdate();
  }, [ensureCurrentWeekUpdate]);

  return {
    updates,
    loading,
    error,
    loadUpdates,
    generateUpdate,
    getUpdate,
    getSummary,
    compareWeeks,
    generateSampleData,
    getCurrentWeekInfo,
    ensureCurrentWeekUpdate
  };
};

// Hook for a specific weekly update
export const useWeeklyUpdate = (weekNumber: number, year: number) => {
  const [update, setUpdate] = useState<WeeklyMetrics | null>(null);
  const [summary, setSummary] = useState<WeeklyUpdateSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUpdate = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = weeklyUpdateService.getWeeklyUpdate(weekNumber, year);
      const summaryData = weeklyUpdateService.getWeeklySummary(weekNumber, year);
      
      setUpdate(data);
      setSummary(summaryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weekly update');
    } finally {
      setLoading(false);
    }
  }, [weekNumber, year]);

  useEffect(() => {
    loadUpdate();
  }, [loadUpdate]);

  return {
    update,
    summary,
    loading,
    error,
    reload: loadUpdate
  };
};

// Hook for weekly comparison
export const useWeeklyComparison = (
  currentWeek: number, 
  currentYear: number, 
  previousWeek: number, 
  previousYear: number
) => {
  const [comparison, setComparison] = useState<WeeklyComparison | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComparison = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = weeklyUpdateService.compareWeeks(currentWeek, currentYear, previousWeek, previousYear);
      setComparison(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weekly comparison');
    } finally {
      setLoading(false);
    }
  }, [currentWeek, currentYear, previousWeek, previousYear]);

  useEffect(() => {
    loadComparison();
  }, [loadComparison]);

  return {
    comparison,
    loading,
    error,
    reload: loadComparison
  };
};
