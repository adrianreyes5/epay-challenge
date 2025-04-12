const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.API_GATEWAY_PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway Service running on port ${PORT}`);
});
