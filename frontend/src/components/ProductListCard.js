import React from "react";

const ProductListCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-800">
          <span className="font-semibold">Description:</span>{" "}
          <span className="font-normal">{product.description}</span>
        </p>
        <p className="text-gray-600 mt-2">Rs. {product.price}</p>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductListCard;
