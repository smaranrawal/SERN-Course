const express = require("express");
const createProductController = require("../../controller/products");

const router = express.Router();

router.post("/products", createProductController);

module.exports = router;
