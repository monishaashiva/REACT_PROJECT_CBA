import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Heart, 
  Shield, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Pill,
  FileText,
  CreditCard
} from 'lucide-react';

interface PatientDetailsProps {
  patient: any;
  onBack: () => void;
  onRequestFunds: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onBack, onRequestFunds }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'medical' | 'wallet'>('overview');

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No patient data available</p>
        <button onClick={onBack} className="mt-4 text-green-600 hover:text-green-700">
          Go Back
        </button>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 mr-4"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient Details</h1>
                <p className="text-gray-600">Emergency medical information</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onRequestFunds}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200 flex items-center"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Request Funds
              </button>
            </div>
          </div>
        </div>

        {/* Patient Basic Info */}
        <div className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {patient.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
                  <p className="text-gray-600 mb-2">Patient ID: {patient.id}</p>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span>Age: {patient.age}</span>
                    <span>Blood Group: {patient.bloodGroup}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Phone Number</p>
                  <p className="text-gray-900 mb-3">{patient.phone}</p>
                  <div className="flex items-center text-green-600">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="text-sm">Verified Patient</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Wallet Balance</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(patient.wallet.balance)}</p>
                  <p className="text-xs text-gray-500">Last updated: {formatDateTime(patient.wallet.lastUpdated)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <div className="px-6">
            <div className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'medical', label: 'Medical Info', icon: Heart },
                { id: 'wallet', label: 'Wallet', icon: CreditCard }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Emergency Contacts */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-red-500" />
                  Emergency Contacts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patient.emergencyContacts.map((contact: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.relation}</p>
                          <p className="text-sm text-gray-800 mt-1">{contact.phone}</p>
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                          Call
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-200 border border-red-200">
                    <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-red-900">Emergency Alert</p>
                      <p className="text-sm text-red-700">Notify emergency contacts</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={onRequestFunds}
                    className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 border border-green-200"
                  >
                    <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-green-900">Request Funds</p>
                      <p className="text-sm text-green-700">Process emergency payment</p>
                    </div>
                  </button>
                  
                  <button className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 border border-blue-200">
                    <FileText className="w-8 h-8 text-blue-600 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-blue-900">View Records</p>
                      <p className="text-sm text-blue-700">Access full medical history</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="space-y-6">
              {/* Allergies */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Allergies (Critical)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalInfo.allergies.map((allergy: string, index: number) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-sm font-medium">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              {/* Medical Conditions */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Medical Conditions
                </h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  {patient.medicalInfo.conditions.map((condition: string, index: number) => (
                    <div key={index} className="flex items-center py-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      <span className="text-gray-800">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Medications */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Pill className="w-5 h-5 mr-2 text-blue-500" />
                  Current Medications
                </h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  {patient.medicalInfo.medications.map((medication: string, index: number) => (
                    <div key={index} className="flex items-center py-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-gray-800">{medication}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  Insurance Information
                </h4>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-900 font-medium">{patient.medicalInfo.insurance}</p>
                  <p className="text-green-700 text-sm mt-1">Active Coverage</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="space-y-6">
              {/* Balance Overview */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-green-100">Current Balance</h3>
                    <p className="text-3xl font-bold mt-2">{formatCurrency(patient.wallet.balance)}</p>
                    <p className="text-green-100 text-sm mt-1">
                      Last updated: {formatDateTime(patient.wallet.lastUpdated)}
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-300" />
                </div>
              </div>

              {/* Wallet Actions */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Wallet Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={onRequestFunds}
                    className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 border border-green-200"
                  >
                    <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-green-900">Request Emergency Funds</p>
                      <p className="text-sm text-green-700">Initiate fund transfer for treatment</p>
                    </div>
                  </button>
                  
                  <button className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 border border-blue-200">
                    <Clock className="w-8 h-8 text-blue-600 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-blue-900">Transaction History</p>
                      <p className="text-sm text-blue-700">View all wallet transactions</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Transaction Summary */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Recent Transactions</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-900">Insurance refund</p>
                        <p className="text-sm text-gray-600">July 28, 2025</p>
                      </div>
                      <span className="text-green-600 font-semibold">+₹500.00</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-900">Pharmacy purchase</p>
                        <p className="text-sm text-gray-600">July 31, 2025</p>
                      </div>
                      <span className="text-red-600 font-semibold">-₹250.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;