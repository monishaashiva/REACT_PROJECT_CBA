import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  Download,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface AnalyticsProps {
  hospitalData: any;
}

const Analytics: React.FC<AnalyticsProps> = ({ hospitalData }) => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('month');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalPatients: 1247,
      totalFunds: 2450000,
      totalRequests: 89,
      averageRequestAmount: 2750,
      successRate: 94.2,
      responseTime: 12 // minutes
    },
    trends: {
      patients: [
        { month: 'Jan', count: 98 },
        { month: 'Feb', count: 112 },
        { month: 'Mar', count: 125 },
        { month: 'Apr', count: 134 },
        { month: 'May', count: 142 },
        { month: 'Jun', count: 156 }
      ],
      funds: [
        { month: 'Jan', amount: 185000 },
        { month: 'Feb', amount: 220000 },
        { month: 'Mar', amount: 195000 },
        { month: 'Apr', amount: 275000 },
        { month: 'May', amount: 310000 },
        { month: 'Jun', amount: 285000 }
      ],
      requests: [
        { month: 'Jan', approved: 12, rejected: 2, pending: 1 },
        { month: 'Feb', approved: 15, rejected: 1, pending: 2 },
        { month: 'Mar', approved: 18, rejected: 3, pending: 0 },
        { month: 'Apr', approved: 22, rejected: 2, pending: 1 },
        { month: 'May', approved: 19, rejected: 1, pending: 3 },
        { month: 'Jun', approved: 16, rejected: 2, pending: 2 }
      ]
    },
    departments: [
      { name: 'Emergency', requests: 34, amount: 850000, avgTime: 8 },
      { name: 'Cardiology', requests: 18, amount: 450000, avgTime: 15 },
      { name: 'Surgery', requests: 12, amount: 720000, avgTime: 22 },
      { name: 'Pediatrics', requests: 15, amount: 280000, avgTime: 12 },
      { name: 'Orthopedics', requests: 10, amount: 150000, avgTime: 18 }
    ],
    urgencyBreakdown: [
      { level: 'Critical', count: 23, percentage: 26 },
      { level: 'High', count: 31, percentage: 35 },
      { level: 'Medium', count: 25, percentage: 28 },
      { level: 'Low', count: 10, percentage: 11 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getUrgencyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Hospital performance insights and metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Total Patients</p>
                <p className="text-2xl font-bold text-blue-800">{analyticsData.overview.totalPatients.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Total Funds</p>
                <p className="text-2xl font-bold text-green-800">{formatCurrency(analyticsData.overview.totalFunds)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Total Requests</p>
                <p className="text-2xl font-bold text-purple-800">{analyticsData.overview.totalRequests}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Avg Request</p>
                <p className="text-2xl font-bold text-orange-800">{formatCurrency(analyticsData.overview.averageRequestAmount)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700">Success Rate</p>
                <p className="text-2xl font-bold text-emerald-800">{analyticsData.overview.successRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">Avg Response</p>
                <p className="text-2xl font-bold text-red-800">{analyticsData.overview.responseTime}m</p>
              </div>
              <Clock className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance & Urgency Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
          <div className="space-y-4">
            {analyticsData.departments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{dept.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{dept.requests} requests</span>
                    <span>{formatCurrency(dept.amount)}</span>
                    <span>{dept.avgTime}m avg</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-blue-600 rounded-full" 
                      style={{ width: `${(dept.requests / 34) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Urgency Breakdown</h3>
          <div className="space-y-4">
            {analyticsData.urgencyBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${getUrgencyColor(item.level)}`}></div>
                  <span className="font-medium text-gray-900">{item.level}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{item.count} requests</span>
                  <span className="font-semibold text-gray-900">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <p className="font-semibold text-blue-900">Critical Requests Priority</p>
                <p className="text-sm text-blue-700">61% of requests are high or critical priority</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Patient Registration</h4>
            <div className="space-y-2">
              {analyticsData.trends.patients.slice(-3).map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.month}</span>
                  <span className="font-semibold text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Fund Requests</h4>
            <div className="space-y-2">
              {analyticsData.trends.funds.slice(-3).map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.month}</span>
                  <span className="font-semibold text-green-600">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Request Status</h4>
            <div className="space-y-2">
              {analyticsData.trends.requests.slice(-3).map((item, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{item.month}</span>
                    <div className="flex space-x-2">
                      <span className="text-green-600">{item.approved}✓</span>
                      <span className="text-red-600">{item.rejected}✗</span>
                      <span className="text-yellow-600">{item.pending}⏳</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
