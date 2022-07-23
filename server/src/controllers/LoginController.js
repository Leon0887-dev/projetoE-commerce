const loginController = {
    index: (req,res)=>{
        return res.render("login",{title:"Login"});
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findUserByField('email', req.body.email);
        
        if (userToLogin){
            return res.send(userToLogin);
        }
        return res.send("Login", {
            errors: {
                email: {
                    msg: 'Este email não foi encontrado'
                }
            }
        })

    }
};


module.exports = loginController;