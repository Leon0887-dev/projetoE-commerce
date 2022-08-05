const fs = require("fs");
const path = require("path");

const productsFile = path.join(__dirname, "..","..","data","products.json");

const Product = {
    findAll(){
        //Lendo arquivo JSON e já transformando em objeto literal
        return JSON.parse(fs.readFileSync(productsFile,"utf-8"))
    },
    findById(id){
        const product = this.findAll().find(product=>product.id===parseInt(id));
        return product;
    }
};

module.exports = Product;