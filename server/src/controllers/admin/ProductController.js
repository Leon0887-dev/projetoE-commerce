const Product = require("../../models/admin/Product");

const productController = {
    //Exibe a listagem de produtos
    index: (req, res) => {
        //Acessando o método findAll do model
        const products = Product.findAll();
        return res.render("admin/products", { 
            title: "Produtos",
            products
        });
    },
    show: (req, res) => {
        const {id} = req.params;
        //Acessando o método findById do model
        const product = Product.findById(id);
        //Verificando se existe algum produto, se não exisitr, renderiza a view error
        if(!product){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Produto não encontrado."
            });
        }
        return res.render("admin/product", {
            title: "Detalhe do Produto",
            product
        });
    },
};

module.exports = productController;