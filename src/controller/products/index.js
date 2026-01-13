const {
  createProduct,
  deleteProduct,
  updateProducts,
  getAllProducts,

  getProductsById,
} = require("../../services/products");
const httpError = require("../../utils/httpError");

const createProductController = async (req, res) => {
  const { name, description, price, categories, image } = req.body;
  if (!name || !price) {
    return next(httpError("Name and price are required", 400));
  }
  const product = await createProduct({
    name,
    description,
    price,
    categories,
    image,
    vendorid: req.user.id,
  });
  res.status(200).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

const listVendorProductController = async (req, res) => {
  const { limit, page } = req.query;

  const products = await getAllProducts({ vendorid: req.user.id }, limit, page);
  res.status(200).json({ success: true, data: products });
};

const listVendorProductByIdController = async (req, res) => {
  const { productId } = req.params;

  const products = await getProductsById(productId);
  res.status(200).json({ success: true, data: products });
};

//for customer
const getProductsController = async (req, res) => {
  const { limit, page } = req.query;
  const products = await getAllProducts({}, limit, page);
  res.status(200).json({ success: true, data: products });
};

const getCustomerProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductsById(productId);
  res.status(200).json({ success: true, data: product });
};

const updateProductController = async (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;

  const updatedProduct = await updateProducts(
    productId,
    req.user.id,
    updateData
  );
  res.status(200).json({
    success: true,
    message: "Product updated sucessfully",
    data: updatedProduct,
  });
};

const deleteProductController = async (req, res) => {
  const { productId } = req.params;

  await deleteProduct(productId, req.user.id);
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
};

module.exports = {
  createProductController,
  listVendorProductController,
  listVendorProductByIdController,
  getCustomerProductByIdController,
  getProductsController,
  updateProductController,
  deleteProductController,
};
