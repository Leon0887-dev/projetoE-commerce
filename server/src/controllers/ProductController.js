const productController = {
    index: (req,res)=>{
        return res.render("product",{title:"Produto"});
    }
};

module.exports = productController;