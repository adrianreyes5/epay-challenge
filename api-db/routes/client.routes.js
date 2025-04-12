const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

/**
 * @route POST /api/clients/register
 * @desc Register a new client
 * @access Public
 */
router.post('/register', clientController.registerClient);

module.exports = router;
