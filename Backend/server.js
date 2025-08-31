require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const hospitalRoutes = require('./routes/hospital');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// Setup CORS and JSON parsing first!
app.use(cors());
app.use(express.json());

// Connect to MongoDB with TLS and compatibility options
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    // tlsCAFile: '/path/to/your/certificate.pem', // usually not needed for Atlas
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('Health Emergency Wallet API');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/hospital', hospitalRoutes);
const fundManagerRoutes = require('./routes/fundManager');
app.use('/api/fund-manager', fundManagerRoutes);

// Handle 404 for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
