const administratorloginController = {
    index: (req, res) => {
        return res.render("Administrador Login", { title: "Administrador Login" });
    }
};

module.exports = administratorloginController;