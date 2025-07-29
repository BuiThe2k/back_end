class AppError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode;
    }
} 
  // err:instance cuar AppError
const handleErrors=(err,req,res,next)=>{
    console.log(err);
    
    // kiem tra err co phai la instance cuar AppError hay khoong 
    // neu err la instane cuar AppError.nghia la err la minh biet va da xu ly
    if(!(err instanceof AppError))
   {
    err= new AppError(500,err)
   }
   const {message,statusCode}=err;
   res.status(statusCode).json({
    status:"error",
    message:message,
   });
//    neu co cac midlware phia sau phai goi next de di toi cac middleware phia sau
 next();

//    neu la nhung loi khong phai instance cua apperror thif cos the vi mot li do nao minh chua biet
};
module.exports={
    AppError,
    handleErrors,
};