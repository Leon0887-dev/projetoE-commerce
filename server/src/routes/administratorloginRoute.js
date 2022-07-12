const express = require("express");
const router = express.Router();
const administratorloginController = require("../controllers/AdministratorloginController");

router.get("/", administratorloginController.index);

module.exports = router;