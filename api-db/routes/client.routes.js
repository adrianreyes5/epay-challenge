const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");

router.post("/register", clientController.registerClient);

module.exports = router;
