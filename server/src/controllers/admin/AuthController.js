const authController = {
    index: (req, res) => {
        return res.render("admin/login", { title: "Login" });
    }
};

module.exports = authController;