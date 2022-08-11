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
    create:(req,res)=>{
        return res.render("admin/productCreateForm",{
            title:"Cadastro de Produto"
        });
    },
    store:(req,res)=>{
        //Recebendo os campos do formulário
        const { title, brand, flavor, roast, description, content, format, price, installment, sku, quantity, category, bestseller, newproduct, active } = req.body;

        const image = req.file.filename;

        //Acessando o método save do model, passando como parâmetro os dados recebidos no formulário
        const products = Product.save({ title, brand, flavor, roast, description, content, format, price, installment, image, sku, quantity, category, bestseller, newproduct, active });

        res.send(products);
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

        res.send(products);

    }
};

module.exports = productController;