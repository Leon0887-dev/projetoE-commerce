const express = require("express");
const router = express.Router();
const administratorproductsController = require("../controllers/AdministratorProductsController");

router.get("/", administratorproductsController.index);

module.exports = router;