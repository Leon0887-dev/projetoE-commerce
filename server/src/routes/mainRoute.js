const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

router.get("/",mainController.index);
router.get("/sobre",mainController.about);
router.get("/blog",mainController.blog);
router.get("/contato",mainController.contact);

module.exports = router;