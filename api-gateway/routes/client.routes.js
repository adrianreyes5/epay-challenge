const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const { validate } = require('../middlewares/validation.middleware');
const { registerClientSchema } = require('../validators/client.validator');

/**
 * @route POST /api/clients/register
 * @desc Register a new client
 * @access Public
 */
router.post('/register', validate(registerClientSchema), clientController.registerClient);

module.exports = router;
