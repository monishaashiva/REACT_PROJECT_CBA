const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User'); // Adjust path to your User model

async function createFundManagerUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const username = 'fund manager';
    const plainPassword = '123456';

    const existing = await User.findOne({ username });
    if (existing) {
      console.log('User already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(plainPassword, salt);

    const newUser = new User({
    username,
    name: 'Fund Manager',
    passwordHash: passwordHash,  // Correct field name
    role: 'fund-manager',
    email: 'fundmanager@example.com'
});


    await newUser.save();
    console.log('Fund Manager user created successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error creating user:', err);
    process.exit(1);
  }
}

createFundManagerUser();
