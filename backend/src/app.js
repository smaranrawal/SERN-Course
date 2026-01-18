require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const authRoute = require("./routes/auth/index.js");
const vendorRoute = require("./routes/vendor");
const cartRoute = require("./routes/cart");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cors());
const {
  isProtectedRoute,
  isVendor,
  isCustomer,
} = require("./middleware/auth.js");
const {
  getProductsController,
  getCustomerProductByIdController,
} = require("./controller/products/index.js");

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(cookieParser());

sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error connecting", err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/auth", authRoute);
app.use("/products", getProductsController); //for customers
app.use("/product/:productId", getCustomerProductByIdController); //for sutomer by id

app.use(isProtectedRoute);
app.use("/vendor", isVendor, vendorRoute);
app.get("/test", (req, res) => {
  console.log("Usser Data", req.user);
  res.send("Test Route");
});
app.use("/cart", isCustomer, cartRoute);
app.use(require("./middleware/error.middleware"));
app.listen(8000, () => console.log("Server Running"));
