import React from "react";

export default function ProfileView({ user, navigate }) {
  // Mock data for demo, replace with actual user data
  const healthDetails = "No allergies. Diabetic.";
  const insuranceDetails = "Health insurance policy #12345";

  return (
    <div className="container">
      <h2>Profile Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Health Details:</strong> {healthDetails}</p>
      <p><strong>Insurance Details:</strong> {insuranceDetails}</p>
      <button onClick={() => navigate("dashboard")}>Back</button>
    </div>
  );
}
