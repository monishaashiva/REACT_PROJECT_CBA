import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import Register from "./components/Register";
import ProfileView from "./components/ProfileView";
import Dashboard from "./components/Dashboard";
import QRGenerator from "./components/QRGenerator";
import HospitalLogin from "./components/HospitalLogin";
import HospitalDashboard from "./components/HospitalDashboard";
import ScanQR from "./components/ScanQR";
import FundRequest from "./components/FundRequest";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* User side */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/qr" element={<QRGenerator />} />

        {/* Hospital side */}
        <Route path="/hospital/login" element={<HospitalLogin />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/hospital/scan" element={<ScanQR />} />
        <Route path="/hospital/fund" element={<FundRequest />} />
      </Routes>
    </Router>
  );
}
