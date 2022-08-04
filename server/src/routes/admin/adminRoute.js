const express = require("express");
const router = express.Router();
const authController = require("../../controllers/admin/AuthController");
const productController = require("../../controllers/admin/ProductController");

router.get("/", authController.index);
router.get("/produtos", productController.index);

module.exports = router;