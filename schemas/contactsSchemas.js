const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);

/* const contactSchema = Joi.object({
  name: Joi.string().min(4).max(8).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}); */

module.exports = Contact;
