import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const FundManagerLoginPage: React.FC = () => {
  //const [formData, setFormData] = useState({ username: '', password: '' });
  const [formData, setFormData] = useState({ email: '', password: '' });

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
    if (!formData.email.trim()) {
  newErrors.email = 'Email is required';
}

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      email: formData.email,  // send email now
      password: formData.password,
    }),
});


      if (!response.ok) {
        const errData = await response.json();
        setErrors({ password: errData.message || 'Invalid credentials' });
        return;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('fundManagerToken', data.token);
        navigate('/fund-manager/dashboard');
      } else {
        setErrors({ password: 'Login failed: invalid response' });
      }
    } catch {
      setErrors({ password: 'Network error, please try again' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Fund Manager Login</h2>
            <p className="text-gray-600">Access fund management dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
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
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default FundManagerLoginPage;
