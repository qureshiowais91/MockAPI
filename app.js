const express = require("express");
const dotenv = require("dotenv");

dotenv.config(".env");

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
  console.log(`server ${PORT}`);
});
