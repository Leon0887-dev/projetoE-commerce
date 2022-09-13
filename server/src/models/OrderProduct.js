const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const Order = require("./Order");
const Product = require("./Product");

const OrderProduct = db.define("OrderProduct", 
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
            },
            order_id: {
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
            tableName: "orders_products",
        }
    );

    Product.belongsToMany(Order, {
        through: OrderProduct,
        foreignKey: "product_id",
        otherKey: "order_id",
        constraints: false,
        });
    
    Order.belongsToMany(Product, {
        through: OrderProduct,
        foreignKey: "order_id",
        otherKey: "product_id",
        constraints: false,
    });
  
module.exports = OrderProduct;