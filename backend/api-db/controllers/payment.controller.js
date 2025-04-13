const paymentService = require("../services/payment.service");

/**
 * Controller for payment operations
 */
class PaymentController {
  /**
   * Create a payment session
   */
  async createPaymentSession(req, res) {
    try {
      const { document, amount } = req.body;
      
      const result = await paymentService.createPaymentSession(document, amount);
      
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
        data: result.data,
        statusCode: result.statusCode
      });
    } catch (error) {
      console.error("Error en createPaymentSession controller:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        statusCode: 500
      });
    }
  }

  /**
   * Confirm a payment with token
   */
  async confirmPayment(req, res) {
    try {
      const { sessionId, token } = req.body;
      
      const result = await paymentService.confirmPayment(sessionId, token);
      
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
        data: result.data,
        statusCode: result.statusCode
      });
    } catch (error) {
      console.error("Error en confirmPayment controller:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        statusCode: 500
      });
    }
  }
}

module.exports = new PaymentController();
