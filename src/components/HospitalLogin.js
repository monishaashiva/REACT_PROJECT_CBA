import React, { useState } from "react";

export default function HospitalLogin({ navigate }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // Simple mock check (password: "hospital123")
    if (password === "hospital123") {
      navigate("scanQR");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="container">
      <h2>Hospital Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("home")} style={{ marginTop: "10px", backgroundColor: "#ccc", color: "#333" }}>
        Back to Home
      </button>
    </div>
  );
}
