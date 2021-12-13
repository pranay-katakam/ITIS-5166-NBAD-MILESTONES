const express = require('express');
const controller = require('../controllers/connectionController');
const { isLoggedIn, isAuthor } = require('../middlewares/auth');
const { validateId, isUserConnection } = require('../middlewares/validator');
const { validateStory, validationResult, validateResult, isValidRSVP } = require('../middlewares/validator');

const router = express.Router();

//All connections
router.get('/connections', controller.connections);

//Individual connection
router.get('/connections/:id', validateId,controller.show);

//Post new connection
router.post('/connection', isLoggedIn, validateStory, controller.create);

//Get new Connection page
router.get('/newConnection', isLoggedIn, controller.newConnection);

//Update existing connection
router.put('/connections/:id', validateId, isLoggedIn, isAuthor, validateStory, controller.update);

//Get Update connection page
router.get('/connections/:id/edit', validateId, isLoggedIn, isAuthor, validateStory, controller.editConnection);

//Delete connection
router.delete('/connections/delete/:id', validateId, isLoggedIn, isAuthor, controller.deleteConnection);

//RSVP for tournament
router.post('/connections/:id/rsvp', validateId, isLoggedIn, isValidRSVP, isUserConnection, controller.createRSVP)

//RSVP Maybe for tournament
router.post('/connections/:id/rsvpDelete', validateId, isLoggedIn, controller.deleteRSVP)



module.exports = router;