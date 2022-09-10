const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const mainRoute = require("./src/routes/mainRoute");
const productRoute = require("./src/routes/productRoute");
const checkoutRoute = require("./src/routes/checkoutRoute");
const userPanelRoute = require("./src/routes/userPanelRoute");
const carrinhoRoute = require("./src/routes/carrinhoRoute");
const authRoute = require("./src/routes/authRoute");
const adminRoute = require("./src/routes/admin/adminRoute");

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
// Configuração do express-session
app.use(session({ 
  secret: "Cafe House",
  resave: true,
  saveUninitialized: true 
}));
// Configuramos o upload como um middleware que
// espera um arquivo cujo a chave é "foto"
app.post('/area-do-cliente', upload.single('foto'), (req, res) => {
  const { email, cpf } = req.body;
  res.json({ email, cpf });
});
    
app.use("/produtos", productRoute);
app.use("/checkout", checkoutRoute);
app.use("/area-do-cliente", userPanelRoute);
app.use("/carrinho", carrinhoRoute);
app.use("/admin", adminRoute);
app.use("/", authRoute);
app.use("/", mainRoute);


app.use((req,res)=>{
    return res.status(404).render("notFound", {title: "Página não encontrada"});
  });


app.listen(port, () => {
    console.log(`Estamos rodando na porta ${port}: http://localhost:3000/ `)
})