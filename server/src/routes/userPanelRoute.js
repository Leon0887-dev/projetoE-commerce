const express = require("express");
const router = express.Router();
const userPanelController = require("../controllers/UserPanelController");

router.get("/",userPanelController.index);
router.get("/meuspedidos",userPanelController.myRequests);
router.get("/meusenderecos",userPanelController.myAddresses);
router.get("/meusdados",userPanelController.myPersonalData);
router.get("/alterarsenha",userPanelController.changePassword);

module.exports = router;