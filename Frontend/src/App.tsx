import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './layouts/Layout';

// Pages
import HomePage from './pages/HomePage';
import UserLoginPage from './pages/user/UserLoginPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import UserProfilePage from './pages/user/UserProfilePage';
import UserQRGeneratorPage from './pages/user/UserQRGeneratorPage';
import HospitalLoginPage from './pages/hospital/HospitalLoginPage';
import HospitalDashboardPage from './pages/hospital/HospitalDashboardPage';
import HospitalQRScannerPage from './pages/hospital/HospitalQRScannerPage';
import HospitalFundRequestPage from './pages/hospital/HospitalFundRequestPage';
import HospitalFundTransferDetailsPage from './pages/hospital/HospitalFundTransferDetailsPage';
import FundManagerLoginPage from './pages/fundManager/FundManagerLoginPage';
import FundManagerDashboardPage from './pages/fundManager/FundManagerDashboardPage';
import FundManagerApproveRejectPage from './pages/fundManager/FundManagerApproveRejectPage';
import FundManagerTransferHistoryPage from './pages/fundManager/FundManagerTransferHistoryPage';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Layout>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* User Routes */}
            <Route path="/user/login" element={<UserLoginPage />} />
            <Route path="/user/dashboard" element={<UserDashboardPage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
            <Route path="/user/qr-generator" element={<UserQRGeneratorPage />} />
            
            {/* Hospital Routes */}
            <Route path="/hospital/login" element={<HospitalLoginPage />} />
            <Route path="/hospital/dashboard" element={<HospitalDashboardPage />} />
            <Route path="/hospital/qr-scanner" element={<HospitalQRScannerPage />} />
            <Route path="/hospital/fund-request" element={<HospitalFundRequestPage />} />
            <Route path="/hospital/fund-transfer-details" element={<HospitalFundTransferDetailsPage />} />
            
            {/* Fund Manager Routes */}
            <Route path="/fund-manager/login" element={<FundManagerLoginPage />} />
            <Route path="/fund-manager/dashboard" element={<FundManagerDashboardPage />} />
            <Route path="/fund-manager/approve-reject" element={<FundManagerApproveRejectPage />} />
            <Route path="/fund-manager/transfer-history" element={<FundManagerTransferHistoryPage />} />
          </Routes>
        </Layout>
      </AnimatePresence>
    </Router>
  );
}

export default App;
