import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const HospitalLoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    hospitalId: '',
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

    if (!formData.hospitalId.trim()) {
      newErrors.hospitalId = 'Hospital ID is required';
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
      console.log('Hospital login:', formData);
      navigate('/hospital/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Hospital Login
            </h2>
            <p className="text-gray-600">
              Access your hospital dashboard and manage funds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Hospital ID"
              value={formData.hospitalId}
              onChange={(value) => handleInputChange('hospitalId', value)}
              placeholder="Enter your hospital ID"
              error={errors.hospitalId}
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
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default HospitalLoginPage;
