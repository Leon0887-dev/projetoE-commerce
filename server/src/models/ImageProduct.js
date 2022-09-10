const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const AdminUser = require("./AdminUser");

const ImageProduct = db.define("ImageProduct", 
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(200),
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
            admin_user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, 
        {
            timestamps: false,
            tableName: "images_products",
        }
    );

    AdminUser.hasMany(ImageProduct,{
        foreignKey: "admin_user_id",
        constraints: false,
    });
    ImageProduct.belongsTo(AdminUser,{
        foreignKey: "admin_user_id",
        constraints: false,
    });
  
module.exports = ImageProduct;