const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path if User.js is in models folder

const MONGO_URI = 'mongodb+srv://monishaashiva:Adventure%401510@healthemergencywallet.tp5efqp.mongodb.net/?retryWrites=true&w=majority&appName=HealthEmergencyWallet';

async function deleteUser() {
  await mongoose.connect(MONGO_URI);

  await User.deleteOne({ email: 'hospital@example.com' });
  console.log('Hospital user deleted');

  await mongoose.disconnect();
}

deleteUser().catch(console.error);
