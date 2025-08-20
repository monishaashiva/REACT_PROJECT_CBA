import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Phone, 
  Calendar, 
  Heart, 
  DollarSign, 
  Eye,
  Filter,
  UserCheck,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  phone: string;
  emergencyContacts: Array<{
    name: string;
    relation: string;
    phone: string;
  }>;
  medicalInfo: {
    allergies: string[];
    conditions: string[];
    medications: string[];
    insurance: string;
  };
  wallet: {
    balance: number;
    lastUpdated: string;
  };
  lastVisit?: string;
  status: 'active' | 'inactive' | 'emergency';
}

interface PatientSearchProps {
  onPatientSelect: (patient: Patient) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ onPatientSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'emergency'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock patient data
  const mockPatients: Patient[] = [
    {
      id: 'PAT001',
      name: 'John Doe',
      age: 29,
      bloodGroup: 'O+',
      phone: '+91-9876543210',
      emergencyContacts: [
        { name: 'Jane Doe', relation: 'Wife', phone: '+91-9876543211' },
        { name: 'Dr. Raj', relation: 'Primary', phone: '+91-9876543222' }
      ],
      medicalInfo: {
        allergies: ['Penicillin'],
        conditions: ['Hypertension'],
        medications: ['Lisinopril 10mg'],
        insurance: 'Health Plus Premium'
      },
      wallet: {
        balance: 1200.50,
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      lastVisit: '2024-01-10T14:30:00Z',
      status: 'active'
    },
    {
      id: 'PAT002',
      name: 'Sarah Johnson',
      age: 34,
      bloodGroup: 'A+',
      phone: '+91-9876543220',
      emergencyContacts: [
        { name: 'Mike Johnson', relation: 'Husband', phone: '+91-9876543221' },
        { name: 'Dr. Smith', relation: 'Cardiologist', phone: '+91-9876543222' }
      ],
      medicalInfo: {
        allergies: ['Shellfish', 'Latex'],
        conditions: ['Diabetes Type 2', 'High Cholesterol'],
        medications: ['Metformin 500mg', 'Atorvastatin 20mg'],
        insurance: 'MediCare Gold'
      },
      wallet: {
        balance: 2500.75,
        lastUpdated: '2024-01-14T16:45:00Z'
      },
      lastVisit: '2024-01-12T09:15:00Z',
      status: 'emergency'
    },
    {
      id: 'PAT003',
      name: 'Michael Brown',
      age: 45,
      bloodGroup: 'B-',
      phone: '+91-9876543230',
      emergencyContacts: [
        { name: 'Lisa Brown', relation: 'Wife', phone: '+91-9876543231' },
        { name: 'Dr. Wilson', relation: 'Family Doctor', phone: '+91-9876543232' }
      ],
      medicalInfo: {
        allergies: ['Aspirin'],
        conditions: ['Asthma'],
        medications: ['Albuterol Inhaler'],
        insurance: 'Star Health'
      },
      wallet: {
        balance: 850.25,
        lastUpdated: '2024-01-13T11:20:00Z'
      },
      lastVisit: '2024-01-08T13:45:00Z',
      status: 'active'
    },
    {
      id: 'PAT004',
      name: 'Emily Davis',
      age: 28,
      bloodGroup: 'AB+',
      phone: '+91-9876543240',
      emergencyContacts: [
        { name: 'Robert Davis', relation: 'Father', phone: '+91-9876543241' },
        { name: 'Dr. Patel', relation: 'Gynecologist', phone: '+91-9876543242' }
      ],
      medicalInfo: {
        allergies: [],
        conditions: ['Migraine'],
        medications: ['Sumatriptan 50mg'],
        insurance: 'HDFC ERGO'
      },
      wallet: {
        balance: 1750.00,
        lastUpdated: '2024-01-15T08:30:00Z'
      },
      lastVisit: '2024-01-05T10:00:00Z',
      status: 'inactive'
    },
    {
      id: 'PAT005',
      name: 'David Wilson',
      age: 52,
      bloodGroup: 'O-',
      phone: '+91-9876543250',
      emergencyContacts: [
        { name: 'Mary Wilson', relation: 'Wife', phone: '+91-9876543251' },
        { name: 'Dr. Kumar', relation: 'Cardiologist', phone: '+91-9876543252' }
      ],
      medicalInfo: {
        allergies: ['Iodine'],
        conditions: ['Heart Disease', 'Hypertension'],
        medications: ['Metoprolol 50mg', 'Lisinopril 10mg'],
        insurance: 'Max Bupa'
      },
      wallet: {
        balance: 3200.80,
        lastUpdated: '2024-01-14T12:15:00Z'
      },
      lastVisit: '2024-01-11T15:30:00Z',
      status: 'active'
    }
  ];

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <UserCheck className="w-4 h-4" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4" />;
      case 'inactive': return <Clock className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Search</h1>
            <p className="text-gray-600">Search and access patient medical records</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2">
            <span className="text-blue-800 font-semibold">{filteredPatients.length} Patients Found</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Status:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Patients</option>
              <option value="active">Active</option>
              <option value="emergency">Emergency</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
        </div>
        
        {filteredPatients.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No patients found matching your search criteria</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{patient.name}</h4>
                        <p className="text-sm text-gray-600">ID: {patient.id}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                        {getStatusIcon(patient.status)}
                        <span className="ml-1">{patient.status.toUpperCase()}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">Age</p>
                          <p className="font-medium text-gray-900">{patient.age} years</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <div>
                          <p className="text-xs text-gray-600">Blood Group</p>
                          <p className="font-medium text-gray-900">{patient.bloodGroup}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-gray-600">Phone</p>
                          <p className="font-medium text-gray-900">{patient.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-xs text-gray-600">Wallet Balance</p>
                          <p className="font-medium text-green-600">{formatCurrency(patient.wallet.balance)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Conditions:</span> {patient.medicalInfo.conditions.join(', ') || 'None'}
                      </div>
                      <div>
                        <span className="font-medium">Allergies:</span> {patient.medicalInfo.allergies.join(', ') || 'None'}
                      </div>
                      {patient.lastVisit && (
                        <div>
                          <span className="font-medium">Last Visit:</span> {formatDateTime(patient.lastVisit)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <button
                      onClick={() => onPatientSelect(patient)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{mockPatients.length}</p>
            </div>
            <User className="w-8 h-8 text-gray-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Active Patients</p>
              <p className="text-2xl font-bold text-green-700">{mockPatients.filter(p => p.status === 'active').length}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Emergency Cases</p>
              <p className="text-2xl font-bold text-red-700">{mockPatients.filter(p => p.status === 'emergency').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Wallet Balance</p>
              <p className="text-2xl font-bold text-blue-700">
                {formatCurrency(mockPatients.reduce((sum, p) => sum + p.wallet.balance, 0))}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSearch;