const Sequelize = require("sequelize");
const configDB = require("../../config/database");
const db = new Sequelize(configDB);
const bcrypt = require("../../helpers/bcrypt");



const authController = {
  index: async (req, res) => {
    try {
      const users = await db.query("SELECT * FROM users;", {
        type: Sequelize.QueryTypes.SELECT,
      });
      console.log(users);
      res.status(200).json({
        data: users,
        message: "Busca realizada com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Erro na busca de usuarios",
      });
    }
  },
  show: async (req, res) => {

    const {
      id
    } = req.params;
    try {
      const users = await db.query(`SELECT * FROM users WHERE id = ${id}`, {
        type: Sequelize.QueryTypes.SELECT,
      });
      console.log(users);
      if (users.length === 0) {
        throw Error("USER_NOT_FOUND");
      }
      res.status(200).json({
        data: users[0],
      });
    } catch (error) {
      console.log(error);
      if (error.message === "USER_NOT_FOUND") {
        res.status(400).json({
          message: "Usuário não encontrado!",
        });
      } else {
        res.status(400).json({
          message: "Erro ao encontrar o usuario ",
        });
      }
    }
  },
  store: async (req, res) => {
    const {
      nome,
      sobrenome,
      email,
      cpf,
      senha,
      confirmar_senha
    } = req.body;
    try {
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
  //   login: async (req, res) => {
  //     console.log('esta aqui')
  //     return res.render("login", {
  //       title: "login",
  //       user: req.cookies.user
  //     });
  // },
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

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/");
  },

  update: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      birthdate
    } = req.body;
    const {
      id
    } = req.params;
    try {
      if (!first_name && !last_name && !email && !birthdate) {
        throw Error("Nenhum dado para atualizar");
      }
      let query = "UPDATE users SET ";
      // "first_name = :first_name, last_name = :last_name, email = :email, birthdate = :birthdate WHERE id = :id"

      if (first_name) query += "first_name = :first_name";
      if (last_name) {
        if (first_name) query += ", ";
        query += "last_name = :last_name";
      }
      if (email) {
        if (first_name || last_name) query += ", ";
        query += "email = :email";
      }
      if (birthdate) {
        if (first_name || last_name || email) query += ", ";
        query += "birthdate = :birthdate";
      }

      query += " WHERE id = :id";
      const users = await db.query(
        query,

        {
          replacements: {
            first_name,
            last_name,
            email,
            birthdate,
            id,

          },
          type: Sequelize.QueryTypes.UPDATE,
        }
      );
      console.log(users);
      res.send();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Erro ao atualizar usuario",
      });
    }
  },

  destroy: async (req, res) => {
    const {
      id
    } = req.params;
    try {
      const users = await db.query("DELETE FROM users WHERE id = :id", {
        replacements: {
          id,
        },

        type: Sequelize.QueryTypes.DELETE,
      });
      console.log(users);
      res.status(200).json({
        message: "Usuário deletado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Erro ao deletar o usuário",
      });
    }
  },
};

module.exports = authController;