import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const UserLoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
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

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Mock login/signup - in real app, this would call an API
      console.log('Form submitted:', formData);
      navigate('/user/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="Enter your full name"
                error={errors.name}
                required
              />
            )}

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              error={errors.email}
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

            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(value) => handleInputChange('confirmPassword', value)}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                required
              />
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserLoginPage;
