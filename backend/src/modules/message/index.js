const router = require("express").Router();
const controller = require("./controller");
const authguard = require("../../../middleware/authGuard");
const validator = require("./validator");

module.exports = {
  configure: ({ app }) => {
    router.post(
      "/create",
      authguard,
      validator.create,
      controller.createMessage
    );
    return router;
  },
};
