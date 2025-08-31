import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const HospitalFundRequestPage: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
    urgency: 'medium',
    description: '',
    expectedDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.expectedDate.trim()) {
      newErrors.expectedDate = 'Expected date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authentication token not found. Please login again.');
        setIsSubmitting(false);
        return;
      }
      const response = await fetch('http://localhost:5000/api/hospital/fund-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: Number(formData.amount),
          reason: formData.reason,
          description: formData.description,
          urgency: formData.urgency,
          expectedDate: formData.expectedDate
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit request');
      }
      alert('Fund request submitted successfully!');
      navigate('/hospital/dashboard', { state: { reload: true } }); // Reload dashboard
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const urgencyOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600 bg-green-100' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600 bg-yellow-100' },
    { value: 'high', label: 'High', color: 'text-red-600 bg-red-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Request Funds</h1>
              <p className="text-gray-600 mt-2">Submit a new fund request for hospital operations.</p>
            </div>
            <Link to="/hospital/dashboard">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
          </div>
        </motion.div>
        {/* Fund Request Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Fund Request Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Amount (₹)"
                  type="number"
                  value={formData.amount}
                  onChange={(value) => handleInputChange('amount', value)}
                  placeholder="Enter amount needed"
                  error={errors.amount}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {urgencyOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange('urgency', option.value)}
                        className={`p-3 text-center rounded-lg border-2 transition-colors ${
                          formData.urgency === option.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${option.color}`}>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Input
                label="Reason for Request"
                value={formData.reason}
                onChange={(value) => handleInputChange('reason', value)}
                placeholder="Brief reason for funding request"
                error={errors.reason}
                required
              />
              <Input
                label="Detailed Description"
                value={formData.description}
                onChange={(value) => handleInputChange('description', value)}
                placeholder="Provide detailed description of how funds will be used"
                error={errors.description}
                required
              />
              <Input
                label="Expected Date Needed"
                type="date"
                value={formData.expectedDate}
                onChange={(value) => handleInputChange('expectedDate', value)}
                error={errors.expectedDate}
                required
              />
              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
                <Button type="button" variant="outline" className="flex-1" size="lg" onClick={() => navigate('/hospital/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalFundRequestPage;
