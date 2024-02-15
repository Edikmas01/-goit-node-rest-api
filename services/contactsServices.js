const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");
const { getAllContacts } = require("../controllers/contactsControllers");
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function writeFile(data) {
  const string = JSON.stringify(data);

  await fs.writeFile(contactsPath, string, (err) => {
    if (err) {
      throw err;
    }

    console.log("contact added successfully");
  });
}

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    return data;
  });

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContacts = {
    id: uuid(),
    name,
    email,
    phone,
  };

  contacts.push(newContacts);

  await writeFile(contacts);

  return newContacts;
}

async function updateContact(id, data) {
  const contacts = await listContacts();

  const updatedContacts = contacts.map((c) => {
    if (c.id === id) {
      Object.assign(c, data);
    }

    return c;
  });

  await writeFile(updatedContacts);

  const updatedContact = await getContactById(id);
  return updatedContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const removeContact = contacts.filter((c) => c.id !== contactId);

  await writeFile(removeContact);
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
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  validateData,
};
