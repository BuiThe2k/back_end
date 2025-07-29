const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
    return sequelize.define(
        "User",
        {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        field: "first_name",
    },
    lastName: {
        type: DataTypes.STRING(50),
        field: "last_name",
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "email",
        validate: {
            isEmail: {
                msg: "Email is not valid"
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set (value) {
            // Không được lưu plain text password trực tiếp vào DB
            // Ta cần hash password bằng thư viện bcrypt
            const salt  = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(value, salt );
            this.setDataValue("password", hashedPassword);
        }
    },
    role: {
        type: DataTypes.ENUM("user", "merchant", "admin"),
        defaultValue: "user",
    },
    avatar: {
        type: DataTypes.STRING
    }
},
    {
        tableName: "users",
        // disable createdAt and updatedAt
        timestamps: false,
        // Bỏ qua column password khi tìm kiếm trong table
        defaultScope: {
            attributes: {exclude: ["password"]},
        },
        // Các phương thức được tự động chạy sau một hành động (create, update, delete)
        hooks: {
            //Xóa password khi tạo mới user
            afterSave: (record) => {
                delete record.dataValues.password;
            }
        }
    }
    )
};