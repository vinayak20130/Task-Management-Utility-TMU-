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

const corsOptions = {
  origin: ['http://localhost:3000', 'https://98-gfgwb9cjgfhsdecj.southeastasia-01.azurewebsites.net'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight across-the-board

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.use('/api/v1', todoRoutes);
app.use('/api/auth', authRoutes);

app.get('', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('<h1>This is the home page</h1>');
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

dbConnect();
