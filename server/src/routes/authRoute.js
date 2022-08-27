const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const isAuth = require("../middlewares/auth");
const isGuest = require("../middlewares/guest");

router.get("/login", authController.login);
router.post("/login", authController.auth);

router.get("/registro", authController.register);
router.post("/registro", authController.create);

router.post("/logout", authController.logout);

module.exports = router;