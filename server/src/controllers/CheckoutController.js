const checkoutController = {
    index: (req,res)=>{
        return res.render("checkout",{
            title:"Checkout",
            user: req.cookies.user
        });
    }
};

module.exports = checkoutController;