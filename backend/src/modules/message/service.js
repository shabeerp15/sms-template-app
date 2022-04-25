const templateServices = require("../template/service");
const ShortUrl = require("./model").ShortUrl;

const createMessage = async (templateId, content) => {
  try {
    const template = await templateServices.getTemplateById(templateId);
    let template_body = template.message;
    let message;
    if (
      !content.match(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      )
    ) {
      message = template_body.replace("$custom$", content);
    } else {
      const result = await ShortUrl.create({ full: content });
      message = template_body.replace(
        "$custom$",
        `http://localhost:9000/api/message/${result.short}`
      );
    }

    return message ? message : false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  createMessage,
};
