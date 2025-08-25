import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';

const HospitalDashboardPage: React.FC = () => {
  // Mock data
  const hospitalInfo = {
    name: 'City General Hospital',
    id: 'HOSP001',
    walletBalance: 125000.00
  };

  const pendingFundRequests = [
    {
      id: 1,
      amount: 5000.00,
      reason: 'Emergency equipment purchase',
      urgency: 'High',
      date: '2024-01-15',
      status: 'Pending'
    },
    {
      id: 2,
      amount: 2500.00,
      reason: 'Medical supplies restocking',
      urgency: 'Medium',
      date: '2024-01-14',
      status: 'Pending'
    },
    {
      id: 3,
      amount: 8000.00,
      reason: 'Facility maintenance',
      urgency: 'Low',
      date: '2024-01-13',
      status: 'Pending'
    }
  ];

  const quickActions = [
    {
      title: 'Scan QR Code',
      description: 'Scan patient QR codes for payments',
      icon: '📱',
      path: '/hospital/qr-scanner',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Request Funds',
      description: 'Submit new fund requests',
      icon: '💰',
      path: '/hospital/fund-request',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'View Transfers',
      description: 'Check fund transfer status',
      icon: '📊',
      path: '/hospital/fund-transfer-details',
      color: 'from-purple-500 to-purple-600'
    }
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {hospitalInfo.name}!</h1>
          <p className="text-gray-600 mt-2">Hospital ID: {hospitalInfo.id}</p>
        </motion.div>

        {/* Wallet Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-green-100">Hospital Wallet Balance</h2>
                <p className="text-4xl font-bold mt-2">${hospitalInfo.walletBalance.toLocaleString()}</p>
                <p className="text-green-100 mt-1">Available for hospital operations</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
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
                        <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Pending Fund Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Pending Fund Requests</h2>
              <Link to="/hospital/fund-request">
                <Button>New Request</Button>
              </Link>
            </div>
            <Card>
              {pendingFundRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingFundRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{request.reason}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Amount: ${request.amount.toLocaleString()}</span>
                          <span>Date: {request.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {request.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">Request #{request.id}</p>
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
                  <p className="text-gray-600 mb-4">
                    You don't have any pending fund requests at the moment.
                  </p>
                  <Link to="/hospital/fund-request">
                    <Button>Create First Request</Button>
                  </Link>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboardPage;
