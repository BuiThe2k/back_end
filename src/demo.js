const express= require("express");
const {Sequelize,DataTypes}=require("sequelize");
const app=express();
app.use(express.json());

// tao ket noi db bang sequilize
const sequelize= new Sequelize("node26-food","root","12345",{
    host:"localhost",
    port:3306,
    dialect:"mysql",
});
// kiem cho co ket noi thanh cong hay khong
 sequelize.authenticate().then(()=>{
    console.log("connected")
 }).catch((err)=>{
    console.log(err);
    throw err;
 })
// tao model de sequilize lien ket toi table va tuong tac;
const User= sequelize.define("Users",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    firstName:{
     type:DataTypes.STRING(50),
     field:"first_name",
    },
    lastName:{
        type:DataTypes.STRING(50),
        field:"last_name",
       },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    tableName:"users",
    timestamps:false,
},
);  
// localhost:4000/api/v1/users
app.get("/api/v1/users",async(req,res)=>{
    try{
        //SELECT * FROM users;
        const users=await User.findAll()
        // Query DB thành công
        res.status(200).json({data:users});
    }catch(error){
        // Query DB thất bại
        res.status(500).json({error:error});
    };
})
app.listen(4000);