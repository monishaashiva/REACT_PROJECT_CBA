import React, { useState } from "react";
import Home from "./components/Home";
import LoginRegister from "./components/LoginRegister";
import ProfileForm from "./components/ProfileForm";
import ProfileView from "./components/ProfileView";
import Dashboard from "./components/Dashboard";
import QRGenerator from "./components/QRGenerator";
import HospitalLogin from "./components/HospitalLogin";
import ScanQR from "./components/ScanQR";
import FundRequest from "./components/FundRequest";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = (p) => setPage(p);

  return (
    <>
      {page === "home" && <Home navigate={navigate} />}
      {page === "login" && <LoginRegister navigate={navigate} setUser={setUser} />}
      {page === "profileForm" && <ProfileForm user={user} navigate={navigate} />}
      {page === "profileView" && <ProfileView user={user} navigate={navigate} />}
      {page === "dashboard" && user && <Dashboard user={user} navigate={navigate} />}
      {page === "qrGenerator" && user && <QRGenerator user={user} navigate={navigate} />}
      {page === "hospitalLogin" && <HospitalLogin navigate={navigate} />}
      {page === "scanQR" && <ScanQR navigate={navigate} />}
      {page === "fundRequest" && <FundRequest navigate={navigate} />}
    </>
  );
}
