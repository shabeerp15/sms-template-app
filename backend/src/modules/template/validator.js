const Joi = require("joi-oid");

const templateSchema = Joi.object({
  name: Joi.string().required(),
  message: Joi.string().required(),
});

module.exports = {
  create(req, res, next) {
    const result = templateSchema.validate(req.body);
    if (result.error != null) {
      return res
        .status(400)
        .json({ status: 400, message: result.error.message });
    } else {
      next();
    }
  },
};
