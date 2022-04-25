const services = require("./service");

const listAllTemplates = async (req, res) => {
  try {
    const templates = await services.listAllTemplates();
    if (!templates) {
      return res.status(404).json({ message: "No templates found" });
    }
    return res.status(200).json({ message: "Success", data: templates });
  } catch (error) {
    return res.status(500).json({ message: "Error listing templates" });
  }
};

const createTemplate = async (req, res) => {
  try {
    const { name, message } = req.body;
    const template = await services.createTemplate({ name, message });
    if (!template) {
      return res.status(400).json({ message: "Template not created" });
    }
    return res
      .status(200)
      .json({ message: "Template created", data: template });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await services.getTemplateById(id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    return res.status(200).json({ message: "Success", data: template });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, message } = req.body;
    const template = await services.updateTemplateById(id, { name, message });
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    return res
      .status(200)
      .json({ message: "Template updated", data: template });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await services.deleteTemplateById(id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    return res.status(200).json({ message: "Template deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createTemplate,
  listAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
};
