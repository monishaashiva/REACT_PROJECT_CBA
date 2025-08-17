import React from "react";

export default function ScanQR({ navigate }) {
  return (
    <div className="container">
      <h2>Scan User QR Code</h2>
      <p>(Mock scanner interface here)</p>
      <button onClick={() => navigate("fundRequest")}>Request Funds</button>
      <button onClick={() => navigate("hospitalLogin")} style={{ marginTop: "10px", backgroundColor: "#ccc", color: "#333" }}>
        Logout
      </button>
    </div>
  );
}
