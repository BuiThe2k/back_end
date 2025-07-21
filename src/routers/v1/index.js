//Routers V1
const express = require("express");
// const userRouters = require("./users.router");
const userController = require("../../controllers/users.controller");


// url: api/v1
const v1 = express.Router();


// Định nghĩa các router cho user
v1.get("/users", userController.getUsers);
                //(req, res) => {}
v1.post("/users",userController.createUser());
v1.delete("/users/:id", userController.deleteUser());
// Định nghĩa các router cho food

// Định nghĩa các router cho restaurant



// module.exports = rootRouter;
module.exports = v1;