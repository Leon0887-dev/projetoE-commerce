const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/CheckoutController");

router.get("/",checkoutController.index);

module.exports = router;