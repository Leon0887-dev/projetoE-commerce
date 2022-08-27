const fs = require ("fs");
const path = require("path");
const bcrypt = require("../helpers/bcrypt");

const authController = {
    //Tela para cadastro do usuario 
    register: (req, res) => {
        return res.render("userRegister", {
            title: "criarConta",
            user: req.cookies.user
        });
    },
    //Processamento do cadastro do usuario
    create: (req, res) => {
        const usersJson = fs.readFileSync(
            //Caminho do arquivo
            path.join(__dirname, "..", "data", "users.json"),
            //Formato de leitura
            "utf-8",
        );
        const users = JSON.parse(usersJson);
        
        const {nome, sobrenome, cpf, email, senha, confirmar_senha} = req.body;
        if (!nome || 
            !sobrenome || 
            !cpf || 
            !email || 
            !senha || 
            !confirmar_senha) {
            return res.render("userRegister", {
                title: "Registro",
                error: {
                    message: "Preencha todos os campos",
                }
            });
        }
    
        if (senha !== confirmar_senha){
            return res.render("userRegister", {
                title: "Registro",
                error: {
                    message: "Senhas Divergentes",
                }
            });
        }
        //Objeto com dados do novo usuario
        const newId = users[users.length -1].id +1;
        const newUser = {
            id: newId,
            nome,
            sobrenome,
            cpf: bcrypt.generateHash(cpf),
            senha: bcrypt.generateHash(senha),
            email,
            admin: false,
            criadoEm : new Date(),
            modificadoEm: new Date(),
        };
        users.push(newUser);
        fs.writeFileSync(
            path.join(__dirname, "..", "data", "users.json"),
            JSON.stringify(users)
        );
        res.redirect("/")
    },
    //Tela para realizar o login
    login: (req, res) => {
        return res.render("login", {
          title: "login",
          user: req.cookies.user
        });
    },
    //Processamento do login
    auth: (req, res) => {
        res.clearCookie("user");

        const usersJson = fs.readFileSync(
            path.join(__dirname, "..", "data", "users.json"),
            "utf-8"
        );
        const users = JSON.parse(usersJson);

        const { email, senha } = req.body;
        const userAuth = users.find((user) => {
          if (user.email === email) {
            if (bcrypt.compareHash(senha, user.senha)) {
              return true;
            }
          }
        });
            if (!userAuth){
                return res.render("login", {
                    title: "Login",
                    error: {
                        message: "Email e/ou senha inválidos"
                    }
                });
            }
        // Filtra as chaves que o objeto irá ter
        const user = JSON.parse(JSON.stringify(userAuth, ["id", "nome", "sobrenome"]));
        
        req.session.email = userAuth.email;
        res.cookie("user", user);
        res.redirect("/");
    },
    //Processamento do deslogar
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("user");
        res.redirect("/");
    },
};

module.exports = authController;
