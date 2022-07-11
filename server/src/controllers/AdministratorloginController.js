const administratorloginController = {
    index: (req, res) => {
        return res.render("administradorlogin", { title: "Administrador Login" });
    }
};

module.exports = administratorloginController;