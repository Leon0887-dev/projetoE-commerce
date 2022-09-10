const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const AdminUser = require("./AdminUser");

const Brand = db.define("Brand", 
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            admin_user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, 
        {
            timestamps: false,
            tableName: "brands",
        }
    );

    AdminUser.hasMany(Brand,{
        foreignKey: "admin_user_id",
        constraints: false,
    });
    Brand.belongsTo(AdminUser,{
        foreignKey: "admin_user_id",
        constraints: false,
    });
  
module.exports = Brand;