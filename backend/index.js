const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); // Import the path module
const dbConnect = require('./config/database');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: 'https://98-gfgwb9cjgfhsdecj.southeastasia-01.azurewebsites.net',
  credentials: true
}));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// API routes
app.use('/api/v1', todoRoutes);
app.use('/api/auth', authRoutes);

// Serve frontend index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// Connect to the database
dbConnect();
