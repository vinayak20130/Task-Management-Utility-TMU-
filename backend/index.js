const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const dbConnect = require('./config/database');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Import and configure Passport
require('./config/passport');

// Mount TODO API routes
app.use('/api/v1', todoRoutes);

// Mount Auth routes
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// Connect to Database
dbConnect();

// Default route
app.get('/', (req, res) => {
  res.send('<h1>This is the home page</h1><a href="/auth/google">Login with Google</a>');
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello ${req.user.displayName}`);
  } else {
    res.redirect('/');
  }
});
