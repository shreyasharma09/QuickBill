const nodemailer = require('nodemailer');               //install it and paste code from nodemailer at w3school
require("dotenv").config()

var transporter = nodemailer.createTransport({      //create medium to transfer otp from email of superadmin to email of shopkeeper
  service: 'gmail',
  auth: {
    user: 'shreya.sharma9m@gmail.com',
    pass: process.env.EMAIL_SERVICE_PASS   //app password==>2factorauth...apppassword search in mail....appname and copy pss
  }
});

const otptoemailforverification=async(resp,email,otp)=>{
    var mailOptions = {
        from: 'shreya.sharma9m@gmail.com',
        to: email,
        subject: 'OTP for Account Creation on Shopkeeper App',
        text: 'Your OTP is :'+otp
      };

      try {
        const info= await  transporter.sendMail(mailOptions)
        return resp.status(202).json({message:"OTP send successfully",data:info.response})
      } catch (error) {
        return resp.status(400).json({message:"Email is not valid"})
      }
    }

module.exports={otptoemailforverification}