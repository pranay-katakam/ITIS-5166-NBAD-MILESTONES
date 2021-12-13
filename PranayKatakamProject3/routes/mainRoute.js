const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//Home page
router.get('/', controller.index);

//ContactUs page
router.get('/contactUs',controller.contactUs);

//about page
router.get('/about',controller.about);

module.exports=router;
