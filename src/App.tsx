import React, { useState } from 'react';
import HospitalDashboard from './components/HospitalDashboard';
import HospitalLogin from './components/HospitalLogin';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hospitalData, setHospitalData] = useState(null);

  const handleLogin = (data) => {
    setIsAuthenticated(true);
    setHospitalData(data);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHospitalData(null);
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50">
        {!isAuthenticated ? (
          <HospitalLogin onLogin={handleLogin} />
        ) : (
          <HospitalDashboard 
            hospitalData={hospitalData} 
            onLogout={handleLogout} 
          />
        )}
      </div>
    </NotificationProvider>
  );
}

export default App;