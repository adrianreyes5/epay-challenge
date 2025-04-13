const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

/**
 * Recharge wallet
 */
router.post("/recharge", walletController.rechargeWallet);

module.exports = router;
