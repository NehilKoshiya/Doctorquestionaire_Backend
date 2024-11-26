const express = require("express");
var mainRouter = require("./routes/main.routes");
const { notFoundRoute, errorHandler } = require("./middleware/error_handler");
const cors = require("cors");

require("dotenv").config();
require("./database/database_connection");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET POST PUT DELETE PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/v1", mainRouter);
app.use(notFoundRoute);
app.use(errorHandler);

app.listen(process.env.port);
