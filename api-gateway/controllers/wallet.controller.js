const dotenv = require("dotenv");
const apiDbService = require("../services/api-db.service");
const { z } = require("zod");

dotenv.config();

/**
 * Controller for wallet operations
 */
class WalletController {
  /**
   * Get wallet balance
   */
  async getBalance(req, res) {
    try {
      const { document, phone } = req.query;

      const balanceWalletValidator = z.object({
        document: z
          .string()
          .min(5, { message: "El documento debe tener al menos 5 caracteres" })
          .max(20, { message: "El documento debe tener máximo 20 caracteres" }),
        phone: z
          .string()
          .min(7, { message: "El teléfono debe tener al menos 7 caracteres" })
          .max(15, { message: "El teléfono debe tener máximo 15 caracteres" }),
      });

      const validatedData = balanceWalletValidator.safeParse({
        document,
        phone,
      });

      if (!validatedData.success) {
        return res.status(400).json({
          success: false,
          message: "Datos inválidos",
          statusCode: 400,
        });
      }

      const response = await apiDbService.getBalance({
        document,
        phone,
      });

      return res.status(response.data.statusCode).json({
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        statusCode: response.data.statusCode,
      });
    } catch (error) {
      console.log(error);
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
