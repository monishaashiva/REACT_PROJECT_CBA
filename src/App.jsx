// src/App.jsx
import React from 'react';
import PatientDashboard from './components/PatientDashboard';

export default function App(){
  return (
    <div className="app">
      <div className="header">
        <div className="brand">
          <div className="logo">EH</div>
          <div>
            <div className="title">Emergency Health Wallet</div>
            <div className="small-muted">Patient dashboard </div>
          </div>
        </div>
      </div>

      <PatientDashboard />
    </div>
  );
}
