const Product = require("../models/Product");
const ImageProduct = require("../models/ImageProduct");
const ProductImage = require("../models/ProductImage");

const indexController = {
    index: async (req,res)=>{

        try{

            const bestSellerProducts = await Product.findAll({
                where: {
                    active: 1,
                },
                limit: 4,
                include: ImageProduct,
            });

            const newestProducts = await Product.findAll({
                where: {
                    active: 1,
                },
                limit: 4,
                order: [
                    ["created_at","DESC"],
                ],                
                include: ImageProduct,
            },
            );

            return res.render("index",{
                title:"Home",
                bestSellerProducts,
                newestProducts,
                user: req.cookies.user
            });

        }catch(error){
            return res.render("error", {
                title: "Ops!",
                message: "Erro na exibição da página."
            });
        }

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