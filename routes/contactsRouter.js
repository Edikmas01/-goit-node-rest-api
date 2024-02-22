const express = require("express");
const contactsControllers = require("../controllers/contactsControllers");
const validateData = require("../middlewares/joiValidate");
var router = express.Router();

router.get("/", contactsControllers.getAllContacts);
router.get("/:id", contactsControllers.getOneContacts);
router.post("/", validateData, contactsControllers.addContact);
router.patch("/:id", contactsControllers.update);
router.delete("/:id", contactsControllers.remove);

module.exports = router;
