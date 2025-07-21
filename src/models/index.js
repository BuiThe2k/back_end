// Setup Sequelize
const { Sequelize} = require('sequelize');

const sequelize = new Sequelize("node26-food", "root", "12345",
    {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
});

(async() =>{
    try {
    await sequelize.authenticate();
    console.log("Connected!!");
} catch (error) {
    console.log("Sequelize Error: ", error);
}   
})();

// khởi tạo models
const User = require("./User")(sequelize);
const Restaurant = require("./Restaurant") (sequelize);

// Định nghĩa relationship giữa các models
Restaurant.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Restaurant, { foreignKey: "userId"});

// sequelize.sync({ alter: true });

module.exports = {
    sequelize,
    User,
    Restaurant,
};
// Export sequelize instance for use in models