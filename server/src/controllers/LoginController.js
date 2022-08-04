const fs = require("fs");
const path = require("path");
const bcrypt = require("../helpers/bcrypt");

const loginController = {
    index: (req,res)=>{
        return res.render("login",{title:"Login"});
    },

    // Tela para realizar login
  login: (req, res) => {
    return res.render("login", {
      title: "Login",
      user: req.cookies.user,
      admin: req.cookies.admin,
    });
  },
  // Processamento do login
  auth: (req, res) => {
    res.clearCookie("user");
    res.clearCookie("admin");

    const usersJson = fs.readFileSync(
      path.join("src", "data", "users.json"),
      "utf-8"
    );

    const users = JSON.parse(usersJson);

    const { email, senha } = req.body;
    const userAuth = users.find((users) => {
      if (users.email === email) {
        if (bcrypt.compareHash(senha, users.senha)) {
          return true;
        }
        // O if de cima é a mesma coisa da linha abaixo
        // return bcrypt.compareHash(senha, user.senha);
      }
    });

    if (!userAuth) {
      return res.render("login", {
        title: "Login",
        error: {
          message: "Email ou senha inválido",
        },
      });
    }
    // Filtra as chaves que o objeto irá ter
    const user = JSON.parse(
      JSON.stringify(userAuth, ["id", "nome", "sobrenome", "apelido", "admin"])
    );
    req.session.email = userAuth.email;
    res.cookie("user", user);
    res.cookie("admin", user.admin);

    res.redirect("/");
  },
  // Processamento do deslogar
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.clearCookie("admin");
    res.redirect("/");
  },


};


module.exports = loginController;