const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const uploadsFolder = path.join(__dirname, 'uploads');

// Create the uploads folder if it doesn't exist
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
  console.log('Uploads folder created');
}

const app = express();
const PORT = 5000;

app.use(express.json());

// Enable CORS for the frontend running on localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
}));

// MongoDB connection URI
const MONGO_URI = 'mongodb://localhost:27017/Testdb'; 

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
      } else {
        console.log('Collections in the database:', collections.map(c => c.name));
      }
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// User schema definition
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
}, {
  timestamps: true, 
});

const User = mongoose.model('User', userSchema, 'probe1');

// Event schema definition
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  timing: String,
  genre: String,
  location: String,
  price: Number,
  isPublic: Boolean,
  seats: Number,
  specialRequirements: String,
  image: String, // Path to the uploaded image URL
  childSafe: Boolean,
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema, 'eventf');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsFolder); // The folder where files will be stored
  },
  filename: (req, file, cb) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
    const uniqueSuffix = Date.now(); // Unique suffix to avoid overwriting
    const extname = path.extname(file.originalname); // Get the file extension

    const filename = `${currentDate}-${uniqueSuffix}${extname}`;
    cb(null, filename); 
  }
});
const upload = multer({ dest: 'uploads/' });

// Sign up route
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }
  

    const User = await User.findOne({ username });
    if (User) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error });
  }
});
// Protected route example
app.get('/api/protected', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
    
    if (!token) {
      return res.status(401).json({ message: 'Token required' });
    }

    const decoded = jwt.verify(token, 'yourSecretKey'); // Verify the JWT
    const user = await User.findById(decoded.userId); // Fetch the user based on decoded ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User authenticated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error in protected route', error });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username, email: user.email }, 'yourSecretKey', { expiresIn: '3h' });

    res.status(200).json({
      message: 'Login successful!',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// User profile route (protected)
app.get('/api/user-profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }

    const decoded = jwt.verify(token, 'yourSecretKey'); // Verify the token using the secret key
    const user = await User.findById(decoded.userId); // Find user by the decoded userId

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ username: user.username, email: user.email }); // Return user details
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user details', error });
  }
});

app.post('/api/Eventform', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      timing,
      genre,
      location,
      price,
      isPublic,
      seats,
      specialRequirements,
      childSafe,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`; // Image URL to be stored in the database

    const newEvent = new Event({
      title,
      description,
      date,
      timing,
      genre,
      location,
      price,
      isPublic,
      seats,
      specialRequirements,
      childSafe,
      image: imageUrl, 
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully!', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
});

// Fetch all events route
app.get('/api/Eventform', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events); // This will include the _id for each event
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// Fetch a single event by ID route
app.get('/api/Eventform/:id', async (req, res) => {
  try {
    const eventId = req.params.id;  // Get the event ID from the URL parameter

    // Find the event by its ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);  // Return the found event
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
