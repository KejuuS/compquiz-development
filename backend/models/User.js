const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true // This will ensure the email is always stored in lowercase
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
