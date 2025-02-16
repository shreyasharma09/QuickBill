const crypto=require("crypto")
const otpmap=new Map()     //map is built-in function helps to set(generate) get(verify) and delete otp, makes pair (email:otp)

const generateotp=(email)=>{
    const number=crypto.randomInt(0,1000000)       //randomly generate 6 digit number **jitne number k otp utni 0
    const otp=String(number).padStart(6,"7")       //cnvt into string and padstart checks the number should be of 6 digits,if any digit is missing then put 7to get 6 digit otp
    otpmap.set(email,otp)
    return otp
}

const verifyotp=(email,otp)=>{
    const otpentry=otpmap.get(email)           //jo bheja gya tha 
    if(!otpentry) return {status:false,message:"OTP is not found or expired"}
    if(otpentry===otp){
        otpmap.delete(email);
        return {status:true,message:"OTP matched successfully"}
    }
    return {status:false,message:"OTP is invalid"}
}
module.exports={generateotp,verifyotp}