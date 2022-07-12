const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.get("/",productController.index);

module.exports = router;