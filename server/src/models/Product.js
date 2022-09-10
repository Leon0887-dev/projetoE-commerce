const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const AdminUser = require("./AdminUser");
const Brand = require("./Brand");

const Product = db.define("Product", 
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            flavor: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            roast: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT(400),
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            format: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(7,2),
                allowNull: false,
            },
            installment: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sku: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            active: {
                type: DataTypes.TINYINT(4),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            brand_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            admin_user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, 
        {
            timestamps: false,
            tableName: "products",
        }
    );

    AdminUser.hasMany(Product,{
        foreignKey: "admin_user_id",
        constraints: false,
    });
    Product.belongsTo(AdminUser,{
        foreignKey: "admin_user_id",
        constraints: false,
    });
    Brand.hasMany(Product,{
        foreignKey: "brand_id",
        constraints: false,
    });
    Product.belongsTo(Brand,{
        foreignKey: "brand_id",
        constraints: false,
    });
  
module.exports = Product;