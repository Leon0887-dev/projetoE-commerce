const checkoutController = {
    index: (req,res)=>{
        return res.render("checkout",{title:"Carrinho"});
    }
};

module.exports = checkoutController;