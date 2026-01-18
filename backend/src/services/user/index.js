const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const { encryptPassword } = require("../../utils/auth");

const createUser = async (userData) => {
  try {
    const user = (
      await User.create({
        ...userData,
        password: await encryptPassword(userData.password),
      })
    ).toJSON();
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.log("Create error  failed", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Erro fetching user by email", error);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("Invalid passsowrd");
    }

    const userData = user.toJSON();
    const { password: pwd, ...userWithoutPassword } = userData;

    return userWithoutPassword;
  } catch (error) {
    console.log("Error Logging in user", error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserByEmail,
};
