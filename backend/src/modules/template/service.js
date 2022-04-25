const Template = require("./model").Template;

const listAllTemplates = async () => {
  try {
    const templates = await Template.find();
    return templates ? templates : false;
  } catch (error) {
    return false;
  }
};

const createTemplate = async (data) => {
  try {
    const template = await Template.create(data);
    return template ? template : false;
  } catch (error) {
    return false;
  }
};

const getTemplateById = async (id) => {
  try {
    const template = await Template.findOne({ _id: id });
    // console.log({ template });
    return template ? template : false;
  } catch (error) {
    return false;
  }
};

const updateTemplateById = async (id, data) => {
  try {
    const template = await Template.findByIdAndUpdate(id, data);
    if (!template) {
      return false;
    }
    const updatedTemplate = await Template.findById(id);
    return updatedTemplate ? updatedTemplate : false;
  } catch (error) {
    return false;
  }
};

const deleteTemplateById = async (id) => {
  try {
    const template = await Template.findByIdAndDelete(id);
    return template ? template : false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  createTemplate,
  listAllTemplates,
  getTemplateById,
  updateTemplateById,
  deleteTemplateById,
};
