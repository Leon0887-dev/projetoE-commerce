const Brand = require("../../models/Brand");

const brandController = {
        index: async (req, res) => {

            try{

                const brands = await Brand.findAll();

                return res.render("admin/brands", { 
                    title: "Marcas",
                    brands,
                    adminUser: req.cookies.adminUser
                });

            }catch(error){

                return res.render("admin/error", {
                    title: "Ops!",
                    message: "Erro na exibição das marcas.",
                    adminUser: req.cookies.adminUser
                });
                
            }
        },
    }

module.exports = brandController;
