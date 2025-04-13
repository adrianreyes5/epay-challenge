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
  /**
   * Recharge a client's wallet
   */
  rechargeWallet: async (walletData) => {
    try {
      const response = await apiDbClient.post("/wallets/recharge", walletData);
      return response;
    } catch (error) {
      console.error(
        "Error calling API-DB service to recharge wallet:",
        error.message
      );
      throw error;
    }
  },
  /**
   * Create a payment session
   */
  createPaymentSession: async (paymentData) => {
    try {
      const response = await apiDbClient.post("/payments/create-session", paymentData);
      return response;
    } catch (error) {
      console.error(
        "Error calling API-DB service to create payment session:",
        error.message
      );
      throw error;
    }
  },
  /**
   * Confirm a payment with token
   */
  confirmPayment: async (confirmationData) => {
    try {
      const response = await apiDbClient.post("/payments/confirm", confirmationData);
      return response;
    } catch (error) {
      console.error(
        "Error calling API-DB service to confirm payment:",
        error.message
      );
      throw error;
    }
  },
};

module.exports = apiDbService;
