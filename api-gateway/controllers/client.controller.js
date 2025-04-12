const apiDbService = require("../services/api-db.service");

/**
 * Controller for client operations in the API Gateway
 */
const clientController = {
  /**
   * Register a new client
   */
  registerClient: async (req, res) => {
    try {
      const clientData = {
        document: req.body.document,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
      };

      const response = await apiDbService.registerClient(clientData);

      return res.status(response.data.success ? 201 : 400).json({
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        statusCode: response.data.statusCode,
      });
    } catch (error) {
      console.error("Error in registerClient controller (API Gateway):", error);

      if (error.response) {
        return res.status(error.response.status).json({
          success: false,

          message: error.response.data.message,
          statusCode: error.response.status,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error",
        statusCode: 500,
      });
    }
  },
};

module.exports = clientController;
