// Setup Sequelize
const { Sequelize} = require('sequelize');

const sequelize = new Sequelize("node26-food", "root", "12345",{
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

module.exports = sequelize;
// Export sequelize instance for use in models