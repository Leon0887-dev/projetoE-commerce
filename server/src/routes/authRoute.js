const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const adminAuth = require("../controllers/admin/AuthController");
const isAuth = require("../middlewares/auth");
const isGuest = require("../middlewares/guest");

router.get("/login", isGuest, authController.login);
router.post("/login", isGuest, adminAuth.auth);

router.get("/registro", isGuest, authController.register);
router.post("/registro", isGuest, adminAuth.store);

router.post("/logout", isAuth, adminAuth.logout);

module.exports = router;