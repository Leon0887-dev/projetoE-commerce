const fs = require ("fs");
const path = require("path");

const authController = {
    //Tela para cadastro do usuario 
    register: (req, res) => {
        return res.render("register", {
            title: "criarConta",
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
            return res.render("criarConta", {
                title: "criarConta",
                error: {
                    message: "Preencha todos os campos",
                }
            });
        }
    
        if (senha !== confirmar_senha){
            return res.render("criarConta", {
                title: "criarConta",
                error: {
                    message: "Senhas Divergentes",
                }
            });
        }
        //Objeto com dados do novo usuario
        const newUser = {
            id: newId,
            nome,
            sobrenome,
            cpf,
            senha,
            email,
            admin: false,
            criadoEm : new Date(),
            midficadoEm: new Date(),
        };
        const newId = users[users.length -1].id + 1;
        newUser.criadoEm = new Date();
        newUser.modificadosEm = new Date();
        newUser.admin = false;
        newUser.id = newId;
        users.push(newUser);
        fs.writeFileSync(
            path.join(__dirname, "..", "data", "users.json"),
            JSON.stringify(users)
        );
        return res.redirect("/")
    },
    //Tela para realizar o login
    login: (req, res) => {
        console.log(req.session.email)
        return res.render("login", {
            title: "Login",
        })
    },
    //Processamento do login
    auth: (req, res) => {
        const usersJson = fs.readFileSync(
            path.join(__dirname, "..", "data", "users.json"),
            "utf-8"
        );
            const users = JSON.parse(usersJson);
            const {email, senha} = req.body;
            const userAuth = users.find(user => {
                if (user.email === email){
                    if(user.senha === senha){
                        return true;
                    }
                }
            });
            if (!userAuth){
                return res.render("login", {
                    title: "Login",
                    error: {
                        message: "Email ou senha inválido"
                    }
                })
            }
            req.session.email = userAuth.email;
            res.redirect("/");
    },
    //Processamento do deslogar
    logout: (req, res) => {},
};

module.exports = authController;
