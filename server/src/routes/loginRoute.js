const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");
const isAuth = require("../middlewares/auth");
const isGuest = require("../middlewares/guest");

//formulario de login
router.get("/",loginController.index);


router.get("/login", isGuest, loginController.login);
router.post("/login", isGuest, loginController.auth);

// router.get("/register", isGuest, loginController.register);
// router.post("/register", isGuest, loginController.create);

router.post("/logout", isAuth, loginController.logout);


module.exports = router;