const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Regular signup and login
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          'A user with this email already exists. Please log in or use a different email.',
      });
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

    res
      .status(201)
      .json({ message: 'Signup successful. Welcome!', token, user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({
      message:
        'An error occurred while processing your signup. Please try again later.',
      error: error.message,
    });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid email or password. Please try again.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid email or password. Please try again.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res
      .status(200)
      .json({ message: 'Login successful. Welcome back!', token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      message:
        'An error occurred while processing your login. Please try again later.',
      error: error.message,
    });
  }
};

// Google Sign-Up controller
exports.googleSignup = async (req, res) => {
  const { googleId, firstName, lastName, email } = req.body;

  console.log('Google Sign-Up request received:', req.body);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          'A user with this email already exists. Please log in using Google.',
      });
    }

    const newUser = new User({ googleId, firstName, lastName, email });
    await newUser.save();
    console.log('New user created:', newUser);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('JWT token generated:', token);

    res.status(201).json({
      message: 'Google signup successful. Welcome!',
      token,
      user: newUser,
    });
  } catch (error) {
    console.error('Error during Google Sign-Up:', error);
    res.status(500).json({
      message:
        'An error occurred while processing your Google signup. Please try again later.',
      error: error.message,
    });
  }
};

// Google Sign-In controller
exports.googleSignin = async (req, res) => {
  const { googleId, firstName, lastName, email } = req.body;

  console.log('Google Sign-In request received:', req.body);

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid email or password. Please try again.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('JWT token generated:', token);

    res.status(200).json({
      message: 'Google sign-in successful. Welcome back!',
      token,
      user,
    });
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
    res.status(500).json({
      message:
        'An error occurred while processing your Google sign-in. Please try again later.',
      error: error.message,
    });
  }
};
