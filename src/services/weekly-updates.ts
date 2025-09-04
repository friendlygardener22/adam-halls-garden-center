import { 
  WeeklyMetrics, 
  WeeklyUpdateSummary, 
  WeeklyComparison, 
  WeeklyUpdateFilters,
  TopProduct,
  CategorySales,
  CategoryPerformance,
  SeasonalTrend,
  ActionItem
} from '../types/weekly-updates';
import { allProducts } from '../data/all-products';

export class WeeklyUpdateService {
  private static instance: WeeklyUpdateService;
  private updates: WeeklyMetrics[] = [];

  private constructor() {
    this.loadUpdates();
  }

  public static getInstance(): WeeklyUpdateService {
    if (!WeeklyUpdateService.instance) {
      WeeklyUpdateService.instance = new WeeklyUpdateService();
    }
    return WeeklyUpdateService.instance;
  }

  // Generate a new weekly update
  public generateWeeklyUpdate(weekStart: string, weekEnd: string): WeeklyMetrics {
    const weekNumber = this.getWeekNumber(new Date(weekStart));
    const year = new Date(weekStart).getFullYear();

    const update: WeeklyMetrics = {
      weekStart,
      weekEnd,
      weekNumber,
      year,
      
      sales: this.generateSalesMetrics(weekStart, weekEnd),
      inventory: this.generateInventoryMetrics(),
      customers: this.generateCustomerMetrics(weekStart, weekEnd),
      operations: this.generateOperationsMetrics(weekStart, weekEnd),
      marketing: this.generateMarketingMetrics(weekStart, weekEnd),
      financial: this.generateFinancialMetrics(weekStart, weekEnd),
      weather: this.generateWeatherMetrics(weekStart, weekEnd),
      notes: this.generateNotes(),
      
      generatedBy: 'System',
      generatedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    this.updates.push(update);
    this.saveUpdates();
    return update;
  }

  // Get weekly update by week number and year
  public getWeeklyUpdate(weekNumber: number, year: number): WeeklyMetrics | null {
    return this.updates.find(update => 
      update.weekNumber === weekNumber && update.year === year
    ) || null;
  }

  // Get all weekly updates with optional filtering
  public getWeeklyUpdates(filters?: WeeklyUpdateFilters): WeeklyMetrics[] {
    let filtered = [...this.updates];

    if (filters?.startDate) {
      filtered = filtered.filter(update => update.weekStart >= filters.startDate!);
    }

    if (filters?.endDate) {
      filtered = filtered.filter(update => update.weekEnd <= filters.endDate!);
    }

    return filtered.sort((a, b) => new Date(b.weekStart).getTime() - new Date(a.weekStart).getTime());
  }

  // Get weekly update summary
  public getWeeklySummary(weekNumber: number, year: number): WeeklyUpdateSummary | null {
    const update = this.getWeeklyUpdate(weekNumber, year);
    if (!update) return null;

    const previousWeek = this.getWeeklyUpdate(weekNumber - 1, year) || 
                        this.getWeeklyUpdate(52, year - 1);

    const revenueGrowth = previousWeek ? 
      ((update.sales.totalRevenue - previousWeek.sales.totalRevenue) / previousWeek.sales.totalRevenue) * 100 : 0;

    const customerGrowth = previousWeek ? 
      ((update.customers.totalCustomers - previousWeek.customers.totalCustomers) / previousWeek.customers.totalCustomers) * 100 : 0;

    const topPerformingProduct = update.sales.topSellingProducts[0]?.name || 'N/A';

    const needsAttention = [
      ...(update.inventory.outOfStock > 0 ? [`${update.inventory.outOfStock} products out of stock`] : []),
      ...(update.inventory.lowStock > 0 ? [`${update.inventory.lowStock} products low on stock`] : []),
      ...(update.operations.pendingTasks > 0 ? [`${update.operations.pendingTasks} pending tasks`] : []),
      ...(update.customers.customerSatisfaction < 4 ? ['Customer satisfaction below target'] : [])
    ];

    return {
      weekNumber,
      year,
      keyHighlights: update.notes.highlights,
      keyChallenges: update.notes.challenges,
      revenueGrowth,
      customerGrowth,
      topPerformingProduct,
      needsAttention
    };
  }

  // Compare two weeks
  public compareWeeks(currentWeek: number, currentYear: number, previousWeek: number, previousYear: number): WeeklyComparison | null {
    const current = this.getWeeklyUpdate(currentWeek, currentYear);
    const previous = this.getWeeklyUpdate(previousWeek, previousYear);

    if (!current || !previous) return null;

    const changes = {
      revenue: current.sales.totalRevenue - previous.sales.totalRevenue,
      orders: current.sales.totalOrders - previous.sales.totalOrders,
      customers: current.customers.totalCustomers - previous.customers.totalCustomers,
      inventory: current.inventory.totalProducts - previous.inventory.totalProducts,
      profit: current.financial.netProfit - previous.financial.netProfit
    };

    const trends = {
      revenue: this.getTrend(changes.revenue),
      orders: this.getTrend(changes.orders),
      customers: this.getTrend(changes.customers),
      inventory: this.getTrend(changes.inventory),
      profit: this.getTrend(changes.profit)
    };

    return {
      currentWeek: current,
      previousWeek: previous,
      changes,
      trends
    };
  }

  // Generate sample data for demonstration
  public generateSampleData(): void {
    const today = new Date();
    const weekStart = this.getWeekStart(today);
    const weekEnd = this.getWeekEnd(today);

    // Generate last 4 weeks of sample data
    for (let i = 3; i >= 0; i--) {
      const start = new Date(weekStart);
      start.setDate(start.getDate() - (i * 7));
      const end = new Date(start);
      end.setDate(end.getDate() + 6);

      this.generateWeeklyUpdate(start.toISOString(), end.toISOString());
    }
  }

  // Private helper methods
  private generateSalesMetrics(weekStart: string, weekEnd: string) {
    // Simulate sales data - in real app, this would come from your sales system
    const totalRevenue = Math.floor(Math.random() * 50000) + 10000;
    const totalOrders = Math.floor(Math.random() * 200) + 50;
    const averageOrderValue = totalRevenue / totalOrders;

    const topSellingProducts: TopProduct[] = [
      {
        productId: 1,
        name: 'Hydrangea Endless Summer',
        category: 'Shrubs',
        unitsSold: Math.floor(Math.random() * 20) + 10,
        revenue: Math.floor(Math.random() * 600) + 300,
        previousWeekRank: 1,
        change: 'up'
      },
      {
        productId: 2,
        name: 'Japanese Maple Bloodgood',
        category: 'Trees',
        unitsSold: Math.floor(Math.random() * 15) + 5,
        revenue: Math.floor(Math.random() * 1350) + 450,
        previousWeekRank: 2,
        change: 'stable'
      }
    ];

    const salesByCategory: CategorySales[] = [
      {
        category: 'Shrubs',
        revenue: Math.floor(Math.random() * 15000) + 5000,
        unitsSold: Math.floor(Math.random() * 100) + 30,
        percentageOfTotal: 35,
        previousWeek: Math.floor(Math.random() * 15000) + 5000,
        change: Math.floor(Math.random() * 2000) - 1000
      },
      {
        category: 'Trees',
        revenue: Math.floor(Math.random() * 12000) + 4000,
        unitsSold: Math.floor(Math.random() * 50) + 15,
        percentageOfTotal: 25,
        previousWeek: Math.floor(Math.random() * 12000) + 4000,
        change: Math.floor(Math.random() * 1500) - 750
      }
    ];

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      topSellingProducts,
      salesByCategory,
      newCustomers: Math.floor(Math.random() * 30) + 10,
      returningCustomers: Math.floor(Math.random() * 100) + 50
    };
  }

