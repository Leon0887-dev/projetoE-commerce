const express = require("express");
const router = express.Router();
const upload = require('../../helpers/multer');
const authController = require("../../controllers/admin/AuthController");
const productController = require("../../controllers/admin/ProductController");
const adminAuthController = require("../../controllers/admin/AdminAuthController");
const productValidator = require("../../middlewares/productValidator");
const adminUserValidator = require("../../middlewares/adminUserValidator");

router.get("/produtos/cadastro", productController.create);
router.post("/produtos/cadastro", upload.single('image'), productValidator, productController.store);
router.get("/produtos/editar/:id", productController.edit);
router.put("/produtos/editar/:id", upload.single('image'), productController.update);
router.get("/produtos/deletar/:id", productController.delete);
router.delete("/produtos/deletar/:id", productController.destroy);
router.get("/produtos", productController.index);
router.get("/produtos/:id", productController.show);

router.get("/usuarios/cadastro", adminAuthController.create);
router.post("/usuarios/cadastro", adminUserValidator,adminAuthController.store);
router.get("/usuarios/editar/:id", adminAuthController.edit);
router.put("/usuarios/editar/:id", adminAuthController.update);
router.get("/usuarios/deletar/:id", adminAuthController.delete);
router.delete("/usuarios/deletar/:id", adminAuthController.destroy);
router.get("/usuarios", adminAuthController.index);

router.get("/login", adminAuthController.login);
router.post("/login", adminAuthController.auth);
router.post("/logout", adminAuthController.logout);

module.exports = router;