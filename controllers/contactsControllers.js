const { error } = require("console");
const contactsSchema = require("../schemas/contactsSchemas");
const contactsServices = require("../services/contactsServices");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.getAll();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getOneContacts = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsServices.getContactById(id);

  if (!contact) {
    res.status(404).send({ message: "Not found" });
    return;
  }
  res.status(200).json(contact);
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const errors = contactsServices.validateData({ name, email, phone });

  if (Object.keys(errors).length > 0) {
    res.status(422).json(errors);
    return;
  }

  try {
    const contact = await contactsServices.addContact({ name, email, phone });
    res.status(201).json(contact);
  } catch {
    res.status(500).send({ error: "Oops, an error has occured" });
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsServices.getContactById(id);

  if (!contact) {
    res.status(404).json({ error: "contact not found" });
    return;
  }

  try {
    await contactsServices.removeContact(id);
    res.status(200).json(contact);
  } catch {
    res.status(500).send({ error: "Oops, an error has occured" });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsServices.getContactById(id);

  if (!contact) {
    res.status(404).json({ error: "contact not found" });
    return;
  }

  try {
    await contactsServices.updateContact(id, req.body);

    const updatedContact = await contactsServices.getContactById(id);

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).send({ error: "Oops, an error has occured" });
  }
};
module.exports = {
  getAllContacts,
  getOneContacts,
  addContact,
  update,
  remove,
};