  private generateInventoryMetrics() {
    const totalProducts = allProducts.length;
    const newProducts = Math.floor(Math.random() * 10) + 2;
    const outOfStock = Math.floor(Math.random() * 20) + 5;
    const lowStock = Math.floor(Math.random() * 30) + 10;
    const inventoryValue = Math.floor(Math.random() * 100000) + 50000;

    const topPerformingCategories: CategoryPerformance[] = [
      {
        category: 'Shrubs',
        revenue: Math.floor(Math.random() * 15000) + 5000,
        unitsSold: Math.floor(Math.random() * 100) + 30,
        profitMargin: Math.random() * 0.4 + 0.2,
        inventoryTurnover: Math.random() * 5 + 2,
        customerInterest: Math.random() * 10 + 7
      }
    ];

    const seasonalTrends: SeasonalTrend[] = [
      {
        category: 'Spring Bulbs',
        trend: 'increasing',
        reason: 'Spring planting season approaching',
        expectedDuration: '2-3 months',
        recommendations: ['Increase inventory', 'Promote early bird specials', 'Prepare display areas']
      }
    ];

    return {
      totalProducts,
      newProducts,
      outOfStock,
      lowStock,
      inventoryValue,
      topPerformingCategories,
      seasonalTrends
    };
  }

  private generateCustomerMetrics(weekStart: string, weekEnd: string) {
    return {
      totalCustomers: Math.floor(Math.random() * 500) + 200,
      newCustomers: Math.floor(Math.random() * 30) + 10,
      customerSatisfaction: Math.random() * 2 + 3, // 3-5 scale
      topCustomerFeedback: [
        {
          customerId: 'CUST001',
          rating: 5,
          comment: 'Excellent plant quality and helpful staff',
          category: 'service',
          date: new Date().toISOString(),
          resolved: true
        }
      ],
      customerInquiries: Math.floor(Math.random() * 50) + 20,
      serviceRequests: Math.floor(Math.random() * 20) + 5
    };
  }

