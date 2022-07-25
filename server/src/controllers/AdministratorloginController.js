const administratorloginController = {
    index: (req, res) => {
        return res.render("administratorlogin", { title: "Administrador Login" });
    }
};

module.exports = administratorloginController;