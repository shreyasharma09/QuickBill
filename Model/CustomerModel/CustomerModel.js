const mongoose=require("mongoose")
require("dotenv").config()  
const CustomerSchema= new mongoose.Schema({
    customerof:{
        type:mongoose.Schema.Types.ObjectId,
        ref:process.env.MONGODB_USER_COLLECTION,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String, //bcz if there's 0 at last number does'nt count bt string does
        required:true
    },
    address:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        default:0
    },
    createdat:{
        type:Date,
        default:Date.now
    }
})
CustomerSchema.index({ customerof: 1, phone: 1 }, { unique: true });  //in mongoshell ==> db.customers.dropindex("model_1")
const Customer=mongoose.model(process.env.MONGODB_CUSTOMER_COLLECTION,CustomerSchema)
module.exports=Customer