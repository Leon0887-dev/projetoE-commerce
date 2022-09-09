const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const ProductImage = db.define("ProductImage", 
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            image_product_id: {
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
            tableName: "products_images",
        }
    );
  
  module.exports = ProductImage;