import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

const UserQRGeneratorPage: React.FC = () => {
  const [qrData, setQrData] = useState({
    amount: '',
    description: '',
    hospitalId: ''
  });
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setQrData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!qrData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(qrData.amount)) || Number(qrData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!qrData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!qrData.hospitalId.trim()) {
      newErrors.hospitalId = 'Hospital ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateQR = () => {
    if (validateForm()) {
      // Mock QR code generation - in real app, this would use a QR library
      const mockQRData = JSON.stringify({
        userId: 'USER123',
        amount: qrData.amount,
        description: qrData.description,
        hospitalId: qrData.hospitalId,
        timestamp: new Date().toISOString(),
        type: 'payment_request'
      });
      
      // Create a simple mock QR code representation
      setGeneratedQR(mockQRData);
    }
  };

  const downloadQR = () => {
    if (generatedQR) {
      // In a real app, this would download the actual QR code image
      const element = document.createElement('a');
      const file = new Blob([generatedQR], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'payment-qr.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const clearQR = () => {
    setGeneratedQR(null);
    setQrData({ amount: '', description: '', hospitalId: '' });
    setErrors({});
  };

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
              <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
              <p className="text-gray-600 mt-2">Generate QR codes for hospital payments and fund transfers.</p>
            </div>
            <Link to="/user/dashboard">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Generation Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
              
              <div className="space-y-6">
                <Input
                  label="Amount ($)"
                  value={qrData.amount}
                  onChange={(value) => handleInputChange('amount', value)}
                  placeholder="Enter payment amount"
                  error={errors.amount}
                  required
                />

                <Input
                  label="Description"
                  value={qrData.description}
                  onChange={(value) => handleInputChange('description', value)}
                  placeholder="Payment purpose or description"
                  error={errors.description}
                  required
                />

                <Input
                  label="Hospital ID"
                  value={qrData.hospitalId}
                  onChange={(value) => handleInputChange('hospitalId', value)}
                  placeholder="Enter hospital identifier"
                  error={errors.hospitalId}
                  required
                />

                <div className="flex space-x-3">
                  <Button onClick={generateQR} className="flex-1">
                    Generate QR Code
                  </Button>
                  <Button variant="outline" onClick={clearQR} className="flex-1">
                    Clear
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">How it works:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Enter payment details above</li>
                  <li>• Generate a unique QR code</li>
                  <li>• Hospital scans the QR code</li>
                  <li>• Payment is processed automatically</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* QR Code Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Generated QR Code</h2>
              
              {generatedQR ? (
                <div className="text-center">
                  {/* Mock QR Code Display */}
                  <div className="w-64 h-64 mx-auto mb-6 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto bg-white rounded-lg shadow-inner flex items-center justify-center mb-2">
                        <div className="grid grid-cols-8 gap-1">
                          {Array.from({ length: 64 }, (_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-sm ${
                                Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Mock QR Code</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={downloadQR} className="w-full">
                      Download QR Code
                    </Button>
                    <Button variant="outline" onClick={clearQR} className="w-full">
                      Generate New QR
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                    <h3 className="font-medium text-gray-900 mb-2">QR Code Data:</h3>
                    <p className="text-xs text-gray-600 font-mono break-all">
                      {generatedQR}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No QR Code Generated</h3>
                  <p className="text-gray-600">
                    Fill out the form on the left to generate a QR code for hospital payments.
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserQRGeneratorPage;
