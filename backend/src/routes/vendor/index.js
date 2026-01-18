const express = require("express");
const {
  createProductController,
  listVendorProductController,
  updateProductController,
  deleteProductController,
  listVendorProductByIdController,
} = require("../../controller/products");

const router = express.Router();

//Create Product
router.post("/products", createProductController);
//get single products for vendor
router.get("/products/:productId", listVendorProductByIdController);
//List all Products
router.get("/products", listVendorProductController);
//Update products
router.patch("/products/:productId", updateProductController);
//Delete Products
router.delete("/products/:productId", deleteProductController);
  
module.exports = router;
