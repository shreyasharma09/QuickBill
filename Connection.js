const mongoose= require("mongoose")

const Connection=async ()=>{
    // console.log(process.env.MONGODB_CONNECTION_STRING);
    
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    return console.log("Connected to mongoDB");
}
module.exports=Connection