//middleware helps to verify/check user just before add,get,delete,udpate product wd the help of TOKEN
const HandleSuccessResponse = require("../HandleResponse/HandleResponse")  
const { User } = require("../Model/UserModel/UserModel")
const jwt=require("jsonwebtoken")

const checkuserdetails= async (req, resp, next) => {   //next helps to move to next fn i.e. addproducts' fn
   try {
     // const token=req.body       
     const token = req.header("Authorization")        //body doesn't work in get api so header
     // console.log(token);
     if (!token) return HandleSuccessResponse(resp, 404, "Token is Not Found")
     const payload = jwt.verify(token, process.env.JSON_SECRET_KEY)                //token , secret key ==>payload
     if (!payload || !payload.id) return HandleSuccessResponse(resp, 401, "Token is not valid")
     const existinguser = await User.findOne({ _id: payload.id }).select("-password ")          //select fn helps in selecting values to send ..if - then not send 
     if (!existinguser) return HandleSuccessResponse(resp, 401, "Unauthorized User")
     req.user=existinguser           //req.user stores value temporarily
     next()
   } catch (error) {
    return HandleSuccessResponse(resp, 500, "Internal Server Error", null, error)
   }
}

module.exports=checkuserdetails