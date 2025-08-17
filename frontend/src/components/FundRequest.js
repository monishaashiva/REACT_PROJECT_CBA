import React, { useState } from "react";

export default function FundRequest(){
  const hospital = JSON.parse(localStorage.getItem("hospital") || "null");
  const [form, setForm] = useState({ patientEmail:"", amount:"", reason:"" });
  const [msg, setMsg] = useState("");

  const onChange = (e)=> setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e)=>{
    e.preventDefault();
    setMsg("");
    try{
      const res = await fetch("http://localhost:5000/api/hospital/fund-request", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ ...form, hospitalEmail: hospital?.email })
      });
      const data = await res.json();
      if(!res.ok){ setMsg(data.message || "Failed"); return; }
      setMsg("Fund request submitted ✅");
      setForm({ patientEmail:"", amount:"", reason:"" });
    }catch(err){
      setMsg("Something went wrong");
    }
  };

  if(!hospital) return <div className="container-center"><p>Please login as hospital.</p></div>;

  return (
    <div className="container-center">
      <div className="card">
        <div className="badge">Fund Request</div>
        <h2>{hospital.name}</h2>
        {msg && <p style={{color: msg.includes("✅") ? "green" : "crimson"}}>{msg}</p>}
        <form onSubmit={onSubmit}>
          <input name="patientEmail" placeholder="Patient Email*" value={form.patientEmail} onChange={onChange} required />
          <input name="amount" placeholder="Amount (₹)*" value={form.amount} onChange={onChange} required />
          <textarea name="reason" rows="3" placeholder="Reason*" value={form.reason} onChange={onChange} required />
          <div className="actions">
            <button className="btn dark" type="submit">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}
