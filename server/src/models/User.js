const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const ImageUser = require("./ImageUser");
const Order = require("./Order");
const UserAddress = require("./UserAddress");


const User = db.define("User", 
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            birthdate: {
                type: DataTypes.DATE,
            },
            phone: {
                type: DataTypes.STRING(15),
            },
            cpf: {
                type: DataTypes.STRING(14),
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
        }, 
        {
            timestamps: false,
            tableName: "users",
        }
    );

    User.hasOne(ImageUser,{
        foreignKey: "user_id",
        constraints: false,
    });
    ImageUser.belongsTo(User,{
        foreignKey: "user_id",
        constraints: false,
    });   
    User.hasMany(Order,{
        foreignKey: "user_id",
        constraints: false,
    });
    Order.belongsTo(User,{
        foreignKey: "user_id",
        constraints: false,
    });
    User.hasMany(UserAddress,{
        foreignKey: "user_id",
        constraints: false,
    });
    UserAddress.belongsTo(User,{
        foreignKey: "user_id",
        constraints: false,
    });          
  
module.exports = User;