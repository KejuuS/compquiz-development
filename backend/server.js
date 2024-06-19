const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors(
  {
      origin: ["https://deploy-mern-frontend.vercel.app"],
      methods: ["POST", "GET"],
      credentials: true
  }
));

const uri = process.env.MONGODB_URI;

app.get("/", (req, res) => {
  res.json("Hello");
})

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define Mongoose schema and model for users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true // Ensure email is stored in lowercase
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [
        { username },
        { email: lowercaseEmail }
      ]
    });

    if (existingUser) {
      let errors = {};
      if (existingUser.username === username) {
        errors.username = 'Username already exists';
      }
      if (existingUser.email === lowercaseEmail) {
        errors.email = 'Email already exists';
      }
      return res.status(400).json({ error: errors });
    }

    // If username and email are not taken, proceed to create the user
    const newUser = new User({
      username,
      email: lowercaseEmail,
      password
    });

    await newUser.save();
    return res.json({ message: 'Register success' });
  } catch (error) {
    return res.status(500).json({ error: 'Database error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase

    const user = await User.findOne({ email: lowercaseEmail, password });

    if (user) {
      return res.json({ message: 'Login success', username: user.username });
    } else {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Database error' });
  }
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
