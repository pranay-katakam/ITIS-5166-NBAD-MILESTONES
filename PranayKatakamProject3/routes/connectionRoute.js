const express = require('express');
const controller = require('../controllers/connectionController');

const router = express.Router();

router.get('/connections', controller.connections);

router.get('/connections/:id', controller.show);

router.post('/connection', controller.create);

router.get('/newConnection', controller.newConnection);

router.put('/connections/:id', controller.update);

router.get('/connections/:id/edit', controller.editConnection);

router.delete('/connections/delete/:id', controller.deleteConnection);




module.exports = router;