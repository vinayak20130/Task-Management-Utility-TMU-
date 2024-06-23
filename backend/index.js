const express = require('express');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// MIDDLEWARE to parse JSON body
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Import routes for TODO API
const todoRoutes = require('./routes/todo');

// Mount TODO API routes
app.use('/api/v1', todoRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

const dbConnect = require('./config/database');
dbConnect();

// Default route
app.get('/', (req, res) => {
  res.send('<h1>This is the home page</h1>');
});
