import React, { useState } from "react";
import axios from "axios";

export default function LoginRegister({ navigate, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/login", { email: form.email });
        setUser(res.data);
        navigate("dashboard");
      } else {
        if (!form.name) {
          setError("Please enter your name.");
          return;
        }
        const res = await axios.post("http://localhost:5000/register", form);
        setUser(res.data);
        navigate("profileForm");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? "User Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required={!isLogin}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p style={{ marginTop: 15 }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          style={{ color: "#1b5e20", cursor: "pointer", fontWeight: "bold" }}
          onClick={() => {
            setError("");
            setIsLogin(!isLogin);
            setForm({ name: "", email: "" });
          }}
        >
          {isLogin ? "Create one" : "Login here"}
        </span>
      </p>
      <button style={{ marginTop: 20, backgroundColor: "#ccc", color: "#333" }} onClick={() => navigate("home")}>
        Back to Home
      </button>
    </div>
  );
}
