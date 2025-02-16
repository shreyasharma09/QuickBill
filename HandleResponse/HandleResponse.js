const HandleSuccessResponse=(resp,status,message,data=null,error=null)=>
{
    return resp.status(status).json({ message, data, error })
}
module.exports=HandleSuccessResponse