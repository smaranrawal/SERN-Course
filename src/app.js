require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const authRoute = require("./routes/auth/index.js");
const cookieParser = require("cookie-parser");
const app = express();
const { isProtectedRoute,isVendor } = require("./middleware/auth.js");

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

app.use(isProtectedRoute);
app.use('/vendor',isVendor,require('./routes/vendor'))
app.get("/test", (req, res) => {
  console.log("Usser Data", req.user);
  res.send("Test Route");
});
app.use(require("./middleware/error.middleware"));
app.listen(3000, () => console.log("Server Running"));
