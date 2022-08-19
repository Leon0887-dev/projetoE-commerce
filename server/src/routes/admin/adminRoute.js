const express = require("express");
const router = express.Router();
const upload = require('../../helpers/multer');
const authController = require("../../controllers/admin/AuthController");
const productController = require("../../controllers/admin/ProductController");
const productValidator = require("../../middlewares/productValidator");

router.get("/", authController.index);

router.get("/produtos/cadastro", productController.create);
router.post("/produtos/cadastro", upload.single('image'), productValidator, productController.store);
router.get("/produtos/editar/:id", productController.edit);
router.put("/produtos/editar/:id", upload.single('image'), productController.update);
router.get("/produtos/deletar/:id", productController.delete);
router.delete("/produtos/deletar/:id", productController.destroy);
router.get("/produtos", productController.index);
router.get("/produtos/:id", productController.show);

module.exports = router;