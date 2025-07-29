const { AppError } = require("../helpers/error");
const {User, Restaurant} = require("../models")

// Service nhận vào data từ controller
// Nhiệm vụ: xử lý nghiệp vụ của ứng dụng, sau đó gọi tới model của squelize
// để query xuống DB, nhận data từ DB và trả về cho controller

const getUsers = async () =>{
    try {
        const users = await User.findAll({include: "restaurants"} );
        if (users.length === 0) {
            throw new AppError(404, "Không tìm thấy user nào");
        }
        return users;
    } catch (error) {
        throw new AppError(500, "Something went wrong with DB");
    }
}
// const getUserByID = async (id) =>{
//     try {
//         const users = await User.findByPk(id, {include: "restaurants"} );
//         if (!users) {
//             throw new AppError(404, "Không tìm thấy user nào");
//         }
//     } catch (error) {
//         throw new AppError(500, "Something went wrong with DB");
//     }
// }

const createUser = async (data) => {
    try {
        const user = await User.findOne({
            where: {
                email: data.email,
            },
        });
        // Email đã tồn tại trong DB
        if (user){
            throw new AppError(400, "Email đã tồn tại");
        }
         // Ví dụ trong trường hợp admin thêm user chỉ cần dùng email
            // ta cần phải tạo 1 mật khẩu ngẫu nhiên
        if(!data.password) {
            data.password = Math.random().toString(36).substring(2);
            // Gửi email về cho user mật khẩu này
        }
        const createdUser = await User.create(data);
        return createdUser;
    }catch (error) {
        throw new AppError(500, "Something went wrong with DB");
    }
};

const deleteUser = async (userId) => { 
    try {
        const user = await User.findOne ({
            where : {
                id: userId,
                },
            });
        if (!user) {
            throw new Error(400,"User not found");
            }
        await User.destroy({where: { id: userId } });
    } catch (error) {
        throw error;
    }
};

// Update: 
// - User.findOne({where: {id: 1}}) - Nếu tìm không thấy sẽ trả về lỗi
// - User.update(data, { where: { id: 1 } });
// - User.findOne({where: {id: 1}})

module.exports = {
    getUsers,
    createUser,
    deleteUser,
};