const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bot = require('./Bot')
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

const JWT_SECRET = 'yourSecretKey'; 
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    
    req.user = decoded; 
    next();
  });
};

const uploadsFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
  console.log('Uploads folder created');
}
app.use('/uploads', express.static(uploadsFolder));

const MONGO_URI = 'mongodb://localhost:27017/Testdb';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

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
    default: 'volunteer',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'probe1');

const eventSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  date: { type: Date },
  time: { type: String, trim: true },
  duration: { type: String, trim: true },
  location: { type: String, trim: true, required: true },
  contact: { type: String, trim: true },
  expectedParticipants: { type: Number, min: [0, 'Participants cannot be negative'], default: 0 },
  image: { type: String },
  isPublic: { type: Boolean, default: true },
  genre: { type: String, trim: true },
  organisers: { type: String, trim: true },
  roles: [
    {
      roleName: { type: String, trim: true, required: true },
      slots: { type: Number, min: [0, 'Slots cannot be negative'], default: 0 },
    },
  ],
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema, 'eventf');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsFolder),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// API routes
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists!' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
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

    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '3h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Event form
app.post('/api/Eventform', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      duration,
      location,
      contact,
      expectedParticipants,
      genre,
      isPublic,
      organisers,
      roles,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const parsedRoles = JSON.parse(roles); // Parse roles into an array

    const newEvent = new Event({
      title,
      description,
      date: date ? new Date(date) : null,
      time,
      duration,
      location,
      contact,
      expectedParticipants: parseInt(expectedParticipants, 10) || 0,
      genre,
      isPublic: isPublic === 'true',
      organisers,
      image: imageUrl,
      roles: parsedRoles, // Save parsed roles
    });

    await newEvent.save();

   
    
   const suggestionprompt=`suggest more plans for charity event ${newEvent.title}, ${newEvent.description} which has ${newEvent.expectedParticipants} and has these roles ${newEvent.roles} and date and time being ${newEvent.date} and ${newEvent.time} at location ${newEvent.location}.Suggest all possible things you can based on this for the charity event`; 
    const aisuggestion=await bot.get_suggestion(suggestionprompt);
    console.log(aisuggestion);
    res.status(201).json({
      message: 'Event created successfully!',
      event: newEvent,
      suggestion:aisuggestion,
    });

  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({
      message: 'Error creating event',
      error: error.message || error,
    });
  }
});

// Get all events
app.get('/api/Eventform', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// Get Event by ID
app.get('/api/Eventform/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
});

// Protected Route
app.get('/api/protected', verifyToken, async (req, res) => {
  try {
    const username = req.user.username;
    res.json({
      user: {
        username: username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get User Profile
app.get("/api/user-profile", verifyToken, async (req, res) => {
  const username = req.user.username;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
