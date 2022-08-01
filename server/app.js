const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const session = require('express-session');
const cookieParser = require("cookie-parser");

const mainRoute = require("./src/routes/mainRoute");
const productRoute = require("./src/routes/productRoute");
const checkoutRoute = require("./src/routes/checkoutRoute");
const loginRoute = require("./src/routes/loginRoute");
const administratorloginRoute = require("./src/routes/administratorloginRoute");
const administratorproductsRoute = require("./src/routes/administratorproductsRoute");
const userPanelRoute = require("./src/routes/userPanelRoute");
const userRegisterRoute = require("./src/routes/userRegisterRoute");
const carrinhoRoute = require("./src/routes/carrinhoRoute");
const contactRoute = require("./src/routes/contactRoute");


// Configurando pasta estática para acesso externo (onde ficam as imagens e css)
app.use(express.static(path.join(__dirname, "public")));
// Configurando a view engine para ejs
app.set("view engine", "ejs");
// indicando o caminho das nossas views
app.set("views", path.join(__dirname, "src", "views"));
//Configurando o methodOverride no express
app.use(methodOverride("_method"));
// Convertendo corpo da requisição (body) em objeto literal
app.use(express.json());
//url encoded serve para a gente converter a carga da requisição em um formato que o json aceite
app.use(express.urlencoded({ extended: false }));
// Inicializando cookieParser
app.use(cookieParser());
// configuração do express-session
app.use(session({
    secret: 'Café House',
    resave: false,
    saveUninitialized: true,
    }));
    
app.use("/produtos", productRoute);
app.use("/checkout", checkoutRoute);
app.use("/login", loginRoute);
app.use("/administradorlogin", administratorloginRoute);
app.use("/areadocliente", userPanelRoute);
app.use("/criarconta", userRegisterRoute);
app.use("/carrinho", carrinhoRoute);
app.use("/contato", contactRoute);
app.use("/administradorprodutos", administratorproductsRoute);
app.use("/", mainRoute);


app.use((req,res)=>{
    return res.status(404).render("notFound", {title: "Página não encontrada"});
  });


app.listen(port, () => {
    console.log(`Estamos rodando na porta ${port}: http://localhost:3000/ `)
})