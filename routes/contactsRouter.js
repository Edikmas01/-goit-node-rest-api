const express = require("express");
const contactsControllers = require("../controllers/contactsControllers");
var router = express.Router();

router.get("/", contactsControllers.getAllContacts);
router.get("/:id", contactsControllers.getOneContacts);
router.post("/", contactsControllers.addContact);
router.patch("/:id", contactsControllers.update);
router.delete("/:id", contactsControllers.remove);

module.exports = router;
