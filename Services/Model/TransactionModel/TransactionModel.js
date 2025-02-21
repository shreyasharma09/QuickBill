const mongoose= require("mongoose")
require("dotenv").config() 

const BaseSchema = new mongoose.Schema(
  {
      shopkeeperId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: process.env.MONGODB_USER_COLLECTION,
        required: true,
      },
      customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: process.env.MONGODB_CUSTOMER_COLLECTION,
        required: true,
      },
      paymentType: {
        type: String,
        required: true,
        enum: ["credit","debit"], 
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { discriminatorKey: "paymentType", collection: process.env.MONGODB_TRANSACTION_COLLECTION } // Add a discriminator key for role-based distinction
  );

const Transaction = mongoose.model(process.env.MONGODB_TRANSACTION_COLLECTION , BaseSchema);

const InvoiceSchema = new mongoose.Schema({
    InvoiceNo:{
        type: String,
        required: true,
    },
    OrderItems:[          //array of obj qki id's nikl ke aayngi 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:process.env.MONGODB_ORDEREDITEM_COLLECTION
        }
    ],
    TotalAmount:{           //sales
        type: Number,
        required: true,
    },
    TotalTax:{
        type: Number,
        required: true,
    },
    TotalDiscount:{
        type: Number,
        required: true,
    },
    TotalProfit:{
        type: Number,
        required: true,
    },
    Subtotal:{
      type: Number,
      required: true,
  },
});

const PaymentSchema = new mongoose.Schema({
  RecieptNo:{
    type: Number,
    required: true,
  },
  payment:{
    type: Number,
    required: true,
  },
  Description:{
    type: String,
    default:null
  }
});

// Create discriminator models for Shopkeeper and Executive
const Invoice = Transaction.discriminator("credit", InvoiceSchema);
const Payment = Transaction.discriminator("debit", PaymentSchema);
module.exports = {Transaction, Invoice, Payment}