const productController = {
    index: (req, res) => {
        return res.render("admin/products", { title: "Produtos" });
    }
};

module.exports = productController;