const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Regular signup and login
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Google Auth
router.post('/google-signup', authController.googleSignup);
router.post('/google-signin', authController.googleSignin);

module.exports = router;
