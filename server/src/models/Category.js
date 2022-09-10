const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const AdminUser = require("./AdminUser");

const Category = db.define("Category", 
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
            tableName: "categories",
        }
    );

    AdminUser.hasMany(Category,{
        foreignKey: "admin_user_id",
        constraints: false,
    });
    Category.belongsTo(AdminUser,{
        foreignKey: "admin_user_id",
        constraints: false,
    });
  
module.exports = Category;