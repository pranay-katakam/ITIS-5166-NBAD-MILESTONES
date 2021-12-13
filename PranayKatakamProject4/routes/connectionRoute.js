const express = require('express');
const controller = require('../controllers/connectionController');
const { isLoggedIn, isAuthor } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validator');
const { validateStory, validationResult, validateResult } = require('../middlewares/validator');

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




module.exports = router;