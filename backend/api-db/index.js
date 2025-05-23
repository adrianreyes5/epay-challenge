const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

const prisma = new PrismaClient();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to MySQL database via Prisma");

    const PORT = process.env.API_DB_PORT || 3001;
    app.listen(PORT, () => {
      console.log(`API-DB Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
