import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';

const FundManagerApproveRejectPage: React.FC = () => {
  const [fundRequests, setFundRequests] = useState([
    {
      id: 1,
      hospitalName: 'City General Hospital',
      hospitalId: 'HOSP001',
      amount: 5000.00,
      reason: 'Emergency equipment purchase',
      urgency: 'High',
      requestDate: '2024-01-15',
      description: 'Need to purchase critical emergency equipment for ICU department',
      status: 'Pending',
      notes: ''
    },
    {
      id: 2,
      hospitalName: 'Regional Medical Center',
      hospitalId: 'HOSP002',
      amount: 8000.00,
      reason: 'Facility maintenance',
      urgency: 'Medium',
      requestDate: '2024-01-14',
      description: 'Regular maintenance and repairs for hospital building and infrastructure',
      status: 'Pending',
      notes: ''
    },
    {
      id: 3,
      hospitalName: 'Community Health Clinic',
      hospitalId: 'HOSP003',
      amount: 3000.00,
      reason: 'Staff training program',
      urgency: 'Low',
      requestDate: '2024-01-13',
      description: 'Professional development training for medical staff',
      status: 'Pending',
      notes: ''
    },
    {
      id: 4,
      hospitalName: 'Metropolitan Hospital',
      hospitalId: 'HOSP004',
      amount: 15000.00,
      reason: 'New medical device installation',
      urgency: 'High',
      requestDate: '2024-01-12',
      description: 'Installation of advanced diagnostic equipment for radiology department',
      status: 'Pending',
      notes: ''
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (requestId: number) => {
    setFundRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'Approved', notes: req.notes || 'Approved by fund manager' }
        : req
    ));
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleReject = (requestId: number, notes: string) => {
    setFundRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'Rejected', notes: notes || 'Rejected by fund manager' }
        : req
    ));
    setShowModal(false);
    setSelectedRequest(null);
  };

  const openModal = (request: any) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const filteredRequests = fundRequests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = request.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
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
              <h1 className="text-3xl font-bold text-gray-900">Approve/Reject Fund Requests</h1>
              <p className="text-gray-600 mt-2">Review and process pending fund requests from hospitals.</p>
            </div>
            <Link to="/fund-manager/dashboard">
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
                  placeholder="Search by hospital name or reason..."
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
            </div>
          </Card>
        </motion.div>

        {/* Fund Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {request.hospitalName}
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            {request.reason}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {request.hospitalId} • {request.requestDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          ${request.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {request.status === 'Pending' ? (
                          <Button size="sm" onClick={() => openModal(request)}>
                            Review
                          </Button>
                        ) : (
                          <div className="text-sm text-gray-500">
                            {request.notes}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRequests.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Review Modal */}
        {showModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Review Fund Request
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
                    <p className="text-gray-900">{selectedRequest.hospitalName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <p className="text-gray-900">{selectedRequest.reason}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <p className="text-gray-900">{selectedRequest.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <p className="text-gray-900 font-semibold">${selectedRequest.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                        {selectedRequest.urgency}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="flex-1"
                  >
                    Approve Request
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(selectedRequest.id, 'Rejected by fund manager')}
                    className="flex-1"
                  >
                    Reject Request
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundManagerApproveRejectPage;
