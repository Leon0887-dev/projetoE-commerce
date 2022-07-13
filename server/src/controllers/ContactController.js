const contactController = {
    index: (req,res)=>{
        return res.render("contact",{title:"Contato"});
    }
};

module.exports = contactController;