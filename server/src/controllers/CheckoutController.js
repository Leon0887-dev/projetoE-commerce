const checkoutController = {
    index: (req,res)=>{
        return res.render("checkout",{title:"Checkout"});
    }
};

module.exports = checkoutController;