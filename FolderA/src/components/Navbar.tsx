import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Hospital Funding
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/user/login"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/user/login') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              User Login
            </Link>
            <Link
              to="/hospital/login"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/hospital/login') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              Hospital Login
            </Link>
            <Link
              to="/fund-manager/login"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/fund-manager/login') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              Fund Manager
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/user/login"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/user/login') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              User Login
            </Link>
            <Link
              to="/hospital/login"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/hospital/login') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hospital Login
            </Link>
            <Link
              to="/fund-manager/login"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/fund-manager/login') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fund Manager
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
