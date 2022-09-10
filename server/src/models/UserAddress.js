const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const UserAddress = db.define("UserAddress", 
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            recipient: {
                type: DataTypes.STRING(100),
            },
            address_nickname: {
                type: DataTypes.STRING(100),
            },
            zipcode: {
                type: DataTypes.STRING(9),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            number: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            complement: {
                type: DataTypes.STRING(60),
            },
            district: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            reference: {
                type: DataTypes.STRING(150),
            },
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, 
        {
            timestamps: false,
            tableName: "user_addresses",
        }
    );
    
module.exports = UserAddress;