const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");

// formulario de login
router.get("/",loginController.index);

// processamento de login
router.post("/login/:id",loginController.index);

// Processamento do formulario de login
router.post("/",loginController.loginProcess);



module.exports = router;