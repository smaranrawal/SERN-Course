require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const authRoute = require("./routes/auth/index.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extend:true}));
app.use(require('./middleware/error.middleware'));

sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error connecting", err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/auth", authRoute);

app.listen(3000, () => console.log("Server Running"));
