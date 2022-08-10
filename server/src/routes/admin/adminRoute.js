const express = require("express");
const router = express.Router();
const upload = require('../../helpers/multer');
const authController = require("../../controllers/AuthController");
const productController = require("../../controllers/admin/ProductController");

router.get("/", authController.index);

router.get("/produtos", productController.index);
router.get("/produtos/cadastro", productController.create);
router.post("/produtos/cadastro", upload.single('image'), productController.store);
router.get("/produtos/editar/:id", productController.edit);
router.put("/produtos/editar/:id", upload.single('image'), productController.update);
router.get("/produtos/:id", productController.show);

module.exports = router;