const { response } = require("../helpers/response");
const { AppError } = require("../helpers/error");

const upload = () => {
    return (req, res, next) => {
        const file = req.file;
        console.log(file);
        
        if(!file) {
            next(new AppError(400, "please upload a file"));
        }
        file.path = file.path.replace("/\\/g", "/")
        const url = `http://localhost:4000/${file.path}`;
        res.status(200).json(response(url));
    }
}

module.exports = {
    upload,
}