const express = require("express");
const dotenv = require("dotenv");
const cats = require("./routes/cats");
const logger = require("./middleware/logger");

dotenv.config(".env");
const PORT = process.env.PORT;

const app = express();

app.use(logger);
app.use("/api/v1/cats", cats);

app.listen(PORT, () => {
  console.log(`server ${PORT}`);
});
