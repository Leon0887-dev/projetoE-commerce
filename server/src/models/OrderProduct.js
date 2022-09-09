const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");

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
  
  module.exports = OrderProduct;