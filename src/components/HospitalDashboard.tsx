import React, { useState } from 'react';
import { 
  Building2, 
  QrCode, 
  Users, 
  Activity, 
  DollarSign, 
  LogOut, 
  Search,
  Bell,
  Settings,
  Shield,
  Clock,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import QRScanner from './QRScanner';
import PatientDetails from './PatientDetails';
import FundRequest from './FundRequest';
import FundRequestManager from './FundRequestManager';
import PatientSearch from './PatientSearch';
import Analytics from './Analytics';
import { useNotifications } from '../contexts/NotificationContext';

interface HospitalDashboardProps {
  hospitalData: any;
  onLogout: () => void;
}

const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ hospitalData, onLogout }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'scanner' | 'patient' | 'funds' | 'requests' | 'search' | 'analytics'>('dashboard');
  const [scannedPatient, setScannedPatient] = useState(null);
  const { addNotification } = useNotifications();

  const stats = [
    { title: 'Patients Scanned Today', value: '23', icon: Users, color: 'bg-blue-500' },
    { title: 'Emergency Requests', value: '7', icon: Activity, color: 'bg-red-500' },
    { title: 'Fund Transfers', value: '₹45,250', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Active Sessions', value: '12', icon: Clock, color: 'bg-orange-500' },
  ];

  // Mock pending fund requests
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 'REQ001',
      patientName: 'Sarah Johnson',
      patientId: 'PAT001',
      amount: 5000,
      purpose: 'Emergency Surgery',
      urgency: 'critical',
      requestedBy: 'Dr. Smith',
      department: 'Emergency',
      timestamp: '2025-01-15T14:30:00Z',
      description: 'Patient requires immediate cardiac surgery. Insurance pre-approval pending.',
      status: 'pending'
    },
    {
      id: 'REQ002',
      patientName: 'Michael Brown',
      patientId: 'PAT002',
      amount: 1500,
      purpose: 'Diagnostic Tests',
      urgency: 'high',
      requestedBy: 'Dr. Patel',
      department: 'Cardiology',
      timestamp: '2025-01-15T13:45:00Z',
      description: 'MRI and blood work required for diagnosis.',
      status: 'pending'
    },
    {
      id: 'REQ003',
      patientName: 'Emily Davis',
      patientId: 'PAT003',
      amount: 800,
      purpose: 'Medication',
      urgency: 'medium',
      requestedBy: 'Dr. Wilson',
      department: 'Pharmacy',
      timestamp: '2025-01-15T12:20:00Z',
      description: 'Specialized medication for chronic condition.',
      status: 'pending'
    }
  ]);
  const recentActivity = [
    { type: 'scan', patient: 'John Doe', time: '10:30 AM', amount: null },
    { type: 'fund', patient: 'Jane Smith', time: '10:15 AM', amount: '₹2,500' },
    { type: 'emergency', patient: 'Robert Wilson', time: '09:45 AM', amount: '₹5,000' },
    { type: 'scan', patient: 'Mary Johnson', time: '09:30 AM', amount: null },
  ];

  const handleQRScan = (patientData: any) => {
    setScannedPatient(patientData);
    setActiveView('patient');
    addNotification({
      type: 'success',
      title: 'QR Code Scanned',
      message: `Successfully loaded ${patientData.name}'s medical records`
    });
  };

  const handleRequestAction = (requestId: string, action: 'approve' | 'reject', reason?: string) => {
    setPendingRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' }
          : req
      )
    );
    
    const request = pendingRequests.find(r => r.id === requestId);
    addNotification({
      type: action === 'approve' ? 'success' : 'info',
      title: `Request ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      message: `Fund request for ${request?.patientName} has been ${action}d`
    });
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'scanner':
        return <QRScanner onScanSuccess={handleQRScan} />;
      case 'patient':
        return (
          <PatientDetails 
            patient={scannedPatient} 
            onBack={() => setActiveView('dashboard')}
            onRequestFunds={() => setActiveView('funds')}
          />
        );
      case 'funds':
        return (
          <FundRequest 
            patient={scannedPatient}
            hospitalData={hospitalData}
            onBack={() => setActiveView('patient')}
          />
        );
      case 'requests':
        return (
          <FundRequestManager 
            requests={pendingRequests}
            onRequestAction={handleRequestAction}
          />
        );
      case 'search':
        return <PatientSearch onPatientSelect={handleQRScan} />;
      case 'analytics':
        return <Analytics hospitalData={hospitalData} />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveView('scanner')}
                  className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 border border-green-200"
                >
                  <QrCode className="w-8 h-8 text-green-600 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold text-green-900">Scan Patient QR</p>
                    <p className="text-sm text-green-700">Access patient records</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveView('requests')}
                  className="flex items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors duration-200 border border-orange-200"
                >
                  <FileText className="w-8 h-8 text-orange-600 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold text-orange-900">Fund Requests</p>
                    <p className="text-sm text-orange-700">Manage pending requests</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveView('search')}
                  className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 border border-blue-200"
                >
                  <Search className="w-8 h-8 text-blue-600 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold text-blue-900">Patient Search</p>
                    <p className="text-sm text-blue-700">Find patient records</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveView('analytics')}
                  className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200 border border-purple-200"
                >
                  <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold text-purple-900">Analytics</p>
                    <p className="text-sm text-purple-700">View reports & insights</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${
                          activity.type === 'scan' ? 'bg-blue-100' :
                          activity.type === 'fund' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {activity.type === 'scan' ? (
                            <QrCode className={`w-5 h-5 ${
                              activity.type === 'scan' ? 'text-blue-600' : ''
                            }`} />
                          ) : activity.type === 'fund' ? (
                            <DollarSign className="w-5 h-5 text-green-600" />
                          ) : (
                            <Activity className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.patient}</p>
                          <p className="text-sm text-gray-600">
                            {activity.type === 'scan' ? 'QR Scanned' : 
                             activity.type === 'fund' ? 'Fund Transfer' : 'Emergency Request'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{activity.time}</p>
                        {activity.amount && (
                          <p className="text-sm font-semibold text-green-600">{activity.amount}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Fund Requests */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pending Requests</h3>
                  <button 
                    onClick={() => setActiveView('requests')}
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                  >
                    View All ({pendingRequests.filter(r => r.status === 'pending').length})
                  </button>
                </div>
                <div className="space-y-3">
                  {pendingRequests.filter(r => r.status === 'pending').slice(0, 3).map((request) => (
                    <div key={request.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{request.patientName}</p>
                          <p className="text-sm text-gray-600">{request.purpose}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₹{request.amount.toLocaleString()}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            request.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                            request.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.urgency}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleRequestAction(request.id, 'approve')}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRequestAction(request.id, 'reject')}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Hospital Info */}
            <div className="flex items-center">
              <div className="flex items-center bg-green-600 rounded-xl p-2 mr-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{hospitalData.name}</h1>
                <p className="text-sm text-gray-600">{hospitalData.department}</p>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                <Bell className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                <Settings className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{hospitalData.email}</p>
                  <p className="text-xs text-gray-600">{hospitalData.role}</p>
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'scanner', label: 'QR Scanner', icon: QrCode },
              { id: 'requests', label: 'Fund Requests', icon: FileText },
              { id: 'search', label: 'Patient Search', icon: Search },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeView === tab.id
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

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default HospitalDashboard;