const AdminUser = require("../../models/AdminUser");

// Importando o express validator através da desestruturação, pegando o validationResult
const {validationResult} = require('express-validator');
const bcrypt = require("../../helpers/bcrypt");


const adminAuthController = {
    index: async (req,res)=>{

        try{

            const adminUsers = await AdminUser.findAll();

            res.render("admin/adminUsers",{
                title: "Usuários Admin",
                adminUsers,
                adminUser: req.cookies.adminUser
            });
        
        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Erro na exibição dos usuários.",
                adminUser: req.cookies.adminUser
            });
        }

    },
    login: (req,res)=>{

        try{

            return res.render("admin/login",{
                title:"Login",
            });

        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Erro ao carregar a página."
            });
        }
    },
    auth: async (req,res)=>{
        try{

            //Limpando o cookie da sessão na autenticação
            res.clearCookie("adminUser");

            const { email, password } = req.body;

            // Buscar no BD se existe esse email e se a senha corresponde a esse usuário
            const user = await AdminUser.findAll({
                where:{
                    email
                }
            });

            //Se não retornar nenhum usuário da consulta no BD, renderiza com mensagem de erro
            if(user.length <= 0){
                return res.render("admin/login",{
                    title: "Login",
                    error: {
                        message: "Email ou senha inválidos",
                    }
                });
            }; 
            
            //Se retornar usuário, porém não estiver ativo, renderiza mensagem de conta desativada            
            if(!user[0].active){
                return res.render("admin/login",{
                    title: "Login",
                    error: {
                        message: "Conta desativada. Entre em contato com o administrador.",
                    }
                });
            }

            //Se existir e estiver ativo, verificar se email e senha conferem com os dados do BD
            let userAuth;
            if(user[0].email===email){
                if(bcrypt.compareHash(password,user[0].password)){
                    userAuth = true;
                    
                    // Dando tudo certo com a autenticação, cria uma sessão e redireciona o usuário
                    req.session.email = user[0].email; 
 
                    // Criando um cookie da sessão
                    res.cookie("adminUser",user[0]);

                    res.redirect("/admin/produtos");
                }
            };
            
            //Se a autenticação não der certo, renderiza com mensagem de erro
            if(!userAuth){
                return res.render("admin/login",{
                    title: "Login",
                    error: {
                        message: "Email ou senha inválidos",
                    }
                });
            };            

        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Erro na autenticação do usuário."
            });
        }
    },
    logout: (req,res)=>{

        try{

            req.session.destroy();
            res.clearCookie("adminUser");
            res.redirect("/admin/login");

        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Erro ao sair da conta.",
                adminUser: req.cookies.adminUser
            });
        }
    },
    create: (req,res)=>{

        try{

            return res.render("admin/adminUserCreateForm",{
                title:"Cadastro de Usuário Admin",
                adminUser: req.cookies.adminUser
            });

        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Erro ao carregar a página.",
                adminUser: req.cookies.adminUser
            });
        }
    },
    store: async (req,res)=>{

        try{

            // Armazenando todas as informações que virão pelo req no validationResult
            const {errors} = validationResult(req);
            
            // Se existirem erros, renderiza a view com os erros formatados
            if(errors.length>0) {
                
                const formattedErrors = {}
                errors.forEach(error => {
                    formattedErrors[error.param] = error.msg;
                });
                
                return res.render("admin/adminUserCreateForm",{
                    title:"Cadastro de Usuário Admin",
                    errors: formattedErrors,
                    old: req.body,
                    adminUser: req.cookies.adminUser
                });
            }
            
            //Recebendo os campos do formulário
            const { first_name, last_name, email, password, confirm_password } = req.body;
            
            if (password !== confirm_password){
                return res.render("admin/adminUserCreateForm", {
                    title: "Cadastro de Usuário Admin",
                    error: {
                        message: "Senhas Divergentes",
                    },
                    old: req.body,
                    adminUser: req.cookies.adminUser
                });
            }

            const adminUser = await AdminUser.create({
                first_name, 
                last_name, 
                email, 
                password: bcrypt.generateHash(password),
                active: 1,
                created_at: new Date(),
                updated_at: new Date(),
            });

            res.redirect("/admin/usuarios");            

        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Erro ao cadastrar o usuário.",
                adminUser: req.cookies.adminUser
            });
        }

    },
    edit: async (req,res)=>{

        try{

            const {id} = req.params;

            const user = await AdminUser.findByPk(id);

            if(!user){
                return res.render("admin/error", {
                    title: "Ops!",
                    message: "Usuário não encontrado.",
                    adminUser: req.cookies.adminUser
                });
            }
           
            return res.render("admin/adminUserEditForm", {
                title: "Edição de Usuário Admin",
                user,
                adminUser: req.cookies.adminUser
            });

        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Usuário não encontrado.",
                adminUser: req.cookies.adminUser
            });
        }

    },
    update: async (req,res)=>{
        
        try{

            const {id} = req.params;

            const {first_name, last_name, email} = req.body;

            const user = await AdminUser.update({
                first_name,
                last_name,
                email,
                updated_at: new Date(),
            },{
                where:{id}
            });

            res.redirect("/admin/usuarios");

        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Erro ao atualizar usuário.",
                adminUser: req.cookies.adminUser
            });

        }

    },
    delete: async (req,res)=>{
        
        try{

            const {id} = req.params;

            const user = await AdminUser.findByPk(id);

            if(!user){
                return res.render("admin/error", {
                    title: "Ops!",
                    message: "Usuário não encontrado.",
                    adminUser: req.cookies.adminUser
                });
            }
           
            return res.render("admin/adminUserDelete", {
                title: "Deletar Usuário Admin",
                user,
                adminUser: req.cookies.adminUser
            });

        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Usuário não encontrado.",
                adminUser: req.cookies.adminUser
            });
        }

    },
    destroy: async (req,res)=>{
        
        try{

            const {id} = req.params;

            const user = await AdminUser.update({
                active: 0,
                updated_at: new Date(),
            },{
                where:{id}
            });

            res.redirect("/admin/usuarios");

        }catch(error){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Erro ao inativar usuário.",
                adminUser: req.cookies.adminUser
            });
        }

    }    
};

module.exports = adminAuthController;