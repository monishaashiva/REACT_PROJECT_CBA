import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHandsHelping, FaHeartbeat, FaWallet, FaStethoscope } from "react-icons/fa";

export default function Home(){
  const navigate = useNavigate();
  return (
    <div className="container-center">
      <FaHandsHelping size={84} color="#2e7d32" style={{ marginBottom: 10 }} />
      <div className="icon-row">
        <FaHeartbeat size={42} color="#2e7d32" />
        <FaWallet size={42} color="#2e7d32" />
        <FaStethoscope size={42} color="#2e7d32" />
      </div>

      <h1>Health Emergency Wallet</h1>
      <p className="lead">Your safety, just a QR away.</p>

      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn dark" onClick={() => navigate("/login")}>User Login / Create</button>
        <button className="btn dark" onClick={() => navigate("/hospital/login")}>Hospital Login</button>
      </div>
    </div>
  );
}
