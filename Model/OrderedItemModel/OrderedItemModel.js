const mongoose= require('mongoose')
require("dotenv").config()  

const OrderedItemSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
       type: String,
       required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    subtotal:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    createdat:{
        type: Date,
        default: Date.now,
    }
})
const OrderedItems=mongoose.model(process.env.MONGODB_ORDEREDITEM_COLLECTION,OrderedItemSchema)
module.exports = OrderedItems