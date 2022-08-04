const carrinhoController = {
    index: (req,res)=>{
        return res.render("carrinho",{title:"Carrinho"});
    }
};

module.exports = carrinhoController;


