const User = require("./model").User;
const bcrypt = require("bcrypt");

const createUser = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: false, message: "User already exists" };
    }
    const user = new User({
      email,
      password,
    });
    const result = await user.save();
    return { status: true, user: result };
  } catch (error) {
    return { status: false, message: "Something went wrong" };
  }
};

const signin = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: false, message: "User does not exist" };
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return { status: false, message: "Password is incorrect" };
    }
    const token = await user.generateAuthToken(); //Generates Token for Authentication
    return { status: true, user: user.toJSON(), token };
  } catch (error) {
    return { status: false, message: "Something went wrong" };
  }
};

module.exports = {
  createUser,
  signin,
};
