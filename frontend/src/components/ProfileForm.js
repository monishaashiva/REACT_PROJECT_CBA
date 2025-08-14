import React, { useState } from "react";

export default function ProfileForm({ user, navigate }) {
  const [healthDetails, setHealthDetails] = useState("");
  const [insuranceDetails, setInsuranceDetails] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would save data to backend or mock DB
    alert("Profile saved!");
    navigate("dashboard");
  };

  return (
    <div className="container">
      <h2>Fill Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Health Details</label>
        <textarea
          rows={4}
          value={healthDetails}
          onChange={e => setHealthDetails(e.target.value)}
          required
        />
        <label>Insurance Details</label>
        <textarea
          rows={4}
          value={insuranceDetails}
          onChange={e => setInsuranceDetails(e.target.value)}
          required
        />
        <button type="submit">Save Profile</button>
      </form>
      <button onClick={() => navigate("dashboard")} style={{ marginTop: "10px", backgroundColor: "#ccc", color: "#333" }}>
        Back
      </button>
    </div>
  );
}
