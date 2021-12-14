const express = require("express");
const dotenv = require("dotenv");
const cats = require("./routes/cats");
// const logger = require("./middleware/logger");
const morgan = require("morgan");

dotenv.config(".env");
const PORT = process.env.PORT;

const app = express();

if (process.env.NODE_ENV == "development") {
  // app.use(logger);
  app.use(morgan('dev'));
}
app.use("/api/v1/cats", cats);

app.listen(PORT, () => {
  console.log(`server ${PORT}`);
});
