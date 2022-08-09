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
    },
    save(data){
        const products = this.findAll();

        const product = {
            //Usando o método at() para retornar o último elemento do array
            id: products.at(-1).id + 1,
            //Usando sperad operator para acessar o conteúdo do objeto
            ...data,
            //Adicionando datas de criação e modificação (que na criação serão iguais)
            createdIn: new Date(),
            modifiedIn: new Date()
        }
        
        //Adicionando o novo produto à lista
        products.push(product);
        
        //Atualizando o arquivo json
        fs.writeFileSync(productsFile,JSON.stringify(products));

        return products;
    },
    update(id,data){
        const products = this.findAll();

        const product = products.find(product=>product.id===parseInt(id));

        product.title = data.title;
        product.brand = data.brand;
        product.flavor = data.flavor;
        product.roast = data.roast;
        product.description = data.description;
        product.content = data.content;
        product.format = data.format;
        product.price = data.price;
        product.installment = data.installment;
        if(data.image){ 
            product.image = data.image; 
        }else{
            product.image
        }
        product.sku = data.sku;
        product.quantity = data.quantity;
        product.category = data.category;
        product.bestseller = data.bestseller;
        product.newproduct = data.newproduct;
        product.active = data.active;
        product.modifiedIn = new Date();

        //Atualizando o arquivo json
        fs.writeFileSync(productsFile,JSON.stringify(products));

        return product;
    }
};

module.exports = Product;