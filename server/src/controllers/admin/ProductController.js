const Product = require("../../models/admin/Product");
// Importando o express validator através da desestruturação, pegando o validationResult
const {validationResult} = require('express-validator');

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
    create:(req,res)=>{
        return res.render("admin/productCreateForm",{
            title:"Cadastro de Produto"
        });
    },
    store:(req,res)=>{
        // Armazenando todas as informações que virão pelo req no validationResult
        const {errors} = validationResult(req);
        
        // Se existirem erros, renderiza a view com os erros formatados
        if(errors.length>0) {

            let fileMessage;
            if(!req.file){
                fileMessage = "Insira a foto do produto";
            }
            console.log(fileMessage);

            const formattedErrors = {}
			errors.forEach(error => {
				formattedErrors[error.param] = error.msg;
			});
         
            return res.render("admin/productCreateForm",{
                title:"Cadastro de Produto",
                errors: formattedErrors,
                fileMessage,
                old: req.body
            });
        }

        //Recebendo os campos do formulário
        const { title, brand, flavor, roast, description, content, format, price, installment, sku, quantity, category, bestseller, newproduct, active } = req.body;

        const image = req.file.filename;

        //Acessando o método save do model, passando como parâmetro os dados recebidos no formulário
        const products = Product.save({ title, brand, flavor, roast, description, content, format, price, installment, image, sku, quantity, category, bestseller, newproduct, active });

        return res.redirect("/admin/produtos");
    },
    edit:(req,res)=>{
        const {id} = req.params;
        //Acessando o método findById do model
        const product = Product.findById(id);
        //Verificando se existe algum produto, se não existir, renderiza a view error
        if(!product){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Produto não encontrado."
            });
        }
        return res.render("admin/productEditForm", {
            title: "Edição de Produto",
            product
        });
    },
    update:(req,res)=>{
        const {id} = req.params;

        //Recebendo os campos do formulário
        const { title, brand, flavor, roast, description, content, format, price, installment, sku, quantity, category, bestseller, newproduct, active } = req.body;

        let image;
        if(req.file){
            image = req.file.filename;
        }
        
        //Acessando o método update do model, passando como parâmetro o id + os dados recebidos no formulário
        const products = Product.update(id,{ title, brand, flavor, roast, description, content, format, price, installment, image, sku, quantity, category, bestseller, newproduct, active });

		res.send(products);
    },
    delete:(req,res)=>{
        const {id} = req.params;
        //Acessando o método findById do model
        const product = Product.findById(id);
        //Verificando se existe algum produto, se não existir, renderiza a view error
        if(!product){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Produto não encontrado."
            });
        }
        return res.render("admin/productDelete", {
            title: "Deletar Produto",
            product
        });
    },
    destroy:(req,res)=>{
        const {id} = req.params;
		const products = Product.delete(id);

        if(!products){
            return res.render("admin/error", {
                title: "Ops!",
                message: "Produto não encontrado."
            });
        }

        return res.redirect("/admin/produtos");

    }
};

module.exports = productController;