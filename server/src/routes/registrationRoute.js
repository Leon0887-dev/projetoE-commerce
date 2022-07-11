const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/RegistrationController");

router.get("/", registrationController.index);

module.exports = router;