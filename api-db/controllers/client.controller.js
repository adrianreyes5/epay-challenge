const clientService = require("../services/client.service");

/**
 * Controller for client operations
 */
const clientController = {
  /**
   * Register a new client
   */
  registerClient: async (req, res) => {
    try {
      const { document, firstName, lastName, email, phone } = req.body;

      const result = await clientService.registerClient({
        document,
        firstName,
        lastName,
        email,
        phone,
      });

      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
        data: result.data,
        statusCode: result.statusCode,
      });
    } catch (error) {
      console.error("Error in registerClient controller:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        statusCode: 500,
      });
    }
  },
};

module.exports = clientController;
