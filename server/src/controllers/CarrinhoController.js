const carrinhoController = {
    index: (req,res)=>{
        return res.render("carrinho",{
            title:"Carrinho",
            user: req.cookies.user
        });
    }
};

module.exports = carrinhoController;


