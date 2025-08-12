import React from "react";

export default function QRGenerator({ user, navigate }) {
  // For now just a placeholder text; later you can add a real QR code component

  return (
    <div className="container">
      <h2>Your Emergency QR Code</h2>
      <p>(QR code for {user.name} will be displayed here)</p>
      <button onClick={() => navigate("dashboard")}>Back</button>
    </div>
  );
}
