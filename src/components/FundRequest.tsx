import React, { useState } from 'react';
import { 
  ArrowLeft, 
  DollarSign, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  FileText,
  User,
  Building2,
  CreditCard,
  Shield
} from 'lucide-react';

interface FundRequestProps {
  patient: any;
  hospitalData: any;
  onBack: () => void;
}

const FundRequest: React.FC<FundRequestProps> = ({ patient, hospitalData, onBack }) => {
  const [requestData, setRequestData] = useState({
    amount: '',
    purpose: 'emergency_treatment',
    description: '',
    urgency: 'high',
    estimatedTime: '30'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  const purposes = [
    { value: 'emergency_treatment', label: 'Emergency Treatment', color: 'text-red-600' },
    { value: 'surgery', label: 'Surgery', color: 'text-orange-600' },
    { value: 'medication', label: 'Medication', color: 'text-blue-600' },
    { value: 'diagnostic', label: 'Diagnostic Tests', color: 'text-purple-600' },
    { value: 'consultation', label: 'Consultation', color: 'text-green-600' },
    { value: 'other', label: 'Other', color: 'text-gray-600' }
  ];

  const urgencyLevels = [
    { value: 'critical', label: 'Critical', color: 'bg-red-500', textColor: 'text-red-700' },
    { value: 'high', label: 'High', color: 'bg-orange-500', textColor: 'text-orange-700' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    { value: 'low', label: 'Low', color: 'bg-green-500', textColor: 'text-green-700' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setRequestData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newRequestId = `REQ${Date.now()}`;
      setRequestId(newRequestId);
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const formatCurrency = (amount: string) => {
    if (!amount) return '₹0.00';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(parseFloat(amount) || 0);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fund Request Submitted</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Your emergency fund request has been successfully submitted and is being processed.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Request ID:</span>
                <span className="font-semibold text-gray-900">{requestId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-green-600">{formatCurrency(requestData.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-semibold text-gray-900">{patient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Time:</span>
                <span className="font-semibold text-gray-900">{requestData.estimatedTime} minutes</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              Back to Patient
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setRequestData({
                  amount: '',
                  purpose: 'emergency_treatment',
                  description: '',
                  urgency: 'high',
                  estimatedTime: '30'
                });
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              New Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 mr-4"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Emergency Fund Request</h1>
              <p className="text-gray-600">Request funds from patient's wallet for medical expenses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit}>
          {/* Patient & Hospital Info */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Patient Information</h4>
                </div>
                <div className="space-y-2">
                  <p><span className="text-gray-600">Name:</span> <span className="font-medium">{patient.name}</span></p>
                  <p><span className="text-gray-600">ID:</span> <span className="font-medium">{patient.id}</span></p>
                  <p><span className="text-gray-600">Wallet Balance:</span> <span className="font-medium text-green-600">₹{patient.wallet.balance}</span></p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <Building2 className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Hospital Information</h4>
                </div>
                <div className="space-y-2">
                  <p><span className="text-gray-600">Hospital:</span> <span className="font-medium">{hospitalData.name}</span></p>
                  <p><span className="text-gray-600">Department:</span> <span className="font-medium">{hospitalData.department}</span></p>
                  <p><span className="text-gray-600">Staff:</span> <span className="font-medium">{hospitalData.email}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Amount and Purpose */}
          <div className="p-6 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="amount"
                    value={requestData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="1"
                    max={patient.wallet.balance}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Available: {formatCurrency(patient.wallet.balance.toString())}
                </p>
                {requestData.amount && (
                  <p className="text-sm font-medium text-green-600 mt-1">
                    Requesting: {formatCurrency(requestData.amount)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <select
                  name="purpose"
                  value={requestData.purpose}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {purposes.map((purpose) => (
                    <option key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Urgency and Timeline */}
          <div className="p-6 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Urgency Level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {urgencyLevels.map((level) => (
                    <label key={level.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={requestData.urgency === level.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-3 border-2 rounded-xl text-center transition-all duration-200 ${
                        requestData.urgency === level.value 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className={`w-3 h-3 ${level.color} rounded-full mx-auto mb-1`}></div>
                        <span className={`text-sm font-medium ${level.textColor}`}>{level.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Processing Time (minutes)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="estimatedTime"
                    value={requestData.estimatedTime}
                    onChange={handleInputChange}
                    placeholder="30"
                    min="5"
                    max="240"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Estimated time for fund approval</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Details
            </label>
            <textarea
              name="description"
              value={requestData.description}
              onChange={handleInputChange}
              placeholder="Provide additional details about the medical requirement..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Security Notice */}
          <div className="p-6 border-b border-gray-100">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Security & Compliance</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• All fund requests are logged and auditable</li>
                    <li>• Patient consent is implied through QR code scan</li>
                    <li>• Transactions are secured with hospital authentication</li>
                    <li>• Emergency protocols allow immediate processing for critical cases</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting || !requestData.amount}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Request...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Submit Fund Request
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FundRequest;