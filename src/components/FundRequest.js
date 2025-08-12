import React, { useState } from "react";

export default function FundRequest({ navigate }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Fund request of ₹${amount} sent!`);
    navigate("scanQR");
  };

  return (
    <div className="container">
      <h2>Fund Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          min="1"
        />
        <button type="submit">Send Request</button>
      </form>
      <button onClick={() => navigate("scanQR")} style={{ marginTop: "10px", backgroundColor: "#ccc", color: "#333" }}>
        Back
      </button>
    </div>
  );
}
