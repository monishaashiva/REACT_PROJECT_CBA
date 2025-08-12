import React from "react";
import { FaHandsHelping, FaHeartbeat, FaWallet, FaStethoscope } from "react-icons/fa";

export default function Home({ navigate }) {
  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", padding: 20,
      backgroundColor: "#eaf7ea", textAlign: "center"
    }}>
      <FaHandsHelping size={80} color="#2e7d32" style={{ marginBottom: 20 }} />
      <div style={{ display: "flex", gap: 40, marginBottom: 25 }}>
        <FaHeartbeat size={40} color="#388e3c" />
        <FaWallet size={40} color="#388e3c" />
        <FaStethoscope size={40} color="#388e3c" />
      </div>
      <h1 style={{ fontSize: "3rem", marginBottom: 10 }}>Health Emergency Wallet</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: 30, maxWidth: 400 }}>
        Your safety, just a QR away.
      </p>
      <div style={{ display: "flex", gap: 15 }}>
        <button onClick={() => navigate("login")}>User Login/Create</button>
        <button onClick={() => navigate("hospitalLogin")}>Hospital Login</button>
      </div>
    </div>
  );
}
