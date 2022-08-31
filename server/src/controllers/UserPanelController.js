const fs = require ("fs");
const path = require("path");

const userPanelController = {
    index: (req,res)=>{
        const usersJson = fs.readFileSync(
            //Caminho do arquivo
            path.join(__dirname, "..", "data", "users.json"),
            //Formato de leitura
            "utf-8",
        );
        const users = JSON.parse(usersJson);
        
        const personalUser = users.find((user)=>{
            if (user.id === req.cookies.user.id) return user;
        })
        
        return res.render("userPanel",{
            title:"Minha Conta",
            user: personalUser,
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

        const usersJson = fs.readFileSync(
            //Caminho do arquivo
            path.join(__dirname, "..", "data", "users.json"),
            //Formato de leitura
            "utf-8",
        );
        const users = JSON.parse(usersJson);
        
        const personalUser = users.find((user)=>{
            if (user.id === req.cookies.user.id) return user;
        })
        
        return res.render("personalData",{
            title:"Meus Dados",
            user: personalUser,
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