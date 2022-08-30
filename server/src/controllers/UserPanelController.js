const userPanelController = {
    index: (req,res)=>{
        return res.render("userPanel",{
            title:"Minha Conta",
            user: req.cookies.user
        });
    },
    myRequests: (req,res)=>{
        return res.render("myRequests",{
            title:"Meus Pedidos",
            user: req.cookies.user
        });
    },
    myAddresses: (req,res)=>{
        return res.render("address",{
            title:"Meus Endereços",
            user: req.cookies.user
        });
    },
    myPersonalData: (req,res)=>{
        return res.render("personalData",{
            title:"Meus Dados",
            user: req.cookies.user
        });
    },
    changePassword: (req,res)=>{
        return res.render("changePassword",{
            title:"Alterar Senha",
            user: req.cookies.user
        });
    },
};

module.exports = userPanelController;