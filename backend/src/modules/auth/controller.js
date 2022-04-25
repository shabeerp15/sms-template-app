const services = require("./service");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await services.createUser(email, password);
    if (!result.status) {
      return res.status(400).json({ message: result.message });
    }
    return res
      .status(200)
      .json({ message: "User created successfully", user: result.user });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await services.signin(email, password);
    if (!result.status) {
      return res.status(400).json({ message: result.message });
    }

    let user = result.user;
    delete user.password;

    return res.status(200).json({
      message: "User signed in successfully",
      user: user,
      token: result.token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signup,
  signin,
};
