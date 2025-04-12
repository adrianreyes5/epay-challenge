// Servicio para comunicarse con API-DB
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
  registerClient: async (clientData) => {
    return await apiDbClient.post("/clients/register", clientData);
  },
};

module.exports = apiDbService;
