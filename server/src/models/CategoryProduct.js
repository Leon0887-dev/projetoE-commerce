const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");

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
  
  module.exports = CategoryProduct;