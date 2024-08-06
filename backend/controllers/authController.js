const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Signup controller
exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(201).json({ token, user: newUser });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Google Auth controller
exports.googleAuth = async (req, res) => {
  const { googleId, firstName, lastName, email } = req.body;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, firstName, lastName, email });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
