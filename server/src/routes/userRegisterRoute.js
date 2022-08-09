const express = require("express");
const router = express.Router();
const userRegisterController = require("../controllers/UserRegisterController");

router.get("/",userRegisterController.index);



module.exports = router;