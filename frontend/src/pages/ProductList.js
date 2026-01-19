import React, { useEffect, useState } from "react";
import { getProductList } from "../services/productApi";
import ProductListCard from "../components/ProductListCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProductList();
        setProducts(result.data);
        console.log(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error:{error}</div>;
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Products</h1>

        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductListCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
