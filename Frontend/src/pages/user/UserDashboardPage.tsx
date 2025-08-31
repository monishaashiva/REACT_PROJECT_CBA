import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: string;
}

const UserDashboardPage: React.FC = () => {
  const [userName, setUserName] = useState('User');
  const [walletBalance, setWalletBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('registeredUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || 'User');
      setWalletBalance(user.walletBalance || 2500);
      setRecentTransactions(user.recentTransactions || []);
    }
  }, []);

  const saveUserData = (updatedUser: any) => {
    localStorage.setItem('registeredUser', JSON.stringify(updatedUser));
    const usersString = localStorage.getItem('users');
    if (usersString) {
      const users = JSON.parse(usersString);
      const userIndex = users.findIndex((u: any) => u.email === updatedUser.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  };

  const handleTopUp = () => {
    const amount = Number(topUpAmount);
    if (amount > 0) {
      const newBalance = walletBalance + amount;
      const newTransaction: Transaction = {
        id: Date.now(),
        type: 'credit',
        amount,
        description: `Wallet top-up`,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
      };
      const updatedTransactions = [newTransaction, ...recentTransactions];
      setWalletBalance(newBalance);
      setRecentTransactions(updatedTransactions);

      // Update and save user data
      const storedUser = localStorage.getItem('registeredUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.walletBalance = newBalance;
        user.recentTransactions = updatedTransactions;
        saveUserData(user);
      }

      setShowTopUp(false);
      setTopUpAmount('');
    } else {
      alert('Please enter a valid amount!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your account today.</p>
        </motion.div>

        {/* Wallet Balance Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
          <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-primary-100">Wallet Balance</h2>
                <p className="text-4xl font-bold mt-2">₹{walletBalance.toFixed(2)}</p>
                <p className="text-primary-100 mt-1">Available for healthcare expenses</p>
              </div>
              <div className="w-32 flex items-center justify-center">
                <button
                  onClick={() => setShowTopUp(true)}
                  className="bg-white text-black font-bold px-4 py-2 rounded shadow hover:bg-gray-100 transition"
                >
                  Top Up Wallet
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <Link to="/user/qr-generator">
              <Card className="hover:shadow-md transition-shadow cursor-pointer group mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    📱
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">Generate QR Code</h3>
                    <p className="text-sm text-gray-600">Create a QR code for hospital payments</p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link to="/user/profile">
              <Card className="hover:shadow-md transition-shadow cursor-pointer group mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    👤
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">Update Profile</h3>
                    <p className="text-sm text-gray-600">Edit your personal information</p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link to="#">
              <Card className="hover:shadow-md transition-shadow cursor-pointer group mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    📊
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">View History</h3>
                    <p className="text-sm text-gray-600">Check your transaction history</p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <Card>
              <div className="space-y-4">
                {recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <svg className={`w-5 h-5 ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={transaction.type === 'credit' ? 'M7 11l5-5m0 0l5 5m-5-5v12' : 'M17 13l-5 5m0 0l-5-5m5 5V6'} />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">{transaction.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {showTopUp && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-bold mb-3 text-gray-900">Top Up Wallet</h3>
              <input
                type="number"
                min="1"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Enter amount (₹)"
                value={topUpAmount}
                onChange={e => setTopUpAmount(e.target.value)}
              />
              <div className="flex space-x-2 justify-end">
                <Button onClick={handleTopUp}>Add Funds</Button>
                <Button variant="outline" onClick={() => setShowTopUp(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
