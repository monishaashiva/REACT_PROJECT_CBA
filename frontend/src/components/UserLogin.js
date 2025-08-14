import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserLogin(){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e)=>{
    e.preventDefault();
    setMsg("");
    try{
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if(!res.ok){ setMsg(data.message || "Login failed"); return; }
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    }catch(err){
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="container-center">
      <div className="card">
        <div className="badge">User</div>
        <h2>User Login</h2>
        {msg && <p style={{color:"crimson"}}>{msg}</p>}
        <form onSubmit={onSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <div className="actions">
            <button className="btn dark" type="submit">Login</button>
            <Link to="/register" className="btn">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
