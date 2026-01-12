const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async (inputPassword, storedHashedPassowrd) => {
  return await bcrypt.compare(inputPassword, storedHashedPassowrd);
};
const generateJWTToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      type: user.type,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "Id",
    }
  );
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
module.exports = {
  encryptPassword,
  verifyPassword,
  generateJWTToken,
  verifyToken,
};
