const express = require("express");
const dotenv = require("dotenv");
const cats = require("./routes/cats");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB()
  .then((conn) => {
    console.log(`mongoDB Connected ${conn.connection.host}`.blue.bold);
  })
  .catch((err) => {
    console.log(`Erorr ${err}`.red);
    process.exit(1);
  });

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

if (process.env.NODE_ENV == "development") {
  // app.use(logger);
  app.use(morgan("dev"));
}
app.use("/api/v1/cats", cats);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is Up At ${PORT}`.yellow);
});
