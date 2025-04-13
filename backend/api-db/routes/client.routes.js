const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");

/**
 * Register a new client
 */
router.post("/register", clientController.registerClient);

module.exports = router;
