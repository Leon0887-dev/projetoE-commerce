const fs = require('fs');
const path = require('path');
const productsJson = path.join("src", "data", "products.json");

const Product = require("../models/Product");
const Category = require("../models/Category");
const CategoryProduct = require("../models/CategoryProduct");
const Brand = require("../models/Brand");
const ImageProduct = require("../models/ImageProduct");
const ProductImage = require("../models/ProductImage");
const { Op } = require('sequelize');

const productController = {
    index: async (req, res) => {

        try {

            //Armazenando chave da query string
            const category = req.query.categoria;
            const brand = req.query.marca;
            const search = req.query.search;

            //Recebendo a paginação via query string, se não vier página, por padrão será 1
            let { pagina = 1 } = req.query;

            //Armazenando a configuração do include em uma variável, e checando nas linhas abaixo se estamos recebendo categoria e marca via query string, para adicionar mais modelos ao include
            const include = [{
                model: ImageProduct
            }]

            if(category){
                include.push({
                    model: Category,
                        where: {
                            name: category,
                        }
                })
            }

            if(brand){
                include.push({
                    model: Brand,
                        where: {
                            name: brand,
                        }
                })
            }
            /* armazena em variável se caso o produto está ativo */
            const whereProduct = {
                active: 1,
            }
            /* se o produto está ativo, faz essa condição */
            /* busca pelo nome, mas o like ajuda a procurar apenas um pedaço do nome, e não o nome inteiro */
            /* falta criar busca por categoria e também deixar o histórico de busca do usuário */
            if(search){
                whereProduct.name = {
                    [Op.like]: `%${search}%`
                }
            }
            const { count: total, rows: products } = await Product.findAndCountAll({
                where: whereProduct,
                limit: 8,
                offset: (pagina - 1) * 8,
                include,
            });

            //Math.ceil() - arredonda um número para cima, para o próximo valor inteiro - Ex.: 1.3 -> 2 
            let totalPages = Math.ceil(total / 8);

            const brands = await Brand.findAll({
                order: [
                    ["name", "ASC"],
                ]
            });

            const categories = await Category.findAll({
                order: [
                    ["name", "ASC"],
                ]
            });

            return res.render("productListing", {
                title: "Produtos",
                products,
                brands,
                categories,
                totalPages,
                user: req.cookies.user
            });

        } catch (error) {
            console.log(error);
            return res.render("error", {
                title: "Ops!",
                message: "Erro na exibição dos produtos."
            });
        }

    },
    show: async (req, res) => {

        //Pegando o id que virá via url - GET
        const {id} = req.params;        

        //Verificando se o id existe
        const product = await Product.findByPk(id,{
            include: [
                { model: Category },
                { model: Brand },
                { model: ImageProduct },
            ]
        });
        
        // Se não existir, renderiza a view error mostrando a mensagem 
        if (!product) {
            return res.render("error", {
                title: "Ops!",
                message: "Produto não encontrado.",
                user: req.cookies.user
            });
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