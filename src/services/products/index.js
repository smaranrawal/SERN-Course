const Products = require("../../model/products");

const createProduct = async (productData) => {
  try {
    const product = await Products.create({ ...productData });
    return product;
  } catch (error) {
    console.error("Error creating user", error);
  }
};

module.exports = { createProduct };
