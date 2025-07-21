const {DataTypes} = require("sequelize");
const sequelize = require(".");

module.exports = (sequelize) => {
    return sequelize.define (
        "Restaurant", 
        {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },
    
        },
        {
            tableName: "restaurants",
            timestamps: false, // Không sử dụng createdAt và updatedAt
        }
    )
}