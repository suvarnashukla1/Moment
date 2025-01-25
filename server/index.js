const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// File Upload Folder Setup
const uploadsFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
  console.log('Uploads folder created');
}
app.use('/uploads', express.static(uploadsFolder));

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/Testdb';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'probe1');

// Event Schema - Add 'organisers' field
const eventSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  date: { type: Date },
  timing: { type: String, trim: true },
  genre: { type: String, trim: true },
  location: { type: String, trim: true },
  price: { type: Number, default: 0, min: [0, 'Price cannot be negative'] },
  isPublic: { type: Boolean, default: false },
  seats: { type: Number, default: 0, min: [0, 'Seats cannot be negative'] },
  specialRequirements: { type: String, trim: true, default: '' },
  image: { type: String },
  organisers: { type: String, trim: true }, // Added organisers field
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema, 'eventf');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsFolder),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// Routes
// Sign Up
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists!' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role: role || 'volunteer' });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, 'yourSecretKey', { expiresIn: '3h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Create Event
app.post('/api/Eventform', upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, timing, genre, location, price, isPublic, seats, specialRequirements, organisers } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newEvent = new Event({
      title,
      description,
      date: date ? new Date(date) : null,
      timing,
      genre,
      location,
      price: price || 0,
      isPublic: isPublic === 'true',
      seats: seats || 0,
      specialRequirements,
      organisers, // Save the organisers field
      image: imageUrl,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully!', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
});

// Fetch All Events
app.get('/api/Eventform', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// Fetch Single Event
app.get('/api/Eventform/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
});
app.get("/api/user-profile", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing or invalid" });
  }

  try {
    // Decode the JWT token using the hardcoded secret key
    const decoded = jwt.verify(token, 'yourSecretKey');
    const { username } = decoded;

    // Fetch user details from the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user details
    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Error decoding token or fetching user:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
