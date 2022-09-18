const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const Category = require("./Category");
const Product = require("./Product");

const CategoryProduct = db.define("CategoryProduct", 
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            category_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, 
        {
            timestamps: false,
            tableName: "categories_products",
        }
    );

    Category.belongsToMany(Product, {
        through: CategoryProduct,
        foreignKey: "category_id",
        otherKey: "product_id",
        constraints: false,
        });
    
    Product.belongsToMany(Category, {
        through: CategoryProduct,
        foreignKey: "product_id",
        otherKey: "category_id",
        constraints: false,
    });
  
module.exports = CategoryProduct;