const express = require("express");
const router = express.Router();

router.use("/clients", require("./client.routes"));
router.use("/wallets", require("./wallet.routes"));
router.use("/payments", require("./payment.routes"));

module.exports = router;
