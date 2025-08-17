import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", age: "", bloodGroup: "", healthIssues: "",
    emergencyContact: "", insurance: "", email: "", password: ""
  });
  const [msg, setMsg] = useState("");

  const onChange = (e)=> setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async (e)=>{
    e.preventDefault();
    setMsg("");
    try{
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if(!res.ok){ setMsg(data.message || "Registration failed"); return; }
      alert("Registration successful! Please login.");
      navigate("/login");
    }catch(err){
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="container-center">
      <div className="card">
        <div className="badge">Create Account</div>
        <h2 style={{marginTop:8}}>User Registration</h2>
        {msg && <p style={{color:"crimson"}}>{msg}</p>}
        <form onSubmit={onSubmit}>
          <div className="grid2">
            <input name="name" placeholder="Full Name*" value={form.name} onChange={onChange} required />
            <input name="age" placeholder="Age*" value={form.age} onChange={onChange} required />
          </div>
          <div className="grid2">
            <input name="bloodGroup" placeholder="Blood Group*" value={form.bloodGroup} onChange={onChange} required />
            <input name="emergencyContact" placeholder="Emergency Contact*" value={form.emergencyContact} onChange={onChange} required />
          </div>
          <input name="healthIssues" placeholder="Health Issues (optional)" value={form.healthIssues} onChange={onChange} />
          <input name="insurance" placeholder="Insurance Details (optional)" value={form.insurance} onChange={onChange} />

          <hr/>
          <div className="grid2">
            <input type="email" name="email" placeholder="Email*" value={form.email} onChange={onChange} required />
            <input type="password" name="password" placeholder="Password*" value={form.password} onChange={onChange} required />
          </div>

          <div className="actions" style={{marginTop:8}}>
            <button className="btn dark" type="submit">Create Account</button>
            <button className="btn ghost" type="button" onClick={()=>navigate("/login")}>Already have an account? Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
