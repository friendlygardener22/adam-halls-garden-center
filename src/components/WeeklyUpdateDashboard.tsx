'use client';

import React, { useState } from 'react';
import { useWeeklyUpdates, useWeeklyUpdate } from '../hooks/useWeeklyUpdates';
import { WeeklyMetrics, WeeklyUpdateSummary } from '../types/weekly-updates';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  MinusIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  MegaphoneIcon,
  SunIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

interface WeeklyUpdateDashboardProps {
  weekNumber?: number;
  year?: number;
}

export default function WeeklyUpdateDashboard({ 
  weekNumber, 
  year 
}: WeeklyUpdateDashboardProps) {
  const [selectedWeek, setSelectedWeek] = useState<{ week: number; year: number }>({
    week: weekNumber || 1,
    year: year || new Date().getFullYear()
  });

  const { updates, loading, generateSampleData } = useWeeklyUpdates();
  const { update, summary, loading: updateLoading } = useWeeklyUpdate(selectedWeek.week, selectedWeek.year);

  const handleWeekChange = (week: number, year: number) => {
    setSelectedWeek({ week, year });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />;
      case 'down':
        return <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />;
      default:
        return <MinusIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading || updateLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!update) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-4">No weekly update found</h3>
        <button
          onClick={() => generateSampleData()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Generate Sample Data
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Weekly Update Dashboard
            </h1>
            <p className="text-gray-600">
              Week {update.weekNumber}, {update.year} ({new Date(update.weekStart).toLocaleDateString()} - {new Date(update.weekEnd).toLocaleDateString()})
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-6 h-6 text-green-600" />
            <span className="text-sm text-gray-500">Generated: {new Date(update.generatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Week Selector */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Select Week:</label>
          <select
            value={`${selectedWeek.year}-${selectedWeek.week}`}
            onChange={(e) => {
              const [year, week] = e.target.value.split('-').map(Number);
              handleWeekChange(week, year);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            aria-label="Select week for weekly update"
          >
            {updates.map((u) => (
              <option key={`${u.year}-${u.weekNumber}`} value={`${u.year}-${u.weekNumber}`}>
                Week {u.weekNumber}, {u.year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(update.sales.totalRevenue)}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
          change={summary?.revenueGrowth}
          trend={summary?.revenueGrowth ? (summary.revenueGrowth > 0 ? 'up' : summary.revenueGrowth < 0 ? 'down' : 'stable') : 'stable'}
        />

        {/* Orders */}
        <MetricCard
          title="Total Orders"
          value={update.sales.totalOrders.toString()}
          icon={<ShoppingBagIcon className="w-6 h-6" />}
          subtitle={`Avg: ${formatCurrency(update.sales.averageOrderValue)}`}
        />

        {/* Customers */}
        <MetricCard
          title="Total Customers"
          value={update.customers.totalCustomers.toString()}
          icon={<UsersIcon className="w-6 h-6" />}
          change={summary?.customerGrowth}
          trend={summary?.customerGrowth ? (summary.customerGrowth > 0 ? 'up' : summary.customerGrowth < 0 ? 'down' : 'stable') : 'stable'}
        />

        {/* Inventory */}
        <MetricCard
          title="Products in Stock"
          value={update.inventory.totalProducts.toString()}
          icon={<ClipboardDocumentListIcon className="w-6 h-6" />}
          subtitle={`${update.inventory.outOfStock} out of stock`}
        />
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ChartBarIcon className="w-5 h-5 text-green-600 mr-2" />
            Sales Performance
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Top Selling Products</h4>
              <div className="space-y-2">
                {update.sales.topSellingProducts.map((product, index) => (
                  <div key={product.productId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{product.name}</span>
                      <span className="text-xs text-gray-500">({product.category})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700">{product.unitsSold} sold</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(product.revenue)}</span>
                      {getTrendIcon(product.change)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Sales by Category</h4>
              <div className="space-y-2">
                {update.sales.salesByCategory.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-900">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700">{category.unitsSold} units</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(category.revenue)}</span>
                      <span className={`text-xs ${category.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(category.change)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ClipboardDocumentListIcon className="w-5 h-5 text-blue-600 mr-2" />
            Inventory Status
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">{update.inventory.totalProducts}</div>
                <div className="text-sm text-green-700">Total Products</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">{update.inventory.newProducts}</div>
                <div className="text-sm text-blue-700">New This Week</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded">
                <div className="text-2xl font-bold text-red-600">{update.inventory.outOfStock}</div>
                <div className="text-sm text-red-700">Out of Stock</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded">
                <div className="text-2xl font-bold text-yellow-600">{update.inventory.lowStock}</div>
                <div className="text-sm text-yellow-700">Low Stock</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Seasonal Trends</h4>
              <div className="space-y-2">
                {update.inventory.seasonalTrends.map((trend, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{trend.category}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getTrendColor(trend.trend)}`}>
                        {trend.trend}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{trend.reason}</p>
                    <p className="text-xs text-gray-500">Duration: {trend.expectedDuration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Action Items */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CogIcon className="w-5 h-5 text-purple-600 mr-2" />
            Action Items
          </h3>
          
          <div className="space-y-3">
            {update.notes.actionItems.map((item) => (
              <div key={item.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.description}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Assigned to: {item.assignedTo}</p>
                  <p>Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                  <p>Status: <span className={`font-medium ${
                    item.status === 'completed' ? 'text-green-600' :
                    item.status === 'in-progress' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>{item.status}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Week Goals */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUpIcon className="w-5 h-5 text-indigo-600 mr-2" />
            Next Week Goals
          </h3>
          
          <div className="space-y-3">
            {update.notes.nextWeekGoals.map((goal, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-indigo-900">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Impact */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SunIcon className="w-5 h-5 text-yellow-600 mr-2" />
          Weather Impact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{update.weather.averageTemperature}°F</div>
            <div className="text-sm text-gray-600">Average Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{update.weather.rainfall}"</div>
            <div className="text-sm text-gray-600">Total Rainfall</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{update.weather.sunnyDays}</div>
            <div className="text-sm text-gray-600">Sunny Days</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900"><strong>Impact on Sales:</strong> {update.weather.impactOnSales}</p>
          <p className="text-sm text-blue-700 mt-1">{update.weather.seasonalNotes}</p>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

function MetricCard({ title, value, icon, subtitle, change, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {change !== undefined && (
            <div className="flex items-center mt-1">
              {getTrendIcon(trend || 'stable')}
              <span className={`text-sm font-medium ml-1 ${getTrendColor(trend || 'stable')}`}>
                {change > 0 ? '+' : ''}{change.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );
}

function getTrendIcon(trend: 'up' | 'down' | 'stable') {
  switch (trend) {
    case 'up':
      return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
    case 'down':
      return <TrendingDownIcon className="w-4 h-4 text-red-500" />;
    default:
      return <MinusIcon className="w-4 h-4 text-gray-500" />;
  }
}

function getTrendColor(trend: 'up' | 'down' | 'stable') {
  switch (trend) {
    case 'up':
      return 'text-green-600';
    case 'down':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}
