const { createUser, loginUser } = require("../../services/user");
const signupController = async (req, res) => {
  const { name, email, password, type } = req.body;
  const user = await createUser({ name, email, password, type });
  res.status(200).json({
    sucess: true,
    message: "User signed up",
    data: user,
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser({ email, password });
  res
    .status(200)
    .json({ sucess: true, message: "User logged in", data: { email } });
};

module.exports = { signupController, loginController };
