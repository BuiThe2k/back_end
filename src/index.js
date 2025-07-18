const express = require("express");
const { AppError, handleErrors} = require("./helpers/error");
const app = express();
app.use(express.json());
const v1 = require("./routers/v1");
app.use("/api/v1", v1);
//Demo handle error
// app.get("/error", (req, res, next) => {
//     throw new AppError(500, "Internal Server");
//     // next(new AppError(500, "Internal Server Error"));
// });

// Middleware dùng để bắt và xử lý lỗi ra cho client
// Phải được đặt bên dưới các router
app.use(handleErrors);


app.listen(4000);
