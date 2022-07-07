const userRegisterController = {
    index: (req,res)=>{
        return res.render("userRegister",{title:"Criar Conta"});
    }
};

module.exports = userRegisterController;