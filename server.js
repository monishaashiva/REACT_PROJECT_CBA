const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", funds: 5000 }
];

// User login
app.post("/login", (req, res) => {
  const { email } = req.body;
  const user = mockUsers.find(u => u.email === email);
  if (user) return res.json(user);
  return res.status(401).json({ error: "User not found" });
});

// User registration
app.post("/register", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now(), name, email, funds: 0 };
  mockUsers.push(newUser);
  res.json(newUser);
});

// Get funds by user id
app.get("/funds/:id", (req, res) => {
  const user = mockUsers.find(u => u.id == req.params.id);
  if (user) return res.json({ funds: user.funds });
  res.status(404).json({ error: "User not found" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
