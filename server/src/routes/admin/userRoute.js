const express = require("express");
const router = express.Router();
const authController = require("../../controllers/admin/AuthController");

router.get("/", authController.index);
router.get("/:id", authController.show);
router.post("/", authController.store);
router.put("/:id", authController.update);
router.delete("/:id", authController.destroy);

module.exports = router;