const Category = require("../../models/Category");

const categoryController = {
        index: async (req, res) => {

            try{

                const categories = await Category.findAll();

                return res.render("admin/categories", { 
                    title: "Categorias",
                    categories,
                    adminUser: req.cookies.adminUser
                });

            }catch(error){

                return res.render("admin/error", {
                    title: "Ops!",
                    message: "Erro na exibição das categorias.",
                    adminUser: req.cookies.adminUser
                });
                
            }
        },
    }

module.exports = categoryController;
