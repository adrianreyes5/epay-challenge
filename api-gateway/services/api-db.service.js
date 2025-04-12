const axios = require("axios");

const API_DB_URL = process.env.API_DB_URL || "http://localhost:3001/api";

const apiDbClient = axios.create({
  baseURL: API_DB_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiDbService = {
  /**
   * Register a new client
   * @returns {Promise<Object>} API response with client data
   */
  registerClient: async (clientData) => {
    try {
      const response = await apiDbClient.post("/clients/register", clientData);
      return response;
    } catch (error) {
      console.error(
        "Error calling API-DB service to register client:",
        error.message
      );
      throw error;
    }
  },
};

module.exports = apiDbService;
