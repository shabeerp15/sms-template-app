const Joi = require("joi-oid");

const messageSchema = Joi.object({
  templateId: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  create(req, res, next) {
    const result = messageSchema.validate(req.body);
    if (result.error != null) {
      return res
        .status(400)
        .json({ status: 400, message: result.error.message });
    } else {
      next();
    }
  },
};
