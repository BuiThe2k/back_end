
// Controller nhận vào request và response
// Nhiệm vụ: chỉ parse request(params, body) sau đó chuyển xuống
// service xử lý, nhận kết quả từ service  trả response về cho client


const userService = require("../services/users.service");
const { response } = require("../helpers/response");

const getUsers = () => {
    return async (req, res, next) => {
        try {
            const users = await userService.getUsers();
            res.status(200).json(response(users))
        } catch (error) {
            // res.status(500).json({error: error.message});
            // Chuyển tiếp error xuống middleware handleError
            next(error);
        }
    };
};

const createUser = () => {
    return async (req, res, next) => {
        try {
            const user = req.body;
            const createdUser = await userService.createUser(user)
            res.status(200).json(response(createdUser));  
        } catch (error) {
            // res.status(500).json({ error: error.message});
            next(error);
        }
    };
};

const deleteUser = () => { 
    return async (req, res, next) => {
        try {
             const { id } = req.params;
             const createdUser = await userService.deleteUser(id);
            res.status(200).json(response(true));
        } catch (error) {
            // res.status(500).json({ error: error.message});
            next(error);
        }
    };
};

module.exports = {
    getUsers,
    createUser,
    deleteUser,
};