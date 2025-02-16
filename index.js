const express= require("express")
const cors= require("cors")
const Connection=require("./Connection")
const Routes=require("./Routes/Route")
require("dotenv").config()            //install it first then require and call
const app=express()
app.use(cors())
app.use(express.json())
Connection()

app.use("/api",Routes)

app.listen(process.env.PORT_NO,()=>console.log("Server started At :"+ process.env.PORT_NO))
