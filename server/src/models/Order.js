const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const UserAddress = require("./UserAddress");

const Order = db.define("Order", 
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            status: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            total_price: {
                type: DataTypes.INTEGER,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            user_address_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, 
        {
            timestamps: false,
            tableName: "orders",
        }
    );

module.exports = Order;