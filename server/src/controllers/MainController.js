const fs = require('fs');
const path = require('path');
const productsJson = path.join("src","data","products.json");

const indexController = {
    index: (req,res)=>{

        // Lendo arquivo json
        let products = fs.readFileSync(productsJson,{enconding:'utf-8'})
        // Transformando o formato JSON em um array novamente
        products=JSON.parse(products);

        return res.render("index",{title:"Home",products});
    },
    about: (req,res)=>{
        return res.render("about",{title:"Sobre Nós"});
    },
    blog: (req,res)=>{
        return res.render("blog",{title:"Blog"});
    }
};

module.exports = indexController;