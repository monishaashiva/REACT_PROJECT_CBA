import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const FundManagerLoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Mock login - in real app, this would call an API
      console.log('Fund Manager login:', formData);
      navigate('/fund-manager/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Fund Manager Login
            </h2>
            <p className="text-gray-600">
              Access fund management dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              value={formData.username}
              onChange={(value) => handleInputChange('username', value)}
              placeholder="Enter your username"
              error={errors.username}
              required
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              placeholder="Enter your password"
              error={errors.password}
              required
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default FundManagerLoginPage;