  private generateOperationsMetrics(weekStart: string, weekEnd: string) {
    return {
      staffHours: Math.floor(Math.random() * 200) + 120,
      maintenanceTasks: Math.floor(Math.random() * 15) + 5,
      completedTasks: Math.floor(Math.random() * 12) + 3,
      pendingTasks: Math.floor(Math.random() * 8) + 2,
      equipmentIssues: Math.floor(Math.random() * 5) + 1,
      supplyOrders: Math.floor(Math.random() * 10) + 3
    };
  }

  private generateMarketingMetrics(weekStart: string, weekEnd: string) {
    return {
      socialMediaPosts: Math.floor(Math.random() * 15) + 5,
      emailCampaigns: Math.floor(Math.random() * 5) + 2,
      websiteVisits: Math.floor(Math.random() * 1000) + 500,
      promotionalOffers: Math.floor(Math.random() * 8) + 3,
      eventAttendance: Math.floor(Math.random() * 100) + 50,
      advertisingSpend: Math.floor(Math.random() * 2000) + 500
    };
  }

  private generateFinancialMetrics(weekStart: string, weekEnd: string) {
    const grossProfit = Math.floor(Math.random() * 30000) + 15000;
    const expenses = Math.floor(Math.random() * 20000) + 10000;
    const netProfit = grossProfit - expenses;

    return {
      grossProfit,
      netProfit,
      expenses,
      payroll: Math.floor(Math.random() * 12000) + 6000,
      utilities: Math.floor(Math.random() * 2000) + 1000,
      supplies: Math.floor(Math.random() * 3000) + 1500,
      marketing: Math.floor(Math.random() * 2000) + 500,
      other: Math.floor(Math.random() * 3000) + 1000
    };
  }

  private generateWeatherMetrics(weekStart: string, weekEnd: string) {
    return {
      averageTemperature: Math.floor(Math.random() * 30) + 15,
      rainfall: Math.random() * 5,
      sunnyDays: Math.floor(Math.random() * 5) + 2,
      impactOnSales: 'Good weather increased foot traffic',
      seasonalNotes: 'Spring weather patterns typical for the season'
    };
  }

  private generateNotes() {
    return {
      highlights: [
        'Strong sales in shrub category',
        'New customer acquisition up 15%',
        'Staff training completed successfully'
      ],
      challenges: [
        'Some products running low on stock',
        'Equipment maintenance needed',
        'Weather affecting outdoor plant sales'
      ],
      opportunities: [
        'Expand succulent collection',
        'Increase online presence',
        'Partner with local landscapers'
      ],
      actionItems: [
        {
          id: 'AI001',
          description: 'Restock popular shrubs',
          assignedTo: 'Inventory Manager',
          priority: 'high',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
          notes: 'Focus on hydrangeas and roses'
        }
      ],
      nextWeekGoals: [
        'Increase online sales by 20%',
        'Launch spring promotion campaign',
        'Complete staff scheduling optimization'
      ]
    };
  }

  private getTrend(change: number): 'up' | 'down' | 'stable' {
    if (change > 0) return 'up';
    if (change < 0) return 'down';
    return 'stable';
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  private getWeekStart(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private getWeekEnd(date: Date): Date {
    const weekStart = this.getWeekStart(date);
    weekStart.setDate(weekStart.getDate() + 6);
    return weekStart;
  }

  private loadUpdates(): void {
    try {
      const stored = localStorage.getItem('weekly-updates');
      if (stored) {
        this.updates = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading weekly updates:', error);
      this.updates = [];
    }
  }

  private saveUpdates(): void {
    try {
      localStorage.setItem('weekly-updates', JSON.stringify(this.updates));
    } catch (error) {
      console.error('Error saving weekly updates:', error);
    }
  }
}

export const weeklyUpdateService = WeeklyUpdateService.getInstance();
