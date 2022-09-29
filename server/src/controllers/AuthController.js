const Sequelize = require("sequelize");
const configDB = require("../config/database");
const db = new Sequelize(configDB);
const bcrypt = require("../helpers/bcrypt");

const authController = {
    //Tela para cadastro do usuario 
    register: 
    (req, res) => {
        return res.render("userRegister", {
            title: "criarConta",
            user: req.cookies.user
        });
    },
    //Processamento do cadastro do usuario
    store: async (req, res) => {
        
        try {

            const {
              nome,
              sobrenome,
              email,
              cpf,
              senha,
              confirmar_senha
            } = req.body;

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
    
          if (senha !== confirmar_senha) {
            return res.render("userRegister", {
              title: "Registro",
              error: {
                message: "Senhas Divergentes",
              }
            });
          }

          const users = await db.query(
            "INSERT INTO users (first_name, last_name, email, cpf, password, created_at, active,  updated_at ) VALUES (:nome, :sobrenome, :email, :cpf, :senha, :created_at, :active,  :updated_at)", {
              replacements: {
                nome,
                sobrenome,
                email,
                cpf,
                senha: bcrypt.generateHash(senha),
                active: 1,
                created_at: new Date(),
                updated_at: new Date(),
              },
              type: Sequelize.QueryTypes.INSERT,
            }
          );
    
          res.redirect("/")
    
        } catch (error) {
          return res.render("userRegister", {
            title: "Registro",
            error: {
              message: "Erro na criação da conta",
            }
          });    
        }
      },
    //Tela para realizar o login
    login: (req, res) => {
        return res.render("login", {
          title: "Login",
          user: req.cookies.user
        });
    },
    //Processamento do login
    auth: async (req, res) => {
        try {
          res.clearCookie("user");
          const {
            email,
            senha
          } = req.body;
          const user = await db.query(`SELECT * FROM users WHERE email = :email`, {
            replacements: {
              email,
            },
            type: Sequelize.QueryTypes.SELECT,
          });
    
          if (user.length < 0) {
            return res.render("login", {
              title: "Login",
              error: {
                message: "Email e/ou senha inválidos"
              }
            });
          }
    
          if (user[0].email === email) {
            if (bcrypt.compareHash(senha, user[0].password)) {
              req.session.email = user[0].email;
              res.cookie("user", user[0]);
              res.redirect("/")
            }
          }
    
        } catch (error) {
          return res.render("login", {
            title: "Login",
            error: {
              message: "Email e/ou senha inválidos"
            }
          });
        }
      },
    //Processamento do deslogar
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("user");
        res.redirect("/");
    },
};

module.exports = authController;