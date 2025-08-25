import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';

const UserDashboardPage: React.FC = () => {
  // Mock data
  const walletBalance = 2500.00;
  const recentTransactions = [
    {
      id: 1,
      type: 'credit',
      amount: 500.00,
      description: 'Fund transfer from Hospital A',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: 150.00,
      description: 'Payment to Hospital B',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 1000.00,
      description: 'Insurance claim processed',
      date: '2024-01-12',
      status: 'completed'
    }
  ];

  const quickActions = [
    {
      title: 'Generate QR Code',
      description: 'Create a QR code for hospital payments',
      icon: '📱',
      path: '/user/qr-generator',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Update Profile',
      description: 'Edit your personal information',
      icon: '👤',
      path: '/user/profile',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'View History',
      description: 'Check your transaction history',
      icon: '📊',
      path: '#',
      color: 'from-purple-500 to-purple-600'
    }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your account today.</p>
        </motion.div>

        {/* Wallet Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-primary-100">Wallet Balance</h2>
                <p className="text-4xl font-bold mt-2">${walletBalance.toFixed(2)}</p>
                <p className="text-primary-100 mt-1">Available for healthcare expenses</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
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
              {quickActions.map((action, index) => (
                <Link key={action.path} to={action.path}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
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

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <Card>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <svg className={`w-5 h-5 ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                            transaction.type === 'credit' 
                              ? "M7 11l5-5m0 0l5 5m-5-5v12" 
                              : "M17 13l-5 5m0 0l-5-5m5 5V6"
                          } />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
