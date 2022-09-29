const fs = require ("fs");
const path = require("path");
const User = require("../models/User");
const ImageUser = require("../models/ImageUser");
const UserAddress = require("../models/UserAddress");

const userPanelController = {
    show: async (req, res) => {
        
        try{
            const {id} = req.params;
    
            const userData = await User.findByPk(id,{
                include: [
                    { model: UserAddress },
                    { model: ImageUser },
                ]
            });           

            //Verificando se existe algum usuário, se não existir, renderiza a view error
            if(!userData){
                return res.render("error", {
                    title: "Ops!",
                    message: "Usuário não encontrado.",
                    user: req.cookies.user
                });
            }

            return res.render("userPanel", {
                title: "Minha conta",
                userData,
                user: req.cookies.user
            });

        }catch(error){
            return res.render("error", {
                title: "Ops!",
                message: "Usuário não encontrado.",
                user: req.cookies.user
            });
        }
    },
    myPersonalData: async (req,res)=>{

        try{

            const {id} = req.params;
    
            const userData = await User.findByPk(id,{
                include: [
                    { model: UserAddress },
                    { model: ImageUser },
                ]
            });           

            if(!userData){
                return res.render("error", {
                    title: "Ops!",
                    message: "Usuário não encontrado.",
                    user: req.cookies.user
                });
            }

            return res.render("personalData", {
                title: "Minha conta",
                userData,
                user: req.cookies.user
            }); 

        }catch(error){
            return res.render("error", {
                title: "Ops!",
                message: "Erro na exibição dos dados.",
                user: req.cookies.user
            });
        }       
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
    createMyAddresses: (req,res)=>{

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

        
        const {apelido, cep, endereco, numero, complemento, bairro,cidade, estado, destinatario} = req.body;
        
        if (!apelido || 
            !cep || 
            !endereco ||
             !numero || 
             !complemento ||
              !bairro ||
               !cidade || 
               !estado || 
               !destinatario)
               {
                return res.render("/", {message: "preencha todos os campos"})
        }


        
        const newAdress = {apelido, cep, endereco, numero, complemento,bairro,cidade, estado, destinatario}

        personalUser.enderecos.push(newAdress);

        
        console.log(users);

        // console.log(personalUser);

        return res.render("userPanel", {
            title: "Minha conta",
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