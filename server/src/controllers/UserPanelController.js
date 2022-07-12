const userPanelController = {
    index: (req,res)=>{
        return res.render("userPanel",{title:"Minha Conta"});
    },
    myRequests: (req,res)=>{
        return res.render("myRequests",{title:"Meus Pedidos"});
    },
    myAddresses: (req,res)=>{
        return res.render("address",{title:"Meus Endereços"});
    },
    myPersonalData: (req,res)=>{
        return res.render("personalData",{title:"Meus Dados"});
    },
    changePassword: (req,res)=>{
        return res.render("changePassword",{title:"Alterar Senha"});
    },
};

module.exports = userPanelController;