const express = require("express");
const users = require("./user.routes");

// USER - authentication api main route
router.use("/user", users);

const router = express.Router();
