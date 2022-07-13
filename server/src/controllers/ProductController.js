const productController = {
    index: (req,res)=>{
        return res.render("productListing",{title:"Produtos"});
    },
    show: (req,res)=>{
        return res.render("product",{title:"Produto"});
    },
};

module.exports = productController;