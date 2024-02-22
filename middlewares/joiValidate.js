const Joi = require("joi");
const { model } = require("mongoose");

const schema = Joi.object({
  name: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).max(14).required(),
});

const validateData = (req, res, next) => {
  const data = req.body;
  return schema.validate(data, schema);
};

module.exports = validateData;
