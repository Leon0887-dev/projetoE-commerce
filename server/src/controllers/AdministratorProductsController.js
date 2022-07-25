const administratorproductsController = {
    index: (req, res) => {
        return res.render("administratorproducts", { title: "Administrador Produtos" });
    }
};

module.exports = administratorproductsController;