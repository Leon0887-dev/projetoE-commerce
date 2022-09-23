const fs = require('fs');
const path = require('path');
const productsJson = path.join("src", "data", "products.json");

const Product = require("../models/Product");
const Category = require("../models/Category");
const CategoryProduct = require("../models/CategoryProduct");
const Brand = require("../models/Brand");
const ImageProduct = require("../models/ImageProduct");
const ProductImage = require("../models/ProductImage");

const productController = {
    index: async (req, res) => {

        try{

            //Armazenando chave da query string
            const category = req.query.categoria;

            //Recebendo a paginação via query string, se não vier página, por padrão será 1
            let { pagina=1 } = req.query; 
                        
            const {count: total, rows: products} = await Product.findAndCountAll({
                where: {
                    active: 1,
                },
                limit: 8,
                offset: (pagina-1)*8,
                include: ImageProduct,
            });
            
            //Math.ceil() - arredonda um número para cima, para o próximo valor inteiro - Ex.: 1.3 -> 2 
            let totalPages = Math.ceil(total/8);

            const brands = await Brand.findAll({
                order: [
                    ["name","ASC"],
                ]
            });

            const categories = await Category.findAll({
                order: [
                    ["name","ASC"],
                ]
            });
    
            //Verificando se existe alguma categoria
            if (category) {

                const productResult = await Product.findAll({
                    where: {
                        active: 1,
                    },
                    include: [
                        { model: ImageProduct },
                        { model: Category,
                            where: {
                                name: category,
                            }
                        },
                    ],
                });
    
                //Renderizando a página com os produtos da categoria
                return res.render("productListing", {
                    title: "Produtos",
                    products: productResult,
                    brands,
                    categories,
                    user: req.cookies.user            
                });
            }
    
            return res.render("productListing", {
                title: "Produtos",
                products,
                brands,
                categories,
                totalPages,
                user: req.cookies.user            
            });

        }catch(error){
            console.log(error);
            return res.render("error", {
                title: "Ops!",
                message: "Erro na exibição dos produtos."
            });
        }

    },
    show: (req, res) => {

        //Pegando o id que virá via url - GET
        const {id} = req.params;

        // Lendo arquivo json
        let products = fs.readFileSync(productsJson, {
            enconding: 'utf-8'
        })
        // Transformando o formato JSON em um array novamente
        products = JSON.parse(products);

        //Verificando se o id existe
        const productResult = products.find((product) => product.id === parseInt(id));
        // Se não existir, renderiza a view error mostrando a mensagem 
        if (!productResult) {
            return res.render("error", {
                title: "Ops!",
                message: "Produto não encontrado.",
                user: req.cookies.user            
            });
        };
        // Caso contrário, copiamos as informações de productResult usando spread operator para a variável product
        const product = {
            ...productResult,
        };

        // Por fim, retorno a view passando as informações do produto
        return res.render("product", {
            title: "Detalhe do Produto",
            product,
            user: req.cookies.user            
        });
    },
};

module.exports = productController;