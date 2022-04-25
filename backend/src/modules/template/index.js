const router = require("express").Router();
const controller = require("./controller");
const authguard = require("../../../middleware/authGuard");
const validator = require("./validator");

module.exports = {
  configure: ({ app }) => {
    router.get("/list", authguard, controller.listAllTemplates);
    router.post(
      "/create",
      authguard,
      validator.create,
      controller.createTemplate
    );
    router.get("/:id", authguard, controller.getTemplateById);
    router.put("/:id", authguard, validator.create, controller.updateTemplate);
    router.delete("/:id", authguard, controller.deleteTemplate);
    return router;
  },
};
