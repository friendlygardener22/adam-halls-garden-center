#!/usr/bin/env node

/**
 * Weekly Update Generator for Adam Halls Garden Center
 * 
 * This script generates weekly business updates with sample data
 * Run with: node scripts/generate-weekly-update.js
 */

const fs = require('fs');
const path = require('path');

// Sample data generator functions
function generateRandomRevenue() {
  return Math.floor(Math.random() * 50000) + 10000;
}

function generateRandomOrders() {
  return Math.floor(Math.random() * 200) + 50;
}

function generateRandomCustomers() {
  return Math.floor(Math.random() * 500) + 200;
}

function generateRandomInventory() {
  return Math.floor(Math.random() * 100) + 50;
}

function generateWeeklyUpdate(weekNumber, year) {
  const weekStart = new Date(year, 0, 1);
  weekStart.setDate(weekStart.getDate() + (weekNumber - 1) * 7);
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const revenue = generateRandomRevenue();
  const orders = generateRandomOrders();
  const customers = generateRandomCustomers();
  const inventory = generateRandomInventory();

  return {
    weekNumber,
    year,
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
    
    sales: {
      totalRevenue: revenue,
      totalOrders: orders,
      averageOrderValue: Math.round(revenue / orders),
      topSellingProducts: [
        {
          productId: 1,
          name: 'Hydrangea Endless Summer',
          category: 'Shrubs',
          unitsSold: Math.floor(Math.random() * 20) + 10,
          revenue: Math.floor(Math.random() * 600) + 300,
          previousWeekRank: 1,
          change: 'up'
        }
      ],
      salesByCategory: [
        {
          category: 'Shrubs',
          revenue: Math.floor(revenue * 0.35),
          unitsSold: Math.floor(Math.random() * 100) + 30,
          percentageOfTotal: 35,
          previousWeek: Math.floor(revenue * 0.35),
          change: Math.floor(Math.random() * 2000) - 1000
        }
      ],
      newCustomers: Math.floor(Math.random() * 30) + 10,
      returningCustomers: Math.floor(Math.random() * 100) + 50
    },
    
    inventory: {
      totalProducts: inventory,
      newProducts: Math.floor(Math.random() * 10) + 2,
      outOfStock: Math.floor(Math.random() * 20) + 5,
      lowStock: Math.floor(Math.random() * 30) + 10,
      inventoryValue: Math.floor(Math.random() * 100000) + 50000,
      topPerformingCategories: [
        {
          category: 'Shrubs',
          revenue: Math.floor(revenue * 0.35),
          unitsSold: Math.floor(Math.random() * 100) + 30,
          profitMargin: Math.random() * 0.4 + 0.2,
          inventoryTurnover: Math.random() * 5 + 2,
          customerInterest: Math.random() * 10 + 7
        }
      ],
      seasonalTrends: [
        {
          category: 'Spring Bulbs',
          trend: 'increasing',
          reason: 'Spring planting season approaching',
          expectedDuration: '2-3 months',
          recommendations: ['Increase inventory', 'Promote early bird specials', 'Prepare display areas']
        }
      ]
    },
    
    customers: {
      totalCustomers: customers,
      newCustomers: Math.floor(Math.random() * 30) + 10,
      customerSatisfaction: Math.random() * 2 + 3,
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
    },
    
    operations: {
      staffHours: Math.floor(Math.random() * 200) + 120,
      maintenanceTasks: Math.floor(Math.random() * 15) + 5,
      completedTasks: Math.floor(Math.random() * 12) + 3,
      pendingTasks: Math.floor(Math.random() * 8) + 2,
      equipmentIssues: Math.floor(Math.random() * 5) + 1,
      supplyOrders: Math.floor(Math.random() * 10) + 3
    },
    
    marketing: {
      socialMediaPosts: Math.floor(Math.random() * 15) + 5,
      emailCampaigns: Math.floor(Math.random() * 5) + 2,
      websiteVisits: Math.floor(Math.random() * 1000) + 500,
      promotionalOffers: Math.floor(Math.random() * 8) + 3,
      eventAttendance: Math.floor(Math.random() * 100) + 50,
      advertisingSpend: Math.floor(Math.random() * 2000) + 500
    },
    
    financial: {
      grossProfit: Math.floor(revenue * 0.6),
      netProfit: Math.floor(revenue * 0.3),
      expenses: Math.floor(revenue * 0.3),
      payroll: Math.floor(Math.random() * 12000) + 6000,
      utilities: Math.floor(Math.random() * 2000) + 1000,
      supplies: Math.floor(Math.random() * 3000) + 1500,
      marketing: Math.floor(Math.random() * 2000) + 500,
      other: Math.floor(Math.random() * 3000) + 1000
    },
    
    weather: {
      averageTemperature: Math.floor(Math.random() * 30) + 15,
      rainfall: Math.random() * 5,
      sunnyDays: Math.floor(Math.random() * 5) + 2,
      impactOnSales: 'Good weather increased foot traffic',
      seasonalNotes: 'Spring weather patterns typical for the season'
    },
    
    notes: {
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
    },
    
    generatedBy: 'Script',
    generatedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };
}

// Generate updates for the current year
function generateYearlyUpdates() {
  const currentYear = new Date().getFullYear();
  const updates = [];
  
  // Generate 52 weeks of data
  for (let week = 1; week <= 52; week++) {
    const update = generateWeeklyUpdate(week, currentYear);
    updates.push(update);
  }
  
  return updates;
}

// Main execution
function main() {
  console.log('🌱 Generating Weekly Updates for Adam Halls Garden Center...\n');
  
  try {
    const currentYear = new Date().getFullYear();
    const updates = generateYearlyUpdates();
    
    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, '..', 'data', 'weekly-updates');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save individual weekly files
    updates.forEach(update => {
      const filename = `week-${update.weekNumber}-${update.year}.json`;
      const filepath = path.join(outputDir, filename);
      
      fs.writeFileSync(filepath, JSON.stringify(update, null, 2));
      console.log(`✅ Generated ${filename}`);
    });
    
    // Save summary file
    const summary = {
      totalWeeks: updates.length,
      year: currentYear,
      generatedAt: new Date().toISOString(),
      summary: updates.map(update => ({
        week: update.weekNumber,
        revenue: update.sales.totalRevenue,
        orders: update.sales.totalOrders,
        customers: update.customers.totalCustomers,
        inventory: update.inventory.totalProducts
      }))
    };
    
    const summaryPath = path.join(outputDir, 'yearly-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`\n📊 Generated ${updates.length} weekly updates for ${currentYear}`);
    console.log(`📁 Files saved to: ${outputDir}`);
    console.log(`📈 Total revenue across all weeks: $${updates.reduce((sum, u) => sum + u.sales.totalRevenue, 0).toLocaleString()}`);
    console.log(`👥 Total customers across all weeks: ${updates.reduce((sum, u) => sum + u.customers.totalCustomers, 0).toLocaleString()}`);
    
  } catch (error) {
    console.error('❌ Error generating weekly updates:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateWeeklyUpdate, generateYearlyUpdates };
