const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const dbConnect = require('./config/database');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.use('/api/v1', todoRoutes);
app.use('/api/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('<h1>This is the home page</h1>');
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
  dbConnect(); // Connect to the database when the server starts
});
