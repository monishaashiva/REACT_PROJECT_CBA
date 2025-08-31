import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    setAuthError('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLogin) {
        // Login API call
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('registeredUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/user/dashboard');
      } else {
        // Signup API call
        await axios.post('http://localhost:5000/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert('Registration successful! Please log in.');
        setIsLogin(true);
        setFormData({ email: '', password: '', confirmPassword: '', name: '' });
      }
    } catch (error: any) {
      if (error.response) {
        setAuthError(error.response.data.message || 'Authentication error');
      } else {
        setAuthError('Network error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-600">{isLogin ? 'Sign in to your account' : 'Sign up for a new account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            />
          )}

          {authError && <p className="text-red-600 text-sm text-center">{authError}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
