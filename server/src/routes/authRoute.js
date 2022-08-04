const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const isAuth = require("../middlewares/auth");
const isGuest = require("../middlewares/guest");

//formulario de login
router.get("/login", isGuest, authController.login);
router.post("/login", isGuest, authController.auth);

router.get("/registro", isGuest, authController.register);
router.post("/registro", isGuest, authController.create);

router.post("/logout", isAuth, authController.logout);

module.exports = router;