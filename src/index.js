const express = require("express");
const { sequelize } = require("./models");
const { AppError, handleErrors} = require("./helpers/error");
const authorization = require("./middlewares/authorization");

const app = express();
app.use(express.json());
app.use(express.static("."));

// Sync models with the db
// sequelize.sync({ alter: true });

const v1 = require("./routers/v1");
app.use("/api/v1", v1);

//Demo authorization

//Demo handle error
app.get("/error", (req, res, next) => {
    throw new AppError(500, "Internal Server");
    // next(new AppError(500, "Internal Server Error"));
});

// Middleware dùng để bắt và xử lý lỗi ra cho client
// Phải được đặt bên dưới các router
app.use(handleErrors);


app.listen(4000);
