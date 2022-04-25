const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");

module.exports = {
  configure: ({ app }) => {
    router.post("/signup", validator.user, controller.signup);
    router.post("/signin", validator.user, controller.signin);

    return router;
  },
};
