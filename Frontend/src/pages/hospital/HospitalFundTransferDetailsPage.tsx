import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';

const HospitalFundTransferDetailsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const fundTransfers = [
    {
      id: 1,
      amount: 5000.0,
      reason: 'Emergency equipment purchase',
      urgency: 'High',
      requestDate: '2024-01-15',
      status: 'Transferred',
      transferDate: '2024-01-16',
      fundManager: 'Sarah Johnson',
      notes: 'Approved for critical equipment',
    },
    {
      id: 2,
      amount: 2500.0,
      reason: 'Medical supplies restocking',
      urgency: 'Medium',
      requestDate: '2024-01-14',
      status: 'Transferred',
      transferDate: '2024-01-17',
      fundManager: 'Mike Chen',
      notes: 'Standard supplies approved',
    },
    {
      id: 3,
      amount: 8000.0,
      reason: 'Facility maintenance',
      urgency: 'Low',
      requestDate: '2024-01-13',
      status: 'Rejected',
      transferDate: null,
      fundManager: 'Lisa Wang',
      notes: 'Insufficient documentation provided',
    },
    {
      id: 4,
      amount: 3000.0,
      reason: 'Staff training program',
      urgency: 'Medium',
      requestDate: '2024-01-12',
      status: 'Pending',
      transferDate: null,
      fundManager: null,
      notes: 'Under review',
    },
    {
      id: 5,
      amount: 12000.0,
      reason: 'New medical device installation',
      urgency: 'High',
      requestDate: '2024-01-11',
      status: 'Transferred',
      transferDate: '2024-01-12',
      fundManager: 'Sarah Johnson',
      notes: 'Critical device approved immediately',
    },
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

  // Formats amounts in Indian Rupees with ₹ and commas
  const formatRupees = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const filteredTransfers = fundTransfers.filter((transfer) => {
    const matchesStatus = filterStatus === 'all' || transfer.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      transfer.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.fundManager?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'transferred', label: 'Transferred' },
    { value: 'rejected', label: 'Rejected' },
  ];

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
              <h1 className="text-3xl font-bold text-gray-900">Fund Transfer Details</h1>
              <p className="text-gray-600 mt-2">Track the status of all your fund requests and transfers.</p>
            </div>
            <Link to="/hospital/dashboard">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search by reason or fund manager..."
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
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Fund Transfers Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund Manager</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransfers.map((transfer) => (
                    <tr key={transfer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">{transfer.reason}</div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(transfer.urgency)}`}>
                              {transfer.urgency}
                            </span>
                            <span className="text-xs text-gray-500">Request #{transfer.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{formatRupees(transfer.amount)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                          {transfer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{transfer.fundManager || '—'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div>Requested: {transfer.requestDate}</div>
                          {transfer.transferDate && <div className="text-green-600">Transferred: {transfer.transferDate}</div>}
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
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">{fundTransfers.length}</div>
              <div className="text-sm text-gray-600">Total Requests</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {fundTransfers.filter((t) => t.status === 'Transferred').length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-red-600">{fundTransfers.filter((t) => t.status === 'Rejected').length}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{fundTransfers.filter((t) => t.status === 'Pending').length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalFundTransferDetailsPage;
