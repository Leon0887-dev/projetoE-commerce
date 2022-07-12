const express = require("express");
const router = express.Router();
const userPanelController = require("../controllers/UserPanelController");

router.get("/",userPanelController.index);
router.get("/meusPedidos",userPanelController.myRequests);
router.get("/meusEnderecos",userPanelController.myAddresses);
router.get("/meusDados",userPanelController.myPersonalData);
router.get("/alterarSenha",userPanelController.changePassword);

module.exports = router;