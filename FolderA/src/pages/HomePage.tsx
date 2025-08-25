import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';

const HomePage: React.FC = () => {
  const options = [
    {
      title: 'User Login / Signup',
      description: 'Access your personal dashboard, manage profile, and generate QR codes',
      icon: '👤',
      path: '/user/login',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Hospital Login',
      description: 'Manage hospital funds, scan QR codes, and request funding',
      icon: '🏥',
      path: '/hospital/login',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Fund Manager Login',
      description: 'Review and approve fund requests from hospitals',
      icon: '💰',
      path: '/fund-manager/login',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hospital Funding
            <span className="block text-primary-600">Platform</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Seamlessly connect patients, hospitals, and fund managers for efficient healthcare funding management.
            Choose your role below to get started.
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={option.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={option.path}>
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300`}>
                    {option.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {option.description}
                  </p>
                  <div className="mt-6">
                    <span className="inline-flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                      Get Started
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Secure</h3>
              <p className="text-gray-600">Quick transactions with bank-level security</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent</h3>
              <p className="text-gray-600">Full visibility into all transactions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Ready</h3>
              <p className="text-gray-600">Access from anywhere, anytime</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
