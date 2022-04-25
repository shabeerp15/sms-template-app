const jwt = require("jsonwebtoken");
const User = require("../src/modules/auth/model").User;

module.exports = (req, res, next) => {
  try {
    const authHeader =
      req.headers["Authorization"] || req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "authorization must be provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    User.findById(decoded._id, (err, user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};
