//Routers V1
const express = require("express");

// Controller
const userController = require("../../controllers/users.controller");
const restaurantController = require("../../controllers/restaurant.controller");
const authController = require("../../controllers/auth.controller");
const uploadController = require("../../controllers/upload.controller");

// Middlewares
const authorization = require("../../middlewares/authorization");
const requiredRole = require("../../middlewares/requiredRole");
const upload = require("../../middlewares/upload");

// url: api/v1
const v1 = express.Router();


// Định nghĩa các router cho users
v1.get("/users", userController.getUsers);
                //(req, res) => {}
v1.post("/users",userController.createUser());
v1.delete("/users/:id", userController.deleteUser());

// Định nghĩa các router cho restaurant
v1.get("/restaurants", restaurantController.getRestaurants());
v1.post("/restaurants", authorization, requiredRole("merchant", "admin"), restaurantController.createRestaurant());
v1.delete("/restaurants/:id", authorization, restaurantController.deleteRestaurant());
v1.post("/restaurants/:restaurantId/like", authorization, restaurantController.likeRestaurant());

// Định nghĩa các router cho foods

// Định nghĩa các router cho auth
v1.post("/login", authController.login());
v1.get("/profiles", authorization, authController.getProfile());

// Định nghĩa router cho upload
v1.post("/upload", upload.single("file"), uploadController.upload());


// module.exports = rootRouter;
module.exports = v1;