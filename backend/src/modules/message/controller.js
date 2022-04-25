const services = require("./service");

const createMessage = async (req, res) => {
  try {
    const { templateId, content } = req.body;
    const result = await services.createMessage(templateId, content);
    if (!result) {
      return res.status(400).json({ message: "Message creation failed" });
    }
    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createMessage,
};
