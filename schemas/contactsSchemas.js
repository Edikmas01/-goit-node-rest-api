const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(4).max(8).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = contactSchema;