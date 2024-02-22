const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");
const Contact = require("../schemas/contactsSchemas");

async function writeFile(data) {
  const string = JSON.stringify(data);

  await fs.writeFile(contactsPath, string, (err) => {
    if (err) {
      throw err;
    }

    console.log("contact added successfully");
  });
}

async function getAll() {
  const contacts = await Contact.find();

  return contacts;
}

async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);

  return contact;
}

async function addContact({ name, email, phone }) {
  const newContact = new Contact({ name, email, phone });
  newContact.save();

  return newContact;
}

async function updateContact(id, data) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, data);

    await updatedContact.save();

    
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    throw new Error(error.message);
  }
}

function validateData({ name, email, phone }) {
  let nameError = "";
  let emailError = "";
  let phoneError = "";

  if (!name) {
    nameError = "Name is required";
  }

  if (name && (name.length < 3 || name.length > 10)) {
    nameError = "Name must be between 3 and 10 characters long";
  }

  if (!email) {
    emailError = "Email is required";
  }

  if (!phone) {
    phoneError = "Phone number is required";
  }

  const errors = {};

  if (phoneError) {
    errors.phone = phoneError;
  }

  if (nameError) {
    errors.name = nameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  return errors;
}

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  validateData,
};
