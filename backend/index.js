const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const dbConnect = require('./config/database');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for parsing application/json
app.use(express.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Open CORS policy
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Enable pre-flight across-the-board
app.options('*', cors(corsOptions));

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// API routes
app.use('/api/v1', todoRoutes);
app.use('/api/auth', authRoutes);

// Define a simple route
app.get('', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('<h1>This is the home page</h1>');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

dbConnect();
