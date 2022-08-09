const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

router.get("/login", authController.login);
router.post("/login", authController.auth);


router.get("/criarConta", authController.register);
router.post("/criarConta", authController.create);

module.exports = router;

