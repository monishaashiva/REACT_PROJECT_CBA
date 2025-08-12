import React from "react";

export default function Dashboard({ user, navigate }) {
  return (
    <div className="container">
      <h2>Welcome, {user.name}</h2>
      <button onClick={() => navigate("profileView")}>View Profile</button>
      <button onClick={() => navigate("profileForm")}>Edit Profile</button>
      <button onClick={() => navigate("qrGenerator")}>Generate QR Code</button>
      <button onClick={() => navigate("home")}>Logout</button>
    </div>
  );
}
