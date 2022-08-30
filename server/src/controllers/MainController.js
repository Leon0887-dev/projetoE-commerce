const fs = require('fs');
const path = require('path');
const productsJson = path.join("src","data","products.json");

const indexController = {
    index: (req,res)=>{

        // Lendo arquivo json
        let products = fs.readFileSync(productsJson,{enconding:'utf-8'})
        // Transformando o formato JSON em um array novamente
        products=JSON.parse(products);

        return res.render("index",{
            title:"Home",
            products,
            user: req.cookies.user
        });
    },
    about: (req,res)=>{
        return res.render("about",{
            title:"Sobre Nós",
            user: req.cookies.user
        });
    },
    blog: (req,res)=>{
        return res.render("blog",{
            title:"Blog",
            user: req.cookies.user
        });
    },
    contact: (req,res)=>{
        return res.render("contact",{
            title:"Contato",
            user: req.cookies.user
        });
    }
};

module.exports = indexController;