const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Start server
const PORT = process.env.API_DB_PORT || 3001;
app.listen(PORT, () => {
  console.log(`API-DB Service runnasdasding on port ${PORT}`);
});
