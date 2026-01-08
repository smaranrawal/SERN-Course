const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const createUser = async (userData) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
    const user = (await User.create(userData)).toJSON();
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    console.log("Error", error);
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
};
