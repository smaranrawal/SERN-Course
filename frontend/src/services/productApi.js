const getProductList = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product list", error);
  }
};

export { getProductList };
