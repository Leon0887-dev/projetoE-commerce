const express = require("express");
const router = express.Router();
const userPanelController = require("../controllers/UserPanelController");

router.get("/:id",userPanelController.show);
router.get("/pedidos/:id",userPanelController.myRequests);
router.get("/dados/:id",userPanelController.myPersonalData);
router.get("/endereco/:id",userPanelController.myAddresses);
router.post("/endereco/:id",userPanelController.createMyAddresses);
router.get("/senha/:id",userPanelController.changePassword);

module.exports = router;