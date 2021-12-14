const express = require("express");
const dotenv = require("dotenv");
const cats = require("./routes/cats");

// const logger = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/.env" });

connectDB()
  .then((conn) => {
    console.log(`mongoDB Connected ${conn.connection.host}`);
  })
  .catch((err) => {
    console.log(`Erorr ${err}`);
    process.exit(1);
  });

const PORT = process.env.PORT;
const app = express();

if (process.env.NODE_ENV == "development") {
  // app.use(logger);
  app.use(morgan("dev"));
}
app.use("/api/v1/cats", cats);

const server = app.listen(PORT, () => {
  console.log(`server ${PORT}`);
});

// handle rejection
