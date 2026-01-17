const express = require("express");
const {
  addToCartController,
  updateCartController,
  deleteCartController,
  upsertCartController,
} = require("../../controller/cart");
const router = express.Router();

router.patch("/", upsertCartController);
// router.post("/:itemId", addToCartController);
// router.patch("/:itemId", updateCartController);
// router.delete("/:itemId", deleteCartController);

module.exports = router;
