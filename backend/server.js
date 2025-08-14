// ew/backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// ---- MOCK DATABASE (in-memory) ----
let users = []; // {email,password,name,age,bloodGroup,healthIssues,emergencyContact,insurance}
let hospitals = [
  { email: "hospital1@gmail.com", password: "hospital123", name: "City Hospital" },
  { email: "hospital2@gmail.com", password: "hospital456", name: "Green Valley Hospital" }
];
let fundRequests = []; // {hospitalEmail, patientEmail, amount, reason, createdAt}

// ---- USER REGISTRATION ----
app.post("/api/auth/register", (req, res) => {
  const { name, age, bloodGroup, healthIssues, emergencyContact, insurance, email, password } = req.body;

  if (!name || !age || !bloodGroup || !emergencyContact || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ message: "User already exists." });

  const user = { name, age, bloodGroup, healthIssues: healthIssues || "", emergencyContact, insurance: insurance || "", email, password };
  users.push(user);
  return res.json({ message: "Registration successful", user: { ...user, password: undefined } });
});

// ---- USER LOGIN (password verification) ----
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid email or password" });
  return res.json({ message: "Login successful", user: { ...user, password: undefined } });
});

// ---- GET USER PROFILE (by email) ----
app.get("/api/users/:email", (req, res) => {
  const user = users.find(u => u.email === req.params.email);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ ...user, password: undefined });
});

// ---- LIST ALL USERS (for hospital scan simulation) ----
app.get("/api/users", (req, res) => {
  return res.json(users.map(u => ({ ...u, password: undefined })));
});

// ---- HOSPITAL LOGIN ----
app.post("/api/hospital/login", (req, res) => {
  const { email, password } = req.body;
  const hospital = hospitals.find(h => h.email === email && h.password === password);
  if (!hospital) return res.status(401).json({ message: "Invalid hospital credentials" });
  return res.json({ message: "Hospital login successful", hospital: { ...hospital, password: undefined } });
});

// ---- FUND REQUEST (hospital -> patient) ----
app.post("/api/hospital/fund-request", (req, res) => {
  const { hospitalEmail, patientEmail, amount, reason } = req.body;
  if (!hospitalEmail || !patientEmail || !amount || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hospital = hospitals.find(h => h.email === hospitalEmail);
  const patient = users.find(u => u.email === patientEmail);
  if (!hospital) return res.status(404).json({ message: "Hospital not found" });
  if (!patient) return res.status(404).json({ message: "Patient not found" });

  const record = { hospitalEmail, patientEmail, amount, reason, createdAt: new Date().toISOString() };
  fundRequests.push(record);
  return res.json({ message: "Fund request submitted", record });
});

// (Optional) View all fund requests
app.get("/api/hospital/fund-requests", (req, res) => {
  return res.json(fundRequests);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
