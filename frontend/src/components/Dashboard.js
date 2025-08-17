import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if(!user){ navigate("/login"); return null; }

  return (
    <div className="container-center">
      <div className="card">
        <div className="badge">Welcome</div>
        <h2>Hi, {user.name || "User"} 👋</h2>
        <p className="lead">Quick actions</p>
        <div className="actions" style={{marginTop:8}}>
          <button className="btn dark" onClick={()=>navigate("/profile")}>View Profile</button>
          <button className="btn" onClick={()=>navigate("/qr")}>Generate QR</button>
          <button className="btn ghost" onClick={() => { localStorage.removeItem("user"); navigate("/login"); }}>Logout</button>
        </div>
      </div>
    </div>
  );
}
