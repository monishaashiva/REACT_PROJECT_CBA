import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator(){
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if(!user) return <div className="container-center"><p>Please login.</p></div>;

  // Keep QR simple: include just the email (hospitals will fetch details by email)
  const qrData = JSON.stringify({ email: user.email });

  return (
    <div className="container-center">
      <div className="card" style={{textAlign:"center"}}>
        <div className="badge">Your QR</div>
        <h2>Show this QR in emergencies</h2>
        <div style={{padding:16}}>
          <QRCodeCanvas value={qrData} size={200} includeMargin />
        </div>
        <p className="lead" style={{marginTop:8}}>{user.name} • {user.bloodGroup}</p>
      </div>
    </div>
  );
}
