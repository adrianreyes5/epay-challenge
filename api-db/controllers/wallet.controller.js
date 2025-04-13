const walletService = require("../services/wallet.service");

/**
 * Controller for wallet operations
 */
class WalletController {
  /**
   * Recharge a client's wallet
   */
  async rechargeWallet(req, res) {
    try {
      const { document, phone, amount } = req.body;

      const result = await walletService.rechargeWallet(
        document,
        phone,
        amount
      );

      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
        data: result.data,
        statusCode: result.statusCode,
      });
    } catch (error) {
      console.error("Error en rechargeWallet controller:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        statusCode: 500,
      });
    }
  }
}

module.exports = new WalletController();
