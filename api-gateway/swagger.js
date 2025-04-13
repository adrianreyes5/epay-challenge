const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "ePayco Virtual Wallet API",
    version: "1.0.0",
    description: "API documentation for ePayco Virtual Wallet system",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Client: {
        type: "object",
        required: ["document", "firstName", "lastName", "email", "phone"],
        properties: {
          id: {
            type: "integer",
            description: "Client ID (auto-generated)",
            example: 1,
          },
          document: {
            type: "string",
            description: "Client identification document",
            example: "1234567890",
          },
          firstName: {
            type: "string",
            description: "Client first name",
            example: "John",
          },
          lastName: {
            type: "string",
            description: "Client last name",
            example: "Doe",
          },
          email: {
            type: "string",
            format: "email",
            description: "Client email address",
            example: "john.doe@example.com",
          },
          phone: {
            type: "string",
            description: "Client phone number",
            example: "3001234567",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Creation timestamp",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Last update timestamp",
          },
        },
      },
      ClientResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Indicates if the operation was successful",
            example: true,
          },
          message: {
            type: "string",
            description: "Response message",
            example: "Client registered successfully",
          },
          data: {
            $ref: "#/components/schemas/Client",
          },
          statusCode: {
            type: "integer",
            description: "HTTP status code",
            example: 201,
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Indicates if the operation was successful",
            example: false,
          },
          message: {
            type: "string",
            description: "Error message",
            example: "Client with this document already exists",
          },
          statusCode: {
            type: "integer",
            description: "HTTP status code",
            example: 400,
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API routes files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
