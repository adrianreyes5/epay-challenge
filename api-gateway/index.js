const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/clients", require("./routes/client.routes"));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`API Gateway Service running on port ${PORT}`);
});
