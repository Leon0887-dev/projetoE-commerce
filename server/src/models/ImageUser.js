const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const ImageUser = db.define("ImageUser", 
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
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, 
        {
            timestamps: false,
            tableName: "images_users",
        }
    );

module.exports = ImageUser;