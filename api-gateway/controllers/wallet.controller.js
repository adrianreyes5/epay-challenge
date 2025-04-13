const dotenv = require("dotenv");
const apiDbService = require("../services/api-db.service");

dotenv.config();

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

      const response = await apiDbService.rechargeWallet({
        document,
        phone,
        amount,
      });

      return res.status(response.data.statusCode).json({
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        statusCode: response.data.statusCode,
      });
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({
          success: false,
          message: error.response.data.message,
          statusCode: error.response.status,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        statusCode: 500,
      });
    }
  }
}

module.exports = new WalletController();
