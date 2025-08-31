import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';

const FundManagerTransferHistoryPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Mock data
  const transferHistory = [
    {
      id: 1,
      hospitalName: 'City General Hospital',
      hospitalId: 'HOSP001',
      amount: 5000.00,
      reason: 'Emergency equipment purchase',
      urgency: 'High',
      requestDate: '2024-01-15',
      status: 'Transferred',
      transferDate: '2024-01-16',
      fundManager: 'Sarah Johnson',
      notes: 'Approved for critical equipment'
    },
    {
      id: 2,
      hospitalName: 'Regional Medical Center',
      hospitalId: 'HOSP002',
      amount: 8000.00,
      reason: 'Facility maintenance',
      urgency: 'Medium',
      requestDate: '2024-01-14',
      status: 'Transferred',
      transferDate: '2024-01-17',
      fundManager: 'Mike Chen',
      notes: 'Standard maintenance approved'
    },
    {
      id: 3,
      hospitalName: 'Community Health Clinic',
      hospitalId: 'HOSP003',
      amount: 3000.00,
      reason: 'Staff training program',
      urgency: 'Low',
      requestDate: '2024-01-13',
      status: 'Rejected',
      transferDate: null,
      fundManager: 'Lisa Wang',
      notes: 'Insufficient documentation provided'
    },
    {
      id: 4,
      hospitalName: 'Metropolitan Hospital',
      hospitalId: 'HOSP004',
      amount: 15000.00,
      reason: 'New medical device installation',
      urgency: 'High',
      requestDate: '2024-01-12',
      status: 'Transferred',
      transferDate: '2024-01-12',
      fundManager: 'Sarah Johnson',
      notes: 'Critical device approved immediately'
    },
    {
      id: 5,
      hospitalName: 'Riverside Medical Center',
      hospitalId: 'HOSP005',
      amount: 6000.00,
      reason: 'IT system upgrade',
      urgency: 'Medium',
      requestDate: '2024-01-11',
      status: 'Transferred',
      transferDate: '2024-01-15',
      fundManager: 'Mike Chen',
      notes: 'System upgrade approved'
    },
    {
      id: 6,
      hospitalName: 'Sunset Community Hospital',
      hospitalId: 'HOSP006',
      amount: 2500.00,
      reason: 'Medical supplies restocking',
      urgency: 'Low',
      requestDate: '2024-01-10',
      status: 'Rejected',
      transferDate: null,
      fundManager: 'Lisa Wang',
      notes: 'Budget constraints'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'transferred':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransfers = transferHistory.filter(transfer => {
    const matchesStatus = filterStatus === 'all' || transfer.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = transfer.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.fundManager.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (dateRange !== 'all') {
      const transferDate = new Date(transfer.transferDate || transfer.requestDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - transferDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (dateRange) {
        case '7days':
          matchesDate = diffDays <= 7;
          break;
        case '30days':
          matchesDate = diffDays <= 30;
          break;
        case '90days':
          matchesDate = diffDays <= 90;
          break;
      }
    }
    
    return matchesStatus && matchesSearch && matchesDate;
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'transferred', label: 'Transferred' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'pending', label: 'Pending' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' }
  ];

  const totalAmount = filteredTransfers.reduce((sum, transfer) => 
    transfer.status === 'Transferred' ? sum + transfer.amount : sum, 0
  );

  const totalRequests = filteredTransfers.length;
  const approvedRequests = filteredTransfers.filter(t => t.status === 'Transferred').length;
  const rejectedRequests = filteredTransfers.filter(t => t.status === 'Rejected').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transfer History</h1>
              <p className="text-gray-600 mt-2">Complete history of all fund transfers and decisions.</p>
            </div>
            <Link to="/fund-manager/dashboard">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
          </div>
        </motion.div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <Card className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {totalRequests}
            </div>
            <div className="text-sm text-gray-600">Total Requests</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {approvedRequests}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {rejectedRequests}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${totalAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Approved</div>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search by hospital, reason, or manager..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {dateRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Transfer History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hospital & Request
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fund Manager
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransfers.map((transfer) => (
                    <tr key={transfer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {transfer.hospitalName}
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            {transfer.reason}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(transfer.urgency)}`}>
                              {transfer.urgency}
                            </span>
                            <span className="text-xs text-gray-500">
                              ID: {transfer.hospitalId}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          ${transfer.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                          {transfer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {transfer.fundManager}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div>Requested: {transfer.requestDate}</div>
                          {transfer.transferDate && (
                            <div className="text-green-600">
                              {transfer.status === 'Transferred' ? 'Transferred' : 'Processed'}: {transfer.transferDate}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs">
                          {transfer.notes}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransfers.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transfers found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FundManagerTransferHistoryPage;
