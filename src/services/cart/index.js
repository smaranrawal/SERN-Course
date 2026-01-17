const Cart = require("../../model/cart");

const findSingleCart = async (query) => {
  try {
    const cart = await Cart.findOne({ where: query });
    return cart;
  } catch (error) {
    console.error("Error fetching cart");
  }
};

const createCart = async (cartData) => {
  try {
    const cart = await Cart.create({ ...cartData });
    return cart;
  } catch (error) {
    console.error("Error creating cart", error);
  }
};
const deleteCart = async (query) => {
  try {
    const cart = await Cart.destroy({ where: query });
    return cart;
  } catch (error) {
    console.error("Error deleting cart", error);
  }
};

const updateCart = async (cartId, updateData) => {
  try {
    const cart = await Cart.update(updateData, { where: { id: cartId } });
    return cart;
  } catch (error) {
    console.error("Error updating cart", error);
  }
};

module.exports = {
  findSingleCart,
  createCart,
  updateCart,
  deleteCart,
};
