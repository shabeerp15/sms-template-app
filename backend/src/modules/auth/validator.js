const Joi = require("joi-oid");

const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .lowercase()
    .trim()
    .required(),
  password: Joi.string().min(6).max(50).trim().required(),
});

module.exports = {
  user(req, res, next) {
    const result = userSchema.validate(req.body);
    if (result.error != null) {
      return res
        .status(400)
        .json({ status: 400, message: result.error.message });
    } else {
      next();
    }
  },
};
