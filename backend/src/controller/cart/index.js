const {
  addToCart,
  updateCartItem,
  deleteCartItems,
  findSingleCart,
  createCart,
  updateCart,
  deleteCart,
} = require("../../services/cart");
const httpError = require("../../utils/httpError");

const upsertCartController = async (req, res) => {
  const cartData = req.body;

  const cart = await findSingleCart(
    cartData.cartId
      ? { id: cartData.cartId, status: "pending" }
      : { item_id: cartData.item_id, user_id: req.user.id, status: "pending" }
  );
  if (!cart) {
    const newCart = await createCart({
      item_id: cartData.item_id,
      user_id: req.user.id,
    });
    return res.status(200).json({
      success: true,
      messsage: "Cart created seccessfully",
      data: newCart,
    });
  }

  const isDeleting = cartData.dec && cart.no_of_item === 1;
  if (isDeleting) {
    await deleteCart({ id: cart.id });
    return res
      .status(200)
      .json({ success: true, messsage: "Cart deleted seccessfully" });
  }

  const updatedData = await updateCart(cart.id, {
    no_of_item: cartData.dec ? cart.no_of_item - 1 : cart.no_of_item + 1,
  });
  return res.status(200).json({
    success: true,
    messsage: "Cart updated seccessfully",
    data: updatedData,
  });
};


module.exports = {
  upsertCartController,
};
