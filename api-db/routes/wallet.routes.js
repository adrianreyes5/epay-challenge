const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

/**
 * Get wallet balance
 */
router.get("/balance", walletController.getBalance);

/**
 * Recharge wallet
 */
router.post("/recharge", walletController.rechargeWallet);

module.exports = router;
