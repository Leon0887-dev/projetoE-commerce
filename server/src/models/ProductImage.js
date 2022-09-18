const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const ImageProduct = require("./ImageProduct");
const Product = require("./Product");

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

    ImageProduct.belongsToMany(Product, {
        through: ProductImage,
        foreignKey: "image_product_id",
        otherKey: "product_id",
        constraints: false,
        });
    
    Product.belongsToMany(ImageProduct, {
        through: ProductImage,
        foreignKey: "product_id",
        otherKey: "image_product_id",
        constraints: false,
    });
  
module.exports = ProductImage;