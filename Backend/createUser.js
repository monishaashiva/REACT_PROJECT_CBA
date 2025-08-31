const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGO_URI = 'mongodb+srv://monishaashiva:Adventure%401510@healthemergencywallet.tp5efqp.mongodb.net/?retryWrites=true&w=majority&appName=HealthEmergencyWallet';
const User = require('./models/User'); // Adjust path if needed

async function createUser() {
  await mongoose.connect(MONGO_URI);

  const passwordHash = await bcrypt.hash('hospital123', 10);

  const user = new User({
    name: 'City General Hospital',
    email: 'hospital@example.com',
    passwordHash,
    role: 'hospital',
  });

  await user.save();
  console.log('Hospital user created');
  await mongoose.disconnect();
}

createUser().catch(console.error);
