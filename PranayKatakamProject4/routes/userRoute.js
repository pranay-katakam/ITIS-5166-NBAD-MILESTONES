const express = require('express');
const controller = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middlewares/auth');
const { logInLimiter } = require('../middlewares/rateLimiters');
const { validateSignUp, validateLogIn, validateResult } = require('../middlewares/validator');

const router = express.Router();

//Signup page
router.get('/new', isGuest, controller.new);

//POST /users: create a new user account
router.post('/signup', isGuest, validateSignUp, validateResult, controller.signup);

//login page
router.get('/login', isGuest, controller.getUserLogin);

//POST /users/login: authenticate user's login
router.post('/login', logInLimiter, isGuest, validateLogIn, validateResult, controller.login);

//Profile page
router.get('/profile', isLoggedIn, controller.profile);

//POST /users/logout: logout a user
router.get('/logout', isLoggedIn, controller.logout);


module.exports = router;
