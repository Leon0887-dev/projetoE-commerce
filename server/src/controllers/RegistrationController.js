const registrationController = {
    index: (req, res) => {
        return res.render("Cadastro", { title: "Cadastro" });
    }
};

module.exports = registrationController;