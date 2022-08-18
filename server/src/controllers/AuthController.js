const fs = require ("fs");
const path = require("path");
const bcrypt = require("../helpers/bcrypt");

const authController = {
    //Tela para cadastro do usuario 
    register: (req, res) => {
        return res.render("userRegister", {
            title: "criarConta",
            user: req.cookies.user,
            admin: req.cookies.admin,
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
        
        const {nome, sobrenome, cpf, email, senha, confirmar_senha} = 
        req.body;
        if (!nome || 
            !sobrenome || 
            !cpf || 
            !email || 
            !senha || 
            !confirmar_senha) {
            return res.render("userRegister", {
                title: "criarConta",
                error: {
                    message: "Preencha todos os campos",
                }
            });
        }
    
        if (senha !== confirmar_senha){
            return res.render("userRegister", {
                title: "criarConta",
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
          user: req.cookies.user,
          admin: req.cookies.admin,
        });
    },
    //Processamento do login
    auth: (req, res) => {
        res.clearCookie("user");
        res.clearCookie("admin");

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
            // O if de cima é a mesma coisa da linha abaixo
            // return bcrypt.compareHash(senha, user.senha);
          }
        });
            if (!userAuth){
                return res.render("login", {
                    title: "login",
                    error: {
                        message: "Email ou senha inválido"
                    }
                });
            }
              // Filtra as chaves que o objeto irá ter
    const user = JSON.parse(
        JSON.stringify(userAuth, ["id", "nome", "sobrenome", "admin"])
      );
            req.session.email = userAuth.email;
            res.cookie("user", user);
            res.cookie("admin", user.admin);
            res.redirect("/");
    },
    //Processamento do deslogar
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("user");
        res.clearCookie("admin");
        res.redirect("/");
    },
};

module.exports = authController;
