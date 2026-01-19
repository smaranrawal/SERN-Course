const {
  createUser,
  loginUser,
  getUserByEmail,
} = require("../../services/user");

const { verifyPassword, generateJWTToken } = require("../../utils/auth");
const httpError = require("../../utils/httpError");

const signupController = async (req, res, next) => {
  const { name, email, password, type } = req.body;
  if (!email || !password || !name) {
    return next(httpError("Name ,email and password are required", 400));
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return next(httpError("User with email already exist", 400));
  }

  const user = await createUser({ name, email, password, type });
  res.status(200).json({
    sucess: true,
    message: "User signed up",
    data: user,
  });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(httpError("Email and password are required", 400));
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return next(httpError("User not found", 404));
  }

  const passwordMatched = await verifyPassword(password, user.password);
  if (!passwordMatched) {
    return next(httpError("Invaid password", 400));
  }

  const jwtToken = generateJWTToken(user);
  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, //1 day
    sameSite: "strict",
  });
  res.status(200).json({
    success: true,
    message: "User logged in",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    },
  });
};

module.exports = { signupController, loginController };
