import React, { useEffect, useState } from "react";

export default function ProfileView(){
  const [profile, setProfile] = useState(null);
  const saved = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(()=>{
    const load = async ()=>{
      if(!saved) return;
      const res = await fetch(`http://localhost:5000/api/users/${encodeURIComponent(saved.email)}`);
      if(res.ok){
        const data = await res.json();
        setProfile(data);
        localStorage.setItem("user", JSON.stringify(data)); // keep fresh
      }else{
        setProfile(saved); // fallback to saved
      }
    };
    load();
  }, []);

  if(!saved) return <div className="container-center"><p>Please login.</p></div>;
  if(!profile) return <div className="container-center"><p>Loading...</p></div>;

  return (
    <div className="container-center">
      <div className="card">
        <div className="badge">Profile</div>
        <h2>{profile.name}</h2>
        <div style={{textAlign:"left"}}>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Age:</b> {profile.age}</p>
          <p><b>Blood Group:</b> {profile.bloodGroup}</p>
          <p><b>Health Issues:</b> {profile.healthIssues || "None"}</p>
          <p><b>Emergency Contact:</b> {profile.emergencyContact}</p>
          <p><b>Insurance:</b> {profile.insurance || "-"}</p>
        </div>
      </div>
    </div>
  );
}
