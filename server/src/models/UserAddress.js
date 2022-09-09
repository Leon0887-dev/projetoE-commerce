const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const Order = require("./Order");
const User = require("./User");

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

    //Colocar código no último arquivo (relacionado à ordem alfabética) do relacionamento
    User.hasMany(UserAddress,{
        foreignKey: "user_id",
    });
    UserAddress.belongsTo(User,{
        foreignKey: "user_id",
    });
    Order.hasOne(UserAddress,{
        foreignKey: "user_address_id",
    });
    UserAddress.belongsTo(Order,{
        foreignKey: "user_address_id",
    });           
  
  module.exports = UserAddress;