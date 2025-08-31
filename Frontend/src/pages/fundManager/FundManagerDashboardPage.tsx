import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';

const FundManagerDashboardPage: React.FC = () => {
  const fundManagerInfo = {
    name: 'Sarah Johnson',
    role: 'Senior Fund Manager',
    totalFundsManaged: 2500000.0,
  };

  const pendingRequests = [
    {
      id: 1,
      hospitalName: 'City General Hospital',
      amount: 5000.0,
      reason: 'Emergency equipment purchase',
      urgency: 'High',
      requestDate: '2024-01-15',
      hospitalId: 'HOSP001',
    },
    {
      id: 2,
      hospitalName: 'Regional Medical Center',
      amount: 8000.0,
      reason: 'Facility maintenance',
      urgency: 'Medium',
      requestDate: '2024-01-14',
      hospitalId: 'HOSP002',
    },
    {
      id: 3,
      hospitalName: 'Community Health Clinic',
      amount: 3000.0,
      reason: 'Staff training program',
      urgency: 'Low',
      requestDate: '2024-01-13',
      hospitalId: 'HOSP003',
    },
  ];

  const quickActions = [
    {
      title: 'Review Requests',
      description: 'Approve or reject pending fund requests',
      icon: '📋',
      path: '/fund-manager/approve-reject',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Transfer History',
      description: 'View all approved and rejected transfers',
      icon: '📊',
      path: '/fund-manager/transfer-history',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Analytics',
      description: 'View funding trends and statistics',
      icon: '📈',
      path: '#',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {fundManagerInfo.name}!</h1>
          <p className="text-gray-600 mt-2">Role: {fundManagerInfo.role}</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-blue-100">Total Funds Managed</h2>
                <p className="text-3xl font-bold mt-2">₹{fundManagerInfo.totalFundsManaged.toLocaleString()}</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-yellow-100">Pending Requests</h2>
                <p className="text-3xl font-bold mt-2">{pendingRequests.length}</p>
                <p className="text-yellow-100 mt-1">Awaiting review</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-green-100">This Month</h2>
                <p className="text-3xl font-bold mt-2">₹125,000</p>
                <p className="text-green-100 mt-1">Funds approved</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <Link key={action.path} to={action.path}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Pending Fund Requests */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Pending Fund Requests</h2>
              <Link to="/fund-manager/approve-reject">
                <Button>Review All</Button>
              </Link>
            </div>
            <Card>
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{request.hospitalName}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Amount: ₹{request.amount.toLocaleString()}</span>
                          <span>Date: {request.requestDate}</span>
                          <span>ID: {request.hospitalId}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{request.reason}</p>
                      </div>
                      <div className="text-right">
                        <Link to="/fund-manager/approve-reject">
                          <Button size="sm">Review</Button>
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">Request #{request.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Requests</h3>
                  <p className="text-gray-600 mb-4">All fund requests have been reviewed and processed.</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FundManagerDashboardPage;
