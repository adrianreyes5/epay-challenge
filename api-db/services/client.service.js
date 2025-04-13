const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Service for client operations
 */
class clientService {
  /**
   * Register a new client
   */
  async registerClient(clientData) {
    try {
      const { document, firstName, lastName, email, phone } = clientData;

      const existingClient = await prisma.client.findFirst({
        where: {
          OR: [{ document }, { email }],
        },
      });

      if (existingClient) {
        if (existingClient.document === document) {
          return {
            success: false,
            message: "Client with this document already exists",
            statusCode: 400,
          };
        } else {
          return {
            success: false,
            message: "Client with this email already exists",
            statusCode: 400,
          };
        }
      }

      const newClient = await prisma.client.create({
        data: {
          document,
          firstName,
          lastName,
          email,
          phone,
        },
      });

      return {
        success: true,
        message: "Client registered successfully",
        data: newClient,
        statusCode: 201,
      };
    } catch (error) {
      console.error("Error registering client:", error);
      return {
        success: false,
        message: "Error registering client",
        statusCode: 500,
      };
    }
  }
}

module.exports = clientService;
