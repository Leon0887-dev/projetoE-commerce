const express = require('express');
const app = express();
const port = 3000;
//method-override.para usar PUT, DELETE no form
const methodOverride = require("method-override");

const indexRoute = require("./src/routes/indexRoute");
const productRoute = require("./src/routes/productRoute");
const checkoutRoute = require("./src/routes/checkoutRoute");
const loginRoute = require("./src/routes/loginRoute");
const registrationRoute = require("./src/routes/registrationRoute");
const administratorloginRoute = require("./src/routes/administratorloginRoute");
const userPanelRoute = require("./src/routes/userPanelRoute");
const userRegisterRoute = require("./src/routes/userRegisterRoute");

// Configurando pasta estática para acesso externo (onde ficam as imagens e css)
app.use(express.static(__dirname + "/public"));
// Configurando a view engine para ejs
app.set("view engine", "ejs");
// indicando o caminho das nossas views
app.set("views", __dirname + "/src/views");
//Configurando o methodOverride no express
app.use(methodOverride("_method"));
// Convertendo corpo da requisição (body) em objeto literal
app.use(express.json());
//url encoded serve para a gente converter a carga da requisição em um formato que o json aceite
app.use(express.urlencoded({ extended: false }));

app.use("/produtos", productRoute);
app.use("/carrinho", checkoutRoute);
app.use("/login", loginRoute);
app.use("/registration", registrationRoute);
app.use("/administratorlogin", administratorloginRoute);
app.use("/areaDoCliente", userPanelRoute);
app.use("/criarConta", userRegisterRoute);
app.use("/", indexRoute);

app.listen(port, () => {
    console.log(`Estamos rodando na porta ${port}`)
})