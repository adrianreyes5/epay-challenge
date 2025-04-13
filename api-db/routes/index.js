const express = require("express");
const router = express.Router();

router.use("/clients", require("./client.routes"));
router.use("/wallets", require("./wallet.routes"));

module.exports = router;
