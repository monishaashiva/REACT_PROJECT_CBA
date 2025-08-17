import React from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalDashboard(){
  const navigate = useNavigate();
  const hospital = JSON.parse(localStorage.getItem("hospital") || "null");
  if(!hospital){ navigate("/hospital/login"); return null; }

  return (
    <div className="container-center">
      <div className="card">
        <div className="badge">Hospital Dashboard</div>
        <h2>{hospital.name || "Hospital"}</h2>
        <div className="actions" style={{marginTop:8}}>
          <button className="btn dark" onClick={()=>navigate("/hospital/scan")}>Scan QR (Enter Email)</button>
          <button className="btn" onClick={()=>navigate("/hospital/fund")}>Fund Request</button>
          <button className="btn ghost" onClick={()=>{ localStorage.removeItem("hospital"); navigate("/hospital/login"); }}>Logout</button>
        </div>
      </div>
    </div>
  );
}
