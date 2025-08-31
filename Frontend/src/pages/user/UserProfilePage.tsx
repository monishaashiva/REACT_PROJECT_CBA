import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const UserProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setApiError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
      } catch (error: any) {
        setApiError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age.trim() || isNaN(Number(formData.age)) || Number(formData.age) < 0 || Number(formData.age) > 120)
      newErrors.age = 'Valid age is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setApiError('Not authenticated');
      return;
    }

    try {
      await axios.put('http://localhost:5000/api/user/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error: any) {
      setApiError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setApiError('');
    // Optionally refetch profile or reset fields here
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600 mt-2">Manage your personal information and preferences.</p>
            </div>
            <Link to="/user/dashboard">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
          </div>
        </motion.div>

        {apiError && <p className="text-red-600 mb-4">{apiError}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-1">
            <Card className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{formData.name}</h3>
              <p className="text-gray-600 mb-4">User Account</p>
              <Button variant="outline" size="sm" className="w-full" disabled>
                Change Photo
              </Button>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="space-x-3">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" value={formData.name} onChange={(value) => handleInputChange('name', value)} error={errors.name} required disabled={!isEditing} />
                <Input label="Age" value={formData.age} onChange={(value) => handleInputChange('age', value)} error={errors.age} required disabled={!isEditing} />
                <Input label="Email Address" type="email" value={formData.email} onChange={(value) => handleInputChange('email', value)} error={errors.email} required disabled={!isEditing} />
                <Input label="Phone Number" value={formData.phone} onChange={(value) => handleInputChange('phone', value)} error={errors.phone} required disabled={!isEditing} />
                <Input label="Address" value={formData.address} onChange={(value) => handleInputChange('address', value)} className="md:col-span-2" disabled={!isEditing} />
                <Input label="Emergency Contact" value={formData.emergencyContact} onChange={(value) => handleInputChange('emergencyContact', value)} disabled={!isEditing} />
                <Input label="Emergency Phone" value={formData.emergencyPhone} onChange={(value) => handleInputChange('emergencyPhone', value)} disabled={!isEditing} />
              </div>

              {isEditing && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">Make sure to save your changes before leaving this page.</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
