const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const updateEmailsToLowercase = async () => {
  try {
    const users = await User.find({});
    for (let user of users) {
      user.email = user.email.toLowerCase();
      await user.save();
    }
    console.log('Emails updated to lowercase successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating emails to lowercase:', error);
    mongoose.connection.close();
  }
};

updateEmailsToLowercase();
