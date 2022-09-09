const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");

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
  
  module.exports = Brand;