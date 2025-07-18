const {DataTypes} = require("sequelize");
const sequelize = require(".");
const bcrypt = require("bcrypt");

const User = sequelize.define(
    "User", {
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
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Email is not valid"
            },
            // Demo custom validation
            // customValidator: (value) => {
                //Logic validation
                // Nếu không thỏa mãn logic
                // throw new Error("Custom validation failed");
            // },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    //     validate: {
    //         // Demo custom validation
    //         isMatchedConfirmPassword: (value) => {
    //             // Logic validation
    //             // Nếu không thỏa mãn logic
    //             // throw new Error ("message");
    //             if (value !== this.confirmPassword) {
    //                 throw new Error("Confirm password do not match");
    //             }
    //     },
    // },

    // Sẽ được chạy trước khi create/update
    set (value) {
           

            // Không được lưu plain text password trực tiếp vào DB
            // Ta cần hash password bằng thư viện bcrypt
            const salt  = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(value, salt );

            this.setDataValue("password", hashedPassword);
        }
    },
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
);

module.exports = User;