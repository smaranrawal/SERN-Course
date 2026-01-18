const Products = require("../../model/products");

const createProduct = async (productData) => {
  try {
    const product = await Products.create({ ...productData });
    return product;
  } catch (error) {
    console.error("Error creating user", error);
  }
};

const getAllProducts = async (attr, l, p) => {
  const limit = l ? l : null;
  const offset = l ? p - 1 : null;

  try {
    const products = await Products.findAll({
      where: attr,
      limit,
      offset,
    });
    return products;
  } catch (error) {
    console.error("Error products fetching data", error);
  }
};

const getProductsById = async (productId) => {
  try {
    const product = await Products.findByPk(productId);
    return product;
  } catch (error) {
    console.error("Error products fetching data by Id", error);
  }
};

const updateProducts = async (productId, vendorId, updateData) => {
  try {
    const product = await Products.findOne({
      where: { id: productId, vendorid: vendorId },
    });
    if (!product) {
      throw new Error("Products not found ");
    }
    await product.update(updateData);
    return product;
  } catch (error) {
    console.error("Error updating product", error);
  }
};

const deleteProduct = async (productId, vendorId) => {
  try {
    const product = await Products.findOne({
      where: { id: productId, vendorid: vendorId },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    await product.destroy();
    return true;
  } catch (error) {
    console.error("Error deleting product", error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProducts,
  deleteProduct,
};
