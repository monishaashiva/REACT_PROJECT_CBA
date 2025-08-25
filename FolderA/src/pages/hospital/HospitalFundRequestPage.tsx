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
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would submit to an API
      console.log('Fund request submitted:', formData);
      
      setIsSubmitting(false);
      alert('Fund request submitted successfully!');
      navigate('/hospital/dashboard');
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fund Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Fund Request Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Amount ($)"
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
                            formData.urgency === option.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${option.color}`}>
                            {option.label}
                          </span>
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
                  <Button
                    type="submit"
                    className="flex-1"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    size="lg"
                    onClick={() => navigate('/hospital/dashboard')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>

          {/* Information Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Guidelines</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Urgency Levels</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li><span className="font-medium">Low:</span> Non-critical, can wait 1-2 weeks</li>
                    <li><span className="font-medium">Medium:</span> Important, needed within 1 week</li>
                    <li><span className="font-medium">High:</span> Critical, needed immediately</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">What to Include</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Clear reason for funding</li>
                    <li>• Detailed description of use</li>
                    <li>• Realistic timeline</li>
                    <li>• Supporting documentation if available</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Processing Time</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Low urgency: 3-5 business days</li>
                    <li>• Medium urgency: 1-3 business days</li>
                    <li>• High urgency: Same day or next day</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HospitalFundRequestPage;
