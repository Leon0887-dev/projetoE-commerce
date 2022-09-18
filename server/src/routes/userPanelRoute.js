const express = require("express");
const router = express.Router();
const userPanelController = require("../controllers/UserPanelController");

router.get("/",userPanelController.index);
router.get("/pedidos",userPanelController.myRequests);
router.get("/dados",userPanelController.myPersonalData);
router.get("/endereco",userPanelController.myAddresses);
router.post("/endereco",userPanelController.createMyAddresses);
router.get("/senha",userPanelController.changePassword);

module.exports = router;